// emails/PricingInquiryEmail.tsx
import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

type InquiryEmailProps = {
  firstName: string;
  email: string;
  tel: string;
  message?: string;
  summary: {
    tierId: string;
    tierName: string;
    priceLabel: string; // "1200€ TTC" | "4000€ TTC (+options …)" | "Sur devis"
    delayDays: number;
    options: { id: string; label: string; price: number }[];
    optionsTotal: number;
    adsBudget: number;
    totals: { base: number; grandTotal: number };
    kpi: {
      traffic: [number, number];
      convRate: [number, number];
      leads: [number, number];
    };
    createdAtISO: string;
  };
};

export default function PricingInquiryEmail(props: InquiryEmailProps) {
  const { firstName, email, tel, message, summary } = props;
  return (
    <Html>
      <Head />
      <Preview>Nouvelle demande d’offre — {summary.tierName}</Preview>
      <Body
        style={{
          background: '#f6f7fb',
          fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto',
        }}
      >
        <Container
          style={{ background: '#fff', padding: '24px', borderRadius: 12 }}
        >
          <Heading as="h2">
            Nouvelle demande d’offre — {summary.tierName}
          </Heading>
          <Text>
            <b>Prénom :</b> {firstName}
          </Text>
          <Text>
            <b>Email :</b> {email}
          </Text>
          <Text>
            <b>Téléphone :</b> {tel}
          </Text>
          {message ? (
            <Text>
              <b>Message :</b> {message}
            </Text>
          ) : null}
          <Hr />
          <Heading as="h3">Configuration</Heading>
          <Text>
            <b>Offre :</b> {summary.tierName} ({summary.tierId})
          </Text>
          <Text>
            <b>Prix :</b> {summary.priceLabel}
          </Text>
          <Text>
            <b>Délai estimé :</b> ~{summary.delayDays} jours
          </Text>
          <Text>
            <b>Budget pub mensuel :</b>{' '}
            {summary.adsBudget.toLocaleString('fr-FR')}€
          </Text>
          <Text>
            <b>Options ({summary.options.length}) :</b>
          </Text>
          {summary.options.length ? (
            <ul>
              {summary.options.map((o) => (
                <li key={o.id}>
                  {o.label} — {o.price.toLocaleString('fr-FR')}€
                </li>
              ))}
            </ul>
          ) : (
            <Text>—</Text>
          )}
          <Text>
            <b>Total options :</b>{' '}
            {summary.optionsTotal.toLocaleString('fr-FR')}€
          </Text>
          <Text>
            <b>Total estimé :</b>{' '}
            {summary.totals.grandTotal.toLocaleString('fr-FR')}€ TTC
          </Text>
          <Hr />
          <Heading as="h3">KPIs estimatifs</Heading>
          <Text>
            <b>Trafic :</b> {summary.kpi.traffic[0]} – {summary.kpi.traffic[1]}{' '}
            /mois
          </Text>
          <Text>
            <b>Conv. :</b> {summary.kpi.convRate[0]}% –{' '}
            {summary.kpi.convRate[1]}%
          </Text>
          <Text>
            <b>Leads :</b> {summary.kpi.leads[0]} – {summary.kpi.leads[1]} /mois
          </Text>
          <Hr />
          <Text style={{ color: '#888' }}>
            Créé le {new Date(summary.createdAtISO).toLocaleString('fr-FR')}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
