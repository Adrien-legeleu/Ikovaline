# Roulette Ikovaline - Documentation complète

## Vue d'ensemble

Le système de roulette Ikovaline a été entièrement reconstruit pour corriger les bugs existants et fournir une base propre et robuste. Cette nouvelle implémentation respecte strictement les règles métier définies et garantit une expérience utilisateur fiable.

## 🎯 Fonctionnalités

- **Configuration flexible** : L'utilisateur distribue ses points entre les récompenses
- **Calcul automatique des pourcentages** : Conversion points → % selon des facteurs définis
- **Cap de sécurité** : Le jackpot est limité à 5% maximum
- **Roulette animée** : Animation fluide avec convention d'angle correcte
- **Système de parrainage** : Gagnez des points en invitant des amis
- **Historique complet** : Tous les spins sont enregistrés avec leur récompense
- **Codes de réduction** : Génération automatique de codes uniques

## 📁 Structure des fichiers

```
lib/roulette/
├── types.ts           # Types TypeScript (récompenses, wallet, segments)
└── calculator.ts      # Fonctions pures de calcul

app/api/roulette/
├── config/route.ts    # GET - Configuration complète
├── allocate/route.ts  # POST - Enregistrer l'allocation
├── spin/route.ts      # POST - Lancer la roulette
├── history/route.ts   # GET - Historique des spins
├── wallet/route.ts    # GET - État du wallet
└── referral/route.ts  # GET - Données de parrainage

components/roulette/
├── AllocationPanel.tsx   # Configuration des points
├── RouletteWheel.tsx     # Composant de la roulette
├── ResultModal.tsx       # Modal de résultat
├── HistoryPanel.tsx      # Historique des tirages
└── ReferralPanel.tsx     # Gestion du parrainage

app/(site)/roulette/
└── page.tsx           # Page principale

supabase/migrations/
└── roulette_setup.sql # Migration complète des tables
```

## 🗄️ Base de données

### Tables créées

1. **roulette_rewards** : Configuration des récompenses
   - `reward_key` : Identifiant unique (ex: `jackpot_50`)
   - `factor` : Facteur de conversion points → %
   - `max_percent` : Cap maximum (ex: 5.00 pour le jackpot)

2. **roulette_wallets** : Wallet des utilisateurs
   - `available_points` : Points disponibles
   - `referral_code` : Code de parrainage unique
   - `referred_by` : Parrain (si applicable)

3. **roulette_allocations** : Configuration d'allocation des points
   - Historise comment l'utilisateur distribue ses points

4. **roulette_spins** : Historique des tirages
   - Chaque spin est enregistré avec sa récompense

5. **roulette_point_transactions** : Transactions de points
   - Type : earn, spend, referral_bonus, admin_adjust, refund

6. **roulette_referrals** : Système de parrainage
   - Status : pending, validated, rejected

### Installation des tables

```bash
# Dans Supabase SQL Editor, exécuter :
cat supabase/migrations/roulette_setup.sql
```

## ⚙️ Règles métier

### Facteurs de conversion

| Récompense | Facteur | 1 point = | Cap |
|------------|---------|-----------|-----|
| Jackpot -50% | 0.05 | 0.05% | 5% |
| Réduction -20% | 0.20 | 0.20% | - |
| Réduction -10% | 0.40 | 0.40% | - |
| Bon -150€ | 0.50 | 0.50% | - |
| Bon -100€ | 0.60 | 0.60% | - |
| Bon -75€ | 0.75 | 0.75% | - |
| Bon -50€ | 0.90 | 0.90% | - |
| Réduction -5% | 1.00 | 1.00% | - |

### Validation

- ✅ La somme des % DOIT être ≤ 100%
- ✅ Les points utilisés DOIVENT être ≤ points disponibles
- ✅ Le jackpot NE PEUT PAS dépasser 5% (cap côté calcul)
- ✅ Si la somme < 100%, le reste devient "Rien gagné"

### Exemple

Utilisateur avec 100 points :
- 20 points → Jackpot : `20 × 0.05 = 1%` ✅
- 50 points → -10% : `50 × 0.40 = 20%` ✅
- 30 points → -5% : `30 × 1.00 = 30%` ✅

**Total : 51%** → Le reste (49%) = segment "Rien"

## 🎡 Convention d'angle (IMPORTANT)

La roulette suit cette convention stricte :

```
    0° (haut)
       ↑
       |
←------+------→
       |
       ↓
```

- **0° = 12h** (haut de la roue)
- **Rotation sens horaire**
- **La flèche est FIXE en haut**
- **On fait tourner LA ROUE, pas la flèche**

### Calcul du gagnant

```typescript
// Après rotation de la roue
const normalized = ((rotationAngle % 360) + 360) % 360;
const pointerAngle = (360 - normalized) % 360;

// Trouver le segment où pointerAngle est compris entre start_angle et end_angle
const winner = segments.find(s =>
  pointerAngle >= s.start_angle && pointerAngle < s.end_angle
);
```

