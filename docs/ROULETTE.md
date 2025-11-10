# 🎰 Documentation Roulette Ikovaline

## Vue d'ensemble

La roulette Ikovaline est un système de gamification permettant aux utilisateurs de gagner des réductions et bons d'achat en tournant une roue de la fortune. Le système intègre un mécanisme de parrainage pour encourager le bouche-à-oreille.

---

## 📊 Principe de fonctionnement

### 1. Probabilités et coefficients

Chaque segment de la roue a :
- Un **nombre de points** alloué par l'utilisateur (base : 100 points)
- Un **coefficient** qui détermine le taux de conversion : `1 point = X % de probabilité`

**Formule de calcul :**
```
probabilité_segment (%) = points_alloués × coefficient
```

**Tableau des coefficients obligatoires :**

| Segment | Récompense | Coefficient | Max à 100 pts |
|---------|------------|-------------|---------------|
| 1 | 🎰 Jackpot −50% | 0.05 | 5% |
| 2 | 🔴 Réduction −20% | 0.2 | 20% |
| 3 | 🟠 Réduction −10% | 0.3 | 30% |
| 4 | 💸 Bon −150 € | 0.5 | 50% |
| 5 | 💶 Bon −100 € | 0.6 | 60% |
| 6 | 💶 Bon −75 € | 0.7 | 70% |
| 7 | 💶 Bon −50 € | 0.8 | 80% |
| 8 | 🔹 Réduction −5% | 1.0 | 100% |

### 2. Allocation des points

- Chaque utilisateur dispose de **100 points par défaut**
- Il peut répartir ces points sur les 8 segments comme il le souhaite
- La somme des points alloués doit égaler le wallet
- **Si un segment a 0 point, il n'apparaît PAS sur la roue** (complètement supprimé)

### 3. Affichage de la roue

- Les segments sont **proportionnels** à leurs probabilités
- Exemple : si un segment a 50% de probabilité, il occupe 180° (la moitié de la roue)
- Design premium clair avec couleurs différenciées :
  - **Doré** : Jackpot (segment 1)
  - **Bleu** : Réductions 20% et 10% (segments 2-3)
  - **Vert** : Bons d'achat (segments 4-7)
  - **Gris-bleu** : Réduction 5% (segment 8)

---

## 👥 Système de parrainage

### Principe

Quand un utilisateur parraine quelqu'un :
1. Le parrain génère un lien d'invitation unique
2. Le filleul clique sur le lien et entre son email
3. **Au premier spin du filleul**, le parrain reçoit :
   - ✅ **+1 essai supplémentaire** (`tries_left`)
   - ✅ **+25 points bonus** (`points_wallet`)

### Avantages

- Le parrain peut **relancer la roue** avec son essai supplémentaire
- Les **25 points bonus** peuvent être répartis librement sur les segments
- Le parrain peut ainsi **mettre plus de 100 points** sur certains segments s'il le souhaite
- Exemple : 50 points sur Jackpot + 75 points sur Bon −150€ = 125 points au total

### Règles

- Un filleul ne crédite son parrain **qu'une seule fois** (au premier spin)
- Le bonus est attribué automatiquement lors du spin
- Le parrain voit son wallet passer de 100 à 125 points

---

## 🎨 Design et UX

### Couleurs

Le design suit une philosophie **premium clair** :
- Fond clair (blanc/gris très pâle)
- Pas de mode sombre pour la roue elle-même
- Couleurs principales : `--primary` (bleu) et `--accent` (vert)
- Effets de verre (glass morphism) et d'ombres douces

### Animation

1. **Avant le spin** : léger pulse de l'aiguille
2. **Pendant le spin** :
   - Rotation de 4 tours + alignement sur le segment gagnant
   - Durée : 3.8 secondes avec courbe d'accélération réaliste
   - Halo lumineux autour de la roue
3. **À l'arrivée** : micro-rebond (bounce) pour effet de "clac"
4. **Résultat** : modal avec le code promo et sa validité (14 jours)

---

## 🔧 Architecture technique

### Frontend

```
components/roulette/
├── RouletteWheel.tsx      # Composant principal de la roue (Canvas)
├── AllocationPanel.tsx    # Panneau de répartition des points
├── ChanceList.tsx         # Liste des probabilités par segment
├── InviteCard.tsx         # Carte de parrainage
├── SpinButton.tsx         # Bouton de lancement
├── ResultModal.tsx        # Modal de résultat
└── RewardsPanel.tsx       # Historique des gains
```

### Backend (API Routes)

```
app/api/roulette/
├── status/route.ts             # État utilisateur + probabilités
├── spin/route.ts               # Lancer la roue + crédit parrain
├── allocation/route.ts         # Sauvegarder la répartition
├── invite/route.ts             # Générer un lien de parrainage
├── accept/route.ts             # Accepter une invitation
├── init-conversion/route.ts    # Initialiser les coefficients
└── migrate-referrals/route.ts  # Vérifier les colonnes DB
```

