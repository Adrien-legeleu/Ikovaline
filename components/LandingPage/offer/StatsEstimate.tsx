'use client';

import { Card } from '@/components/ui/card';
import CountUp from 'react-countup';
import { useMemo } from 'react';

type KPI = {
  traffic: [number, number];
  convRate: [number, number];
  leads: [number, number];
};
type TierId = 'essential' | 'boost' | 'luxe';

export default function StatsEstimateDynamic({
  kpi,
  tierId,
  tierName,
  adsBudget,
}: {
  kpi: KPI;
  tierId: TierId;
  tierName: string;
  adsBudget: number;
}) {
  const normalized = useMemo(() => {
    let [tMin, tMax] = kpi.traffic;
    let [crMin, crMax] = kpi.convRate;
    let [lMin, lMax] = kpi.leads;

    if (tierId === 'boost') {
      const cap = Math.min(adsBudget, 5000);
      const boost = 1 + (cap / 5000) * 0.15;
      tMin = Math.round(tMin * boost);
      tMax = Math.round(tMax * boost);
      lMin = Math.round(lMin * boost);
      lMax = Math.round(lMax * boost);
    }
    if (tierId === 'luxe') {
      const multTraffic = 2.2;
      const multConv = 1.25;
      tMin = Math.round(tMin * multTraffic);
      tMax = Math.round(tMax * multTraffic);
      crMin = +(crMin * multConv).toFixed(2);
      crMax = +(crMax * multConv).toFixed(2);
      lMin = Math.round((tMin * crMin) / 100);
      lMax = Math.round((tMax * crMax) / 100);
    }
    return {
      traffic: [tMin, tMax] as [number, number],
      convRate: [crMin, crMax] as [number, number],
      leads: [lMin, lMax] as [number, number],
    };
  }, [kpi, tierId, adsBudget]);

  const data = useMemo(() => {
    const [tMin, tMax] = normalized.traffic;
    return Array.from({ length: 6 }, (_, i) => {
      const r = i / 5;
      const v = Math.round(tMin + (tMax - tMin) * r);
      return { x: i, v };
    });
  }, [normalized.traffic]);

  const visitorsMid = useMemo(
    () => Math.round((normalized.traffic[0] + normalized.traffic[1]) / 2),
    [normalized.traffic]
  );
  const leadsMid = useMemo(
    () => Math.round((normalized.leads[0] + normalized.leads[1]) / 2),
    [normalized.leads]
  );
  const convMid = useMemo(
    () =>
      ((normalized.convRate[0] + normalized.convRate[1]) / 2 || 0).toFixed(1),
    [normalized.convRate]
  );

  const showBudget = tierId === 'boost';

  // -------- SVG helpers (responsive via viewBox 0..100) --------
  const { lineD, areaD } = useMemo(() => {
    const n = data.length;
    const xs = (i: number) => (i * 100) / (n - 1);
    const vals = data.map((d) => d.v);
    const vMin = Math.min(...vals);
    const vMax = Math.max(...vals);
    const padTop = 6; // % padding top
    const padBot = 8; // % padding bottom
    const y = (v: number) => {
      if (vMax === vMin) return 100 - padBot; // évite division par 0
      const t = (v - vMin) / (vMax - vMin); // 0..1
      return padTop + (1 - t) * (100 - padTop - padBot);
    };

    const points = data.map((d, i) => [xs(i), y(d.v)] as const);

    const line = points
      .map(([x, yy], i) => (i === 0 ? `M ${x},${yy}` : `L ${x},${yy}`))
      .join(' ');

    const area = `${line} L 100,100 L 0,100 Z`; // ferme vers le bas pour le remplissage

    return { lineD: line, areaD: area };
  }, [data]);

  return (
    <Card className="rounded-2xl p-0 overflow-hidden border border-black/10 shadow-md bg-white/70 dark:bg-neutral-900/70 dark:border-white/10">
      <div className="relative w-full h-[320px]">
        {/* ---- GRAPH SVG (lightweight, no lib) ---- */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="ikovaBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="8%" stopColor="#2CB7FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2CB7FF" stopOpacity="0" />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
            </filter>
          </defs>

          {/* Zone remplie */}
          <path d={areaD} fill="url(#ikovaBlue)" />

          {/* Ligne */}
          <path
            d={lineD}
            fill="none"
            stroke="#2CB7FF"
            strokeWidth="1.8"
            filter="url(#soft)"
          />
        </svg>

        {/* KPIs au centre */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-5xl font-extrabold text-neutral-900 drop-shadow-sm dark:text-white">
            <CountUp end={visitorsMid} duration={1.4} separator=" " />
          </h3>
          <p className="text-neutral-500 text-sm dark:text-white/60">
            Visiteurs / mois estimés
          </p>
        </div>

        {/* Badge top */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20 bg-white/95 backdrop-blur rounded-xl shadow p-3 flex gap-3 w-[95%] dark:bg-neutral-900/95">
          <div>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">
              <CountUp end={leadsMid} duration={1.2} separator=" " />
            </p>
            <p className="text-xs text-neutral-500 dark:text-white/60">
              Leads / mois
            </p>
          </div>
          <div>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">
              {convMid}%
            </p>
            <p className="text-xs text-neutral-500 dark:text-white/60">
              Taux de conv.
            </p>
          </div>

          {showBudget ? (
            <div>
              <p className="text-base font-semibold text-neutral-900 dark:text-white">
                <CountUp end={adsBudget} duration={1.2} separator=" " />€
              </p>
              <p className="text-xs text-neutral-500 dark:text-white/60">
                Budget Pub
              </p>
            </div>
          ) : null}

          <div>
            <p className="text-base font-semibold text-neutral-900 dark:text-white">
              {tierName}
            </p>
            <p className="text-xs text-neutral-500 dark:text-white/60">Offre</p>
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 text-[11px] text-neutral-500 dark:text-white/60">
        Estimations basées sur votre configuration. Elles restent indicatives et
        peuvent varier selon le secteur, la saisonnalité et la concurrence.
      </div>
    </Card>
  );
}
