import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import Starfield from "../components/Starfield";
import { RELIGIONS, type Religion, type ConceptTag } from "../data/religions";
import { useApp } from "../context/AppContext";
import { formatFollowers, formatYear, ageOf } from "../lib/format";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";
import { FA_RELIGION_META, FA_FAMILY_LABELS, FA_REGION_LABELS } from "../data/religion-meta.fa";

// Feature rows for the comparison matrix.
interface Feature {
  key: keyof ConceptTag;
  label: string;
}

const FEATURES: Feature[] = [
  { key: "monotheism", label: "One God (Monotheism)" },
  { key: "polytheism", label: "Many Gods" },
  { key: "heaven", label: "Heaven / Paradise" },
  { key: "hell", label: "Hell / Punishment" },
  { key: "sin", label: "Concept of Sin" },
  { key: "judgement", label: "Final Judgement" },
  { key: "soul", label: "Eternal Soul" },
  { key: "reincarnation", label: "Reincarnation" },
  { key: "karma", label: "Karma" },
  { key: "liberation", label: "Liberation / Moksha" },
  { key: "salvation", label: "Salvation" },
  { key: "enlightenment", label: "Enlightenment" },
  { key: "nonviolence", label: "Nonviolence (Ahimsa)" },
  { key: "mysticism", label: "Mystical Tradition" },
  { key: "prayer", label: "Formal Prayer" },
  { key: "meditation", label: "Meditation" },
  { key: "fasting", label: "Fasting" },
  { key: "pilgrimage", label: "Pilgrimage" },
  { key: "sacrifice", label: "Ritual Sacrifice" },
];

function faDisplayName(locale: "en" | "fa", r: Religion): string {
  return (locale === "fa" ? FA_RELIGION_META[r.id as keyof typeof FA_RELIGION_META]?.name : undefined) ?? r.name;
}

const FEATURE_LABELS_FA: Partial<Record<keyof ConceptTag, string>> = {
  monotheism: "خدای یگانه (توحید)", polytheism: "خدایان متعدد", heaven: "بهشت / فردوس",
  hell: "دوزخ / کیفر", sin: "مفهوم گناه", judgement: "داوری نهایی", soul: "روح جاودان",
  reincarnation: "تناسخ", karma: "کارما", liberation: "رهایی / موکشا", salvation: "رستگاری",
  enlightenment: "روشن‌شدگی", nonviolence: "پرهیز از خشونت (آهیمسا)", mysticism: "سنت عرفانی",
  prayer: "نیایش رسمی", meditation: "مراقبه", fasting: "روزه", pilgrimage: "زیارت", sacrifice: "قربانی آیینی",
};

