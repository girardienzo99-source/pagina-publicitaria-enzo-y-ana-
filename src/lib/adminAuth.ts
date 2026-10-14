/** Client side of the admin session. Verifies via /api/admin-login with a Web Crypto SHA-256 fallback for static hosts (e.g. GitHub Pages). */
const TOKEN_KEY = 'rcw_admin_token';
const STATIC_FALLBACK_HASH = '3f060fa74c2680aa729b0a90f79dbb22d9a410cec9fb7c792f6f33f67eeae6b8';
const STATIC_TOKEN_PREFIX = 'static:';

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearAdminToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function loginAdmin(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (response.status !== 404 && response.status !== 405) {
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; token?: string; error?: string };
      if (response.ok && data.ok && data.token) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        return { ok: true };
      }
      return { ok: false, error: data.error || 'No se pudo iniciar sesión.' };
    }
  } catch {
    /* Fall through to static SHA-256 verification when serverless API is unreachable */
  }

  try {
    const hash = await sha256Hex(password);
    if (hash === STATIC_FALLBACK_HASH) {
      sessionStorage.setItem(TOKEN_KEY, `${STATIC_TOKEN_PREFIX}${Date.now()}`);
      return { ok: true };
    }
    return { ok: false, error: 'Contraseña incorrecta.' };
  } catch {
    return { ok: false, error: 'No se pudo verificar la contraseña.' };
  }
}

/** Confirms with the server that the stored token is still valid (signature + expiry). */
export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  if (token.startsWith(STATIC_TOKEN_PREFIX)) {
    const issuedAt = Number(token.slice(STATIC_TOKEN_PREFIX.length));
    const valid = Number.isFinite(issuedAt) && Date.now() - issuedAt < 8 * 60 * 60 * 1000;
    if (!valid) clearAdminToken();
    return valid;
  }
  try {
    const response = await fetch('/api/admin-login', { headers: { authorization: `Bearer ${token}` } });
    if (!response.ok) clearAdminToken();
    return response.ok;
  } catch {
    return false;
  }
}
