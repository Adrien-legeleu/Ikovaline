import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// Opinionated defaults
export const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL || 'Ikovaline <noreply@ikovaline.com>';
export const APP_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ikovaline.com';
