// Centralized WhatsApp link & contact details for Río Cuarto Web (Anahí Gilardi & Enzo Girardi)

export const ANAHI_WHATSAPP_NUMBER = '5493584860640';
export const ANAHI_PHONE_FORMATTED = '+54 358 486-0640';
export const ANAHI_EMAIL = 'anagilardi1234@gmail.com';

export const ENZO_WHATSAPP_NUMBER = '5493584302024';
export const ENZO_PHONE_FORMATTED = '+54 358 430-2024';
export const ENZO_EMAIL = 'enzogirardi84@gmail.com';

export const OFFICIAL_WHATSAPP_NUMBER = ANAHI_WHATSAPP_NUMBER;
export const OFFICIAL_PHONE_FORMATTED = ANAHI_PHONE_FORMATTED;
export const OFFICIAL_EMAIL = ANAHI_EMAIL;

export const OFFICIAL_COMPANY_NAME = 'Río Cuarto Web';
export const OFFICIAL_TAGLINE = 'Diseño Digital a Medida';
export const OFFICIAL_TEAM_NAMES = 'Anahí Gilardi & Enzo Girardi';

export function getWhatsAppUrl(messageText?: string, developer: 'anahi' | 'enzo' | 'default' = 'default'): string {
  const targetNumber = developer === 'enzo' ? ENZO_WHATSAPP_NUMBER : ANAHI_WHATSAPP_NUMBER;
  const baseUrl = `https://wa.me/${targetNumber}`;
  if (!messageText || messageText.trim() === '') {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(messageText.trim())}`;
}
