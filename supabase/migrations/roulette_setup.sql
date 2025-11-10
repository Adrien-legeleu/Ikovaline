-- ================================
-- MIGRATION : Roulette Ikovaline - Configuration complète
-- ================================
-- Ce fichier contient toutes les tables, types et données nécessaires
-- pour le système de roulette de récompenses avec parrainage.

-- Extension pour gen_random_uuid (normalement déjà activée sur Supabase)
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================
-- 1) Types ENUM
-- ================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'roulette_transaction_type') THEN
    CREATE TYPE public.roulette_transaction_type AS ENUM (
      'earn',
      'spend',
      'referral_bonus',
      'admin_adjust',
      'refund'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'roulette_spin_status') THEN
    CREATE TYPE public.roulette_spin_status AS ENUM (
      'pending',
      'success',
      'cancelled',
      'error'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'roulette_referral_status') THEN
    CREATE TYPE public.roulette_referral_status AS ENUM (
      'pending',
      'validated',
      'rejected'
    );
  END IF;
END$$;

-- ================================
-- 2) Table des récompenses
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_rewards (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_key  text NOT NULL UNIQUE,
  label       text NOT NULL,
  description text,
  factor      numeric(6,3) NOT NULL,      -- facteur points -> %
  max_percent numeric(5,2),               -- ex: 5.00 pour le jackpot
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Données de base (récompenses)
INSERT INTO public.roulette_rewards (reward_key, label, description, factor, max_percent, sort_order)
VALUES
  ('jackpot_50',  'Jackpot -50 %', 'Réduction exceptionnelle de 50 %',       0.05,  5.00, 10),
  ('discount_20', 'Réduction -20 %', 'Réduction de 20 % sur un projet',      0.20,  NULL, 20),
  ('discount_10', 'Réduction -10 %', 'Réduction de 10 % sur un projet',      0.40,  NULL, 30),
  ('voucher_150', 'Bon -150 €',      'Bon de réduction de 150 €',            0.50,  NULL, 40),
  ('voucher_100', 'Bon -100 €',      'Bon de réduction de 100 €',            0.60,  NULL, 50),
  ('voucher_75',  'Bon -75 €',       'Bon de réduction de 75 €',             0.75,  NULL, 60),
  ('voucher_50',  'Bon -50 €',       'Bon de réduction de 50 €',             0.90,  NULL, 70),
  ('discount_5',  'Réduction -5 %',  'Réduction douce de 5 %',               1.00,  NULL, 80)
ON CONFLICT (reward_key) DO NOTHING;

-- ================================
-- 3) Wallet des utilisateurs
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_wallets (
  user_id             uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  total_points_earned integer NOT NULL DEFAULT 0,
  total_points_spent  integer NOT NULL DEFAULT 0,
  available_points    integer NOT NULL DEFAULT 0,
  referral_code       text UNIQUE,
  referred_by         uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- Index utiles
CREATE INDEX IF NOT EXISTS idx_roulette_wallets_referred_by
  ON public.roulette_wallets (referred_by);

-- ================================
-- 4) Transactions de points
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_point_transactions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  type         public.roulette_transaction_type NOT NULL,
  points_delta integer NOT NULL,               -- positif ou négatif
  reason       text,
  metadata     jsonb,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_point_transactions_user_id
  ON public.roulette_point_transactions (user_id);

-- ================================
-- 5) Config d'allocation des points
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_allocations (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  reward_id  uuid NOT NULL REFERENCES public.roulette_rewards (id) ON DELETE CASCADE,
  points     integer NOT NULL CHECK (points >= 0),
  percent    numeric(5,2) NOT NULL,           -- résultat de points * factor (capé)
  session_id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_allocations_user_id
  ON public.roulette_allocations (user_id);

CREATE INDEX IF NOT EXISTS idx_roulette_allocations_session
  ON public.roulette_allocations (session_id);

-- ================================
-- 6) Spins / historique des tirages
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_spins (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  session_id    uuid,
  angle         numeric(6,2) NOT NULL,                -- angle final de la roue (0–360)
  reward_id     uuid REFERENCES public.roulette_rewards (id),
  reward_label  text,                                 -- sauvegarde du label au moment du spin
  points_spent  integer NOT NULL DEFAULT 0,
  status        public.roulette_spin_status NOT NULL DEFAULT 'success',
  reward_code   text,                                 -- code promo généré, si besoin
  metadata      jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_spins_user_id
  ON public.roulette_spins (user_id);

-- ================================
-- 7) Parrainage
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_referrals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id   uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  referred_id   uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  status        public.roulette_referral_status NOT NULL DEFAULT 'pending',
  bonus_points  integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_referrals_referrer
  ON public.roulette_referrals (referrer_id);

CREATE INDEX IF NOT EXISTS idx_roulette_referrals_referred
  ON public.roulette_referrals (referred_id);
