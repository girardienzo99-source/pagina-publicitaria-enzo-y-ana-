/**
 * Sends a lead to /api/lead so the team gets notified (email / Telegram).
 * Fire-and-forget: it never blocks the WhatsApp redirect, and `keepalive`
 * lets the request finish even if the user switches to WhatsApp right away.
 */
export interface LeadPayload {
  source: 'cotizador' | 'propuesta' | 'contacto';
  business?: string;
  contact?: string;
  industry?: string;
  features?: string[];
  timeline?: string;
  notes?: string;
  estimate?: string;
  /** Honeypot field – must stay empty. */
  website?: string;
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}
