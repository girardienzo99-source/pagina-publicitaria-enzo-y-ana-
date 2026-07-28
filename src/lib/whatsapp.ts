// Centralized WhatsApp link builder for Tu Sitio Web Río Cuarto (Anahí & Enzo Gilardi)

export const OFFICIAL_WHATSAPP_NUMBER = '5493584860640';
export const OFFICIAL_PHONE_FORMATTED = '+54 358 486-0640';
export const OFFICIAL_EMAIL = 'anagilardi1234@gmail.com';
export const OFFICIAL_COMPANY_NAME = 'Tu Sitio Web Río Cuarto';
export const OFFICIAL_TEAM_NAMES = 'Anahí & Enzo Gilardi';

export function getWhatsAppUrl(messageText?: string): string {
  const baseUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`;
  if (!messageText || messageText.trim() === '') {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(messageText.trim())}`;
}
