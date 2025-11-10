# 🚨 Dépannage Rapide - Roulette Ikovaline

## Erreur 500 sur `/api/roulette/status`

### Symptôme
```
POST /api/roulette/status 500 in 160ms
```

L'API retourne une erreur 500 lorsque vous entrez un email.

### Cause
La table `roulette_conversion` dans Supabase **n'est pas initialisée** ou ne contient pas exactement 8 segments obligatoires.

### Solution

#### Option 1 : Via l'API (Recommandé)

1. **Démarrer le serveur de développement** :
```bash
npm run dev
```

2. **Appeler l'endpoint d'initialisation** :
```bash
curl -X POST http://localhost:3000/api/roulette/init-conversion
```

Vous devriez voir :
```json
{
  "ok": true,
  "message": "roulette_conversion table updated successfully",
  "rows": [...]
}
```

3. **Tester à nouveau** :
```bash
curl -X POST http://localhost:3000/api/roulette/status \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### Option 2 : Directement dans Supabase

1. Ouvrir **Supabase Dashboard** → **SQL Editor**
2. Exécuter le script de migration :

```sql
-- Fichier : supabase/migrations/roulette_conversion_coefficients.sql
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
```

---

## Variables d'environnement manquantes

### Symptôme
```
Error: Cannot read properties of undefined
```

### Solution

Vérifier que `.env.local` contient :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT** : Utilisez la **Service Role Key**, pas l'anon key !

---

## Comment vérifier que tout fonctionne

### 1. Vérifier les coefficients
```bash
curl http://localhost:3000/api/roulette/probabilities
```

Devrait retourner 8 segments avec leurs coefficients.

### 2. Tester le statut utilisateur
```bash
curl -X POST http://localhost:3000/api/roulette/status \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Devrait retourner :
- `tries_left: 1`
- `points_wallet: 100`
- `allocation: [...]` (8 segments)
- `conversion: [...]` (8 coefficients)
- `weights: [...]` (probabilités calculées)

### 3. Tester un spin
```bash
curl -X POST http://localhost:3000/api/roulette/spin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## Logs améliorés

Les logs d'erreur détaillés s'affichent maintenant dans la console du serveur :

```
❌ Erreur roulette_conversion: {
  error: null,
  rowCount: 0,
  expectedRows: 8,
  message: undefined,
  hint: 'Run POST /api/roulette/init-conversion to initialize the table'
}
```

Cela vous indique exactement combien de lignes sont présentes dans la table et ce qui manque.

---

## Checklist complète

- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] Table `roulette_conversion` initialisée (8 lignes)
- [ ] Table `roulette_users` existe
- [ ] Table `roulette_allocation` existe
- [ ] Table `roulette_codes` existe
- [ ] Table `roulette_referrals` existe (avec colonnes `credited` et `credited_at`)

---

## Besoin d'aide ?

Consultez la documentation complète dans `docs/ROULETTE.md` (section 🐛 Dépannage).

**Dernière mise à jour** : 10 novembre 2025
