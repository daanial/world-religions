# Translation rules

These rules apply to every locale and every translated content file in this repository.

1. Never summarize, condense, shorten, paraphrase away, or selectively omit source content.
2. Translate every source paragraph and preserve every factual detail, example, date, number, place, named person, qualification, disagreement, and causal relationship.
3. Preserve the source structure and paragraph boundaries. Do not merge multiple source paragraphs into one or split content in a way that loses traceability.
4. Preserve the complete source lists. Do not drop key terms, definitions, references, links, citations, or source entries.
5. Preserve uncertainty and attribution. “Scholars debate,” “tradition holds,” and similar qualifications must remain qualified in translation.
6. If a faithful translation cannot be completed, leave the content marked as an explicit fallback/draft and report the gap. Do not present a summary as a completed translation.
7. A matching paragraph count is necessary but not sufficient. Every translated paragraph requires sentence-level comparison with the source before it can be marked complete.

## Required verification

Run the structural checker before committing locale content:

```bash
npx tsx scripts/check-fa-translation.ts
```

The checker catches missing sections, missing paragraph records, missing terms, missing sources, and fallback placeholders. It cannot prove semantic fidelity; that still requires a human sentence-level review against the English source.