export default function Compare() {
  const { compareIds, toggleCompare, clearCompare } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pickerOpen, setPickerOpen] = useState(false);
  const addRequested = searchParams.get("add") === "1";
  const showPicker = pickerOpen || addRequested;
  const locale = useLocale();

  const closePicker = () => {
    setPickerOpen(false);
    if (addRequested) setSearchParams({}, { replace: true });
  };
  const [highlightKey, setHighlightKey] = useState<string | null>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: locale === "fa" ? "مقایسهٔ ادیان" : "Compare Religions",
    description: locale === "fa" ? "تا چهار دین را بر اساس توحید، تناسخ، رستگاری، نیایش، زیارت و دیگر مفاهیم محوری مقایسه کنید." : "Compare up to four religions side by side across monotheism, reincarnation, salvation, prayer, pilgrimage, and other core concepts.",
    path: "/compare",
  });

  const selected = useMemo(
    () => RELIGIONS.filter((r) => compareIds.includes(r.id)),
    [compareIds]
  );

  // animate matrix cells in on selection change
  useEffect(() => {
    if (!matrixRef.current || selected.length === 0) return;
    const cells = matrixRef.current.querySelectorAll(".mx-cell");
    gsap.fromTo(
      cells,
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: { each: 0.012, from: "start" },
      }
    );
  }, [compareIds, selected.length]);

  // pulse a row when its label is hovered
  useEffect(() => {
    if (!matrixRef.current) return;
    const row = matrixRef.current.querySelector(`[data-row="${highlightKey}"]`);
    if (!row) return;
    const cells = row.querySelectorAll(".mx-cell");
    gsap.fromTo(
      cells,
      { boxShadow: "0 0 0 0 rgba(230,180,80,0)" },
      {
        boxShadow: "0 0 0 2px rgba(230,180,80,0.35)",
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.04,
        yoyo: true,
        repeat: 1,
      }
    );
  }, [highlightKey]);

  return (
    <div className="page compare-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head">
          <div className="eyebrow reveal">{pt(locale, "compareEyebrow")}</div>
          <h1 className="page__title reveal">{pt(locale, "compareTitle")}</h1>
          <p className="page__lead reveal">{pt(locale, "compareLead")}</p>
        </header>

        {selected.length === 0 ? (
          <EmptyState onPick={() => setPickerOpen(true)} />
        ) : (
          <div id="compare-workspace">
            {/* selected headers */}
            <div className="cmp-headers">
              {selected.map((r) => (
                <div key={r.id} className="cmp-header card" style={{ "--accent": r.accent } as React.CSSProperties}>
                  <button
                    className="cmp-header__remove"
                    onClick={() => toggleCompare(r.id)}
                    aria-label={`${pt(locale, "remove")} ${faDisplayName(locale, r)}`}
                  >
                    ✕
                  </button>
                  <div className="cmp-header__dot" style={{ background: r.accent }} />
                  <Link to={withLocale(locale, `/religion/${r.id}`)} className="cmp-header__name">
                    {faDisplayName(locale, r)}
                  </Link>
                  <div className="cmp-header__meta">
                    {formatYear(r.origin, locale)} · {formatFollowers(r.followers)}
                  </div>
                </div>
              ))}
              {selected.length < 4 && (
                <button className="cmp-header cmp-header--add" onClick={() => setPickerOpen(true)}>
                  <span className="cmp-header__plus">+</span>
                  <span>{pt(locale, "addReligion")}</span>
                </button>
              )}
            </div>

            {/* matrix */}
            <div className="mx-wrap card" ref={matrixRef}>
              <div
                className="mx"
                style={{ "--cols": selected.length } as React.CSSProperties}
              >
                <div className="mx__corner" />
                {selected.map((r) => (
                  <div key={r.id} className="mx__colhead" style={{ color: r.accent }}>
                    {faDisplayName(locale, r).split(" ")[0]}
                  </div>
                ))}

                {FEATURES.map((f) => (
                  <FeatureRow
                    key={f.key}
                    feature={f}
                    religions={selected}
                    onHover={() => setHighlightKey(f.key)}
                    onLeave={() => setHighlightKey(null)}
                  />
                ))}
              </div>
            </div>

            {/* quick facts */}
            <div className="cmp-facts">
              <h3 className="cmp-facts__title">{pt(locale, "atAGlance")}</h3>
              <div className="cmp-facts__grid">
                {selected.map((r) => (
                  <div key={r.id} className="cmp-fact card" style={{ "--accent": r.accent } as React.CSSProperties}>
                    <div className="cmp-fact__name">{faDisplayName(locale, r)}</div>
                    <FactRow label={pt(locale, "origin")} value={formatYear(r.origin, locale)} />
                    <FactRow label={pt(locale, "age")} value={`${ageOf(r.origin, r.ended)} ${pt(locale, "years")}`} />
                    <FactRow label={pt(locale, "followers")} value={r.followers > 0 ? formatFollowers(r.followers) : "—"} />
                    <FactRow label={pt(locale, "countries")} value={r.countries > 0 ? String(r.countries) : "—"} />
                    <FactRow label={pt(locale, "family")} value={locale === "fa" ? FA_FAMILY_LABELS[r.family] : r.family} />
                    <FactRow label={pt(locale, "region")} value={locale === "fa" ? FA_REGION_LABELS[r.region] : r.region} />
                    <FactRow label={pt(locale, "status")} value={r.extinct ? pt(locale, "extinct") : r.living ? pt(locale, "living") : pt(locale, "historical")} />
                  </div>
                ))}
              </div>
            </div>

            <div className="cmp-actions">
              <button className="btn btn--ghost" onClick={clearCompare}>
                {pt(locale, "clearAll")}
              </button>
              <button className="btn btn--outline" onClick={() => setPickerOpen(true)}>
                {pt(locale, "addAnother")}
              </button>
            </div>
          </div>
        )}
      </div>

      {showPicker && (
        <ReligionPicker
          excludeIds={compareIds}
          onPick={(id) => {
            toggleCompare(id);
            closePicker();
          }}
          onClose={closePicker}
        />
      )}
    </div>
  );
}

