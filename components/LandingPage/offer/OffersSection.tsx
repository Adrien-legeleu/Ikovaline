// app/(site)/components/OffersSection.tsx
'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useDeferredValue,
  useCallback,
  startTransition,
} from 'react';
import dynamic from 'next/dynamic';

import {
  OFFER_TIERS,
  OPTION_DEFS,
  type OfferTierId,
  type OptionId,
} from '@/lib/offers/pricing';
import { computeKPI, type KPI } from '@/lib/offers/kpi';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IconArrowRight, IconPhone, IconCrown } from '@tabler/icons-react';
import { useToast } from '@/hooks/use-toast';

// === Imports dynamiques (réduisent le first load) ===
const TierCompact = dynamic(() => import('./TierCompact'), { ssr: true }); // utile au-dessus de la ligne de flottaison, on garde SSR
const OptionChip = dynamic(() => import('./OptionChip'), { ssr: true }); // idem
const ImpactPanel = dynamic(() => import('./ImpactPanel'), { ssr: false }); // non critique -> client-only
const BackgroundRippleEffect = dynamic(
  () => import('@/components/ui/background-ripple-effect'),
  { ssr: false }
);
const CircleFade = dynamic(() => import('@/components/ui/circleFade'), {
  ssr: false,
});
const AnimatedNumber = dynamic(() => import('@/components/AnimatedNumber'), {
  ssr: false,
});
const StatsEstimateDynamic = dynamic(() => import('./StatsEstimate'), {
  ssr: false,
});

// === Petit utilitaire d’apparition (remplace framer-motion) ===
function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '80px', threshold: 0.1, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, visible };
}