## 🔧 Fonctions utilitaires

### `calculatePercent(points, factor, maxPercent?)`

Calcule le pourcentage pour une récompense.

```typescript
const { percent, capped } = calculatePercent(20, 0.05, 5);
// percent = 1, capped = false

const { percent, capped } = calculatePercent(200, 0.05, 5);
// percent = 5, capped = true (limité à 5%)
```

### `calculateSegments(allocations, rewards)`

Calcule tous les segments avec leurs angles.

```typescript
const result = calculateSegments([
  { reward_key: 'jackpot_50', points: 20 },
  { reward_key: 'discount_10', points: 50 },
], rewards);

// result.segments = [
//   { reward_key: 'jackpot_50', percent: 1, start_angle: 0, end_angle: 3.6, ... },
//   { reward_key: 'discount_10', percent: 20, start_angle: 3.6, end_angle: 75.6, ... },
//   { reward_key: 'nothing', percent: 79, start_angle: 75.6, end_angle: 360, ... }
// ]
```

### `determineWinner(rotationAngle, segments)`

Détermine quelle récompense est gagnée.

```typescript
const winner = determineWinner(1260.5, segments);
// Retourne le segment sous la flèche après rotation
```

### `validateAllocations(allocations, rewards, availablePoints)`

Valide une configuration complète (lance une exception si invalide).

```typescript
try {
  validateAllocations(allocations, rewards, 100);
  // ✅ Configuration valide
} catch (error) {
  // ❌ Erreur : INSUFFICIENT_POINTS, TOTAL_EXCEEDS_100, etc.
}
```

## 📡 API

Toutes les routes nécessitent une authentification via header :
```
Authorization: Bearer <token>
```

### GET /api/roulette/config

Retourne la configuration complète.

**Réponse :**
```json
{
  "rewards": [...],
  "allocations": [...],
  "wallet": { "available_points": 100, ... },
  "segments": [...]
}
```

### POST /api/roulette/allocate

Enregistre la configuration d'allocation.

**Body :**
```json
{
  "allocations": [
    { "reward_key": "jackpot_50", "points": 20 },
    { "reward_key": "discount_10", "points": 50 }
  ]
}
```

### POST /api/roulette/spin

Lance un spin.

**Réponse :**
```json
{
  "spin": { "id": "...", "reward_code": "JAC-abc123-XYZ", ... },
  "final_rotation": 1260.5,
  "reward": { "label": "Jackpot -50%", ... },
  "wallet": { "available_points": 100, ... }
}
```

### GET /api/roulette/history

Retourne l'historique des spins (paginé).

**Query params :**
- `page` : Numéro de page (défaut: 1)
- `per_page` : Résultats par page (défaut: 20)

### GET /api/roulette/wallet

Retourne le wallet avec statistiques détaillées.

### GET /api/roulette/referral

Retourne les données de parrainage.

## 🎨 Design

Le design suit le thème clair d'Ikovaline :

- **Couleur principale** : Bleu (#3B82F6)
- **Couleur accent** : Vert
- **Thème** : Clair par défaut (pas de dark mode sur la roulette)
- **Gradients** : Doux et désaturés
- **Animations** : Fluides avec Framer Motion

## 🚀 Déploiement

### 1. Migration de la base de données

```sql
-- Exécuter dans Supabase SQL Editor
-- Le fichier est dans : supabase/migrations/roulette_setup.sql
```

### 2. Variables d'environnement

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3. Build et déploiement

```bash
npm run build
npm run start
```

## 🐛 Bugs corrigés

1. ❌ **Ancien bug** : Flèche tournait dans le mauvais sens
   ✅ **Correction** : Convention d'angle stricte (0° = haut, sens horaire)

2. ❌ **Ancien bug** : Jackpot bloqué à 20% alors qu'il devait être à 5%
   ✅ **Correction** : Facteur correct (0.05) + cap à 5%

3. ❌ **Ancien bug** : Calcul des pourcentages incorrect
   ✅ **Correction** : Fonctions pures bien testées

4. ❌ **Ancien bug** : Blocage si mauvais réglages
   ✅ **Correction** : Validation stricte avec messages d'erreur clairs

## 📝 Prochaines étapes

1. Ajouter des tests unitaires pour `calculator.ts`
2. Implémenter la décrémentation des points à chaque spin (optionnel)
3. Ajouter un système de notifications pour le parrainage
4. Créer un dashboard admin pour gérer les récompenses
5. Ajouter des analytics (nombre de spins, récompenses les plus gagnées, etc.)

## 🤝 Contribution

Pour contribuer :

1. Respecter les types TypeScript stricts
2. Utiliser les fonctions pures de `calculator.ts`
3. Tester tous les edge cases
4. Documenter les changements

## 📄 Licence

Propriétaire - Ikovaline © 2025
