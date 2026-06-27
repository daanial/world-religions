import { useRef } from "react";
import { Link } from "react-router-dom";
import PopulationChart from "../components/PopulationChart";
import Starfield from "../components/Starfield";
import TimelineChart from "../components/TimelineChart";
import { RELIGIONS } from "../data/religions";
import { formatYear } from "../lib/format";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

export default function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: "Interactive Timeline",
    description:
      "Trace 6,000 years of religious history across 34 traditions. Drag, zoom, and explore births, schisms, and extinctions on an interactive timeline.",
    path: "/timeline",
  });

  const visible = RELIGIONS;

  return (
    <div className="page tl-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head tl-page__head">
          <div className="eyebrow reveal">6,000 years, one ribbon</div>
          <h1 className="page__title reveal">Interactive Timeline</h1>
          <p className="page__lead reveal">
            Each ribbon is a tradition, from its birth to today (or its quiet end). Dotted lines
            mark schisms; the † marks faiths now gone. Click any tradition to dive in.
          </p>
        </header>

        <div className="tl-toolbar glass reveal">
          <div className="tl-toolbar__legend">
            <span className="tl-leg">
              <span className="tl-leg__dot tl-leg__dot--birth" /> Birth
            </span>
            <span className="tl-leg">
              <span className="tl-leg__bar" /> Lifespan
            </span>
            <span className="tl-leg">
              <span className="tl-leg__line" /> Schism
            </span>
            <span className="tl-leg">
              <span className="tl-leg__extinct" aria-hidden>†</span> Extinct
            </span>
          </div>
        </div>

        <div className="tl-wrap card reveal">
          <TimelineChart accent="var(--gold)" filter={{ extinct: true, living: true }} />
        </div>

        <PopulationChart />

        {/* directory */}
        <section className="tl-directory reveal">
          <h2 className="tl-directory__title">All {visible.length} traditions</h2>
          <div className="tl-directory__grid reveal-stagger">
            {visible.map((r) => (
              <Link key={r.id} to={`/religion/${r.id}`} className="tl-card card">
                <div className="tl-card__bar" style={{ background: r.accent }} />
                <div className="tl-card__head">
                  <h3>{r.name}</h3>
                  {r.extinct && <span className="tl-card__extinct">† Extinct</span>}
                </div>
                <div className="tl-card__meta">
                  {formatYear(r.origin)}
                  {r.ended ? ` – ${formatYear(r.ended)}` : " – present"}
                </div>
                <p className="tl-card__blurb">{r.blurb}</p>
                <div className="tl-card__footer">
                  <span className="tag">{r.family}</span>
                  <span className="tl-card__go" style={{ color: r.accent }}>
                    Explore →
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
