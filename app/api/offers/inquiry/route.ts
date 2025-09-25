// app/api/offers/inquiry/route.ts
import { Resend } from 'resend';
import PricingInquiryEmail from '@/emails/PricingInquiryEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const { firstName, email, tel, message, summary } = body ?? {};
    if (!firstName || !email || !tel || !summary?.tierName) {
      return new Response(JSON.stringify({ error: 'Champs manquants.' }), {
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'contact@ikovaline.com',
      to: ['contact@ikovaline.com'],
      subject: `Offre ${summary.tierName} — ${firstName} vous a envoyé une configuration`,
      react: PricingInquiryEmail({
        firstName,
        email,
        tel,
        message,
        summary,
      }),
    });

    console.log({ data, error });

    if (error) return Response.json({ error }, { status: 500 });
    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
