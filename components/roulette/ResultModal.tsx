// components/roulette/ResultModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  X,
  MessageCircle,
  Mail as MailIcon,
} from 'lucide-react';

type ResultModalProps = {
  isOpen: boolean;
  onClose: () => void;
  prize: string;
  code: string;
  expiresAt: string;
  email: string;
};

export function ResultModal({
  isOpen,
  onClose,
  prize,
  code,
  expiresAt,
  email,
}: ResultModalProps) {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL;

  const dateFR = new Date(expiresAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  // Sanitize WhatsApp number
  const sanitizedWhatsappNumber = whatsappNumber?.replace(/[\s\+\(\)\-]/g, '');

  // WhatsApp message
  const whatsappMessage = `Bonjour Ikovaline 👋
Je viens de gagner « ${prize} » sur la Roue Ikovaline.
Mon code : ${code}
Valide jusqu'au : ${dateFR}
Email : ${email}
J'aimerais démarrer un projet avec vous. Merci de revenir vers moi.`;

  const whatsappHref = sanitizedWhatsappNumber
    ? `https://wa.me/${sanitizedWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : undefined;

  // Email
  const emailSubject = `Code Ikovaline ${code} – Je souhaite démarrer`;
  const emailBody = `Bonjour Ikovaline,

Je viens de gagner « ${prize} » sur la Roue Ikovaline.
Code : ${code}
Valide jusqu'au : ${dateFR}
Email utilisé : ${email}

Je souhaite démarrer un projet avec vous (Landing / Vitrine / Tunnel / E-commerce / SaaS).
Merci de me recontacter.

——
Message généré depuis la page Roulette Ikovaline`;

  const emailHref = salesEmail
    ? `mailto:${salesEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : undefined;

  // Copy code handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Trigger confetti on open
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = document.querySelectorAll(
      '[role="dialog"] button, [role="dialog"] a'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="result-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              {/* Card */}
              <div className="relative rounded-[2rem] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, hsl(var(--primary)) 0%, transparent 70%)',
                  }}
                />

                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'hsl(var(--primary))' }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors z-10"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </button>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20"
                    >
                      <Gift className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h2
                        id="result-modal-title"
                        className="text-2xl font-bold text-neutral-900 dark:text-white"
                      >
                        Félicitations !
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                        Votre gain est confirmé
                      </p>
                    </div>
                  </div>

                  {/* Prize */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                  >
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                      Vous avez gagné
                    </p>
                    <p className="text-2xl font-bold text-primary">{prize}</p>
                  </motion.div>

                  {/* Code block */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
                  >
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide font-semibold">
                      Votre code
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-2xl font-bold text-neutral-900 dark:text-white tracking-wider">
                        {code}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="shrink-0 p-3 rounded-xl bg-primary hover:opacity-90 transition-all active:scale-95"
                        aria-label="Copier le code"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Copy className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </motion.div>

                  {/* Expiry */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 text-center"
                  >
                    Valable jusqu'au{' '}
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {dateFR}
                    </span>
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Démarrer sur WhatsApp
                      </a>
                    )}

                    {emailHref && (
                      <a
                        href={emailHref}
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-primary hover:opacity-90 text-white font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <MailIcon className="w-5 h-5" />
                        Démarrer par Email
                      </a>
                    )}
                  </motion.div>

                  {/* Footer note */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-6 text-xs text-neutral-500 dark:text-neutral-400 text-center leading-relaxed"
                  >
                    Code envoyé par e-mail. À coller dans votre brief ou
                    répondre au mail. Remise appliquée sur devis/facture
                    (paiement par RIB).
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Confetti */}
          {showConfetti && (
            <div className="fixed inset-0 z-40 pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => {
                const colors = [
                  'hsl(var(--primary))',
                  'hsl(var(--primary) / 0.7)',
                  '#FFD700',
                  '#FFA500',
                ];
                const randomColor =
                  colors[Math.floor(Math.random() * colors.length)];
                const randomX = Math.random() * 100;
                const randomDelay = Math.random() * 0.3;
                const randomDuration = 0.8 + Math.random() * 0.4;

                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${randomX}%`,
                      top: '-10%',
                      width: 8,
                      height: 8,
                      background: randomColor,
                      borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    }}
                    initial={{
                      y: 0,
                      x: 0,
                      rotate: 0,
                      opacity: 1,
                    }}
                    animate={{
                      y: window.innerHeight * 1.2,
                      x: (Math.random() - 0.5) * 200,
                      rotate: Math.random() * 720 - 360,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: randomDuration,
                      delay: randomDelay,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
