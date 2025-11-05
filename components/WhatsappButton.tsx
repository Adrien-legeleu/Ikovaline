'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { IconBrandWhatsapp } from '@tabler/icons-react';

type Props = {
  message?: string;
  label?: string;
  className?: string;
};

export default function WhatsAppButton({
  message = 'Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?',
  label = 'Nous contacter sur WhatsApp',
  className = '',
}: Props) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const pathname = usePathname();

  const href = useMemo(() => {
    if (!number) return null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const page = origin && pathname ? `${origin}${pathname}` : '';
    const text = page ? `${message}\n\nDepuis la page : ${page}` : message;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${number}?text=${encoded}`;
  }, [message, number, pathname]);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={[
        'z-50 inline-flex items-center gap-2 !rounded-3xl px-4 py-2 shadow-lg',
        'bg-[#25D366] text-white hover:opacity-90 active:scale-[0.98]',
        'transition will-change-transform',
        'focus:outline-none focus:ring-2 focus:ring-white/70',
        className,
      ].join(' ')}
    >
      <IconBrandWhatsapp className="h-5 w-5" />
      {/* Texte VISIBLE du lien */}
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}
