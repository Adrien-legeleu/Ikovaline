// app/(public)/layout.tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-[100dvh]">{children}</main>;
}
