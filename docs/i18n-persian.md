# Persian (fa) — translation specifics

This is the Persian-specific appendix. **Read [`i18n.md`](./i18n.md) first** — it has the architecture, the full content index (all 44 article files + where UI strings live), the verification steps, and the RTL/font notes. Everything here is Persian-only: tone, terminology, and things worth knowing before you translate.

## Tone and register

The English source is dense, encyclopedic, citation-aware academic prose — see `src/data/religion-articles/islam.ts` for the register: this is closer to an academic encyclopedia entry than marketing copy. Match that in Persian: formal written Persian (نثر رسمی), not colloquial. Preserve the epistemic hedging — where the English text says "scholars debate...", "the traditional account holds...", keep that hedging in translation rather than flattening it into confident assertions.

## Terminology

- Proper nouns and technical religious terms that already have standard Persian forms (most Islamic, Zoroastrian, and Manichaean terminology — these traditions have deep roots in Persian religious history) should use those standard forms, not a transliteration built from the English spelling. For traditions with no established Persian terminology (Yoruba, Maori, Navajo material, etc.), keep the original term in Latin script on first use with a Persian gloss, matching how the English source handles unfamiliar terms.
- Keep a running glossary as you go — a `docs/i18n-persian-glossary.md` you create is fine — so the same term translates the same way across all 44 articles. This matters more than it sounds: a term like "hadith" or "dharma" recurs across several traditions' articles.
- **Sources** (`sources: [{ label, href }]`): keep `href` as the actual URL (usually an English-language academic source) — don't invent Persian-language sources. Translate `label` only if it's a plain description; leave actual book/article titles in their original language, optionally with a Persian gloss in parentheses, per standard academic citation convention.

## Generating/refreshing the stub files

```bash
npx tsx scripts/scaffold-locale-articles.ts fa
```

Safe to re-run any time — only creates files that don't exist yet, and always regenerates `src/data/religion-articles/fa/articles.ts` (auto-generated, don't hand-edit).
