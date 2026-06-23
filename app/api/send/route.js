import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { WelcomeEmail } from '@/emails/welcome';
import { resend } from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, message, useReactEmail, name, preventThreading, emailType, bookingDetails } =
      body;

    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 },
      );
    }

    // Build the email options
    const emailOptions = {
      from: process.env.EMAIL_FROM || 'Acme <onboarding@resend.dev>',
      to: [to],
      subject: subject,
    };

    // Option 1: Use React Email template
    if (useReactEmail && name && bookingDetails) {
      emailOptions.react = WelcomeEmail({
        name,
        emailType: emailType || 'confirmation',
        bookingDetails,
      });
    } else if (message) {
      // Option 2: Use plain HTML
      emailOptions.html = `<p>${message}</p>`;
    } else {
      return NextResponse.json(
        { error: 'Missing message or template data' },
        { status: 400 },
      );
    }

    // Option 3: Prevent Gmail threading
    if (preventThreading) {
      emailOptions.headers = {
        'X-Entity-Ref-ID': randomUUID(),
      };
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: 'Email sent successfully',
      preventedThreading: preventThreading || false,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
