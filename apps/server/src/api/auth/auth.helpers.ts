import { Resend } from 'resend';
import type { SendVerificationEmailData } from './auth.types';

export async function sendVerificationEmail({
  apiKey,
  to,
  verificationLink,
}: SendVerificationEmailData) {
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Homu <onboarding@resend.dev>',
      to: [to],
      subject: 'Verify your email',
      html: `Click this link to verify your email: ${verificationLink}`,
    });

    if (error) {
      console.error('Resend email API error', {
        error,
        to,
        verificationLink,
      });
    }

    console.log('Resend email sent successfully', {
      to,
      verificationLink,
      data,
    });
  } catch (error) {
    console.error('Resend email unexpected failure', {
      error,
      to,
      verificationLink,
    });
  }
}
