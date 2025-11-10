/**
 * Page principale de la Roulette Ikovaline
 *
 * Fonctionnalités :
 * - Configuration des points sur les récompenses
 * - Lancement de la roulette
 * - Affichage du résultat avec animation
 * - Historique des spins
 * - Gestion du parrainage
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Play, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/SupabaseClient';
import { AllocationPanel } from '@/components/roulette/AllocationPanel';
import { RouletteWheel } from '@/components/roulette/RouletteWheel';
import { ResultModal } from '@/components/roulette/ResultModal';
import { HistoryPanel } from '@/components/roulette/HistoryPanel';
import { ReferralPanel } from '@/components/roulette/ReferralPanel';
import type {
  RouletteConfigResponse,
  AllocationInput,
  SpinResult,
  HistoryResponse,
  ReferralSummary,
  RouletteSegment,
} from '@/lib/roulette/types';

export default function RoulettePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState<RouletteConfigResponse | null>(null);
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [referralData, setReferralData] = useState<ReferralSummary | null>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalRotation, setFinalRotation] = useState<number>();

  // Authentification
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadData(session.access_token);
      } else {
        // Rediriger vers la page de connexion
        window.location.href = '/auth/login?redirect=/roulette';
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadData(session.access_token);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Charger les données
  const loadData = async (token: string) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [configRes, historyRes, referralRes] = await Promise.all([
        fetch('/api/roulette/config', { headers }),
        fetch('/api/roulette/history?per_page=10', { headers }),
        fetch('/api/roulette/referral', { headers }),
      ]);

      if (configRes.ok) {
        const configData = await configRes.json();
        setConfig(configData);
      }

      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setHistory(historyData);
      }

      if (referralRes.ok) {
        const referralData = await referralRes.json();
        setReferralData(referralData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  // Sauvegarder l'allocation
  const handleSaveAllocation = async (allocations: AllocationInput[]) => {
    if (!user) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/roulette/allocate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allocations }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erreur lors de la sauvegarde');
        return;
      }

      // Recharger la config
      await loadData(session.access_token);
      alert('Configuration sauvegardée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  // Lancer la roulette
  const handleSpin = async () => {
    if (!user || !config || isSpinning) return;

    if (config.segments.length === 0) {
      alert('Veuillez d\'abord configurer vos points');
      return;
    }

    setIsSpinning(true);
    setSpinResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/roulette/spin', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erreur lors du spin');
        setIsSpinning(false);
        return;
      }

      const result: SpinResult = await response.json();
      setSpinResult(result);
      setFinalRotation(result.final_rotation);

      // L'animation démarre, le modal s'ouvrira quand elle sera terminée
    } catch (error) {
      console.error('Erreur lors du spin:', error);
      alert('Erreur lors du spin');
      setIsSpinning(false);
    }
  };

  // Callback quand l'animation de la roue est terminée
  const handleSpinComplete = async () => {
    setIsSpinning(false);
    setShowResultModal(true);

    // Recharger les données
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await loadData(session.access_token);
    }
  };

  // Rafraîchir les données
  const refreshData = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await loadData(session.access_token);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Roulette Ikovaline
          </h1>
          <p className="text-lg text-neutral-600">
            Configurez vos points et tentez votre chance !
          </p>
        </motion.div>

        {/* Wallet Summary */}
        {config && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-white shadow-lg border border-neutral-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-neutral-600">Points disponibles</div>
                  <div className="text-3xl font-bold text-neutral-900">
                    {config.wallet.available_points}
                  </div>
                </div>
              </div>

              <button
                onClick={refreshData}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors"
                title="Rafraîchir"
              >
                <RefreshCw className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Colonne gauche : Configuration */}
          <div className="space-y-8">
            {config && (
              <AllocationPanel
                wallet={config.wallet}
                rewards={config.rewards}
                initialAllocations={[]}
                onSave={handleSaveAllocation}
                isLoading={isLoading}
              />
            )}

            {referralData && (
              <ReferralPanel
                referralData={referralData}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Colonne droite : Roulette */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white shadow-lg p-8 border border-neutral-200"
            >
              <RouletteWheel
                segments={config?.segments || []}
                finalRotation={finalRotation}
                isSpinning={isSpinning}
                onSpinComplete={handleSpinComplete}
              />

              <div className="mt-8 text-center">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || !config || config.segments.length === 0}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                    bg-gradient-to-r from-blue-600 to-purple-600 text-white
                    text-lg font-semibold shadow-xl hover:shadow-2xl
                    transition-all hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSpinning ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Rotation en cours...
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      Lancer la roulette
                    </>
                  )}
                </button>

                {config && config.segments.length === 0 && (
                  <p className="text-sm text-red-600 mt-3">
                    Configurez vos points avant de lancer la roulette
                  </p>
                )}
              </div>
            </motion.div>

            {history && (
              <HistoryPanel
                spins={history.spins}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Modal de résultat */}
        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          result={spinResult}
        />
      </div>
    </div>
  );
}
