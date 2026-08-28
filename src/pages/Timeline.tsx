import { useRef } from "react";
import { Link } from "react-router-dom";
import PopulationChart from "../components/PopulationChart";
import Starfield from "../components/Starfield";
import TimelineChart from "../components/TimelineChart";
import { RELIGIONS } from "../data/religions";
import { formatYear } from "../lib/format";
import { getReligionImageSrc, getReligionThumbnailSrc } from "../lib/religionImages";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";

export default function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);
  const locale = useLocale();

  usePageSeo({
    title: locale === "fa" ? "جدول زمانی تعاملی" : "Interactive Timeline",
    description: locale === "fa" ? "تاریخ ۶٬۰۰۰ سالهٔ ۴۴ سنت را دنبال کنید و پیدایش‌ها، انشعاب‌ها و نابودی‌ها را روی جدولی تعاملی ببینید." : "Trace 6,000 years of religious history across 44 traditions. Drag, zoom, and explore births, schisms, and extinctions on an interactive timeline.",
    path: "/timeline",
  });

  const visible = RELIGIONS;

  return (
    <div className="page tl-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head tl-page__head">
          <div className="eyebrow reveal">{pt(locale, "timelineEyebrow")}</div>
          <h1 className="page__title reveal">{pt(locale, "timelineTitle")}</h1>
          <p className="page__lead reveal">{pt(locale, "timelineLead")}</p>
        </header>

        <div className="tl-toolbar glass reveal">
          <div className="tl-toolbar__legend">
            <span className="tl-leg">
              <span className="tl-leg__dot tl-leg__dot--birth" /> {pt(locale, "birth")}
            </span>
            <span className="tl-leg">
              <span className="tl-leg__bar" /> {pt(locale, "lifespan")}
            </span>
            <span className="tl-leg">
              <span className="tl-leg__line" /> {pt(locale, "schism")}
            </span>
            <span className="tl-leg">
              <span className="tl-leg__extinct" aria-hidden>†</span> {pt(locale, "extinct")}
            </span>
          </div>
        </div>

        <div className="tl-wrap card reveal">
          <TimelineChart accent="var(--gold)" filter={{ extinct: true, living: true }} />
        </div>

        <PopulationChart />

        {/* directory */}
        <section className="tl-directory reveal">
          <h2 className="tl-directory__title">{pt(locale, "allTraditions", { count: visible.length })}</h2>
          <div className="tl-directory__grid reveal-stagger">
            {visible.map((r) => (
              <Link key={r.id} to={withLocale(locale, `/religion/${r.id}`)} className="tl-card card">
                <div className="tl-card__bar" style={{ background: r.accent }} />
                {(() => {
                  const imgSrc = getReligionThumbnailSrc(r.id) ?? getReligionImageSrc(r.id);
                  return imgSrc ? (
                    <div className="tl-card__image">
                      <img src={imgSrc} alt={`${r.name} plate`} loading="lazy" />
                    </div>
                  ) : null;
                })()}
                <div className="tl-card__head">
                  <h3>{r.name}</h3>
                  {r.extinct && <span className="tl-card__extinct">† {pt(locale, "extinct")}</span>}
                </div>
                <div className="tl-card__meta">
                  {formatYear(r.origin)}
                  {r.ended ? ` – ${formatYear(r.ended)}` : ` – ${pt(locale, "present")}`}
                </div>
                <p className="tl-card__blurb">{r.blurb}</p>
                <div className="tl-card__footer">
                  <span className="tag">{r.family}</span>
                  <span className="tl-card__go" style={{ color: r.accent }}>
                    {pt(locale, "explore")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
