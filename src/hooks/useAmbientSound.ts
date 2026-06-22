import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

/**
 * Generative ambient soundscape using the Web Audio API.
 * No external files required — synthesized temple bells, wind, and a soft drone.
 * Activated by the global ambient toggle in the app context.
 */
export function useAmbientSound() {
  const { ambientOn } = useApp();
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const stoppersRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    if (!ambientOn) {
      // tear down
      stoppersRef.current.forEach((fn) => fn());
      stoppersRef.current = [];
      if (ctxRef.current && masterRef.current) {
        masterRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
        masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.6);
      }
      const ctx = ctxRef.current;
      if (ctx) {
        const t = window.setTimeout(() => {
          ctx.close().catch(() => {});
          ctxRef.current = null;
          masterRef.current = null;
        }, 800);
        return () => window.clearTimeout(t);
      }
      return;
    }

    // build
    const AC =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx: AudioContext = new AC();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    master.connect(ctx.destination);
    masterRef.current = master;

    const stoppers: Array<() => void> = [];

    // 1. Low drone (two slightly detuned sine waves)
    stoppers.push(drone(ctx, master, 110, 0.06));
    stoppers.push(drone(ctx, master, 110 * 1.5, 0.04));
    stoppers.push(drone(ctx, master, 220, 0.025));

    // 2. Filtered noise wind
    stoppers.push(wind(ctx, master));

    // 3. Periodic temple bell
    const bellTimer = window.setInterval(() => {
      if (ctx.state === "suspended") return;
      // Pentatonic-ish bell frequencies
      const freqs = [523.25, 587.33, 698.46, 783.99, 880.0];
      const f = freqs[Math.floor(Math.random() * freqs.length)];
      bell(ctx, master, f);
    }, 9000 + Math.random() * 6000);
    stoppers.push(() => window.clearInterval(bellTimer));

    // play one bell shortly after start
    window.setTimeout(() => bell(ctx, master, 523.25), 1200);

    stoppersRef.current = stoppers;

    return () => {
      stoppers.forEach((fn) => fn());
      stoppersRef.current = [];
    };
  }, [ambientOn]);
}

/* ---------- sound generators ---------- */

function drone(ctx: AudioContext, out: GainNode, freq: number, gain: number): () => void {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  // slight detune wobble
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.08 + Math.random() * 0.1;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.6;
  lfo.connect(lfoGain).connect(osc.detune);
  const g = ctx.createGain();
  g.gain.value = gain;
  osc.connect(g).connect(out);
  osc.start();
  lfo.start();
  return () => {
    try {
      osc.stop();
      lfo.stop();
    } catch {
      /* already stopped */
    }
  };
}

function wind(ctx: AudioContext, out: GainNode): () => void {
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 420;
  filter.Q.value = 0.6;

  // slow swell on gain
  const swell = ctx.createOscillator();
  swell.frequency.value = 0.05;
  const swellGain = ctx.createGain();
  swellGain.gain.value = 0.03;
  const baseGain = ctx.createGain();
  baseGain.gain.value = 0.045;
  swell.connect(swellGain).connect(baseGain.gain);

  noise.connect(filter).connect(baseGain).connect(out);
  noise.start();
  swell.start();
  return () => {
    try {
      noise.stop();
      swell.stop();
    } catch {
      /* already stopped */
    }
  };
}

function bell(ctx: AudioContext, out: GainNode, freq: number) {
  const now = ctx.currentTime;
  const partials = [1, 2.0, 2.4, 3.2];
  const gains = [0.18, 0.08, 0.05, 0.03];
  partials.forEach((p, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * p;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gains[i], now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
    osc.connect(g).connect(out);
    osc.start(now);
    osc.stop(now + 4.6);
  });
}
