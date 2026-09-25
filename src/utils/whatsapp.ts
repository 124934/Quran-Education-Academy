export interface WhatsAppFormData {
  name: string;
  phone: string;
  course: string;
  studentType: string;
  timing: string;
  country: string;
  notes?: string;
}

export const ACADEMY_INFO = {
  name: 'Quran Education Academy',
  phone: '03187779954',
  whatsappRaw: '923187779954',
  email: 'quraaneducationacademy@gmail.com',
  address: 'Online Academy (1-on-1 Classes via Zoom & Skype)',
};

/**
 * Builds direct WhatsApp URL with pre-filled message (strictly English, zero Urdu, no trial mentions)
 */
export function buildWhatsAppLink(data?: Partial<WhatsAppFormData>): string {
  const number = ACADEMY_INFO.whatsappRaw;

  if (!data || (!data.name && !data.course)) {
    const defaultText = `Hello! I would like to inquire about online classes at ${ACADEMY_INFO.name}. Please share admission details and schedule.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
  }

  const lines = [
    `*Admission Inquiry - ${ACADEMY_INFO.name}*`,
    `I would like to apply for Online Quran Classes. Here are my details:`,
    ``,
    `👤 *Student/Parent Name:* ${data.name || 'Not provided'}`,
    `📱 *Contact/WhatsApp:* ${data.phone || 'Not provided'}`,
    `📖 *Desired Course:* ${data.course || 'General Inquiry'}`,
    `👥 *Student Category:* ${data.studentType || 'Not specified'}`,
    `⏰ *Preferred Timing:* ${data.timing || 'Flexible'}`,
    data.country ? `🌍 *City / Country:* ${data.country}` : null,
    data.notes ? `📝 *Requirements:* ${data.notes}` : null,
    ``,
    `Please share class schedule and fee details. Thank you!`,
  ].filter(Boolean);

  const message = lines.join('\n');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppDirect(data?: Partial<WhatsAppFormData>) {
  const url = buildWhatsAppLink(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}
