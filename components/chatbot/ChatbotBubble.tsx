'use client';

import * as React from 'react';
import Image from 'next/image';
import { X, Send, Calendar, Mail, Info, BadgeCheck, Timer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import IkovalineLogo from '@/public/images/logo/ikovaline-logo.svg';
import IkovalineButtonFloating from './IkovaOrb';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';

type ChatMsg = { id: string; role: 'user' | 'bot' | 'error'; text: string };

const ASSISTANT_NAME = 'IkovalineTalk';
const MIN_THINKING_MS = 600;
const CHAR_INTERVAL_MS = 18;

const SUGGESTIONS = [
  'Je veux une landing page pour une offre',
  'Refonte vitrine + SEO local',
  'E-commerce : paiement + logistique',
  'Tunnel de vente pour capter des leads',
  'SaaS / App avec abonnement Stripe',
];

// ================== iOS helpers ==================

// CSS minimal pour neutraliser le zoom texte iOS sans tuer l’accessibilité
function IOSNoZoomCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@supports (-webkit-touch-callout: none) {
  #ikova-chat { -webkit-text-size-adjust: 100%; touch-action: manipulation; }
  #ikova-chat input, #ikova-chat textarea, #ikova-chat select {
    font-size: 16px !important; line-height: 1.25 !important;
    -webkit-tap-highlight-color: transparent;
  }
}
`,
      }}
    />
  );
}

// Bloque le scroll du body quand le Drawer mobile est ouvert (iOS friendliness)
function useBodyScrollLock(active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);
}

// Ajoute/retire temporairement maximum-scale=1 pendant la saisie (fallback iOS têtu)
function useIOSViewportGuard(active: boolean) {
  React.useEffect(() => {
    if (!active) return;
    const isIOS = /iP(hone|ad|od)/i.test(navigator.userAgent);
    if (!isIOS) return;

    const meta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement | null;
    if (!meta) return;
    const original = meta.getAttribute('content') || '';

    const disableZoom = () => {
      if (meta.getAttribute('data-ikova-locked') === '1') return;
      meta.setAttribute('data-ikova-locked', '1');
      const hasMax = /maximum-scale/i.test(original);
      const next = hasMax
        ? original.replace(/maximum-scale=\d(\.\d)?/i, 'maximum-scale=1')
        : `${original}, maximum-scale=1`;
      const withNoUserScale = /user-scalable=/i.test(next)
        ? next.replace(/user-scalable=\w+/i, 'user-scalable=no')
        : `${next}, user-scalable=no`;
      meta.setAttribute('content', withNoUserScale);
    };
    const enableZoom = () => {
      meta.setAttribute('data-ikova-locked', '0');
      meta.setAttribute('content', original);
    };

    const root = document.getElementById('ikova-chat');
    if (!root) return;

    const onFocusIn = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (
        t.tagName === 'INPUT' ||
        t.tagName === 'TEXTAREA' ||
        t.getAttribute('contenteditable') === 'true'
      ) {
        disableZoom();
      }
    };
    const onFocusOut = () => {
      // petit délai pour ne pas flasher si focus saute sur le bouton "Envoyer"
      setTimeout(enableZoom, 120);
    };

    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    return () => {
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      enableZoom();
    };
  }, [active]);
}

// Media query hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// ================== Component ==================

export default function ChatbotBubble() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // ouverture + mode
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'desktop' | 'mobile' | null>(null);
  const openChat = React.useCallback(() => {
    setMode(isDesktop ? 'desktop' : 'mobile');
    setOpen(true);
  }, [isDesktop]);
  const closeChat = React.useCallback(() => {
    setOpen(false);
    setTimeout(() => setMode(null), 180);
  }, []);

  // chat state
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const typingTimer = React.useRef<number | null>(null);
  const didIntro = React.useRef(false);
  const [autoFollow, setAutoFollow] = React.useState(true);

  // iOS guards actifs uniquement quand le Drawer mobile est ouvert
  useBodyScrollLock(open && mode === 'mobile');
  useIOSViewportGuard(open && mode === 'mobile');

  const stopKeyBubble = React.useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
  }, []);

  // Focus: desktop = auto ; mobile = jamais auto (laisse l’utilisateur tapoter → évite zoom)
  React.useEffect(() => {
    if (!open) return;
    if (mode === 'desktop') {
      requestAnimationFrame(() =>
        inputRef.current?.focus({ preventScroll: true })
      );
    }
  }, [open, mode]);

  // Intro 1x
  React.useEffect(() => {
    if (!open || didIntro.current || messages.length > 0) return;
    const intro =
      `Bonjour, je suis **${ASSISTANT_NAME}**.\n\n` +
      `Décrivez votre projet (landing, vitrine, e-commerce, tunnel, SaaS) et je vous donne une **estimation budget + délai**.`;
    const id = crypto.randomUUID();
    setMessages([{ id, role: 'bot', text: '' }]);
    startTyping(intro, id);
    didIntro.current = true;
  }, [open]); // eslint-disable-line

  // Auto scroll
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setAutoFollow(scrollTop + clientHeight >= scrollHeight - 24);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(() => {
    if (!autoFollow) return;
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() =>
      el.scrollTo({ top: el.scrollHeight, behavior: 'auto' })
    );
  }, [messages, isThinking, isTyping, autoFollow]);

  React.useEffect(
    () => () => {
      if (typingTimer.current) window.clearInterval(typingTimer.current);
    },
    []
  );

  function startTyping(fullText: string, targetId: string) {
    if (typingTimer.current) window.clearInterval(typingTimer.current);
    setIsTyping(true);
    let i = 0;
    typingTimer.current = window.setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === targetId ? { ...m, text: fullText.slice(0, i) } : m
        )
      );
      if (i >= fullText.length) {
        if (typingTimer.current) {
          window.clearInterval(typingTimer.current);
          typingTimer.current = null;
        }
        setIsTyping(false);
      }
    }, CHAR_INTERVAL_MS);
  }

  async function sendMessage(payload?: string) {
    const text = (payload ?? input).trim();
    if (!text) return;
    setInput('');

    const userId = crypto.randomUUID();
    const botId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: userId, role: 'user', text },
      { id: botId, role: 'bot', text: '' },
    ]);

    try {
      setIsThinking(true);
      const fetchPromise = (async () => {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        if (!res.ok || data.error)
          throw new Error(data.error || 'Erreur interne');
        return (data.reply as string) ?? 'Aucune réponse.';
      })();
      const delayPromise = new Promise((r) => setTimeout(r, MIN_THINKING_MS));
      const [reply] = (await Promise.all([fetchPromise, delayPromise])) as [
        string,
        unknown,
      ];

      setIsThinking(false);
      startTyping(reply, botId);
    } catch (err: any) {
      setIsThinking(false);
      setIsTyping(false);
      if (typingTimer.current) {
        window.clearInterval(typingTimer.current);
        typingTimer.current = null;
      }
      setMessages((prev) =>
        prev.map((m) =>
          m.role === 'bot' && m.text === ''
            ? { ...m, role: 'error', text: err?.message || 'Erreur serveur' }
            : m
        )
      );
    } finally {
      // Desktop : on rend le focus, Mobile : on laisse l’utilisateur cliquer
      if (mode === 'desktop') {
        requestAnimationFrame(() =>
          inputRef.current?.focus({ preventScroll: true })
        );
      }
    }
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    stopKeyBubble(e);
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // UI sections
  const Suggestions = () => (
    <div className="flex flex-col items-start py-2 gap-2 select-none">
      <div className="inline-flex items-center gap-2 rounded-[3rem] px-3 py-1.5 text-[12px] bg-black/[0.04] dark:bg-neutral-900/70 ring-1 ring-black/5 dark:ring-white/5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
        Suggestions
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="rounded-[3rem] px-3 py-1.5 text-[11px] bg-white/60 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-100 ring-1 ring-black/[0.02] dark:ring-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/90 dark:hover:bg-neutral-900/85"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );

  const MessagesList = () => (
    <>
      {messages.map((m) => {
        const isUser = m.role === 'user';
        const isError = m.role === 'error';
        return (
          <div
            key={m.id}
            className={`max-w-[92%] px-4 py-2 rounded-[2rem] shadow-sm whitespace-pre-wrap leading-relaxed transition-colors ${
              isUser
                ? 'ml-auto bg-primary text-white'
                : isError
                  ? 'mr-auto bg-red-100 text-red-700 dark:bg-red-900/25 dark:text-red-200'
                  : 'mr-auto bg-white/80 text-neutral-900 dark:bg-neutral-900/70 dark:text-neutral-50'
            }`}
          >
            {m.role === 'bot' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: (props) => (
                    <h2
                      {...props}
                      className="mt-2 mb-2 text-[13px] font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300"
                    />
                  ),
                  h3: (props) => (
                    <h3
                      {...props}
                      className="mt-2 mb-2 text-[13px] font-semibold text-neutral-800 dark:text-neutral-200"
                    />
                  ),
                  p: (props) => (
                    <p {...props} className="mb-2 leading-[1.55]" />
                  ),
                  ul: (props) => (
                    <ul {...props} className="mb-2 ml-4 list-disc space-y-1" />
                  ),
                  ol: (props) => (
                    <ol
                      {...props}
                      className="mb-2 ml-4 list-decimal space-y-1"
                    />
                  ),
                  li: (props) => <li {...props} className="mb-0.5" />,
                  a: (props) => (
                    <a
                      {...props}
                      className="underline underline-offset-2 decoration-primary/50 hover:opacity-80 text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  hr: () => (
                    <div className="my-3 h-px bg-gradient-to-r from-transparent via-neutral-200/70 to-transparent dark:via-white/10" />
                  ),
                  code: ({ children, ...props }) => (
                    <code
                      {...props}
                      className="rounded-md bg-neutral-900 text-white px-1.5 py-0.5 text-[11px]"
                    >
                      {children}
                    </code>
                  ),
                }}
              >
                {m.text}
              </ReactMarkdown>
            ) : (
              m.text
            )}
          </div>
        );
      })}
      {(isThinking || isTyping) && (
        <div className="mr-auto bg-white/70 dark:bg-neutral-900/70 rounded-[3rem] px-3 py-2 text-[11px] text-neutral-700 dark:text-neutral-200 shadow-sm">
          {isThinking ? 'IkovalineTalk réfléchit…' : 'IkovalineTalk écrit…'}
        </div>
      )}
    </>
  );

  const CTAButtons = () => (
    <div className="px-5 pb-3 pt-1 flex gap-2 select-none">
      <a
        href="https://calendly.com/florent-ghizzoni/meeting?month=2025-11"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-[3rem] bg-primary text-white px-4 py-2.5 font-medium text-[13px] ring-1 ring-primary/40 hover:brightness-[1.05] transition"
      >
        <Calendar size={14} /> RDV 30 min
      </a>
      <a
        href="https://ikovaline.com/contact"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-[3rem] bg-white/80 dark:bg-neutral-900/70 text-neutral-900 dark:text-neutral-50 px-4 py-2.5 font-medium text-[13px] ring-1 ring-black/[0.02] dark:ring-white/[0.04] hover:bg-white/90 dark:hover:bg-neutral-900/85 transition"
      >
        <Mail size={14} /> Nous écrire
      </a>
    </div>
  );

  // NOTE: input mobile = text-[16px] (pour tuer le zoom iOS), desktop redescend en md:
  const InputBarDesktop = () => (
    <div className="px-5 pb-4">
      <div className="flex items-center bg-white/90 dark:bg-neutral-900/80 rounded-[3rem] px-3 py-3 min-h-[48px] ring-1 ring-black/[0.02] dark:ring-white/[0.02] shadow-lg shadow-black/5">
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none leading-6 text-[16px] md:text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          placeholder="Décrivez votre projet…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
          autoComplete="on"
          autoCorrect="on"
          autoCapitalize="sentences"
          enterKeyHint="send"
          inputMode="text"
          spellCheck
        />
        <button
          disabled={!input.trim()}
          onClick={() => sendMessage()}
          className="ml-2 rounded-full bg-primary text-white p-2 hover:opacity-95 transition disabled:opacity-40"
          aria-label="Envoyer"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );

  const InputBarMobile = () => (
    <div className="px-5 pb-4">
      <div className="flex items-center bg-white/90 dark:bg-neutral-900/80 rounded-[3rem] px-3 py-3 min-h-[48px] ring-1 ring-black/[0.02] dark:ring-white/[0.02] shadow-lg shadow-black/5">
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none leading-6 text-[16px] placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          placeholder="Décrivez votre projet…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onInputKeyDown}
          autoComplete="on"
          autoCorrect="on"
          autoCapitalize="sentences"
          enterKeyHint="send"
          inputMode="text"
          spellCheck
        />
        <button
          disabled={!input.trim()}
          onClick={() => sendMessage()}
          className="ml-2 rounded-full bg-primary text-white p-2 hover:opacity-95 transition disabled:opacity-40"
          aria-label="Envoyer"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );

  // --------- RENDER ----------
  return (
    <>
      <IOSNoZoomCSS />
      <div id="ikova-chat">
        <IkovalineButtonFloating onClick={openChat} hidden={open} />

        {/* Desktop: Dialog */}
        <Dialog
          open={open && mode === 'desktop'}
          onOpenChange={(v) => (v ? setOpen(true) : closeChat())}
        >
          <DialogContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="p-0 outline-none border-0 bg-white/95 dark:bg-neutral-950/90 backdrop-blur-2xl text-neutral-900 dark:text-neutral-50 rounded-[2rem] sm:rounded-[3rem] w-[94vw] max-w-[500px] h-[75vh] max-h-[760px] overflow-hidden"
          >
            <DialogHeader className="px-5 py-3 border-b border-black/5 dark:border-white/5 bg-white/60 dark:bg-neutral-950/70 select-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl grid place-items-center bg-white/90 dark:bg-neutral-900/70 ring-1 ring-black/[0.02] dark:ring-white/[0.02] overflow-hidden">
                    <Image
                      src={IkovalineLogo}
                      alt="Ikovaline"
                      className="object-contain w-full h-full"
                      priority
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <DialogTitle className="text-sm font-semibold tracking-tight">
                      IkovalineTalk
                    </DialogTitle>
                    <DialogDescription className="text-[11px] text-neutral-600 dark:text-neutral-400">
                      Assistant projet — estimation rapide
                    </DialogDescription>
                  </div>
                </div>
                <DialogClose asChild>
                  <button
                    className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-neutral-900/70"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </DialogClose>
              </div>

              {/* Badges */}
              <div className="pt-3 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-2 text-[9px] sm:text-[11px] bg-blue-100 dark:bg-blue-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-blue-200/70 dark:ring-blue-900">
                  <BadgeCheck size={12} /> 20+ projets
                </span>
                <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-2 text-[9px] sm:text-[11px] bg-sky-100 dark:bg-sky-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-sky-200/70 dark:ring-sky-900">
                  <Info size={12} /> 67+ avis
                </span>
                <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-2 text-[9px] sm:text-[11px] bg-green-100 dark:bg-green-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-green-200/70 dark:ring-green-900">
                  <Timer size={12} /> ~30j
                </span>
              </div>
            </DialogHeader>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-3 space-y-3 text-sm [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.25)_transparent] dark:[scrollbar-color:rgba(255,255,255,.25)_transparent]"
              onKeyDownCapture={stopKeyBubble}
            >
              {messages.length <= 1 && <Suggestions />}
              <MessagesList />
            </div>

            <div className="select-none">
              <CTAButtons />
            </div>
            <InputBarDesktop />
          </DialogContent>
        </Dialog>

        {/* Mobile: Drawer */}
        <Drawer
          open={open && mode === 'mobile'}
          onOpenChange={(v) => (v ? setOpen(true) : closeChat())}
        >
          <DrawerContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="z-[999999] border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl"
          >
            <DrawerHeader className="pb-2 select-none">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl grid place-items-center bg-white/90 dark:bg-neutral-900/70 ring-1 ring-black/[0.04] dark:ring-white/[0.06]">
                    <Image
                      src={IkovalineLogo}
                      alt="Ikovaline"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start leading-tight">
                    <DrawerTitle className="text-base">
                      IkovalineTalk
                    </DrawerTitle>
                    <DrawerDescription className="text-xs">
                      Assistant projet, estimation rapide
                    </DrawerDescription>
                  </div>
                </div>
                <DrawerClose asChild>
                  <button
                    aria-label="Fermer"
                    className="rounded-xl p-2 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <X size={16} />
                  </button>
                </DrawerClose>
              </div>

              {/* Badges */}
              <div className="px-1 pt-3 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 rounded-[2rem] px-3 py-1.5 text-[11px] bg-blue-100 dark:bg-blue-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-blue-200/70 dark:ring-blue-900">
                  <BadgeCheck size={12} /> 20+ projets
                </span>
                <span className="inline-flex items-center gap-1 rounded-[2rem] px-3 py-1.5 text-[11px] bg-sky-100 dark:bg-sky-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-sky-200/70 dark:ring-sky-900">
                  <Info size={12} /> 67+ avis
                </span>
                <span className="inline-flex items-center gap-1 rounded-[2rem] px-3 py-1.5 text-[11px] bg-green-100 dark:bg-green-950 text-neutral-800 dark:text-neutral-100 ring-1 ring-green-200/70 dark:ring-green-900">
                  <Timer size={12} /> ~30j
                </span>
              </div>
            </DrawerHeader>

            <div
              ref={scrollRef}
              className="max-h-[40vh] overflow-y-auto px-4 pb-2 space-y-3 text-sm [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.25)_transparent] dark:[scrollbar-color:rgba(255,255,255,.25)_transparent]"
              onKeyDownCapture={stopKeyBubble}
            >
              {messages.length <= 1 && <Suggestions />}
              <MessagesList />
            </div>

            <DrawerFooter className="pt-2 gap-0">
              <CTAButtons />
              <InputBarMobile />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
