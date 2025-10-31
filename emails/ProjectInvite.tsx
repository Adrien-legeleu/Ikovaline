import * as React from 'react';

export default function ProjectInviteEmail({
  projectTitle,
  inviteeEmail,
  role,
  ctaUrl,
}: {
  projectTitle: string;
  inviteeEmail: string;
  role: 'dev' | 'lead_dev' | 'design' | 'pm' | 'seo' | 'video';
  ctaUrl: string;
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Inter, Arial, sans-serif',
          background: '#0e1116',
        }}
      >
        <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
          <tbody>
            <tr>
              <td style={{ padding: '32px 0' }}>
                <table
                  width="100%"
                  style={{
                    maxWidth: 560,
                    margin: '0 auto',
                    background: '#ffffff',
                    borderRadius: 24,
                    padding: 24,
                  }}
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: 8 }}>
                        <div
                          style={{
                            fontSize: 12,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            color: '#64748b',
                          }}
                        >
                          Invitation de projet
                        </div>
                        <h1
                          style={{
                            margin: '8px 0 0',
                            fontSize: 22,
                            lineHeight: '28px',
                          }}
                        >
                          Rejoindre « {projectTitle} »
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          paddingTop: 16,
                          color: '#334155',
                          fontSize: 14,
                          lineHeight: '22px',
                        }}
                      >
                        Bonjour {inviteeEmail},
                        <br />
                        <br />
                        Vous avez été invité(e) à rejoindre le projet{' '}
                        <strong>{projectTitle}</strong> sur Ikovaline en tant
                        que <strong>{role}</strong>.
                      </td>
                    </tr>

                    <tr>
                      <td style={{ paddingTop: 20 }}>
                        <a
                          href={ctaUrl}
                          style={{
                            display: 'inline-block',
                            background: '#3b82f6',
                            color: '#fff',
                            padding: '12px 16px',
                            borderRadius: 12,
                            fontSize: 14,
                            textDecoration: 'none',
                            boxShadow: '0 12px 24px rgba(59,130,246,0.35)',
                          }}
                        >
                          Ouvrir mon espace projet
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          paddingTop: 16,
                          color: '#64748b',
                          fontSize: 12,
                          lineHeight: '20px',
                        }}
                      >
                        Si le bouton ne fonctionne pas, copiez-collez ce lien
                        dans votre navigateur :
                        <br />
                        <span style={{ wordBreak: 'break-all' }}>{ctaUrl}</span>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          paddingTop: 24,
                          color: '#94a3b8',
                          fontSize: 12,
                        }}
                      >
                        — L’équipe Ikovaline
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    color: '#94a3b8',
                    fontSize: 12,
                  }}
                >
                  © {new Date().getFullYear()} Ikovaline — Tous droits réservés
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
