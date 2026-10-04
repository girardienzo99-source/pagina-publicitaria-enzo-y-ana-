/** Client side of the admin session. The password is verified only on the server. */
const TOKEN_KEY = 'rcw_admin_token';

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

export async function loginAdmin(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const response = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json().catch(() => ({}))) as { ok?: boolean; token?: string; error?: string };
    if (response.ok && data.ok && data.token) {
      sessionStorage.setItem(TOKEN_KEY, data.token);
      return { ok: true };
    }
    return { ok: false, error: data.error || 'No se pudo iniciar sesión.' };
  } catch {
    return { ok: false, error: 'Sin conexión con el servidor. Intentá de nuevo.' };
  }
}

/** Confirms with the server that the stored token is still valid (signature + expiry). */
export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const response = await fetch('/api/admin-login', { headers: { authorization: `Bearer ${token}` } });
    if (!response.ok) clearAdminToken();
    return response.ok;
  } catch {
    return false;
  }
}
