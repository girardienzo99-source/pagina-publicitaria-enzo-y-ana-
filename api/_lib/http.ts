/**
 * Shared helpers for the Vercel serverless functions in /api.
 * Files inside folders starting with "_" are NOT exposed as routes by Vercel.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const json = (status: number, body: unknown, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });

/** Reads and parses a JSON body with a hard size limit (protects against huge payloads). */
export async function readJson<T = Record<string, unknown>>(request: Request, maxBytes = 16_000): Promise<T | null> {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json') && !contentType.includes('text/plain')) return null;
  const raw = await request.text();
  if (raw.length > maxBytes) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/**
 * Best-effort in-memory rate limiter. Each serverless instance keeps its own
 * counters, so it is not a hard guarantee, but it stops simple spam loops.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
    }
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

/** Trims, strips control characters and caps the length of user-provided text. */
export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still run a comparison so timing does not reveal the length mismatch.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

// ---------- Admin session tokens (stateless, HMAC-signed) ----------

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function signSession(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySession(token: string | null | undefined): boolean {
  const secret = sessionSecret();
  if (!secret || !token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  if (!safeEqual(signature, expected)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function bearerToken(request: Request): string | null {
  const header = request.headers.get('authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

export function createNodeHandler(handlers: { [method: string]: (req: Request) => Promise<Response> | Response }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function (req: any, res: any) {
    const method = (req.method || 'GET').toUpperCase();
    const handler = handlers[method];
    if (!handler) {
      if (typeof res.setHeader === 'function') {
        res.setHeader('Allow', Object.keys(handlers).join(', '));
      }
      return typeof res.status === 'function'
        ? res.status(405).json({ ok: false, error: 'Método no permitido.' })
        : res.end('Method Not Allowed');
    }

    try {
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
      const url = `${protocol}://${host}${req.url}`;

      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') headers.set(key, value);
        else if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
      }

      let body: string | undefined = undefined;
      if (!['GET', 'HEAD'].includes(method)) {
        if (typeof req.body === 'object' && req.body !== null) {
          body = JSON.stringify(req.body);
          if (!headers.has('content-type')) {
            headers.set('content-type', 'application/json');
          }
        } else if (typeof req.body === 'string') {
          body = req.body;
        }
      }

      const webRequest = new Request(url, {
        method,
        headers,
        body,
      });

      const webResponse = await handler(webRequest);
      if (typeof res.status === 'function') {
        res.status(webResponse.status);
      } else {
        res.statusCode = webResponse.status;
      }

      webResponse.headers.forEach((value, key) => {
        if (typeof res.setHeader === 'function') {
          res.setHeader(key, value);
        }
      });

      const text = await webResponse.text();
      if (typeof res.send === 'function') {
        res.send(text);
      } else {
        res.end(text);
      }
    } catch (err) {
      console.error('[vercel serverless error]', err);
      if (typeof res.status === 'function') {
        res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  };
}
