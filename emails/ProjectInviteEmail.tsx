import * as React from 'react';

export default function ProjectInviteEmail({
  title,
  inviteUrl,
  clientName,
}: {
  title: string;
  inviteUrl: string;
  clientName?: string;
}) {
  return (
    <div
      style={{ fontFamily: 'ui-sans-serif, -apple-system, Segoe UI, Roboto' }}
    >
      <div style={{ padding: 24, background: '#f6f7f9' }}>
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            background: 'white',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 12px 32px rgba(0,0,0,.06)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20 }}>
            {clientName ? `Bonjour ${clientName},` : 'Bonjour,'}
          </h2>
          <p style={{ color: '#6b7280', marginTop: 8 }}>
            Votre espace client Ikovaline est prêt. Nous venons de créer le
            projet&nbsp;
            <strong>{title}</strong>.
          </p>
          <p style={{ color: '#6b7280' }}>
            Pour définir votre mot de passe et accéder à votre tableau de bord,
            cliquez ici :
          </p>

          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <a
              href={inviteUrl}
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                borderRadius: 14,
                background: 'black',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Accéder à mon espace
            </a>
          </div>

          <p style={{ color: '#9ca3af', fontSize: 12 }}>
            Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre
            navigateur :
            <br />
            <span style={{ color: '#111827' }}>{inviteUrl}</span>
          </p>
        </div>
        <p
          style={{
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: 12,
            marginTop: 16,
          }}
        >
          Ikovaline • Service client
        </p>
      </div>
    </div>
  );
}
