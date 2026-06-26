import { getNarrationUnit, isAllowedNarrationId } from "../src/lib/narration-catalog";
import { hashNarrationText, synthesizeOpenAISpeech } from "../lib/tts-utils";

function isProductionRuntime(): boolean {
  return process.env.VERCEL_ENV === "production";
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request): Promise<Response> {
  if (isProductionRuntime()) {
    return Response.json(
      { error: "Runtime TTS is disabled in production. Use pre-generated /audio/*.mp3 files." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "TTS not configured" }, { status: 503 });
  }

  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { id } = body;
  if (!id || typeof id !== "string" || !isAllowedNarrationId(id)) {
    return Response.json({ error: "Unknown narration id" }, { status: 400 });
  }

  const unit = getNarrationUnit(id);
  if (!unit?.text.trim()) {
    return Response.json({ error: "No narration text" }, { status: 400 });
  }

  try {
    const audio = await synthesizeOpenAISpeech(apiKey, unit.text);
    const hash = hashNarrationText(unit.text);

    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Narration-Id": id,
        "X-Content-Hash": hash,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "TTS synthesis failed";
    return Response.json({ error: message }, { status: 502 });
  }
}