// === Composant Reveal: applique une classe d’animation CSS légère ===
function Reveal({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={[
        className ?? '',
        'transition-all duration-500 ease-out will-change-transform',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      ].join(' ')}
      data-reveal-once={once ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}

type SelectedOptionSummary = {
  id: OptionId;
  label: string;
  price: number;
};
type InquirySummary = {
  tierId: OfferTierId;
  tierName: string;
  priceLabel: string;
  delayDays: number;
  options: SelectedOptionSummary[];
  optionsTotal: number;
  adsBudget: number;
  totals: { base: number; grandTotal: number };
  kpi: KPI;
  createdAtISO: string;
};
type InquiryPayload = {
  firstName: string;
  email: string;
  tel: string;
  message: string;
  summary: InquirySummary;
};
type ApiError = { error?: string };

export default function OffersSection() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState(false);

  // Effets décoratifs seulement ≥ md et côté client
  const [showRipple, setShowRipple] = useState(false);
  useEffect(() => {
    const run = () => {
      if (typeof window === 'undefined') return;
      const mq = window.matchMedia('(min-width: 768px)');
      setShowRipple(mq.matches);
      const onChange = (e: MediaQueryListEvent) => setShowRipple(e.matches);
      mq.addEventListener?.('change', onChange);
      return () => mq.removeEventListener?.('change', onChange);
    };
    // décalé après idle pour ne pas gêner le first paint
    const id = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(run)
      : setTimeout(run, 150);
    return () => {
      (window as any).cancelIdleCallback
        ? (window as any).cancelIdleCallback(id)
        : clearTimeout(id);
    };
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [activeTier, setActiveTier] = useState<OfferTierId>('boost');
  const [selectedOptions, setSelectedOptions] = useState<OptionId[]>([
    'speed',
    'uxui',
    'seo',
  ]);
  const [adsBudget, setAdsBudget] = useState<number>(500);

  // Handlers stables
  const handleDetails = useCallback((id: OfferTierId) => {
    setActiveTier(id);
    // Smooth scroll non bloquant
    requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setGlow(true);
      setTimeout(() => setGlow(false), 900);
    });
  }, []);

  const toggleOption = useCallback((id: OptionId) => {
    startTransition(() => {
      setSelectedOptions((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    });
  }, []);

  const onBudgetChange = useCallback((val: number) => {
    startTransition(() => setAdsBudget(val));
  }, []);

  // Data courante
  const tier = useMemo(
    () => OFFER_TIERS.find((t) => t.id === activeTier)!,
    [activeTier]
  );

  // Déférer les entrées utilisateur
  const deferredOptions = useDeferredValue(selectedOptions);
  const deferredAds = useDeferredValue(adsBudget);

  const optionsTotal = useMemo(
    () =>
      deferredOptions.reduce(
        (s, id) => s + (OPTION_DEFS.find((o) => o.id === id)?.price ?? 0),
        0
      ),
    [deferredOptions]
  );

  const basePrice = tier.basePrice;
  const totalPrice = useMemo(
    () => (tier.showConfigurator ? basePrice + optionsTotal : basePrice),
    [tier.showConfigurator, basePrice, optionsTotal]
  );

  // KPI (coût ~constant mais calcule sur valeurs déférées)
  const baseKpi = useMemo(
    () => computeKPI(tier.showConfigurator ? deferredOptions : []),
    [tier.showConfigurator, deferredOptions]
  );

  const kpi: KPI = useMemo(() => {
    if (!tier.showConfigurator || !deferredAds || deferredAds <= 0)
      return baseKpi;

    const visitorsMin = Math.round(deferredAds / 3);
    const visitorsMax = Math.round(deferredAds / 1);
    const leadsMin =
      baseKpi.leads[0] + Math.round((visitorsMin * baseKpi.convRate[0]) / 100);
    const leadsMax =
      baseKpi.leads[1] + Math.round((visitorsMax * baseKpi.convRate[1]) / 100);

    return {
      traffic: [
        baseKpi.traffic[0] + visitorsMin,
        baseKpi.traffic[1] + visitorsMax,
      ],
      convRate: baseKpi.convRate,
      leads: [leadsMin, leadsMax],
    };
  }, [tier.showConfigurator, baseKpi, deferredAds]);

  // ===== Modal + envoi =====
  const [openDialog, setOpenDialog] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const selectedOptionObjs: SelectedOptionSummary[] = useMemo(
    () =>
      deferredOptions.map((id) => {
        const o = OPTION_DEFS.find((x) => x.id === id)!;
        return { id: o.id, label: o.label, price: o.price };
      }),
    [deferredOptions]
  );

  const priceLabel =
    tier.id === 'luxe'
      ? 'Sur devis'
      : `${(tier.showConfigurator ? totalPrice : basePrice).toLocaleString(
          'fr-FR'
        )}€ TTC`;

  const requiredFieldsMissing = useCallback(
    () => !firstName.trim() || !email.trim() || !tel.trim(),
    [firstName, email, tel]
  );

  const submitInquiry = useCallback(async () => {
    setError(null);

    if (requiredFieldsMissing()) {
      const msgErr = 'Merci de renseigner Prénom, Email et Téléphone.';
      setError(msgErr);
      toast({
        variant: 'destructive',
        title: 'Champs manquants',
        description: msgErr,
      });
      return;
    }

    setSending(true);
    try {
      const payload: InquiryPayload = {
        firstName: firstName.trim(),
        email: email.trim(),
        tel: tel.trim(),
        message: msg.trim(),
        summary: {
          tierId: tier.id,
          tierName: tier.name,
          priceLabel,
          delayDays: tier.baseDelayDays,
          options: selectedOptionObjs,
          optionsTotal,
          adsBudget,
          totals: { base: basePrice, grandTotal: totalPrice },
          kpi,
          createdAtISO: new Date().toISOString(),
        },
      };

      const res = await fetch('/api/offers/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        // keepalive pour ne pas bloquer la navigation si l’utilisateur ferme vite
        keepalive: true,
      });

      if (!res.ok) {
        let serverMsg = `HTTP ${res.status}`;
        try {
          const j = (await res.json()) as ApiError;
          if (j?.error) serverMsg = j.error;
        } catch {
          /* ignore */
        }
        throw new Error(serverMsg);
      }

      toast({
        title: 'Configuration envoyée',
        description:
          "Merci ! On revient vers vous rapidement avec un devis et un créneau d'appel.",
      });

      setOpenDialog(false);
      setFirstName('');
      setEmail('');
      setTel('');
      setMsg('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(message);
      toast({
        variant: 'destructive',
        title: "Échec de l'envoi",
        description: message,
      });
    } finally {
      setSending(false);
    }
  }, [
    requiredFieldsMissing,
    toast,
    firstName,
    email,
    tel,
    msg,
    tier.id,
    tier.name,
    priceLabel,
    selectedOptionObjs,
    optionsTotal,
    adsBudget,
    basePrice,
    totalPrice,
    kpi,
    tier.baseDelayDays,
  ]);

  return (
    <section className="relative w-full">
      {/* Effets décoratifs (dynamiques, client-only) */}
      {showRipple ? <BackgroundRippleEffect cellSize={56} /> : null}
      <CircleFade />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        {/* HERO */}
        <Reveal>
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary shadow-sm">
              <IconCrown className="size-4" /> Studio de Projet
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Composez votre site, voyez{' '}
              <span className="text-[#2CB7FF]">l’impact en direct</span>.
            </h2>
            <p className="mt-3 text-black/70 dark:text-white/70 max-w-2xl">
              Prix, délais, conversions estimées, tout s’actualise
              instantanément.
            </p>
          </div>
        </Reveal>

        {/* OFFRES */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${
            expanded ? 'md:items-start' : ''
          }`}
        >
          {OFFER_TIERS.map((t) => (
            <TierCompact
              key={t.id}
              active={t.id === activeTier}
              name={t.name}
              tagline={t.tagline}
              price={t.basePrice}
              delayDays={t.baseDelayDays}
              bullets={t.bullets}
              ribbon={t.ribbon}
              expanded={expanded}
              onToggleExpand={() => setExpanded((x) => !x)}
              onSelect={() => setActiveTier(t.id)}
              onDetails={() => handleDetails(t.id)}
            />
          ))}
        </div>

        {/* DÉTAILS */}
        <div
          ref={detailsRef}
          className="mt-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-black/10 shadow-xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Atelier + Impact */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <Card
                  className={[
                    'rounded-2xl p-6 bg-white/60 border border-black/10 shadow-md transition-shadow dark:bg-neutral-900/60 dark:border-white/10',
                    glow ? 'ring-2 ring-primary/40 shadow-primary/30' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {tier.name}
                      </div>
                      <div className="text-sm text-black/60 dark:text-white/60">
                        {tier.tagline}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                        {tier.id === 'luxe' ? (
                          'Sur devis'
                        ) : (
                          <>
                            <AnimatedNumber
                              value={
                                tier.showConfigurator ? totalPrice : basePrice
                              }
                            />
                            €
                          </>
                        )}
                      </div>
                      <div className="text-xs text-black/60 dark:text-white/60">
                        ~ {tier.baseDelayDays} j
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 dark:bg-white/10" />

                  {tier.showConfigurator ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {OPTION_DEFS.map((opt) => (
                          <Reveal key={opt.id}>
                            <OptionChip
                              id={opt.id}
                              label={opt.label}
                              price={opt.price}
                              highlight={opt.highlight}
                              tooltip={opt.tooltip}
                              checked={selectedOptions.includes(opt.id)}
                              onToggle={toggleOption}
                            />
                          </Reveal>
                        ))}
                      </div>

                      {/* Slider budget pub */}
                      <div className="mt-5 rounded-2xl p-4 border border-black/10 bg-none shadow-sm dark:border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-neutral-900 dark:text-white">
                            Budget publicitaire mensuel
                          </div>
                          <div className="text-sm text-black/70 dark:text-white/70">
                            {adsBudget.toLocaleString('fr-FR')}€
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={5000}
                          step={50}
                          value={adsBudget}
                          onChange={(e) =>
                            onBudgetChange(parseInt(e.target.value, 10))
                          }
                          className="mt-3 w-full h-2 dark:accent-primary dark:bg-black rounded-full cursor-pointer"
                          aria-label="Budget publicitaire mensuel"
                        />
                        <div className="mt-2 flex justify-between text-xs text-black/50 dark:text-white/50">
                          <span>0€</span>
                          <span>2 500€</span>
                          <span>5 000€</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-black/60 dark:text-white/60">
                      Le niveau <b>{tier.name}</b> est livré <b>clé-en-main</b>.
                      Pour des options avancées, choisissez <b>Boost</b> ou{' '}
                      <b>Sur-Mesure Luxe</b>.
                    </div>
                  )}
                </Card>
              </Reveal>

              <Reveal>
                <ImpactPanel
                  selected={tier.showConfigurator ? deferredOptions : []}
                />
              </Reveal>
            </div>

            {/* Colonne sticky : Résumé + CTA Modal */}
            <div className="lg:sticky lg:top-24 h-fit lg:self-start space-y-4">
              <Card className="rounded-2xl p-6 bg-white/70 border border-black/10 shadow-md dark:bg-neutral-900/70 dark:border-white/10">
                <div className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                  Résumé
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-black/60 dark:text-white/60">
                    Total
                  </div>
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">
                    {tier.id === 'luxe' ? (
                      'Sur devis'
                    ) : (
                      <>
                        <AnimatedNumber
                          value={tier.showConfigurator ? totalPrice : basePrice}
                        />
                        €
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-black/60 dark:text-white/60">
                    Délai estimé
                  </span>
                  <span className="font-medium text-neutral-900 dark:text-white">
                    ~ {tier.baseDelayDays} jours
                  </span>
                </div>

                <Separator className="my-4 dark:bg-white/10" />

                <div className="grid grid-cols-1 gap-2">
                  {/* === Modal "Envoyer ma configuration" === */}
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary rounded-xl text-white hover:bg-primary/90 active:scale-[.99]">
                        Envoyer ma configuration
                        <IconArrowRight className="ml-1 size-4" />
                      </Button>
                    </DialogTrigger>

                    {/* Le contenu du Dialog se charge uniquement à l’ouverture (portail/light dom) */}
                    <DialogContent className="sm:max-w-[520px] rounded-2xl w-[90%] dark:bg-neutral-900 dark:text-white">
                      <DialogHeader>
                        <DialogTitle>
                          Recevoir un devis / être rappelé
                        </DialogTitle>
                      </DialogHeader>

                      <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-3">
                          <Label htmlFor="firstName" className="text-right">
                            Prénom*
                          </Label>
                          <Input
                            id="firstName"
                            className="col-span-3"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-3">
                          <Label htmlFor="email" className="text-right">
                            Email*
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-3">
                          <Label htmlFor="tel" className="text-right">
                            Téléphone*
                          </Label>
                          <Input
                            id="tel"
                            className="col-span-3"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-3">
                          <Label htmlFor="msg" className="text-right pt-2">
                            Message
                          </Label>
                          <Textarea
                            id="msg"
                            className="col-span-3"
                            rows={4}
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            placeholder="Contexte, objectifs, deadline…"
                          />
                        </div>

                        {error ? (
                          <p className="text-sm text-red-600">{error}</p>
                        ) : null}

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => setOpenDialog(false)}
                          >
                            Annuler
                          </Button>
                          <Button disabled={sending} onClick={submitInquiry}>
                            {sending ? 'Envoi…' : 'Envoyer'}
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-xl bg-black/5 dark:bg-white/10 p-3 text-xs text-black/60 dark:text-white/60">
                        Votre configuration (offre, options, budget pub, KPIs)
                        sera jointe automatiquement.
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Bouton Appel découverte */}
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-white rounded-xl hover:bg-black/5 text-black border border-black/10 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:border-white/10"
                  >
                    <a
                      href="https://calendly.com/florent-ghizzoni/meeting"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconPhone className="mr-1 size-4" />
                      <span className=" font-semibold"> -20% </span>-
                      <span>Appel découverte</span>
                    </a>
                  </Button>
                </div>
              </Card>

              <StatsEstimateDynamic
                kpi={kpi}
                tierId={activeTier}
                tierName={tier.name}
                adsBudget={adsBudget}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
