// app/(shared)/i18n/autoTranslate.ts
type OverrideMap = Record<string, string>;

const FWD_PREFIX = 'auto-i18n-cache:'; // FR -> EN
const REV_PREFIX = 'auto-i18n-rev:'; // EN -> FR
function decodeHTML(str: string) {
  if (typeof window === 'undefined') return str;
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function textNodesUnder(el: Node): Text[] {
  const out: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const s = node.textContent?.trim();
      if (!s) return NodeFilter.FILTER_REJECT;
      const parent = (node as any).parentElement as HTMLElement | null;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName))
        return NodeFilter.FILTER_REJECT;
      if (parent.closest('[data-i18n="no"]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n: Node | null;
  while ((n = walker.nextNode())) out.push(n as Text);
  return out;
}

async function loadOverrides(locale: string): Promise<OverrideMap> {
  try {
    const res = await fetch(`/i18n-overrides/${locale}.json`, {
      cache: 'no-store',
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

function chunk<T>(arr: T[], size = 100): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

const cacheGet = (k: string) => {
  try {
    return localStorage.getItem(FWD_PREFIX + k);
  } catch {
    return null;
  }
};
const cacheSet = (k: string, v: string) => {
  try {
    localStorage.setItem(FWD_PREFIX + k, v);
  } catch {}
};
const revGet = (k: string) => {
  try {
    return localStorage.getItem(REV_PREFIX + k);
  } catch {
    return null;
  }
};
const revSet = (k: string, v: string) => {
  try {
    localStorage.setItem(REV_PREFIX + k, v);
  } catch {}
};

export async function autoTranslatePageTo(locale: 'en' | 'fr') {
  if (typeof window === 'undefined') return;

  const nodes = textNodesUnder(document.body);
  if (!nodes.length) return;

  if (locale === 'fr') {
    // ⟲ Revenir au FR en utilisant le reverse cache EN -> FR
    nodes.forEach((n) => {
      const cur = (n.textContent || '').trim();
      const fr = revGet(cur);
      if (fr) {
        // Remplace le segment "trim" pour garder espaces/ponctuation
        n.textContent = (n.textContent || '').replace(cur, fr);
      }
    });
    return;
  }

  // === locale === 'en' : overlay EN ===
  const overrides = await loadOverrides('en');
  const originals = nodes.map((n) => n.textContent || '');

  const toMT: { idx: number; fr: string }[] = [];

  // 1) Overrides prioritaires
  originals.forEach((txt, i) => {
    const tTrim = txt.trim();
    if (overrides[tTrim]) {
      const en = decodeHTML(overrides[tTrim]);
      nodes[i].textContent = txt.replace(tTrim, en);
      revSet(en, tTrim);
    } else {
      toMT.push({ idx: i, fr: txt });
    }
  });

  if (!toMT.length) return;

  // 2) Cache FR->EN
  const batch: { idx: number; fr: string }[] = [];
  toMT.forEach(({ idx, fr }) => {
    const enHit = cacheGet(fr);
    if (enHit) {
      const enDec = decodeHTML(enHit); // ⬅️ decode cache
      nodes[idx].textContent = enDec;
      revSet(enDec, fr.trim());
    } else {
      batch.push({ idx, fr });
    }
  });

  if (!batch.length) return;

  // 3) DeepL en lots
  for (const group of chunk(batch, 100)) {
    const resp = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts: group.map((g) => g.fr),
        sourceLang: 'FR',
        targetLang: 'EN',
      }),
    });
    if (!resp.ok) continue;

    // 3) DeepL en lots
    const { translations } = await resp.json();
    group.forEach((g, i) => {
      const enRaw = translations[i];
      if (enRaw) {
        const enDec = decodeHTML(enRaw); // ⬅️ decode API
        nodes[g.idx].textContent = enDec;
        cacheSet(g.fr, enDec); // ⬅️ stocke décodé
        revSet(enDec, g.fr.trim());
      }
    });
  }
}
