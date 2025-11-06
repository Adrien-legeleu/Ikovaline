'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import {
  X,
  Send,
  Calendar,
  Mail,
  Info,
  BadgeCheck,
  Timer,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Home,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import IkovalineLogo from '@/public/images/logo/ikovaline-logo.svg';
import IkovalineButtonFloating from './IkovaOrb';

type ChatMsg = {
  id?: string;
  role: 'user' | 'bot' | 'error';
  text: string;
  feedback?: 'up' | 'down';
  rich?: any; // <- payload structuré
};

const ASSISTANT_NAME = 'IkovalineTalk';
const MIN_THINKING_MS = 900;
const CHAR_INTERVAL_MS = 18;

const SUGGESTIONS = [
  'Je veux une landing page pour une offre',
  'Refonte vitrine + SEO local',
  'E-commerce : paiement + logistique',
  'Tunnel de vente pour capter des leads',
  'SaaS / App avec abonnement Stripe',
];

type Mode = 'home' | 'chat';

export default function ChatbotBubble() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>('home');

  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = React.useRef<number | null>(null);
  const didIntro = React.useRef(false);

  // session (backend)
  const sessionIdRef = React.useRef<string | null>(null);

  // auto-follow scroll
  const [autoFollow, setAutoFollow] = React.useState(true);
  const AUTOFOLLOW_EPS = 24;

  // envoi feedback en cours (désactive les boutons)
  const [sendingFeedbackId, setSendingFeedbackId] = React.useState<
    string | null
  >(null);

  // ===== scroll container auto-follow (pour la vue chat uniquement)
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atBottom =
        scrollTop + clientHeight >= scrollHeight - AUTOFOLLOW_EPS;
      setAutoFollow(atBottom);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // ===== Dynamic-Island (open/scroll)
  const scaleX = useMotionValue(0.96);
  const scaleY = useMotionValue(0.96);
  const y = useMotionValue(32);

  const sX = useSpring(scaleX, { stiffness: 260, damping: 22, mass: 0.85 });
  const sY = useSpring(scaleY, { stiffness: 260, damping: 22, mass: 0.85 });
  const sYpos = useSpring(y, { stiffness: 260, damping: 22, mass: 0.85 });

  React.useEffect(() => {
    if (open) {
      scaleX.set(1.08);
      scaleY.set(0.92);
      y.set(0);
      requestAnimationFrame(() => {
        scaleX.set(1);
        scaleY.set(1);
      });
    } else {
      scaleX.set(0.96);
      scaleY.set(0.96);
      y.set(32);
      setMode('home');
    }
  }, [open, scaleX, scaleY, y]);

  React.useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - last;
      last = window.scrollY;
      const k = Math.max(-16, Math.min(16, -dy / 6));
      scaleX.set(1 + Math.abs(k) / 360);
      scaleY.set(1 - Math.abs(k) / 620);
      y.set(k * 0.35);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scaleX, scaleY, y]);

  // ===== Intro au premier open (message déjà prêt quand il passe en chat)
  React.useEffect(() => {
    if (!open || didIntro.current || messages.length > 0) return;
    const intro =
      `Bonjour, je suis **${ASSISTANT_NAME}**.\n\n` +
      `Décrivez votre projet (landing, vitrine, e-commerce, tunnel, SaaS) et je vous donne une **estimation budget + délai**.`;
    setMessages([{ role: 'bot', text: '' }]);
    requestAnimationFrame(() => {
      startTyping(intro, 0);
      didIntro.current = true;
    });
  }, [open, messages.length]);

  // auto-scroll down quand nouveaux messages (vue chat)
  React.useEffect(() => {
    if (mode !== 'chat') return;
    const el = scrollRef.current;
    if (!el || !autoFollow) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isThinking, isTyping, autoFollow, mode]);
  React.useEffect(() => {
    if (open) setAutoFollow(true);
  }, [open]);

  // cleanup typing interval
  React.useEffect(() => {
    return () => {
      if (typingIntervalRef.current)
        window.clearInterval(typingIntervalRef.current);
    };
  }, []);

  // ===== Typewriter
  const startTyping = (fullText: string, botIndex: number) => {
    if (typingIntervalRef.current)
      window.clearInterval(typingIntervalRef.current);
    let i = 0;
    setIsTyping(true);
    typingIntervalRef.current = window.setInterval(() => {
      i++;
      setMessages((prev) => {
        if (!prev[botIndex]) return prev;
        const arr = [...prev];
        arr[botIndex] = { ...arr[botIndex], text: fullText.slice(0, i) };
        return arr;
      });
      if (i >= fullText.length) {
        if (typingIntervalRef.current) {
          window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        setIsTyping(false);
      }
    }, CHAR_INTERVAL_MS);
  };

  // ===== Feedback
  async function sendFeedback(messageId: string, rating: 1 | -1, tag?: string) {
    try {
      setSendingFeedbackId(messageId);
      await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback: { messageId, rating, tags: tag ? [tag] : undefined },
        }),
      });
      setMessages((prev) => {
        const arr = [...prev];
        const i = arr.findIndex((m) => m.id === messageId);
        if (i >= 0)
          arr[i] = { ...arr[i], feedback: rating === 1 ? 'up' : 'down' };
        return arr;
      });
    } catch {
      // silencieux (option: toast)
    } finally {
      setSendingFeedbackId(null);
    }
  }

  // ===== Envoi message
  async function sendMessage(payload?: string) {
    const text = (payload ?? input).trim();
    if (!text || isThinking || isTyping) return;
    setInput('');
    setMode('chat');

    const botIndex = messages.length + 1;
    setIsThinking(true);
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'bot', text: '' },
    ]);

    try {
      const fetchPromise = (async () => {
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            sessionId: sessionIdRef.current,
            locale: navigator.language || 'fr-FR',
            pagePath:
              typeof window !== 'undefined' ? window.location.pathname : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            abBucket: 'A',
            promptVersion: 'v1',
          }),
        });

        const data = await res.json();
        if (!res.ok || data.error)
          throw new Error(data.error || 'Erreur interne');

        if (data.sessionId && !sessionIdRef.current) {
          sessionIdRef.current = data.sessionId;
        }

        return {
          reply: (data.reply as string) ?? 'Aucune réponse.',
          assistantMessageId: (data.assistantMessageId as string) || undefined,
        };
      })();

      const delayPromise = new Promise<void>((r) =>
        setTimeout(r, MIN_THINKING_MS)
      );
      await delayPromise;

      const { reply, assistantMessageId } = await fetchPromise;

      // Attacher l'ID pour le feedback
      if (assistantMessageId) {
        setMessages((prev) => {
          const arr = [...prev];
          if (arr[botIndex]?.role === 'bot') {
            arr[botIndex] = { ...arr[botIndex], id: assistantMessageId };
          }
          return arr;
        });
      }

      // ---- NO MORE RAW JSON TYPEWRITER ----
      setIsThinking(false);

      let rich: any = null;
      try {
        const t = reply.trim();
        if (t.startsWith('{') && t.endsWith('}')) rich = JSON.parse(t);
      } catch {}

      if (rich && rich.type === 'IkovalineRichAnswer') {
        // On stocke l'objet structuré et on ne tape aucun caractère
        setMessages((prev) => {
          const arr = [...prev];
          arr[botIndex] = { ...arr[botIndex], text: '', rich };
          return arr;
        });
      } else {
        // Fallback classique en Markdown avec typewriter
        startTyping(reply, botIndex);
      }
    } catch (err: any) {
      setIsThinking(false);
      setIsTyping(false);
      setMessages((prev) => {
        const arr = [...prev];
        arr[botIndex] = {
          role: 'error',
          text: err?.message || 'Erreur serveur',
        };
        return arr;
      });
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // ===== Variants
  const springIn: Transition = {
    type: 'spring',
    stiffness: 220,
    damping: 20,
    mass: 0.9,
  };
  const springOut: Transition = {
    type: 'spring',
    stiffness: 260,
    damping: 26,
    mass: 0.85,
  };

  const sheetVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: springIn },
    exit: {
      opacity: 0,
      scaleX: 0.94,
      scaleY: 1.06,
      y: 24,
      transition: springOut,
    },
  };

  const hasConversation = messages.length > 0;
  function RichAnswer({ data }: { data: any }) {
    const recs: Array<any> = Array.isArray(data?.recommendations)
      ? data.recommendations
      : [];
    const badges: Array<any> = Array.isArray(data?.badges) ? data.badges : [];
    const links: Array<any> = Array.isArray(data?.links) ? data.links : [];

    // Typewriter court sur le résumé
    const [typed, setTyped] = React.useState('');
    React.useEffect(() => {
      const s: string = data?.summary || '';
      let i = 0;
      const id = window.setInterval(() => {
        i++;
        setTyped(s.slice(0, i));
        if (i >= s.length) window.clearInterval(id);
      }, 12);
      return () => window.clearInterval(id);
    }, [data?.summary]);

    const toneClasses: Record<string, string> = {
      primary: 'bg-primary/12 text-primary',
      success: 'bg-green-500/12 text-green-700 dark:text-green-300',
      neutral:
        'bg-black/10 text-neutral-800 dark:bg-white/10 dark:text-neutral-100',
    };

    return (
      <div className="mr-auto w-full">
        {/* Badges au-dessus */}
        {!!badges.length && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <span
                key={i}
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] ${toneClasses[b.tone] || toneClasses.neutral}`}
              >
                {b.label}
              </span>
            ))}
          </div>
        )}

        {/* Titre */}
        {data?.title && (
          <div className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-50">
            {data.title}
          </div>
        )}

        {/* Résumé */}
        {typed && (
          <p className="mt-1 text-[13px] leading-[1.55] text-neutral-700 dark:text-neutral-200">
            {typed}
          </p>
        )}

        {/* Cartes offres (style exact de ta capture) */}
        {!!recs.length && (
          <div className="mt-3 grid grid-cols-1 gap-2">
            {recs.map((r, i) => (
              <div
                key={i}
                className="rounded-3xl bg-neutral-900 text-neutral-200 p-4 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[15px] font-medium">{r.label}</div>
                  <div className="flex items-center gap-2">
                    {typeof r.priceFrom === 'number' && (
                      <span className="text-sky-400 text-[13px] font-semibold">
                        dès ~{r.priceFrom.toLocaleString('fr-FR')}€
                      </span>
                    )}
                    {typeof r.delayDays === 'number' && (
                      <span className="inline-flex items-center justify-center rounded-full bg-neutral-800 px-2.5 py-1 text-[12px] text-neutral-200">
                        {r.delayDays} j
                      </span>
                    )}
                  </div>
                </div>

                {Array.isArray(r.bullets) && r.bullets.length > 0 && (
                  <ul className="mt-2 ml-4 list-disc space-y-1 text-[13px] text-neutral-300">
                    {r.bullets.slice(0, 4).map((b: string, j: number) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}

                <a
                  href={r.link || '/#simulator-root'}
                  className="mt-2 inline-block text-[13px] text-sky-400 underline underline-offset-2 hover:opacity-90"
                >
                  En savoir plus
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Liens d’action */}
        {!!links.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {links.map((l: any, i: number) => {
              const base =
                l.kind === 'primary'
                  ? 'bg-primary text-white'
                  : l.kind === 'ghost'
                    ? 'bg-white/80 dark:bg-neutral-900/70 text-neutral-900 dark:text-neutral-50'
                    : 'text-primary underline decoration-primary/50 underline-offset-2';
              return (
                <a
                  key={i}
                  href={l.url || '/#simulator-root'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full px-3 py-1.5 text-[12px] ${base}`}
                >
                  {l.label}
                </a>
              );
            })}
          </div>
        )}

        {data?.nextQuestion && (
          <div className="mt-3 text-[12px] text-neutral-600 dark:text-neutral-300">
            <span className="font-medium">Question :</span> {data.nextQuestion}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <IkovalineButtonFloating onClick={() => setOpen(true)} hidden={open} />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              className="fixed inset-0 z-[999998] bg-black/35 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Fermer la fenêtre"
            />

            {/* Sheet */}
            <motion.div
              style={{ translateY: sYpos, scaleX: sX, scaleY: sY }}
              className={`
                fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[999999]
                flex md:h-[85vh] h-[75vh] max-h-[800px] w-[94vw] max-w-[500px]
                overflow-hidden rounded-[3rem]
                shadow-[0_24px_70px_rgba(0,0,0,0.45)]
                backdrop-blur-2xl
                text-neutral-900 dark:text-neutral-50
                ${
                  mode === 'home'
                    ? ' bg-gradient-to-b from-[#1270ec] via-[#01B7FF] to-80% to-white dark:from-[#016fffb5] dark:via-[#01b7ffcc] dark:to-[#020202]'
                    : 'bg-white dark:bg-neutral-950'
                }
              `}
              variants={sheetVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="flex h-full w-full flex-col">
                {/* CONTENU PRINCIPAL */}
                <div
                  className="flex-1 flex overflow-y-auto flex-col"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {mode === 'home' ? (
                    <>
                      {/* HERO GRADIENT */}
                      <div className="px-6 pt-5 pb-6 text-white">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                              <Image
                                src={IkovalineLogo}
                                alt="Ikovaline"
                                className="object-cover w-7 h-7"
                                priority
                              />
                            </div>
                            <span className="text-xl font-extrabold tracking-widest mix-blend-overlay">
                              IkovalineTalk
                            </span>
                          </div>

                          <button
                            onClick={() => setOpen(false)}
                            className="rounded-full mix-blend-overlay p-2 hover:bg-black/10 transition"
                            aria-label="Fermer"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <p className="text-md font-bold mix-blend-overlay mix mb-1">
                          Bonjour,
                        </p>
                        <h2 className="text-2xl font-semibold mix-blend-overlay leading-snug">
                          Comment pouvons-nous
                          <br />
                          vous aider ?
                        </h2>
                        <p className="mt-3 text-sm font-bold mix-blend-overlay max-w-xs">
                          Décrivez votre besoin ou laissez IkovalineTalk vous
                          guider pour estimer budget et délai.
                        </p>
                      </div>

                      {/* PANNEAU BLANC */}
                      <div className="flex-1 rounded-t-[2.6rem] bg-white/96 dark:bg-neutral-950/98 px-5 pb-4 pt-4 shadow-[0_-18px_40px_rgba(0,0,0,0.22)]">
                        {/* Carte message */}
                        <button
                          onClick={() => setMode('chat')}
                          className="w-full mb-3 rounded-3xl bg-white dark:bg-neutral-900 px-4 py-3.5 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)] transition-shadow flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                              Envoyez-nous un message
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              IkovalineTalk vous répond tout de suite.
                            </p>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <MessageCircle size={16} />
                          </div>
                        </button>

                        {/* Carte RDV */}
                        <a
                          href="https://calendly.com/florent-ghizzoni/meeting?month=2025-11"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mb-4 rounded-3xl bg-white dark:bg-neutral-900 px-4 py-3.5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                                Prendre un rendez-vous
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                Un call de 30 min pour cadrer votre projet.
                              </p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center">
                              <Calendar size={16} />
                            </div>
                          </div>
                        </a>

                        {/* Section suggestions */}
                        <div className="mt-2 rounded-3xl bg-white dark:bg-neutral-900/80 px-3.5 py-3.5">
                          <div className="flex items-center justify-between mb-2.5">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                              Trouver une idée de projet
                            </p>
                            <Info className="h-4 w-4 text-neutral-400" />
                          </div>
                          <div className="space-y-1.5">
                            {SUGGESTIONS.map((s) => (
                              <button
                                key={s}
                                onClick={() => sendMessage(s)}
                                className="w-full flex items-center justify-between rounded-2xl px-2.5 py-2 text-[13px] text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800/80 transition"
                              >
                                <span className="text-left line-clamp-2">
                                  {s}
                                </span>
                                <ChevronRight className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* HEADER CHAT */}
                      <div className="flex items-center justify-between px-6 pt-5 pb-6 bg-white/95 dark:bg-neutral-950/95">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-2xl flex items-center justify-center bg-primary/10 text-primary overflow-hidden">
                            <Image
                              src={IkovalineLogo}
                              alt="Ikovaline"
                              className="object-cover w-7 h-7"
                              priority
                            />
                          </div>
                          <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold tracking-tight">
                              IkovalineTalk
                            </span>
                            <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
                              Assistant projet, estimation rapide
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setOpen(false)}
                          className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                          aria-label="Fermer"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="px-5 pb-3 pt-1 bg-white/95 dark:bg-neutral-950/95 flex gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-1.5 text-[8px] xss:text-[9.4px] sm:text-[11px] bg-blue-100 dark:bg-blue-950 text-neutral-800 dark:text-neutral-100">
                          <BadgeCheck size={12} /> 20+ projets
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-1.5 text-[8px] xss:text-[9.4px] sm:text-[11px] bg-sky-100 dark:bg-sky-950 text-neutral-800 dark:text-neutral-100">
                          <Info size={12} /> 67+ avis Google
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-[3rem] px-3 py-1.5 text-[8px] xss:text-[9.4px] sm:text-[11px] bg-green-100 dark:bg-green-950 text-neutral-800 dark:text-neutral-100">
                          <Timer size={12} /> Délai moyen ~30j
                        </span>
                      </div>

                      {/* Zone scroll messages */}
                      <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto px-5 py-3 space-y-3 text-sm bg-white/95 dark:bg-neutral-950/95
                           [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.25)_transparent]
                           dark:[scrollbar-color:rgba(255,255,255,.25)_transparent]"
                      >
                        {/* Messages */}
                        {messages.map((m, i) => {
                          const isUser = m.role === 'user';
                          const isError = m.role === 'error';
                          const canFeedback = m.role === 'bot' && !!m.id;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`max-w-[92%] px-4 py-2 rounded-[2rem] shadow-sm whitespace-pre-wrap leading-relaxed ${
                                isUser
                                  ? 'ml-auto bg-primary text-white'
                                  : isError
                                    ? 'mr-auto bg-red-100 text-red-700 dark:bg-red-900/25 dark:text-red-200'
                                    : 'mr-auto bg-black/[0.04] text-neutral-900 dark:bg-neutral-900/70 dark:text-neutral-50'
                              }`}
                            >
                              {m.role === 'bot' ? (
                                m.rich ? (
                                  <RichAnswer data={m.rich} />
                                ) : (
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
                                        <p
                                          {...props}
                                          className="mb-2 leading-[1.55]"
                                        />
                                      ),
                                      ul: (props) => (
                                        <ul
                                          {...props}
                                          className="mb-2 ml-4 list-disc space-y-1"
                                        />
                                      ),
                                      ol: (props) => (
                                        <ol
                                          {...props}
                                          className="mb-2 ml-4 list-decimal space-y-1"
                                        />
                                      ),
                                      li: (props) => (
                                        <li {...props} className="mb-0.5" />
                                      ),
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
                                      table: (props) => (
                                        <div className="my-2 overflow-x-auto rounded-2xl ring-1 ring-black/10 dark:ring-white/10">
                                          <table
                                            {...props}
                                            className="min-w-[520px] w-full text-[12px] border-collapse bg-white/90 dark:bg-neutral-900/70 backdrop-blur"
                                          />
                                        </div>
                                      ),
                                      thead: (props) => (
                                        <thead
                                          {...props}
                                          className="sticky top-0 bg-neutral-100 dark:bg-neutral-900/80"
                                        />
                                      ),
                                      th: (props) => (
                                        <th
                                          {...props}
                                          className="px-3 py-2 text-left font-semibold text-neutral-700 dark:text-neutral-200 border-b border-black/5 dark:border-white/10"
                                        />
                                      ),
                                      td: (props) => (
                                        <td
                                          {...props}
                                          className="px-3 py-2 text-neutral-800 dark:text-neutral-100 border-b border-black/5 dark:border-white/10 align-top"
                                        />
                                      ),
                                    }}
                                  >
                                    {m.text}
                                  </ReactMarkdown>
                                )
                              ) : (
                                m.text
                              )}
                            </motion.div>
                          );
                        })}

                        {isThinking && !isTyping && (
                          <div className="mr-auto bg-neutral-100 dark:bg-neutral-900/70 rounded-[3rem] px-3 py-2 text-[11px] text-neutral-700 dark:text-neutral-200 animate-pulse shadow-sm">
                            IkovalineTalk réfléchit…
                          </div>
                        )}
                      </div>

                      <div className="px-5 pb-3 pt-1 bg-white/95 dark:bg-neutral-950/95">
                        {/* CTA compacts */}
                        <div className="pt-1 pb-2 flex gap-2">
                          <a
                            href="https://calendly.com/florent-ghizzoni/meeting?month=2025-11"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[3rem]
                             bg-primary text-white px-4 py-2.5 font-medium text-[13px]
                             shadow-[0_8px_24px_-10px_rgba(0,0,0,0.15)]
                             hover:brightness-[1.05] transition"
                          >
                            <Calendar size={14} /> RDV 30 min
                          </a>
                          <a
                            href="https://ikovaline.com/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[3rem]
                             bg-white/90 dark:bg-neutral-950/80 border-black/[0.02] border dark:border-white/[0.02] text-neutral-900 dark:text-neutral-50
                             px-4 py-2.5 font-medium text-[13px]
                             hover:bg-white dark:hover:bg-neutral-900 transition"
                          >
                            <Mail size={14} /> Nous écrire
                          </a>
                        </div>
                        <div>
                          <div className="flex items-center bg-white dark:bg-neutral-950 rounded-[3rem] px-3 py-2 shadow-md shadow-black/[0.03] border border-black/[0.02] dark:border-white/[0.04]   ">
                            <input
                              className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
                              placeholder="Décrivez votre projet…"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyDown={onKeyDown}
                              disabled={isThinking || isTyping}
                            />
                            <button
                              disabled={!input.trim() || isThinking || isTyping}
                              onClick={() => sendMessage()}
                              className="ml-2 rounded-full bg-primary text-white p-2 hover:opacity-95 transition disabled:opacity-40"
                              aria-label="Envoyer"
                            >
                              <Send size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* BOTTOM NAV (toujours visible, pas de border visible) */}
                <div className="h-[52px] flex items-center justify-around bg-white/95 dark:bg-neutral-950/95 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setMode('home')}
                    className={`inline-flex flex-col items-center justify-center gap-0.5 px-4 py-1 transition ${
                      mode === 'home'
                        ? 'text-primary'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    <span className="relative">
                      <Home
                        size={22}
                        className={
                          mode === 'home' ? 'scale-110' : 'scale-100 opacity-80'
                        }
                      />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('chat')}
                    className={`inline-flex flex-col items-center justify-center gap-0.5 px-4 py-1 transition ${
                      mode === 'chat'
                        ? 'text-primary'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    <span className="relative">
                      <MessageCircle
                        size={22}
                        className={
                          mode === 'chat' ? 'scale-110' : 'scale-100 opacity-80'
                        }
                      />
                      {hasConversation && mode !== 'chat' && (
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
