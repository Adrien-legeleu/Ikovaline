// app/api/roulette/spin/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';
import { SEGMENTS } from '@/lib/roulette/segments';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

function genCode(prefix = 'IKOVA') {
  return `${prefix}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}
function sha256(x: string) {
  return crypto.createHash('sha256').update(x).digest('hex');
}
function pickWeighted(weights: { seg: number; pct: number }[]) {
  const r = Math.random() * 100;
  let acc = 0;
  for (const w of weights) {
    acc += w.pct;
    if (r <= acc) return w.seg as keyof typeof SEGMENTS;
  }
  return weights[weights.length - 1].seg as keyof typeof SEGMENTS;
}

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { email } = await req.json().catch(() => ({}));
  if (!email)
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  const emailNorm = String(email).trim().toLowerCase();

  // Anti double-spin (30 jours)
  const { data: lastSpin } = await supa
    .from('roulette_spins')
    .select('created_at')
    .eq('email_norm', emailNorm)
    .gte('created_at', new Date(Date.now() - 30 * 864e5).toISOString())
    .order('created_at', { ascending: false })
    .limit(1);

  if ((lastSpin?.length ?? 0) > 0) {
    const nextEligibleAt = new Date(
      new Date(lastSpin![0].created_at).getTime() + 30 * 864e5
    ).toISOString();
    return NextResponse.json(
      { error: 'already_played', nextEligibleAt },
      { status: 409 }
    );
  }

  // Récupérer les probabilités actuelles (email-aware)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pr = await fetch(`${baseUrl}/api/roulette/probabilities`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const probs = await pr.json();
  if (!probs?.weights)
    return NextResponse.json({ error: 'weights' }, { status: 500 });

  const seg = pickWeighted(probs.weights);
  const segMeta = SEGMENTS[seg];
  const code = genCode();
  const expiresAt = new Date(Date.now() + probs.validityDays * 864e5);

  // Enregistrer le code
  const { error: cErr } = await supa.from('roulette_codes').insert({
    seg,
    code,
    email,
    prize_label: segMeta.label,
    rules: segMeta.rules,
    expires_at: expiresAt.toISOString(),
  });
  if (cErr)
    return NextResponse.json({ error: 'code_insert_failed' }, { status: 500 });

  // Log spin
  const ip =
    (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || '';
  const ua = req.headers.get('user-agent') || '';
  await supa.from('roulette_spins').insert({
    email,
    seg,
    prize_label: segMeta.label,
    code,
    ip_hash: ip ? sha256(ip) : null,
    ua_hash: ua ? sha256(ua) : null,
  });

  // Email gagnant
  const expireStr = expiresAt.toLocaleDateString('fr-FR');
  await resend.emails.send({
    from: 'Ikovaline <contact@ikovaline.com>',
    to: email,
    subject: `🎁 Votre code Ikovaline : ${code}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;padding:24px;background:#0B0D10;color:#E9EDF2">
        <h2 style="margin:0 0 8px">Bravo !</h2>
        <p style="margin:0 0 8px">Vous avez gagné : <b>${segMeta.label}</b></p>
        <p style="margin:12px 0 6px">Votre code unique :</p>
        <div style="font-size:22px;font-weight:700;letter-spacing:1px">${code}</div>
        <p style="opacity:.8;margin:8px 0">Valable jusqu’au <b>${expireStr}</b> – 1 utilisation – non cumulable.</p>
        <hr style="border:none;border-top:1px solid #1A2026;margin:16px 0" />
        <p><b>Comment l’utiliser (paiement par RIB) :</b><br/>
        Collez ce code dans votre brief ou répondez à cet email. La remise sera ajoutée en ligne dédiée sur votre devis/facture.</p>
        <p style="font-size:12px;opacity:.7;margin-top:16px">
          Remises % plafonnées (cap). Montants avec seuil. Jackpot activé seulement si annoncé. Hors SaaS pour les remises % (1,2,3).
        </p>
      </div>
    `,
  });

  // Reset des boosts après rotation
  await supa
    .from('roulette_boosts')
    .update({
      boost_pts_2: 0,
      boost_pts_3: 0,
      boost_pts_5: 0,
      boost_pts_7: 0,
      last_reset: new Date().toISOString(),
    })
    .eq('email_norm', emailNorm);

  return NextResponse.json({
    ok: true,
    seg,
    prize: segMeta.label,
    code,
    expiresAt: expiresAt.toISOString(),
  });
}
