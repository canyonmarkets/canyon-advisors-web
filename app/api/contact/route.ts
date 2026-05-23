import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  const { name, phone, email, service, message } = await req.json();

  const { error } = await resend.emails.send({
    from: 'Canyon Advisors <noreply@canyon-markets.com>',
    to: 'info@canyon-advisors.com',
    replyTo: email,
    subject: `Canyon Advisors Inquiry — ${service}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone || 'Not provided'}`,
      `Email: ${email}`,
      `Interested In: ${service}`,
      ``,
      `Message:`,
      message,
    ].join('\n'),
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
