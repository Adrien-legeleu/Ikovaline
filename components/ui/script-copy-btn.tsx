// components/ui/script-copy-btn.tsx
'use client';

import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ScriptCopyBtnProps {
  commandMap: Record<string, string>;
  className?: string;
}

export default function ScriptCopyBtn({
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const [copied, setCopied] = useState(false);
  const label = Object.keys(commandMap)[0];
  const value = commandMap[label];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-row items-center justify-center gap-2 py-2',
        className
      )}
    >
      <pre className="rounded-3xl border  border-black/[0.02] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(240,245,252,0.5))] px-4 py-3 text-sm text-neutral-800 dark:border-white/5 dark:bg-[linear-gradient(135deg,rgba(10,14,20,0.92),rgba(10,14,20,0.6))] dark:text-neutral-200">
        {value}
      </pre>
      <button
        onClick={copyToClipboard}
        className="h-11 rounded-3xl border border-white/10 bg-white/80 px-5 font-semibold text-neutral-800 backdrop-blur-xl dark:border-white/5 dark:bg-neutral-900/60 dark:text-neutral-100"
        aria-label={copied ? 'Copié' : 'Copier'}
      >
        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
      </button>
    </div>
  );
}
