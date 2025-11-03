'use client';
import { ThemeLockLight } from '@/components/ThemeLock';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100dvh] bg-white text-neutral-900 [color-scheme:light]">
      <ThemeLockLight />
      {children}
    </main>
  );
}
