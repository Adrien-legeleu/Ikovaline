'use client';
import { ThemeLockLight } from '@/components/ThemeLock';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-dvh bg-white text-neutral-900 [color-scheme:light]">
      <ThemeLockLight />
      {children}
    </div>
  );
}
