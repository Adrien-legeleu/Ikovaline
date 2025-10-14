import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SpiralHero = dynamic(() => import('@/components/Sprialhero'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Remerciement | Ikovaline',
  description:
    'Transaction confirmée. Découvrez la suite du processus avec Ikovaline.',
};

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
      {/* HERO : robot + spiral + copy */}
      <SpiralHero
        title="Votre projet démarre maintenant"
        subtitle="Votre paiement est confirmé. Vous recevez dans les prochaines minutes le récapitulatif, les accès et la proposition de créneau de kick-off."
        ctaHref="/"
        ctaLabel="Retour à l’accueil"
        secondaryHref="/contact"
        secondaryLabel="Contacter l’équipe"
        sceneUrl="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
      />

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          La suite du parcours
        </h2>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          <li className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold">1. Récap & accès</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Un email récapitule votre commande et ouvre l’accès à l’espace
              client pour centraliser contenus, jalons et livrables.
            </p>
          </li>
          <li className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold">2. Kick-off</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Un échange court pour verrouiller objectifs, priorités et critères
              de réussite. Vous validez, on enclenche.
            </p>
          </li>
          <li className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold">3. Production</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Design & développement en flux continu, points de contrôle
              planifiés, livraisons incrémentales prêtes à tester.
            </p>
          </li>
        </ol>

        <div className="mt-10">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm ring-1 ring-black/5 transition hover:opacity-95 dark:ring-white/10"
          >
            Contacter l’équipe
          </a>
        </div>
      </section>
    </main>
  );
}