function FeatureRow({
  feature,
  religions,
  onHover,
  onLeave,
}: {
  feature: Feature;
  religions: Religion[];
  onHover: () => void;
  onLeave: () => void;
}) {
  const locale = useLocale();
  return (
    <>
      <div
        className="mx__rowhead"
        data-row={feature.key}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {locale === "fa" ? FEATURE_LABELS_FA[feature.key] ?? feature.label : feature.label}
      </div>
      {religions.map((r) => {
        const position = r.conceptPositions?.[feature.key];
        const displayText = position
            ? position === "affirmed"
            ? "✓"
            : position === "rejected"
              ? "✗"
              : position === "varies by school"
                ? pt(locale, "varies")
                : position === "analogous"
                  ? "~"
                  : position === "not applicable"
                    ? "N/A"
                    : "?"
          : "—";
        
        const cellClass = position
          ? position === "affirmed"
            ? "mx-cell mx-cell--affirmed"
            : position === "rejected"
              ? "mx-cell mx-cell--rejected"
              : "mx-cell mx-cell--qualified"
          : "mx-cell mx-cell--absent";
        
        return (
          <div
            key={r.id}
            className={cellClass}
            data-row={feature.key}
            title={position || pt(locale, "notAddressed")}
          >
            <span className="mx-cell__text">{displayText}</span>
          </div>
        );
      })}
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="cmp-fact__row">
      <span className="cmp-fact__label">{label}</span>
      <span className="cmp-fact__value">{value}</span>
    </div>
  );
}

function EmptyState({ onPick }: { onPick: () => void }) {
  const locale = useLocale();
  
  return (
    <div className="cmp-empty card">
      <div className="cmp-empty__icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4">
          <path d="M12 3v18M3 12h18" strokeLinecap="round" opacity="0.5" />
          <circle cx="12" cy="12" r="9" opacity="0.3" />
        </svg>
      </div>
      <h2 className="cmp-empty__title">{pt(locale, "nothingToCompare")}</h2>
      <p className="cmp-empty__lead">{pt(locale, "compareEmptyLead")}</p>
      <button className="btn btn--primary" onClick={onPick}>
        {pt(locale, "chooseReligions")}
      </button>
      <Link to={withLocale(locale, "/timeline")} className="cmp-empty__link">
        {pt(locale, "browseTimeline")}
      </Link>
    </div>
  );
}

function ReligionPicker({
  excludeIds,
  onPick,
  onClose,
}: {
  excludeIds: string[];
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const locale = useLocale();
  const list = useMemo(() => {
    const q = query.toLowerCase().trim();
    return RELIGIONS.filter((r) => !excludeIds.includes(r.id)).filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.family.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q)
    );
  }, [query, excludeIds]);

  return (
    <div className="picker" onClick={onClose}>
      <div className="picker__panel glass" onClick={(e) => e.stopPropagation()}>
        <div className="picker__head">
          <h3>{pt(locale, "addReligion")}</h3>
          <button className="picker__close" onClick={onClose} aria-label={pt(locale, "close")}>
            ✕
          </button>
        </div>
        <input
          className="picker__search"
          placeholder={pt(locale, "searchReligion")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="picker__list">
          {list.map((r) => (
            <button key={r.id} className="picker__item" onClick={() => onPick(r.id)}>
              <span className="picker__item-dot" style={{ background: r.accent }} />
              <span className="picker__item-name">{faDisplayName(locale, r)}</span>
              <span className="picker__item-meta">
                {locale === "fa" ? FA_FAMILY_LABELS[r.family] : r.family} · {formatYear(r.origin, locale)}
              </span>
            </button>
          ))}
          {list.length === 0 && (
            <div className="picker__empty">{pt(locale, "noMatches")} “{query}”.</div>
          )}
        </div>
      </div>
    </div>
  );
}
