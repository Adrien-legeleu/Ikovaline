// app/api/_utils/email.ts
import { Resend } from 'resend';
export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const from =
    opts.from ||
    process.env.RESEND_FROM_EMAIL ||
    'Ikovaline <contact@ikovaline.com>';
  return resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}
