import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildNarrationCatalog } from "../src/lib/narration-catalog.ts";
import { hashNarrationText, isQuotaError, synthesizeOpenAISpeech } from "../lib/tts-utils.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const audioDir = path.join(rootDir, "public", "audio");
const manifestPath = path.join(audioDir, "manifest.json");

interface ManifestItem {
  id: string;
  hash: string;
  file: string;
}

interface Manifest {
  version: number;
  items: ManifestItem[];
}

async function loadExistingManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(manifestPath, "utf8");
    const parsed = JSON.parse(raw) as Manifest;
    if (Array.isArray(parsed.items)) return parsed;
  } catch {
    /* start fresh */
  }
  return { version: 1, items: [] };
}

async function main(): Promise<void> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("[generate-tts] OPENAI_API_KEY not set — skipping TTS generation.");
    return;
  }

  const force = process.argv.includes("--force");
  const catalog = buildNarrationCatalog();
  const existing = await loadExistingManifest();
  const existingById = new Map(existing.items.map((item) => [item.id, item]));

  await mkdir(audioDir, { recursive: true });

  const items: ManifestItem[] = [];
  let generated = 0;
  let skipped = 0;

  for (const unit of catalog) {
    const hash = hashNarrationText(unit.text);
    const file = `${unit.id}.mp3`;
    const filePath = path.join(audioDir, file);
    const previous = existingById.get(unit.id);

    if (!force && previous?.hash === hash && existsSync(filePath)) {
      items.push({ id: unit.id, hash, file });
      skipped += 1;
      continue;
    }

    process.stdout.write(`[generate-tts] ${unit.id}… `);
    try {
      const audio = await synthesizeOpenAISpeech(apiKey, unit.text);
      await writeFile(filePath, audio);
      items.push({ id: unit.id, hash, file });
      generated += 1;
      console.log("done");
    } catch (error) {
      console.log("failed");
      console.error(error);
      if (isQuotaError(error)) {
        console.error(
          "[generate-tts] OpenAI quota exceeded — add billing/credits at https://platform.openai.com/account/billing then re-run."
        );
        process.exit(1);
      }
      if (previous && existsSync(filePath)) {
        items.push(previous);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const manifest: Manifest = { version: 1, items };
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(
    `[generate-tts] Complete — ${generated} generated, ${skipped} skipped, ${items.length} total.`
  );
}

main().catch((error) => {
  console.error("[generate-tts] Fatal error:", error);
  process.exit(1);
});
