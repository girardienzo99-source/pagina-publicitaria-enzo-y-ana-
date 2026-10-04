/**
 * POST /api/lead
 * Receives a quote / contact request from the site and notifies the team.
 *
 * Notification channels (any combination, configured with Vercel env vars):
 *   - Email via Resend ........ RESEND_API_KEY (+ optional LEAD_FROM_EMAIL)
 *   - Telegram (instant push).. TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 *   - Email via FormSubmit .... used automatically when Resend is not configured
 *                               (free, no account; the first message asks you to
 *                               confirm the address once)
 * Destination email: LEAD_NOTIFY_EMAIL (comma separated). Defaults to the team inbox.
 */
import { clientIp, cleanText, escapeHtml, json, rateLimit, readJson } from './_lib/http';

const DEFAULT_NOTIFY_EMAIL = 'enzogirardi84@gmail.com';
const SITE_URL = process.env.SITE_URL || 'https://riocuarto-web.online';

type LeadSource = 'cotizador' | 'propuesta' | 'contacto';

interface Lead {
  source: LeadSource;
  business: string;
  contact: string;
  industry: string;
  features: string[];
  timeline: string;
  notes: string;
  estimate: string;
  page: string;
}

function parseLead(body: Record<string, unknown>): Lead | { error: string } {
  const source = ['cotizador', 'propuesta', 'contacto'].includes(body.source as string)
    ? (body.source as LeadSource)
    : 'contacto';

  const features = Array.isArray(body.features)
    ? body.features.slice(0, 20).map(f => cleanText(f, 120)).filter(Boolean)
    : [];

  const lead: Lead = {
    source,
    business: cleanText(body.business, 120),
    contact: cleanText(body.contact, 160),
    industry: cleanText(body.industry, 80),
    features,
    timeline: cleanText(body.timeline, 60),
    notes: cleanText(body.notes, 2000),
    estimate: cleanText(body.estimate, 120),
    page: cleanText(body.page, 200),
  };

  if (!lead.business && !lead.contact && !lead.notes && lead.features.length === 0) {
    return { error: 'La consulta está vacía.' };
  }
  return lead;
}

function leadSummaryLines(lead: Lead): [string, string][] {
  const sourceLabel: Record<LeadSource, string> = {
    cotizador: 'Cotizador interactivo',
    propuesta: 'Generador de propuesta PDF',
    contacto: 'Formulario de contacto',
  };
  const rows: [string, string][] = [
    ['Origen', sourceLabel[lead.source]],
    ['Negocio', lead.business || '—'],
    ['Contacto', lead.contact || '—'],
    ['Rubro', lead.industry || '—'],
    ['Módulos', lead.features.length ? lead.features.join(', ') : '—'],
    ['Plazo', lead.timeline || '—'],
    ['Estimación', lead.estimate || '—'],
    ['Notas', lead.notes || '—'],
  ];
  return rows;
}

async function sendViaResend(lead: Lead, to: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const rows = leadSummaryLines(lead)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#4a5d4a;font-weight:600">${k}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`)
    .join('');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || 'Río Cuarto Web <onboarding@resend.dev>',
      to,
      subject: `Nueva consulta: ${lead.business || lead.contact || 'cliente'} (${lead.source})`,
      html: `<h2 style="font-family:sans-serif">Nueva consulta desde la web</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
    }),
  });
  return res.ok;
}

async function sendViaFormSubmit(lead: Lead, to: string): Promise<boolean> {
  const payload: Record<string, string> = {
    _subject: `Nueva consulta web: ${lead.business || lead.contact || 'cliente'}`,
    _template: 'table',
    _captcha: 'false',
  };
  for (const [k, v] of leadSummaryLines(lead)) payload[k] = v;
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      origin: SITE_URL,
      referer: `${SITE_URL}/`,
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

async function sendViaTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const text = ['🔔 Nueva consulta en la web', '', ...leadSummaryLines(lead).map(([k, v]) => `${k}: ${v}`)].join('\n');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  return res.ok;
}

export async function POST(request: Request): Promise<Response> {
  const ip = clientIp(request);
  if (!rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000)) {
    return json(429, { ok: false, error: 'Demasiadas consultas seguidas. Probá de nuevo en unos minutos.' });
  }

  const body = await readJson(request);
  if (!body) return json(400, { ok: false, error: 'Formato inválido.' });

  // Honeypot: real users never fill this hidden field; bots usually do.
  if (cleanText(body.website, 200)) return json(200, { ok: true });

  const parsed = parseLead(body);
  if ('error' in parsed) return json(400, { ok: false, error: parsed.error });

  const recipients = (process.env.LEAD_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL)
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  const tasks: Promise<boolean>[] = [sendViaTelegram(parsed)];
  tasks.push(
    process.env.RESEND_API_KEY
      ? sendViaResend(parsed, recipients)
      : Promise.all(recipients.map(r => sendViaFormSubmit(parsed, r))).then(r => r.some(Boolean)),
  );

  const results = await Promise.allSettled(tasks);
  const delivered = results.filter(r => r.status === 'fulfilled' && r.value).length;
  if (delivered === 0) {
    console.error('[lead] no notification channel delivered', results);
    return json(502, { ok: false, error: 'No pudimos registrar la consulta. Escribinos por WhatsApp.' });
  }
  return json(200, { ok: true });
}

export function GET(): Response {
  return json(405, { ok: false, error: 'Método no permitido.' }, { allow: 'POST' });
}
