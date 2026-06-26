import { createHash } from "node:crypto";

const OPENAI_SPEECH_URL = "https://api.openai.com/v1/audio/speech";
/** Cheapest OpenAI TTS tier ($15/1M chars). Use tts-1-hd only if quality is insufficient. */
const TTS_MODEL = "tts-1";
const TTS_VOICE = "nova";

export function hashNarrationText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 12);
}

export async function synthesizeOpenAISpeech(
  apiKey: string,
  text: string
): Promise<Buffer> {
  const response = await fetch(OPENAI_SPEECH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`OpenAI TTS failed (${response.status}): ${detail}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function isQuotaError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("insufficient_quota") || message.includes("exceeded your current quota");
}
