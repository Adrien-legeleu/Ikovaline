import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log('📨 Nouveau message reçu via le formulaire :', data);

    const {
      firstname,
      lastname,
      buisnessname,
      etude,
      email,
      tel,
      secteur,
      message,
      category,
    } = data;

    const subject =
      category === 'Entreprise'
        ? `📩 Nouveau contact entreprise – ${buisnessname || firstname}`
        : `👋 Nouveau contact étudiant – ${firstname} ${lastname}`;

    const html = `
      <div style="font-family: Inter, sans-serif; background:#f9fafb; padding:24px; border-radius:12px;">
        <h2 style="color:#0ea5e9;">${subject}</h2>
        <p><b>Catégorie :</b> ${category}</p>
        <p><b>Nom :</b> ${firstname} ${lastname}</p>
        ${buisnessname ? `<p><b>Entreprise :</b> ${buisnessname}</p>` : ''}
        ${secteur ? `<p><b>Secteur :</b> ${secteur}</p>` : ''}
        ${etude ? `<p><b>Niveau d'études :</b> ${etude}</p>` : ''}
        <p><b>Email :</b> ${email}</p>
        <p><b>Téléphone :</b> ${tel}</p>
        <hr style="margin:20px 0;border:0;border-top:1px solid #ddd;">
        <p><b>Message :</b><br/>${message || 'Aucun message fourni.'}</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: 'Ikovaline <contact@ikovaline.com>', // ✅ où tu veux recevoir les messages
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('❌ Erreur envoi email', err);
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
  }
}
