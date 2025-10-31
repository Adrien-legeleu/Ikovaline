// emails/ProjectConfigEmail.tsx
import * as React from 'react';

type ProjectConfigEmailProps = {
  categoryLabel: string;
  tierLabel: string;
  options: { label: string; qty?: number; price?: number }[];
  adsBudget: number;
  totalTTC: number;
  delayDays: number;
  kpi: {
    visitorsMid: number;
    convMid: number;
    convLabel: string;
    convRatePct: string;
  };
};

export function ProjectConfigEmail({
  categoryLabel,
  tierLabel,
  options,
  adsBudget,
  totalTTC,
  delayDays,
  kpi,
}: ProjectConfigEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        backgroundColor: '#0f172a',
        color: '#fff',
        padding: '32px',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          backgroundColor: '#1e2537',
          borderRadius: '24px',
          padding: '24px 28px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '4px',
            }}
          >
            Nouvelle configuration
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: 1.3,
              color: '#fff',
            }}
          >
            {categoryLabel} — {tierLabel}
          </div>
        </div>

        {/* Bloc récap */}
        <div
          style={{
            backgroundColor: '#111726',
            borderRadius: '20px',
            padding: '16px 20px',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '20px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
            }}
          >
            <strong style={{ color: '#fff' }}>Budget pub :</strong>{' '}
            {adsBudget.toLocaleString('fr-FR')} €
            <br />
            <strong style={{ color: '#fff' }}>Total TTC estimé :</strong>{' '}
            {totalTTC.toLocaleString('fr-FR')} €
            <br />
            <strong style={{ color: '#fff' }}>Délai estimé :</strong> ~
            {delayDays} j
          </p>
        </div>

        {/* Options */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '8px',
            }}
          >
            Options choisies
          </div>
          {options.length === 0 ? (
            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Aucune option ajoutée
            </div>
          ) : (
            <ul
              style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {options.map((o, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#fff' }}>{o.label}</span>
                  {o.qty && o.qty > 1 ? ` x${o.qty}` : ''}
                  {typeof o.price === 'number'
                    ? ` (+${o.price.toLocaleString('fr-FR')}€)`
                    : ''}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* KPI */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '8px',
            }}
          >
            KPI estimés
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <div>
              <strong style={{ color: '#fff' }}>Visiteurs/mois :</strong> ~
              {kpi.visitorsMid.toLocaleString('fr-FR')}
            </div>
            <div>
              <strong style={{ color: '#fff' }}>{kpi.convLabel} :</strong> ~
              {kpi.convMid.toLocaleString('fr-FR')}
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Taux de conv :</strong> ~
              {kpi.convRatePct}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: '11px',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Email automatique envoyé par le simulateur Ikovaline.
        </div>
      </div>
    </div>
  );
}
