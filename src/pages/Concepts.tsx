import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";
import NarrationButton from "../components/NarrationButton";
import { CONCEPTS, CONCEPT_EDGES, type ConceptId } from "../data/concepts";
import { CONCEPTS_FA } from "../data/concepts.fa";
import { RELIGIONS } from "../data/religions";
import { usePageSeo } from "../lib/seo";
import { conceptNarrationId } from "../lib/narration-catalog";
import { useRegisterNarration } from "../context/NarrationContext";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale } from "../lib/locale";
import { useT } from "../lib/i18n";

export default function Concepts() {
  const rootRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);
  const locale = useLocale();
  const t = useT();
  const [active, setActive] = useState<ConceptId | null>(null);

  // Localized concept list — CONCEPTS_FA is complete for all 19 concepts
  // (small, fixed dataset, unlike the deferred religion articles), so
  // this only needs a locale check, not a per-key fallback.
  const concepts = useMemo(() => {
    if (locale !== "fa") return CONCEPTS;
    return CONCEPTS.map((c) => {
      const tr = CONCEPTS_FA[c.id];
      return tr ? { ...c, label: tr.label, description: tr.description } : c;
    });
  }, [locale]);

  const activeConcept = active ? concepts.find((c) => c.id === active) : undefined;

  useRegisterNarration(
    activeConcept ? conceptNarrationId(activeConcept.id) : null,
    activeConcept?.label ?? ""
  );

  usePageSeo({
    title: t("conceptsSeoTitle"),
    description: t("conceptsSeoDescription"),
    path: "/concepts",
  });

  useEffect(() => {
    if (!active || !detailRef.current) return;
    detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  // map concept id → religions that engage it
  const conceptReligions = useMemo(() => {
    const map: Record<string, typeof RELIGIONS> = {};
    concepts.forEach((c) => {
      map[c.id] = RELIGIONS.filter((r) => r.conceptPositions?.[c.id] === "affirmed");
    });
    return map;
  }, [concepts]);

  // related concepts (via edges)
  const related = useMemo(() => {
    if (!active) return [];
    const ids = new Set<ConceptId>();
    CONCEPT_EDGES.forEach((e) => {
      if (e.source === active) ids.add(e.target);
      if (e.target === active) ids.add(e.source);
    });
    return concepts.filter((c) => ids.has(c.id));
  }, [active, concepts]);

  return (
    <div className="page concepts-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head">
          <div className="eyebrow reveal">{t("conceptsEyebrow")}</div>
          <h1 className="page__title reveal">{t("conceptsTitle")}</h1>
          <p className="page__lead reveal">{t("conceptsLead")}</p>
        </header>

        <div className="concepts-grid reveal-stagger">
          {concepts.map((c) => {
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
                  <span className="concept-card__count">
                    {count} {count === 1 ? t("conceptsTraditionSingular") : t("conceptsTraditionPlural")}
                  </span>
                  <span className="concept-card__action">
                    {isActive ? t("conceptsSelected") : t("conceptsExplore")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {active && (
          <section ref={detailRef} className="concept-detail card" key={active}>
            <div className="concept-detail__head">
              <div>
                <div className="eyebrow" style={{ color: activeConcept?.accent }}>
                  {t("conceptsDetailEyebrow")}
                </div>
                <div className="concept-detail__title-row">
                  <h2 className="concept-detail__title">{activeConcept?.label}</h2>
                  <NarrationButton
                    id={conceptNarrationId(active)}
                    label={activeConcept?.label ?? "concept"}
                    variant="prominent"
                  />
                </div>
              </div>
              <button
                className="concept-detail__close"
                onClick={() => setActive(null)}
                aria-label={t("conceptsClose")}
              >
                ✕
              </button>
            </div>
            <p className="concept-detail__desc">{activeConcept?.description}</p>

            {related.length > 0 && (
              <div className="concept-detail__block">
                <div className="concept-detail__subhead">{t("conceptsConnected")}</div>
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
                {t("conceptsEngaging")} ({conceptReligions[active]?.length ?? 0})
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
                  <p className="concept-detail__none">{t("conceptsNoneTagged")}</p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
