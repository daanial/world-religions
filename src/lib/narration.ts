import { getCachedNarration, setCachedNarration } from "./narration-cache";

export type NarrationStatus = "idle" | "loading" | "playing" | "paused" | "error";

export interface NarrationManifestItem {
  id: string;
  hash: string;
  file: string;
}

export interface NarrationManifest {
  version: number;
  items: NarrationManifestItem[];
}

let manifestCache: NarrationManifest | null = null;
let manifestPromise: Promise<NarrationManifest | null> | null = null;

export async function loadNarrationManifest(): Promise<NarrationManifest | null> {
  if (manifestCache) return manifestCache;
  if (manifestPromise) return manifestPromise;

  manifestPromise = (async () => {
    try {
      const response = await fetch("/audio/manifest.json");
      if (!response.ok) return null;
      const data = (await response.json()) as NarrationManifest;
      if (!Array.isArray(data.items)) return null;
      manifestCache = data;
      return data;
    } catch {
      return null;
    } finally {
      manifestPromise = null;
    }
  })();

  return manifestPromise;
}

export function getManifestItem(
  manifest: NarrationManifest | null,
  id: string
): NarrationManifestItem | undefined {
  return manifest?.items.find((item) => item.id === id);
}

export async function staticAudioExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/** On-demand /api/tts is dev-only; production uses pre-generated files in public/audio/. */
export function canUseRuntimeTts(): boolean {
  return import.meta.env.DEV;
}

const PRODUCTION_NARRATION_ERROR =
  "Narration audio is not available. Run npm run generate:tts before deploying.";

export async function resolveNarrationAudioUrl(id: string): Promise<string> {
  const manifest = await loadNarrationManifest();
  const manifestItem = getManifestItem(manifest, id);
  if (manifestItem) {
    const staticUrl = `/audio/${manifestItem.file}`;
    if (await staticAudioExists(staticUrl)) {
      return staticUrl;
    }
  }

  const directUrl = `/audio/${id}.mp3`;
  if (await staticAudioExists(directUrl)) {
    return directUrl;
  }

  const cached = await getCachedNarration(id);
  if (cached) {
    return URL.createObjectURL(cached);
  }

  if (!canUseRuntimeTts()) {
    throw new Error(PRODUCTION_NARRATION_ERROR);
  }

  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    let message = "Couldn't load narration";
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      /* use default message */
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  await setCachedNarration(id, blob);
  return URL.createObjectURL(blob);
}
