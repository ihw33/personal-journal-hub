import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const emailConfig = {
  fromEmail: process.env.FROM_EMAIL || 'noreply@localhost',
  senderName: process.env.NEWSLETTER_SENDER_NAME || '개인 저널 허브',
};