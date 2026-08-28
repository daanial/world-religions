import { ARTICLES } from "../src/data/religion-articles/articles";
import { ARTICLES_FA } from "../src/data/religion-articles/fa/articles";

const sections = ["overview", "history", "worldview", "texts", "practice", "diversity", "communities", "places", "debates"] as const;
let errors = 0;
let warnings = 0;
let fallbacks = 0;

for (const [id, source] of Object.entries(ARTICLES)) {
  const translation = ARTICLES_FA[id];
  if (!translation) {
    errors += 1;
    console.error(`[missing] fa/${id}`);
    continue;
  }

  if (translation === source) {
    fallbacks += 1;
    console.error(`[fallback] fa/${id}`);
    continue;
  }

  for (const section of sections) {
    const sourceValue = source[section];
    const translationValue = translation[section];
    if (!sourceValue && !translationValue) continue;
    if (!sourceValue || !translationValue) {
      errors += 1;
      console.error(`[section] ${id}.${section} is missing in one locale`);
      continue;
    }
    const sourceParagraphs = Array.isArray(sourceValue) ? sourceValue : sourceValue.content;
    const translationParagraphs = Array.isArray(translationValue) ? translationValue : translationValue.content;
    if (sourceParagraphs.length !== translationParagraphs.length) {
      errors += 1;
      console.error(`[paragraphs] ${id}.${section}: ${translationParagraphs.length}/${sourceParagraphs.length}`);
    }
    const sourceLength = sourceParagraphs.join("").length;
    const translationLength = translationParagraphs.join("").length;
    if (translationLength < sourceLength * 0.35) {
      warnings += 1;
      console.warn(`[review] ${id}.${section}: translated text is ${Math.round(translationLength / sourceLength * 100)}% of source length; sentence-level review required`);
    }
  }

  if ((translation.keyTerms?.length ?? 0) !== (source.keyTerms?.length ?? 0)) {
    errors += 1;
    console.error(`[terms] ${id}: ${translation.keyTerms?.length ?? 0}/${source.keyTerms?.length ?? 0}`);
  }
  if (translation.sources.length !== source.sources.length) {
    errors += 1;
    console.error(`[sources] ${id}: ${translation.sources.length}/${source.sources.length}`);
  }
}

console.log(`Checked ${Object.keys(ARTICLES).length} article modules: ${errors} structural errors, ${warnings} fidelity warnings, ${fallbacks} explicit fallbacks.`);
if (errors > 0) process.exitCode = 1;
