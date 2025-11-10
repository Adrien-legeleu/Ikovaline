-- ================================
-- MIGRATION : Tables essentielles pour la roulette (sans referrals)
-- ================================

-- ================================
-- 1) Table des utilisateurs de la roulette
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_users (
  email text NOT NULL,
  email_norm text NOT NULL PRIMARY KEY,
  tries_left integer NOT NULL DEFAULT 1,
  points_wallet integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_users_email
  ON public.roulette_users (email);

-- ================================
-- 2) Table de conversion (coefficients des segments)
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_conversion (
  seg integer NOT NULL PRIMARY KEY CHECK (seg BETWEEN 1 AND 8),
  label text NOT NULL,
  point_factor_pct numeric(6,3) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.roulette_conversion IS 'Coefficients de conversion : probabilité = points × point_factor_pct';

-- ================================
-- 3) Table d'allocation des points par utilisateur
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_allocation (
  email_norm text NOT NULL REFERENCES public.roulette_users (email_norm) ON DELETE CASCADE,
  seg integer NOT NULL CHECK (seg BETWEEN 1 AND 8),
  points integer NOT NULL DEFAULT 0 CHECK (points >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (email_norm, seg)
);

CREATE INDEX IF NOT EXISTS idx_roulette_allocation_email
  ON public.roulette_allocation (email_norm);

-- ================================
-- 4) Table des codes/récompenses gagnées
-- ================================
CREATE TABLE IF NOT EXISTS public.roulette_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_norm text NOT NULL REFERENCES public.roulette_users (email_norm) ON DELETE CASCADE,
  seg integer NOT NULL CHECK (seg BETWEEN 1 AND 8),
  prize_label text NOT NULL,
  code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active',
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_roulette_codes_email
  ON public.roulette_codes (email_norm);

CREATE INDEX IF NOT EXISTS idx_roulette_codes_code
  ON public.roulette_codes (code);

-- ================================
-- 5) Insertion des 8 coefficients de conversion
-- ================================
INSERT INTO public.roulette_conversion (seg, label, point_factor_pct) VALUES
  (1, 'Jackpot −50%', 0.05),
  (2, '−20%', 0.2),
  (3, '−10%', 0.3),
  (4, '−150 €', 0.5),
  (5, '−100 €', 0.6),
  (6, '−75 €', 0.7),
  (7, '−50 €', 0.8),
  (8, '−5 %', 1.0)
ON CONFLICT (seg) DO UPDATE SET
  label = EXCLUDED.label,
  point_factor_pct = EXCLUDED.point_factor_pct;

-- ================================
-- 6) Fonction pour updated_at automatique
-- ================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS update_roulette_users_updated_at ON public.roulette_users;
CREATE TRIGGER update_roulette_users_updated_at
  BEFORE UPDATE ON public.roulette_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_roulette_allocation_updated_at ON public.roulette_allocation;
CREATE TRIGGER update_roulette_allocation_updated_at
  BEFORE UPDATE ON public.roulette_allocation
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
