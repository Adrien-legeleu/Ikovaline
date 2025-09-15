'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { IconBrandWhatsapp } from '@tabler/icons-react';

type Props = {
  message?: string; // message par défaut (tu peux override)
  label?: string; // libellé du bouton
  className?: string; // styles supplémentaires
};

export default function WhatsAppButton({
  message = 'Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?',
  label = 'WhatsApp',
  className = '',
}: Props) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const pathname = usePathname();

  // Sécurité: numéro requis
  if (!number) {
    return;
  }

  // Message enrichi: ajoute l’URL courante pour le contexte
  const href = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const page = origin && pathname ? `${origin}${pathname}` : '';
    const text = page ? `${message}` : message;

    // wa.me attend un numéro sans + et le paramètre text encodé
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${number}?text=${encoded}`;
  }, [message, number, pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className={[
        ' z-50',
        'inline-flex items-center gap-1 rounded-xl px-4 py-2 shadow-lg',
        'bg-[#25D366] text-white hover:opacity-90 active:scale-[0.98]',
        'transition will-change-transform',
        'focus:outline-none focus:ring-2 focus:ring-white/70',
        className,
      ].join(' ')}
    >
      <IconBrandWhatsapp className="h-6 xl:h-6 " />
      <span className="text-base font-semibold">{label}</span>
    </a>
  );
}
