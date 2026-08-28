# Persian translation fidelity audit

Audit date: 2026-08-28

## Result

The Persian localization is not complete and must not yet be described as a full translation. The five religion modules without fallback markers are working Persian modules, but several contain condensed prose rather than a paragraph-by-paragraph translation of the English source. The Imam Reza/Fatima Masumeh passage in Islam was one confirmed example and has been restored in full detail.

Character totals are only a warning signal because Persian and English do not have a fixed length ratio. The large differences below are nevertheless strong evidence of omitted source detail and require sentence-level review before a module can be marked complete.

| Article | Sections checked | Terms | Sources | Fidelity finding |
|---|---:|---:|---:|---|
| Buddhism | 9/9 present; paragraph counts preserved | 12/12 | 12/12 | Condensed across most long sections; not complete |
| Zoroastrianism | 9/9 present; places now 6/6 paragraphs | 20/20 | 12/12 | Condensed, especially communities and debates; not complete |
| Islam | 9/9 present; paragraph counts preserved | 20/20 | 14/14 | Most sections condensed; pilgrimage section now substantially restored; not complete |
| Judaism | 9/9 present; paragraph counts preserved | 20/20 | 11/11 | Strongly condensed across all long sections; not complete |
| Hinduism | 9/9 present; paragraph counts preserved | 12/12 | 12/12 | Strongly condensed across all long sections; not complete |

## Structured page datasets

These datasets have matching structural coverage and are not fallback stubs:

- Concepts: 19 English entries / 19 Persian entries.
- Inward Paths: 18 English figures / 18 Persian figures and 24 / 24 quotes.
- Pilgrimage: 5 English route content records / 5 Persian route content records.

Matching counts do not prove that every sentence is fully translated; long-form prose still needs editorial comparison against its source. The RTL drop-cap defect in Inward Paths has been fixed separately.

## Current completion rule

A religion article is only “complete” when every English paragraph has a faithful Persian counterpart with its factual details, examples, qualifications and source coverage intact. Matching headings, paragraph counts, key terms or route records is not sufficient. Summaries must be labeled as drafts, not translations.

The permanent repository rules are recorded in [`AGENTS.md`](../AGENTS.md) and [`translation-rules.md`](./translation-rules.md). The structural checker currently reports **0 structural errors, 33 fidelity warnings, and 39 explicit fallbacks**; it is [`scripts/check-fa-translation.ts`](../scripts/check-fa-translation.ts). All three must remain in place for future translation phases.

TTS/narration is parked and is not part of this audit or translation scope.
