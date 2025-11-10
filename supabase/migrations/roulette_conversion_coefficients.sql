-- Migration: Mise à jour des coefficients de conversion de la roulette
-- Date: 2025-11-10
-- Description: Configure les coefficients obligatoires pour chaque segment

-- Mettre à jour ou insérer les coefficients de conversion
-- COEFFICIENTS OBLIGATOIRES :
-- - Jackpot 50%    : 1 point = 0.05 % (max 5% à 100 points)
-- - Réduction -20% : 1 point = 0.2 %  (max 20% à 100 points)
-- - Réduction -10% : 1 point = 0.3 %  (max 30% à 100 points)
-- - Bon -150€      : 1 point = 0.5 %  (max 50% à 100 points)
-- - Bon -100€      : 1 point = 0.6 %  (max 60% à 100 points)
-- - Bon -75€       : 1 point = 0.7 %  (max 70% à 100 points)
-- - Bon -50€       : 1 point = 0.8 %  (max 80% à 100 points)
-- - Réduction -5%  : 1 point = 1.0 %  (max 100% à 100 points)

INSERT INTO roulette_conversion (seg, label, point_factor_pct) VALUES
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

-- Commentaire sur la logique
COMMENT ON TABLE roulette_conversion IS 'Table de conversion : probabilité = points × point_factor_pct';
