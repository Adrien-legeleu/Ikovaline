'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { LiquidLink } from './liquid-link';
import { LiquidButton } from './liquid-glass-button';

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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'mx-auto w-full flex-row  py-2 flex items-center gap-2 justify-center text-center',
        className
      )}
    >
      <pre className="text-base dark:bg-[linear-gradient(135deg,rgba(10,14,20,0.92),rgba(10,14,20,0.58))] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(240,245,252,0.42))] border border-black/10 dark:border-white/5 rounded-3xl px-4 py-3 text-neutral-800 dark:text-neutral-200">
        {value}
      </pre>
      <LiquidButton
        className="!px-5 !py-4 !h-full"
        onClick={copyToClipboard}
        aria-label={copied ? 'Copié' : 'Copier'}
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </LiquidButton>
    </div>
  );
}
