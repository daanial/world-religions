import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import { CONCEPTS, CONCEPT_EDGES, type ConceptId } from "../data/concepts";
import { RELIGIONS } from "../data/religions";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

export default function Concepts() {
  const rootRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);
  const [active, setActive] = useState<ConceptId | null>(null);

  useEffect(() => {
    if (!active || !detailRef.current) return;
    detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  // map concept id → religions that engage it
  const conceptReligions = useMemo(() => {
    const map: Record<string, typeof RELIGIONS> = {};
    CONCEPTS.forEach((c) => {
      map[c.id] = RELIGIONS.filter((r) => (r.concepts as string[]).includes(c.id));
    });
    return map;
  }, []);

  // related concepts (via edges)
  const related = useMemo(() => {
    if (!active) return [];
    const ids = new Set<ConceptId>();
    CONCEPT_EDGES.forEach((e) => {
      if (e.source === active) ids.add(e.target);
      if (e.target === active) ids.add(e.source);
    });
    return CONCEPTS.filter((c) => ids.has(c.id));
  }, [active]);

  return (
    <div className="page concepts-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head">
          <div className="eyebrow reveal">The big ideas</div>
          <h1 className="page__title reveal">Concept Network</h1>
          <p className="page__lead reveal">
            The world's religions converge on a handful of great ideas — soul, salvation, karma,
            judgement. Tap any concept to see the traditions that hold it and the ideas that connect
            to it.
          </p>
        </header>

        <div className="concepts-grid reveal-stagger">
          {CONCEPTS.map((c) => {
            const isActive = active === c.id;
            const count = conceptReligions[c.id]?.length ?? 0;
            return (
              <button
                key={c.id}
                className={`concept-card card ${isActive ? "concept-card--active" : ""}`}
                style={{ "--accent": c.accent } as React.CSSProperties}
                onClick={() => setActive(isActive ? null : c.id)}
              >
                <div className="concept-card__glow" style={{ background: c.accent }} />
                <div className="concept-card__head">
                  <span className="concept-card__dot" style={{ background: c.accent }} />
                  <h3 className="concept-card__name">{c.label}</h3>
                </div>
                <p className="concept-card__desc">{c.description}</p>
                <div className="concept-card__foot">
                  <span className="concept-card__count">{count} tradition{count === 1 ? "" : "s"}</span>
                  <span className="concept-card__action">{isActive ? "Selected" : "Explore"}</span>
                </div>
              </button>
            );
          })}
        </div>

        {active && (
          <section ref={detailRef} className="concept-detail card" key={active}>
            <div className="concept-detail__head">
              <div>
                <div className="eyebrow" style={{ color: CONCEPTS.find((c) => c.id === active)?.accent }}>
                  Concept detail
                </div>
                <h2 className="concept-detail__title">
                  {CONCEPTS.find((c) => c.id === active)?.label}
                </h2>
              </div>
              <button className="concept-detail__close" onClick={() => setActive(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <p className="concept-detail__desc">
              {CONCEPTS.find((c) => c.id === active)?.description}
            </p>

            {related.length > 0 && (
              <div className="concept-detail__block">
                <div className="concept-detail__subhead">Connected concepts</div>
                <div className="concept-detail__chips">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      className="concept-chip"
                      style={{ borderColor: r.accent, color: r.accent }}
                      onClick={() => setActive(r.id)}
                    >
                      <span className="concept-chip__dot" style={{ background: r.accent }} />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="concept-detail__block">
              <div className="concept-detail__subhead">
                Traditions engaging this concept ({conceptReligions[active]?.length ?? 0})
              </div>
              <div className="concept-detail__religions">
                {conceptReligions[active]?.map((r) => (
                  <Link
                    key={r.id}
                    to={`/religion/${r.id}`}
                    className="concept-religion"
                    style={{ borderColor: r.accent }}
                  >
                    <span className="concept-religion__dot" style={{ background: r.accent }} />
                    <span className="concept-religion__name">{r.name}</span>
                    <span className="concept-religion__family">{r.family}</span>
                  </Link>
                ))}
                {conceptReligions[active]?.length === 0 && (
                  <p className="concept-detail__none">No traditions tagged yet.</p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
