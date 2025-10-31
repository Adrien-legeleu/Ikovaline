// app/api/send-config/route.ts
import { ProjectConfigEmail } from '@/emails/ProjectConfigEmail';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // on récupère tout ce qu’on a besoin
    const {
      categoryLabel,
      tierLabel,
      options,
      adsBudget,
      totalTTC,
      delayDays,
      kpi,
    } = body ?? {};

    if (!categoryLabel || !tierLabel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // envoi Resend
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || 'Ikovaline <contact@ikovaline.com>',
      to: ['contact@ikovaline.com'],
      subject: `🆕 Nouvelle config: ${categoryLabel} / ${tierLabel}`,
      react: ProjectConfigEmail({
        categoryLabel,
        tierLabel,
        options,
        adsBudget,
        totalTTC,
        delayDays,
        kpi,
      }) as React.ReactElement, // Resend veut un ReactNode
    });

    if (error) {
      console.error('[send-config] resend error', error);
      return NextResponse.json({ error: 'Resend error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error('[send-config] route error', err);
    return NextResponse.json({ error: 'Server exception' }, { status: 500 });
  }
}
