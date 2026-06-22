import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import Globe from "../components/Globe";
import { SITES, type SacredSite } from "../data/sites";
import { RELIGIONS } from "../data/religions";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

export default function GlobeView() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);
  const [selected, setSelected] = useState<SacredSite | null>(null);

  return (
    <div className="page globe-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container globe-layout">
        <header className="page__head">
          <div className="eyebrow reveal">Sacred geography</div>
          <h1 className="page__title reveal">A Living Globe</h1>
          <p className="page__lead reveal">
            Drag to spin the Earth. Click a glowing pin — or pick a place below — to fly there and
            read its story.
          </p>
        </header>

        <div className="globe-stage card reveal">
          <Globe
            selectedId={selected?.id ?? null}
            onSelect={(site) => setSelected(site)}
          />
          <div className="globe-stage__hint">
            <span className="globe-stage__hint-dot" /> drag to rotate · click a pin
          </div>
        </div>

        <aside className={`globe-panel card ${selected ? "is-open" : ""}`}>
          {selected ? (
            <SitePanel site={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="globe-panel__empty">
              <div className="globe-panel__empty-title">Sacred Sites</div>
              <p>Pick one of {SITES.length} locations to begin.</p>
            </div>
          )}
        </aside>

        <section className="globe-sites">
          <h2 className="globe-sites__title">All sacred places</h2>
          <div className="globe-sites__grid">
            {SITES.map((site) => (
              <button
                key={site.id}
                className={`site-chip ${selected?.id === site.id ? "site-chip--active" : ""}`}
                style={{ "--accent": site.accent } as React.CSSProperties}
                onClick={() => setSelected(site)}
              >
                <span className="site-chip__dot" />
                <span className="site-chip__name">{site.name}</span>
                <span className="site-chip__count">
                  {site.religions.length} faith{site.religions.length > 1 ? "s" : ""}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SitePanel({ site, onClose }: { site: SacredSite; onClose: () => void }) {
  const religions = RELIGIONS.filter((r) => site.religions.includes(r.id));
  return (
    <div className="site-panel">
      <div className="site-panel__head">
        <div>
          <div className="eyebrow" style={{ color: site.accent }}>
            {site.lat.toFixed(2)}°, {site.lng.toFixed(2)}°
          </div>
          <h2 className="site-panel__title">{site.name}</h2>
        </div>
        <button className="site-panel__close" onClick={onClose} aria-label="Close panel">
          ✕
        </button>
      </div>
      <p className="site-panel__blurb">{site.blurb}</p>
      <p className="site-panel__desc">{site.description}</p>

      {religions.length > 0 && (
        <div className="site-panel__religions">
          <div className="site-panel__subhead">Revered by</div>
          <div className="site-panel__religion-list">
            {religions.map((r) => (
              <Link
                key={r.id}
                to={`/religion/${r.id}`}
                className="site-panel__religion"
                style={{ borderColor: r.accent }}
              >
                <span className="site-panel__religion-dot" style={{ background: r.accent }} />
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