### Logique métier

```
lib/roulette/
├── segments.ts    # Configuration des segments et coefficients
└── calc.ts        # Calcul des probabilités et filtrage
```

---

## 📦 Installation et configuration

### 1. Migrations SQL

Exécuter les migrations SQL dans Supabase Dashboard :

```sql
-- 1. Mise à jour des coefficients
-- Fichier : supabase/migrations/roulette_conversion_coefficients.sql
\i supabase/migrations/roulette_conversion_coefficients.sql

-- 2. Ajout des colonnes pour le parrainage
-- Fichier : supabase/migrations/roulette_referrals_bonus.sql
\i supabase/migrations/roulette_referrals_bonus.sql
```

### 2. Initialisation via API

Alternativement, appeler l'API d'initialisation :

```bash
# Initialiser les coefficients
curl -X POST http://localhost:3000/api/roulette/init-conversion

# Vérifier les colonnes parrainage
curl -X POST http://localhost:3000/api/roulette/migrate-referrals
```

### 3. Variables d'environnement

Aucune variable supplémentaire requise si Supabase est déjà configuré.

---

## 🧪 Tests manuels

### Test 1 : Allocation et probabilités

1. Ouvrir `/roulette`
2. Entrer un email
3. Vérifier que le wallet = 100 pts
4. Répartir les points (ex: 100 pts sur Jackpot)
5. Cliquer "Enregistrer"
6. Vérifier que les probabilités s'affichent correctement (Jackpot = 5%)

### Test 2 : Segments proportionnels

1. Mettre 100 pts sur un seul segment
2. Vérifier que ce segment occupe **toute la roue** (360°)
3. Mettre 50 pts sur 2 segments différents
4. Vérifier que chaque segment occupe **la moitié de la roue** (180° chacun)

### Test 3 : Parrainage

1. Utilisateur A entre son email → génère un lien d'invitation
2. Utilisateur B clique sur le lien et entre son email
3. Utilisateur B lance la roue (1er spin)
4. Vérifier que Utilisateur A a maintenant :
   - `tries_left` = 2 (au lieu de 1)
   - `points_wallet` = 125 (au lieu de 100)
5. Utilisateur A peut maintenant relancer la roue

### Test 4 : Segments à 0 point

1. Mettre 0 point sur tous les segments sauf 1
2. Vérifier que la roue n'affiche **qu'un seul segment** (les autres sont supprimés)
3. Ce segment doit occuper 360°

---

## 🐛 Dépannage

### Problème : La roue affiche 8 segments égaux malgré une allocation différente

**Cause** : Les coefficients dans `roulette_conversion` ne sont pas à jour.

**Solution** :
```bash
curl -X POST http://localhost:3000/api/roulette/init-conversion
```

### Problème : Erreur "credited column does not exist"

**Cause** : Les colonnes de parrainage n'existent pas dans `roulette_referrals`.

**Solution** : Exécuter le script SQL de migration :
```sql
\i supabase/migrations/roulette_referrals_bonus.sql
```

### Problème : Le parrain n'est pas crédité après le spin du filleul

**Causes possibles** :
1. Le filleul a déjà effectué un spin auparavant
2. La relation de parrainage n'existe pas dans `roulette_referrals`
3. La colonne `credited` est déjà à `true`

**Vérification** :
```sql
SELECT * FROM roulette_referrals
WHERE invitee_email_norm = 'email@filleul.com';
```

---

## 📝 Formules de calcul

### Probabilité brute
```
prob_brute = points × coefficient
```

### Probabilité normalisée (%)
```
prob_pct = (prob_brute / sum(toutes_prob_brutes)) × 100
```

### Angle sur la roue (degrés)
```
angle = (prob_pct / 100) × 360
```

### Exemple concret

Allocation :
- Segment 1 (Jackpot, coef=0.05) : 100 pts → 100 × 0.05 = 5
- Segment 4 (Bon −150€, coef=0.5) : 100 pts → 100 × 0.5 = 50

Total : 5 + 50 = 55

Probabilités :
- Segment 1 : (5 / 55) × 100 = **9.09%** → 32.7° sur la roue
- Segment 4 : (50 / 55) × 100 = **90.91%** → 327.3° sur la roue

---

## 🚀 Évolutions futures

- [ ] Historique détaillé des spins
- [ ] Statistiques de parrainage (nombre de filleuls, bonus total)
- [ ] Mode "preview" avant le spin
- [ ] Animations plus poussées (confettis, particules)
- [ ] Support multi-langue
- [ ] Notifications push pour les nouveaux filleuls

---

## 📄 Licence

Ce code fait partie du projet Ikovaline.

**Dernière mise à jour :** 10 novembre 2025
