import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@/lib/contact';

export const runtime = 'nodejs';

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Email service is not configured. Add RESEND_API_KEY in Vercel project settings, then redeploy.',
      },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const subject = body.subject?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>';

  const { error } = await resend.emails.send({
    from,
    to: [process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL],
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    html: `
      <h2>New message from adarsh.lol</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
