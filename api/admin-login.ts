/**
 * POST /api/admin-login  { password }  -> { ok, token }
 * GET  /api/admin-login  (Authorization: Bearer <token>) -> { ok } if the session is valid
 *
 * The password lives only on the server (Vercel env var ADMIN_PASSWORD), never in the
 * browser bundle. Sessions are HMAC-signed with ADMIN_SESSION_SECRET and expire in 8h.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function json(status: number, body: unknown, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

const buckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit: number, windowMs: number): boolean {
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

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

async function readJson<T = Record<string, unknown>>(request: Request, maxBytes = 2_000): Promise<T | null> {
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

export async function POST(request: Request): Promise<Response> {
  const ip = clientIp(request);
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) {
    return json(429, { ok: false, error: 'Demasiados intentos. Esperá 15 minutos.' });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 10 || !process.env.ADMIN_SESSION_SECRET) {
    console.error('[admin-login] ADMIN_PASSWORD / ADMIN_SESSION_SECRET not configured');
    return json(503, { ok: false, error: 'El acceso administrativo no está configurado en el servidor.' });
  }

  const body = await readJson<{ password?: unknown }>(request, 2_000);
  const password = typeof body?.password === 'string' ? body.password : '';

  await new Promise(resolve => setTimeout(resolve, 400));

  if (!password || !safeEqual(password, expected)) {
    return json(401, { ok: false, error: 'Contraseña incorrecta.' });
  }

  const token = signSession();
  if (!token) return json(503, { ok: false, error: 'Sesión no disponible.' });
  return json(200, { ok: true, token });
}

export function GET(request: Request): Response {
  return verifySession(bearerToken(request))
    ? json(200, { ok: true })
    : json(401, { ok: false });
}

// Vercel Serverless Function Default Export Adapter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'POST' && method !== 'GET') {
    if (typeof res.setHeader === 'function') res.setHeader('Allow', 'POST, GET');
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
    if (method === 'POST') {
      if (typeof req.body === 'object' && req.body !== null) {
        body = JSON.stringify(req.body);
        if (!headers.has('content-type')) headers.set('content-type', 'application/json');
      } else if (typeof req.body === 'string') {
        body = req.body;
      }
    }

    const webRequest = new Request(url, { method, headers, body });
    const webResponse = method === 'POST' ? await POST(webRequest) : GET(webRequest);

    if (typeof res.status === 'function') res.status(webResponse.status);
    else res.statusCode = webResponse.status;

    webResponse.headers.forEach((val, k) => {
      if (typeof res.setHeader === 'function') res.setHeader(k, val);
    });

    const text = await webResponse.text();
    if (typeof res.send === 'function') res.send(text);
    else res.end(text);
  } catch (err) {
    console.error('[admin-login serverless error]', err);
    if (typeof res.status === 'function') res.status(500).json({ ok: false, error: 'Error del servidor.' });
    else {
      res.statusCode = 500;
      res.end('Server Error');
    }
  }
}
