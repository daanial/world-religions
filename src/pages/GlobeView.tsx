import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import Globe from "../components/Globe";
import { SITES, type SacredSite } from "../data/sites";
import { RELIGIONS } from "../data/religions";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";

export default function GlobeView() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);
  const [selected, setSelected] = useState<SacredSite | null>(null);
  const locale = useLocale();

  usePageSeo({
    title: locale === "fa" ? "کرهٔ جغرافیای مقدس" : "Sacred Geography Globe",
    description: locale === "fa" ? "مکان‌های مقدس جهان را روی کره‌ای تعاملی کاوش کنید؛ از اورشلیم و مکه تا واراناسی و لهاسا." : "Explore sacred sites across the world on an interactive globe. Fly between Jerusalem, Mecca, Varanasi, Lhasa, and other holy places.",
    path: "/globe",
  });

  return (
    <div className="page globe-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container globe-layout">
        <header className="page__head">
          <div className="eyebrow reveal">{pt(locale, "sacredGeography")}</div>
          <h1 className="page__title reveal">{pt(locale, "livingGlobe")}</h1>
          <p className="page__lead reveal">{pt(locale, "globeLead")}</p>
        </header>

        <div className="globe-stage card reveal">
          <Globe
            selectedId={selected?.id ?? null}
            onSelect={(site) => setSelected(site)}
          />
          <div className="globe-stage__hint">
            <span className="globe-stage__hint-dot" /> {pt(locale, "dragRotate")}
          </div>
        </div>

        <aside className={`globe-panel card ${selected ? "is-open" : ""}`}>
          {selected ? (
            <SitePanel site={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="globe-panel__empty">
              <div className="globe-panel__empty-title">{pt(locale, "sacredSites")}</div>
              <p>{pt(locale, "pickLocation", { count: SITES.length })}</p>
            </div>
          )}
        </aside>

        <section className="globe-sites">
          <h2 className="globe-sites__title">{pt(locale, "allSacredPlaces")}</h2>
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
                  {site.religions.length} {site.religions.length > 1 ? pt(locale, "faiths") : pt(locale, "faith")}
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
  const locale = useLocale();
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
        <button className="site-panel__close" onClick={onClose} aria-label={pt(locale, "closePanel")}>
          ✕
        </button>
      </div>
      <p className="site-panel__blurb">{site.blurb}</p>
      <p className="site-panel__desc">{site.description}</p>

      {religions.length > 0 && (
        <div className="site-panel__religions">
          <div className="site-panel__subhead">{pt(locale, "reveredBy")}</div>
          <div className="site-panel__religion-list">
            {religions.map((r) => (
              <Link
                key={r.id}
                to={withLocale(locale, `/religion/${r.id}`)}
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
