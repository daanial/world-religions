import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "../components/Starfield";
import { RELIGIONS } from "../data/religions";
import { CONCEPTS } from "../data/concepts";
import { getReligionEssay } from "../data/religion-essays";
import { formatFollowers, formatYear, ageOf } from "../lib/format";
import { getReligionImageSrc } from "../lib/religionImages";
import { buildReligionArticleJsonLd, usePageSeo } from "../lib/seo";
import { useApp } from "../context/AppContext";
import NotFound from "./NotFound";

gsap.registerPlugin(ScrollTrigger);

export default function ReligionDetail() {
  const { id } = useParams<{ id: string }>();
  const religion = RELIGIONS.find((r) => r.id === id);
  const { visit, toggleCompare, isInCompare, compareIds } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (religion) visit(religion.id);
  }, [religion, visit]);

  useEffect(() => {
    if (!religion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".rd__eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".rd__name", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".rd__blurb", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".rd__infographic", { y: 24, opacity: 0, duration: 0.8 }, "-=0.35")
        .from(".rd__cta > *", { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from(".rd-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

      gsap.utils.toArray<HTMLElement>(".rd-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [religion]);

  const accent = religion?.accent ?? "#E6B450";
  const compareFull = religion ? compareIds.length >= 4 && !isInCompare(religion.id) : false;
  const related = religion
    ? RELIGIONS.filter((r) => r.id !== religion.id && r.family === religion.family).slice(0, 3)
    : [];
  const conceptNodes = religion
    ? CONCEPTS.filter((c) => religion.concepts.includes(c.id))
    : [];
  const essay = religion ? getReligionEssay(religion.id) : undefined;
  const imageSrc = religion ? getReligionImageSrc(religion.id) : undefined;

  usePageSeo(
    religion
      ? {
          title: religion.name,
          description: religion.blurb,
          path: `/religion/${religion.id}`,
          image: imageSrc,
          type: "article",
          jsonLd: buildReligionArticleJsonLd({
            name: religion.name,
            description: religion.blurb,
            path: `/religion/${religion.id}`,
            image: imageSrc,
          }),
        }
      : {
          title: "Religion not found",
          description: "The requested religion page could not be found.",
          path: `/religion/${id ?? "unknown"}`,
          noindex: true,
        }
  );

  if (!religion) return <NotFound />;

  return (
    <div
      ref={rootRef}
      className="rd"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <Starfield density="calm" drift accent={accent} />

      {/* ---------- HERO HEADER ---------- */}
      <header className="rd__hero">
        <div className="rd__hero-glow" aria-hidden />
        <div className="container rd__hero-content">
          <Link to="/timeline" className="rd__back">
            ← Back to Timeline
          </Link>
          <div className="rd__eyebrow eyebrow">
            <span className="rd__eyebrow-dot" style={{ background: accent }} />
            {religion.family} · {religion.region}
            {religion.extinct && <span className="rd__extinct">Extinct</span>}
            {!religion.extinct && !religion.living && <span className="rd__extinct">Historical</span>}
          </div>
          <h1 className="rd__name">{religion.name}</h1>
          <p className="rd__blurb">{religion.blurb}</p>
        </div>
        {imageSrc && (
          <figure className="rd__infographic">
            <img
              src={imageSrc}
              alt={`${religion.name} overview`}
              width={1600}
              height={1067}
              loading="eager"
              decoding="async"
            />
          </figure>
        )}
        <div className="container rd__hero-content">
          <div className="rd__cta">
            <button
              className={`btn ${isInCompare(religion.id) ? "btn--ghost" : "btn--primary"}`}
              onClick={() => toggleCompare(religion.id)}
              disabled={compareFull}
              style={compareFull ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
            >
              {isInCompare(religion.id) ? "✓ In comparison" : compareFull ? "Compare full" : "+ Add to compare"}
            </button>
            {religion.cities && religion.cities.length > 0 && (
              <Link to="/globe" className="btn btn--ghost">
                View on Globe
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ---------- STATS ---------- */}
      <section className="container rd__stats">
        <StatCard label="Founded" value={formatYear(religion.origin)} icon={OriginIcon} />
        <StatCard label="Age" value={religion.extinct ? `${ageOf(religion.origin, religion.ended)} yrs` : `${ageOf(religion.origin)} yrs`} icon={ClockIcon} />
        <StatCard
          label="Followers"
          value={religion.followers > 0 ? formatFollowers(religion.followers) : "—"}
          sub={religion.extinct ? "No longer practiced" : undefined}
          icon={PeopleIcon}
        />
        <StatCard label="Countries" value={religion.countries > 0 ? religion.countries.toString() : "—"} icon={GlobeSmallIcon} />
      </section>

      {/* ---------- DESCRIPTION ---------- */}
      <section className="container rd__section rd-reveal">
        <div className="rd__prose">
          <h2 className="rd__section-title">Origins & essence</h2>
          {essay ? (
            <>
              {essay.paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "rd__lead" : "rd__body"}>
                  {paragraph}
                </p>
              ))}
              <aside className="rd__sources" aria-label="Sources">
                <h3 className="rd__sources-title">Sources</h3>
                <ul className="rd__sources-list">
                  {essay.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </>
          ) : (
            <p className="rd__lead">{religion.description}</p>
          )}
          {religion.splitsFrom && (
            <p className="rd__lineage">
              <span className="rd__lineage-label">Emerges from</span>
              <Link to={`/religion/${religion.splitsFrom}`} className="rd__lineage-link">
                {RELIGIONS.find((r) => r.id === religion.splitsFrom)?.name} →
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* ---------- PRACTICES + CORE IDEAS ---------- */}
      <section className="container rd__two-col rd-reveal">
        <div className="rd__panel card">
          <div className="rd__panel-head">
            <PracticeIcon />
            <h3>Practices</h3>
          </div>
          <ul className="rd__practices">
            {religion.practices.map((p) => (
              <li key={p} className="rd__practice">
                <span className="rd__practice-bullet" style={{ background: accent }} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rd__panel card">
          <div className="rd__panel-head">
            <IdeaIcon />
            <h3>Core ideas</h3>
          </div>
          <dl className="rd__ideas">
            {religion.coreIdeas.map((idea) => (
              <div key={idea.label} className="rd__idea">
                <dt>{idea.label}</dt>
                <dd>{idea.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- SACRED TEXTS ---------- */}
      <section className="container rd__section rd-reveal">
        <h2 className="rd__section-title">Sacred texts</h2>
        <div className="rd__texts">
          {religion.sacredTexts.map((t, i) => (
            <div key={t.name} className="rd__text card" style={{ "--i": i } as React.CSSProperties}>
              <div className="rd__text-spine" style={{ background: accent }} />
              <div className="rd__text-num">0{i + 1}</div>
              <div className="rd__text-name">{t.name}</div>
              <p className="rd__text-desc">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CONCEPTS ---------- */}
      {conceptNodes.length > 0 && (
        <section className="container rd__section rd-reveal">
          <div className="rd__concepts-head">
            <h2 className="rd__section-title">Engaged concepts</h2>
            <Link to="/concepts" className="rd__concepts-link">
              Open the concept network →
            </Link>
          </div>
          <div className="rd__concepts">
            {conceptNodes.map((c) => (
              <div key={c.id} className="rd__concept" title={c.description} style={{ borderColor: c.accent }}>
                <span className="rd__concept-dot" style={{ background: c.accent }} />
                {c.label}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- RELATED ---------- */}
      {related.length > 0 && (
        <section className="container rd__related rd-reveal">
          <h2 className="rd__section-title">Other {religion.family} traditions</h2>
          <div className="rd__related-grid">
            {related.map((r) => (
              <Link key={r.id} to={`/religion/${r.id}`} className="rd-card card">
                <div className="rd-card__bar" style={{ background: r.accent }} />
                <h4>{r.name}</h4>
                <p>{r.blurb}</p>
                <span className="rd-card__go" style={{ color: r.accent }}>Explore →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.FC;
}) {
  return (
    <div className="rd-stat card">
      <div className="rd-stat__icon">
        <Icon />
      </div>
      <div className="rd-stat__value">{value}</div>
      <div className="rd-stat__label">{label}</div>
      {sub && <div className="rd-stat__sub">{sub}</div>}
    </div>
  );
}

/* ---------- icons ---------- */
function OriginIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" strokeLinecap="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 8a3 3 0 0 1 0 6M17 20c0-2.5-1-4.5-2.5-5.5" strokeLinecap="round" />
    </svg>
  );
}
function GlobeSmallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}
function PracticeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6">
      <path d="M12 2v6M12 22v-4M5 12H2M22 12h-3M7 7l-2-2M19 19l-2-2M7 17l-2 2M19 5l-2 2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
function IdeaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6">
      <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" strokeLinejoin="round" />
    </svg>
  );
}
