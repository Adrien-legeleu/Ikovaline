"use client";

import { useEffect } from "react";

// Étend window pour TypeScript
declare global {
  interface Window {
    tarteaucitron: any;
  }
}

export default function CookieConsent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/tarteaucitron/tarteaucitron.js";
    script.async = true;

    script.onload = () => {
      const tc = (window as any).tarteaucitron;

      if (tc) {
        console.log("✅ Tarteaucitron chargé");

        tc.init({
          privacyUrl: "/politique-confidentialite",
          orientation: "bottom",
          showAlertSmall: true,
          cookieslist: true,
          closePopup: false,
          removeCredit: true,
          moreInfoLink: true,
          useExternalCss: false,
          highPrivacy: true,
          acceptAllCta: true,
          denyAllCta: true,
          mandatory: false,
          handleBrowserDNTRequest: false,
          debug: true, // ← permet de tout voir dans la console
        });

        tc.job = tc.job || [];
        tc.job.push("youtube"); // 🔥 test simple pour forcer la bannière
      }
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
