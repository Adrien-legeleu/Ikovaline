import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.RESEND_FROM_EMAIL || 'no-reply@localhost';

export async function sendWelcomeNewUserEmail(params: {
  to: string;
  fullName?: string;
  projectTitle: string;
  inviteUrl: string; // lien d’invitation Supabase (redirige vers /welcome?next=...)
}) {
  const { to, fullName, projectTitle, inviteUrl } = params;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,sans-serif">
      <h2>Bienvenue${fullName ? `, ${fullName}` : ''} 👋</h2>
      <p>On vient de créer votre espace client et un nouveau projet : <strong>${escapeHtml(projectTitle)}</strong>.</p>
      <p>Pour accéder à votre espace et définir votre mot de passe, cliquez ici :</p>
      <p><a href="${inviteUrl}" target="_blank" rel="noopener">Configurer mon accès</a></p>
      <p>Une fois connecté(e), vous serez redirigé(e) vers votre espace : /dashboard.</p>
    </div>
  `;
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Bienvenue — accès à votre espace',
    html,
  });
}

export async function sendExistingUserProjectEmail(params: {
  to: string;
  fullName?: string;
  projectTitle: string;
  dashboardUrl: string; // APP_URL + /dashboard
}) {
  const { to, fullName, projectTitle, dashboardUrl } = params;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,sans-serif">
      <h2>Bonjour${fullName ? `, ${fullName}` : ''} 👋</h2>
      <p>Un nouveau projet a été créé sur votre espace : <strong>${escapeHtml(projectTitle)}</strong>.</p>
      <p>Accéder à votre tableau de bord :</p>
      <p><a href="${dashboardUrl}" target="_blank" rel="noopener">Ouvrir mon espace</a></p>
    </div>
  `;
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Nouveau projet disponible',
    html,
  });
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[m]!
  );
}
