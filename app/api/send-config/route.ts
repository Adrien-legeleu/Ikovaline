import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const { email, categoryLabel, tierLabel, totalTTC, delayDays, kpi, options } =
    data;

  try {
    await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: 'Ikovaline <contact@ikovaline.com>', // ✅ ton adresse perso où tu veux recevoir
      subject: `Nouvelle configuration de projet - ${categoryLabel}`,
      html: `
        <h2>Nouvelle estimation reçue</h2>
        <p><b>Email client :</b> ${email}</p>
        <p><b>Projet :</b> ${categoryLabel} (${tierLabel})</p>
        <p><b>Total TTC :</b> ${totalTTC} €</p>
        <p><b>Délai estimé :</b> ${delayDays} jours</p>
        <p><b>KPI :</b> ${kpi.convMid} ${kpi.convLabel} / mois (~${kpi.convRatePct})</p>
        <hr />
        <h3>Options choisies :</h3>
        <ul>
          ${options.map((o: any) => `<li>${o.label} — ${o.price} €</li>`).join('')}
        </ul>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
  }
}
