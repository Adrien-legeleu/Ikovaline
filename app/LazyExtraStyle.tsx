"use client";

import { useEffect } from "react";

export default function LazyExtraStyle() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/extra.css"; // Le chemin est relatif à `public/` !
    link.type = "text/css";
    link.media = "all";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Nettoyage si besoin
    };
  }, []);

  return null;
}
