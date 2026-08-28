import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "../components/Starfield";
import NarrationButton from "../components/NarrationButton";
import { RELIGIONS } from "../data/religions";
import { CONCEPTS } from "../data/concepts";
import { getReligionArticle } from "../data/religion-articles";
import { formatFollowers, formatYear, ageOf } from "../lib/format";
import { getReligionImageSrc } from "../lib/religionImages";
import { buildReligionArticleJsonLd, usePageSeo } from "../lib/seo";
import { religionNarrationId } from "../lib/narration-catalog";
import { useRegisterNarration } from "../context/NarrationContext";
import { useApp } from "../context/AppContext";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";
import { getRelationshipsFor, getDirectionalRelationship } from "../data/religion-relationships";
import { BUDDHISM_META_FA } from "../data/religion-meta.fa";
import NotFound from "./NotFound";

gsap.registerPlugin(ScrollTrigger);

function renderBold(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /\*\*(.+?)\*\*/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}

export default function ReligionDetail() {
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const religionBase = RELIGIONS.find((r) => r.id === id);
  const religion = useMemo(
    () => religionBase && locale === "fa" && religionBase.id === "buddhism"
      ? { ...religionBase, ...BUDDHISM_META_FA }
      : religionBase,
    [religionBase, locale]
  );
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
  
  const relationships = religion ? getRelationshipsFor(religion.id) : [];
  const relatedCards = religion
    ? relationships.map((rel) => {
        const dir = getDirectionalRelationship(religion.id, rel);
        const targetReligion = RELIGIONS.find((r) => r.id === dir.targetId);
        return targetReligion ? { ...dir, religion: targetReligion } : null;
      }).filter(Boolean)
    : [];
  
  const conceptNodes = religion
    ? CONCEPTS.filter((c) => religion.conceptPositions?.[c.id] === "affirmed")
    : [];
  const article = religion ? getReligionArticle(religion.id, locale) : null;
  const imageSrc = religion ? getReligionImageSrc(religion.id) : undefined;

  useRegisterNarration(
    religion ? religionNarrationId(religion.id) : null,
    religion?.name ?? ""
  );

  usePageSeo(
    religion
      ? {
          title: religion.name,
          description: locale === "fa" ? `دربارهٔ ${religion.name}؛ خاستگاه، جهان‌بینی، آیین‌ها و جایگاه آن در تاریخ ادیان.` : religion.blurb,
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
          <Link to={withLocale(locale, "/timeline")} className="rd__back">
            ← {pt(locale, "backToTimeline")}
          </Link>
          <div className="rd__eyebrow eyebrow">
            <span className="rd__eyebrow-dot" style={{ background: accent }} />
            {religion.family} · {religion.region}
            {religion.extinct && <span className="rd__extinct">{pt(locale, "extinct")}</span>}
            {!religion.extinct && !religion.living && <span className="rd__extinct">{pt(locale, "historical")}</span>}
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
              {isInCompare(religion.id) ? "✓ در مقایسه" : compareFull ? "مقایسه کامل است" : "+ افزودن به مقایسه"}
            </button>
            {religion.cities && religion.cities.length > 0 && (
              <Link to={withLocale(locale, "/globe")} className="btn btn--ghost">
                {locale === "fa" ? "نمایش روی کرهٔ زمین" : "View on Globe"}
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

      {/* ---------- ARTICLE CONTENT ---------- */}
      {article && (
        <>
          {/* Overview Section */}
          <section className="container rd__section rd-reveal">
            <div className="rd__prose">
              <div className="rd__section-head">
                <h2 className="rd__section-title">{pt(locale, "overview")}</h2>
                <NarrationButton
                  id={religionNarrationId(religion.id)}
                  label={religion.name}
                  variant="prominent"
                />
              </div>
              {article.overview.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "rd__lead" : "rd__body"}>
                  {renderBold(paragraph)}
                </p>
              ))}
              {religion.splitsFrom && (
                <p className="rd__lineage">
                  <span className="rd__lineage-label">{locale === "fa" ? "برآمده از" : "Emerges from"}</span>
                  <Link to={withLocale(locale, `/religion/${religion.splitsFrom}`)} className="rd__lineage-link">
                    {RELIGIONS.find((r) => r.id === religion.splitsFrom)?.name} →
                  </Link>
                </p>
              )}
            </div>
          </section>

          {/* Optional structured sections */}
          {article.history && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.history.title}</h2>
                {article.history.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.worldview && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.worldview.title}</h2>
                {article.worldview.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.texts && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.texts.title}</h2>
                {article.texts.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.practice && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.practice.title}</h2>
                {article.practice.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.diversity && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.diversity.title}</h2>
                {article.diversity.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.communities && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.communities.title}</h2>
                {article.communities.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.places && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.places.title}</h2>
                {article.places.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {article.debates && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{article.debates.title}</h2>
                {article.debates.content.map((paragraph, index) => (
                  <p key={index} className="rd__body">
                    {renderBold(paragraph)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Key Terms */}
          {article.keyTerms && article.keyTerms.length > 0 && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{pt(locale, "keyTerms")}</h2>
                <dl className="rd__terms">
                  {article.keyTerms.map((term, index) => (
                    <div key={index} className="rd__term-item">
                      <dt className="rd__term-name">{term.term}</dt>
                      <dd className="rd__term-def">{renderBold(term.definition)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}

          {/* Sources */}
          {article.sources.length > 0 && (
            <section className="container rd__section rd-reveal">
              <div className="rd__prose">
                <h2 className="rd__section-title">{pt(locale, "furtherReading")}</h2>
                <ul className="rd__sources-list">
                  {article.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {/* ---------- PRACTICES + CORE IDEAS ---------- */}
      <section className="container rd__two-col rd-reveal">
        <div className="rd__panel card">
          <div className="rd__panel-head">
            <PracticeIcon />
            <h3>{pt(locale, "practices")}</h3>
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
            <h3>{pt(locale, "coreIdeas")}</h3>
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
        <h2 className="rd__section-title">{pt(locale, "sacredTexts")}</h2>
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
            <h2 className="rd__section-title">{pt(locale, "engagedConcepts")}</h2>
            <Link to={withLocale(locale, "/concepts")} className="rd__concepts-link">
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
      {relatedCards.length > 0 && (
        <section className="container rd__related rd-reveal">
          <h2 className="rd__section-title">{pt(locale, "relatedTraditions")}</h2>
          <div className="rd__related-grid">
            {relatedCards.map((card) => (
              <Link key={`${card!.kind}-${card!.targetId}`} to={withLocale(locale, `/religion/${card!.targetId}`)} className="rd-rel-card card">
                <div className="rd-rel-card__bar" style={{ background: card!.religion.accent }} />
                <div className="rd-rel-card__header">
                  <h4>{card!.religion.name}</h4>
                  <span className="rd-rel-card__kind" style={{ borderColor: card!.religion.accent }}>
                    {card!.kind}
                  </span>
                </div>
                <p className="rd-rel-card__why">{card!.why}</p>
                <div className="rd-rel-card__footer">
                  <span className="rd-rel-card__confidence" data-confidence={card!.confidence}>
                    Confidence: {card!.confidence}
                  </span>
                  <span className="rd-rel-card__go" style={{ color: card!.religion.accent }}>{pt(locale, "explore")}</span>
                </div>
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
