# Persian (fa) — translation specifics

This is the Persian-specific appendix. **Read [`i18n.md`](./i18n.md) first** — it has the architecture, the full content index (all 44 article files + where UI strings live), the verification steps, and the RTL/font notes. Everything here is Persian-only: tone, terminology, and things worth knowing before you translate.

## Current implementation status

The Persian route is active at `/fa`. Shared navigation, footer, loading and error states are translated, as are Concepts, Traditions, Landing, Compare, About, Inward Paths and Pilgrimage. The Bahá’í Faith, Buddhism, Zoroastrianism, Islam, Judaism, Hinduism, Christianity and Gnosticism have Persian article modules; a fidelity audit found condensed passages in several of them, so they are not final until sentence-level comparison is complete. Islam, Judaism, Hinduism, Christianity and Gnosticism also have localized religion metadata (name/blurb/practices/coreIdeas/sacredTexts in `religion-meta.fa.ts`). The remaining 36 religion articles intentionally fall back to English until their translation phase. See [`i18n-audit.md`](./i18n-audit.md) for the audit result and completion rule.

The drop-cap styling that separated the first Persian character in Inward Paths cards is disabled under RTL. GlobeView and Timeline still need visual QA because their canvas and dynamic labels are not fully localized. TTS/narration is parked and must not be reintroduced as part of translation work.

## Tone and register

The English source is dense, encyclopedic, citation-aware academic prose — see `src/data/religion-articles/islam.ts` for the register: this is closer to an academic encyclopedia entry than marketing copy. Match that in Persian: formal written Persian (نثر رسمی), not colloquial. Preserve the epistemic hedging — where the English text says "scholars debate...", "the traditional account holds...", keep that hedging in translation rather than flattening it into confident assertions.

## Terminology

- Proper nouns and technical religious terms that already have standard Persian forms (most Islamic, Zoroastrian, and Manichaean terminology — these traditions have deep roots in Persian religious history) should use those standard forms, not a transliteration built from the English spelling. For traditions with no established Persian terminology (Yoruba, Maori, Navajo material, etc.), keep the original term in Latin script on first use with a Persian gloss, matching how the English source handles unfamiliar terms.
- Keep a running glossary as you go — a `docs/i18n-persian-glossary.md` you create is fine — so the same term translates the same way across all 44 articles. This matters more than it sounds: a term like "hadith" or "dharma" recurs across several traditions' articles.
- **Sources** (`sources: [{ label, href }]`): keep `href` as the actual URL (usually an English-language academic source) — don't invent Persian-language sources. Translate `label` only if it's a plain description; leave actual book/article titles in their original language, optionally with a Persian gloss in parentheses, per standard academic citation convention.

## Completing a tradition: full checklist

Translating `fa/<id>.ts` is necessary but **not sufficient** — a religion page pulls Persian strings from two separate places, and missing the second one leaves English visibly leaking through even after the article body is fully translated:

1. **The article body** — `src/data/religion-articles/fa/<id>.ts`. Untranslated traditions ship as a placeholder that just re-exports the English module (look for the `TODO(fa-translation)` comment block at the top of the file); translating means replacing that re-export with a real object literal, not editing it in place.
2. **The page-level metadata** — `<NAME>_META_FA` in `src/data/religion-meta.fa.ts`, registered in both `FA_RELIGION_META` (keyed by id) and `FA_RELIGION_LABELS` (short name only). `ReligionDetail.tsx` merges this over the English `RELIGIONS` entry when `locale === "fa"` — so `name`, `blurb`, `practices`, `coreIdeas`, and `sacredTexts` all silently stay in English on the fa page until this object exists, even with a fully translated article body. This step was missed the first time Christianity was translated and had to be corrected after the user noticed the page title/tagline were still English.
3. **Shared UI chrome** — grep the page component you're localizing for hardcoded English string literals (not just `pt(locale, ...)` calls). One was found and fixed in `ReligionDetail.tsx`: the "No longer practiced" sub-label on extinct traditions' follower stat was a bare string, not routed through `pt()`; it now uses a `noLongerPracticed` key added to both the `en` and `fa` dictionaries in `pageI18n.ts`. This bug affected *every* extinct tradition's fa page, not just the one being translated at the time — worth a quick grep across the component rather than assuming existing pages are already clean.

Verify all three with the workflow in [`translation-rules.md`](./translation-rules.md) (`npx tsx scripts/check-fa-translation.ts`), plus `npx tsc --noEmit` and `npx eslint .` on the changed files — the checker only catches structural/length issues in the article body, not metadata coverage or stray English strings in components.

## Session log — 2026-08-29: Christianity rewrite + Gnosticism translation

- **Christianity** (`fa/christianity.ts`) already had a full-length Persian article from an earlier session, but the user flagged it as "not fluent modern Persian" — it read as a stiff, calque-heavy academic translation (heavy parenthetical transliterations like "کِریگما", literal renderings of English idiom). Rewrote every paragraph for natural flow while preserving full length and every factual detail, per `translation-rules.md`. Lesson: passing the structural/length checker does not mean the prose reads naturally — fluency needs a human judgment pass independent of the checker.
- **Gnosticism** (`fa/gnosticism.ts`) was still the English-placeholder re-export. Translated the full article from the English source (`src/data/religion-articles/gnosticism.ts`) end to end, plus added `GNOSTICISM_META_FA` to `religion-meta.fa.ts` (missed for Christianity — see checklist above).
- Terminology decisions for Gnosticism, for future consistency: دمیورگ (demiurge), پلیروما (pleroma), ائون (aeon), سیزیگی (syzygy), آرخون (archon), سوفیا (Sophia) — transliterations, since these are Western-scholarly coinages with no independent Persian tradition. Exception: **Seth → شیث**, reusing the name already established in Persian/Islamic prophetic tradition (Shith) rather than transliterating "Seth" fresh — this made "Sethian → شیثی" read naturally instead of as a neologism. Plotinus's *Enneads* → تاسوعات (انئادها), reusing the existing Persian-philosophical-tradition term for the Enneads (from the Islamic reception of Neoplatonism) rather than inventing a transliteration.
- Confirmed via `scripts/check-fa-translation.ts` that both modules produce zero fidelity warnings, dropping the explicit-fallback count from 38 to 36.
- Git workflow used: branched off `main` before committing (repo convention: never commit directly to the default branch), pushed the branch, then merged to `main` with `--no-ff` on the user's explicit request and deleted the branch after.

## Generating/refreshing the stub files

```bash
npx tsx scripts/scaffold-locale-articles.ts fa
```

Safe to re-run any time — only creates files that don't exist yet, and always regenerates `src/data/religion-articles/fa/articles.ts` (auto-generated, don't hand-edit).
