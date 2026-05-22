export const CONTACT_EMAIL = 'adarshdodmania@gmail.com';
export const CONTACT_PHONE_DISPLAY = '+91 63616 12811';
export const CONTACT_PHONE_RAW = '+916361612811';
export const MAILTO_LINK = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Hello Adarsh')}&body=${encodeURIComponent('Hi Adarsh,\n\n')}`;
export const TEL_LINK = `tel:${CONTACT_PHONE_RAW}`;

export function openMailClient() {
  window.location.href = MAILTO_LINK;
}

export function openPhoneDialer() {
  window.location.href = TEL_LINK;
}

export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    throw new Error(data.error || `Contact form failed (${response.status})`);
  }
}
