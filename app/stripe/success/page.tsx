'use client';

import { useEffect } from 'react';

export default function StripeSuccessPage() {
  useEffect(() => {
    try {
      // informe la fenêtre parente
      window.opener?.postMessage(
        { type: 'STRIPE_SUCCESS' },
        window.location.origin
      );
    } catch {}
    // ferme la popup après un mini délai
    const t = setTimeout(() => window.close(), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui',
      }}
    >
      Paiement validé, fermeture…
    </div>
  );
}
