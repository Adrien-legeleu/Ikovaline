-- Migration: Ajout des colonnes pour le bonus de parrainage
-- Date: 2025-11-10
-- Description: Ajoute les colonnes credited et credited_at à la table roulette_referrals

-- Ajouter la colonne credited (boolean) pour indiquer si le parrain a été crédité
ALTER TABLE roulette_referrals
ADD COLUMN IF NOT EXISTS credited BOOLEAN DEFAULT FALSE;

-- Ajouter la colonne credited_at (timestamp) pour la date du crédit
ALTER TABLE roulette_referrals
ADD COLUMN IF NOT EXISTS credited_at TIMESTAMPTZ;

-- Créer un index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_roulette_referrals_invitee_credited
ON roulette_referrals (invitee_email_norm, accepted, credited);

-- Commentaires
COMMENT ON COLUMN roulette_referrals.credited IS 'Indique si le parrain a déjà reçu son bonus (+25 pts + 1 essai)';
COMMENT ON COLUMN roulette_referrals.credited_at IS 'Date et heure du crédit du bonus parrain';
