/**
 * POST /api/admin-login  { password }  -> { ok, token }
 * GET  /api/admin-login  (Authorization: Bearer <token>) -> { ok } if the session is valid
 *
 * The password lives only on the server (Vercel env var ADMIN_PASSWORD), never in the
 * browser bundle. Sessions are HMAC-signed with ADMIN_SESSION_SECRET and expire in 8h.
 */
import { bearerToken, clientIp, createNodeHandler, json, rateLimit, readJson, safeEqual, signSession, verifySession } from './_lib/http';

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

  // Small fixed delay makes brute forcing slower without hurting real users.
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

export default createNodeHandler({ POST, GET });
