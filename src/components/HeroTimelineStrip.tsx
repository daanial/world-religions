import { Link } from "react-router-dom";
import { RELIGIONS } from "../data/religions";
import { formatYear } from "../lib/format";

/** Horizontal-scrolling preview strip of religions across time, shown on the landing hero. */
export default function HeroTimelineStrip() {
  // Sort oldest first by origin
  const sorted = [...RELIGIONS].sort((a, b) => a.origin - b.origin);

  return (
    <div className="hero-strip">
      <div className="hero-strip__rail" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="hero-strip__tick" />
        ))}
      </div>
      <div className="hero-strip__scroll">
        {sorted.map((r, i) => (
          <Link
            key={r.id}
            to={`/religion/${r.id}`}
            className="hero-chip"
            style={
              {
                "--accent": r.accent,
                animationDelay: `${i * 0.05}s`,
              } as React.CSSProperties
            }
          >
            <span className="hero-chip__dot" />
            <span className="hero-chip__name">{r.name}</span>
            <span className="hero-chip__year">{formatYear(r.origin)}</span>
            {r.extinct && <span className="hero-chip__extinct">†</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
