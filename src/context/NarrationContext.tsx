import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useApp } from "./AppContext";
import { resolveNarrationAudioUrl, type NarrationStatus } from "../lib/narration";

interface NarrationRegistration {
  id: string;
  label: string;
}

interface NarrationContextValue {
  registration: NarrationRegistration | null;
  register: (id: string | null, label?: string) => void;
  status: NarrationStatus;
  error: string | null;
  activeId: string | null;
  toggleNarration: (id: string) => void;
  stop: () => void;
}

let globalAudio: HTMLAudioElement | null = null;
let globalStop: (() => void) | null = null;

function stopActiveNarration(): void {
  globalStop?.();
  globalStop = null;
  globalAudio = null;
}

const NarrationCtx = createContext<NarrationContextValue | null>(null);

export function NarrationProvider({ children }: { children: ReactNode }) {
  const { ambientOn, setAmbientOn } = useApp();
  const [registration, setRegistration] = useState<NarrationRegistration | null>(null);
  const [status, setStatus] = useState<NarrationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const ambientWasOnRef = useRef(false);
  const stopRef = useRef<() => void>(() => {});

  const register = useCallback((id: string | null, label = "") => {
    setRegistration(id ? { id, label } : null);
  }, []);

  const releaseObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.onended = null;
      audio.onerror = null;
      audioRef.current = null;
    }
    releaseObjectUrl();
    if (ambientWasOnRef.current) {
      setAmbientOn(true);
      ambientWasOnRef.current = false;
    }
    if (globalAudio === audio) {
      globalAudio = null;
      globalStop = null;
    }
    setActiveId(null);
    setStatus("idle");
    setError(null);
  }, [releaseObjectUrl, setAmbientOn]);

  useEffect(() => {
    stopRef.current = stop;
  }, [stop]);

  const toggleNarration = useCallback(
    async (id: string) => {
      if (status === "playing" && activeId === id) {
        audioRef.current?.pause();
        setStatus("paused");
        return;
      }

      if (status === "paused" && activeId === id && audioRef.current) {
        try {
          await audioRef.current.play();
          setStatus("playing");
        } catch {
          setStatus("error");
          setError("Playback failed");
        }
        return;
      }

      stopActiveNarration();
      setStatus("loading");
      setError(null);
      setActiveId(id);

      if (ambientOn) {
        ambientWasOnRef.current = true;
        setAmbientOn(false);
      }

      try {
        const url = await resolveNarrationAudioUrl(id);
        if (url.startsWith("blob:")) {
          releaseObjectUrl();
          objectUrlRef.current = url;
        }

        const audio = new Audio(url);
        audioRef.current = audio;
        globalAudio = audio;
        globalStop = () => stopRef.current();

        audio.onended = () => stopRef.current();
        audio.onerror = () => {
          setStatus("error");
          setError("Playback failed");
          stopRef.current();
        };

        await audio.play();
        setStatus("playing");
      } catch (err) {
        if (ambientWasOnRef.current) {
          setAmbientOn(true);
          ambientWasOnRef.current = false;
        }
        setActiveId(null);
        setStatus("error");
        setError(err instanceof Error ? err.message : "Couldn't load narration");
      }
    },
    [activeId, ambientOn, releaseObjectUrl, setAmbientOn, status]
  );

  useEffect(() => {
    return () => {
      if (globalAudio === audioRef.current) {
        globalAudio = null;
        globalStop = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      releaseObjectUrl();
    };
  }, [releaseObjectUrl]);

  const value = useMemo<NarrationContextValue>(
    () => ({
      registration,
      register,
      status,
      error,
      activeId,
      toggleNarration,
      stop,
    }),
    [registration, register, status, error, activeId, toggleNarration, stop]
  );

  return <NarrationCtx.Provider value={value}>{children}</NarrationCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useNarration(): NarrationContextValue {
  const ctx = useContext(NarrationCtx);
  if (!ctx) throw new Error("useNarration must be used within NarrationProvider");
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useRegisterNarration(id: string | null, label: string): void {
  const { register } = useNarration();
  useEffect(() => {
    register(id, label);
    return () => register(null);
  }, [id, label, register]);
}
