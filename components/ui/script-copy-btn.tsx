"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
        "mx-auto w-full flex-row  py-2 flex items-center gap-2 justify-center text-center",
        className
      )}
    >
      <pre className="text-base bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 py-3 text-neutral-800 dark:text-neutral-200">
        {value}
      </pre>
      <Button
        onClick={copyToClipboard}
        className="py-4 h-full px-3  rounded-2xl"
        variant="outline"
        aria-label={copied ? "Copié" : "Copier"}
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </Button>
    </div>
  );
}
