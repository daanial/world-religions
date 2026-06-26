import { useNarration } from "../context/NarrationContext";

export type NarrationButtonVariant = "compact" | "prominent";

interface NarrationButtonProps {
  id: string;
  label: string;
  variant?: NarrationButtonVariant;
  className?: string;
}

export default function NarrationButton({
  id,
  label,
  variant = "prominent",
  className = "",
}: NarrationButtonProps) {
  const { status, error, activeId, toggleNarration } = useNarration();

  const isActive = activeId === id;
  const isPlaying = isActive && status === "playing";
  const isLoading = isActive && status === "loading";
  const isPaused = isActive && status === "paused";

  const title = isPlaying
    ? `Pause narration for ${label}`
    : isPaused
      ? `Resume narration for ${label}`
      : `Listen to ${label}`;

  const statusLabel = isLoading ? "Loading…" : isPlaying ? "Playing" : isPaused ? "Paused" : "Listen";

  if (variant === "compact") {
    return (
      <button
        type="button"
        className={`icon-btn narration-btn ${isPlaying ? "narration-btn--active" : ""} ${className}`.trim()}
        onClick={() => void toggleNarration(id)}
        disabled={isLoading}
        aria-label={title}
        aria-pressed={isPlaying}
        aria-busy={isLoading}
        title={title}
      >
        {isLoading ? <LoadingIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    );
  }

  return (
    <div className={`narration-control narration-control--prominent ${className}`.trim()}>
      <button
        type="button"
        className={`narration-btn-prominent ${isPlaying ? "narration-btn-prominent--active" : ""} ${isLoading ? "narration-btn-prominent--loading" : ""}`}
        onClick={() => void toggleNarration(id)}
        disabled={isLoading}
        aria-label={title}
        aria-pressed={isPlaying}
        aria-busy={isLoading}
        title={title}
      >
        <span className="narration-btn-prominent__icon" aria-hidden>
          {isLoading ? <LoadingIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
        <span className="narration-btn-prominent__label">{statusLabel}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {isLoading && `Loading narration for ${label}`}
        {isActive && error && `Narration error: ${error}`}
      </span>
      {isActive && error && status === "error" && (
        <span className="narration-control__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      className="narration-btn__spinner"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}
