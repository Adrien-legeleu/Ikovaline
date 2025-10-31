// components/Chat/TypingIndicator.tsx
'use client';

export default function TypingIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="text-xs text-muted-foreground px-2 py-1">
      L’équipe Ikovaline est en train d’écrire…
    </div>
  );
}
