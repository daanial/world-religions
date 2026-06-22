import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import Starfield from "../components/Starfield";
import { RELIGIONS, type Religion } from "../data/religions";
import { useApp } from "../context/AppContext";
import { formatFollowers, formatYear, ageOf } from "../lib/format";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

// Feature rows for the comparison matrix.
// `get` returns true/false/·(partial) given a religion.
type Tri = boolean | "partial";
interface Feature {
  key: string;
  label: string;
  get: (r: Religion) => Tri;
}

const FEATURES: Feature[] = [
  { key: "monotheism", label: "One God (Monotheism)", get: (r) => r.concepts.includes("monotheism") },
  { key: "polytheism", label: "Many Gods", get: (r) => r.concepts.includes("polytheism") },
  { key: "heaven", label: "Heaven / Paradise", get: (r) => r.concepts.includes("heaven") },
  { key: "hell", label: "Hell / Punishment", get: (r) => r.concepts.includes("hell") },
  { key: "sin", label: "Concept of Sin", get: (r) => r.concepts.includes("sin") },
  { key: "judgement", label: "Final Judgement", get: (r) => r.concepts.includes("judgement") },
  { key: "soul", label: "Eternal Soul", get: (r) => r.concepts.includes("soul") },
  { key: "reincarnation", label: "Reincarnation", get: (r) => r.concepts.includes("reincarnation") },
  { key: "karma", label: "Karma", get: (r) => r.concepts.includes("karma") },
  { key: "liberation", label: "Liberation / Moksha", get: (r) => r.concepts.includes("liberation") },
  { key: "salvation", label: "Salvation", get: (r) => r.concepts.includes("salvation") },
  { key: "enlightenment", label: "Enlightenment", get: (r) => r.concepts.includes("enlightenment") },
  { key: "nonviolence", label: "Nonviolence (Ahimsa)", get: (r) => r.concepts.includes("nonviolence") },
  { key: "mysticism", label: "Mystical Tradition", get: (r) => r.concepts.includes("mysticism") },
  { key: "prayer", label: "Formal Prayer", get: (r) => r.concepts.includes("prayer") },
  { key: "meditation", label: "Meditation", get: (r) => r.concepts.includes("meditation") },
  { key: "fasting", label: "Fasting", get: (r) => r.concepts.includes("fasting") },
  { key: "pilgrimage", label: "Pilgrimage", get: (r) => r.concepts.includes("pilgrimage") },
  { key: "sacrifice", label: "Ritual Sacrifice", get: (r) => r.concepts.includes("sacrifice") },
];

export default function Compare() {
  const { compareIds, toggleCompare, clearCompare } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pickerOpen, setPickerOpen] = useState(false);
  const addRequested = searchParams.get("add") === "1";
  const showPicker = pickerOpen || addRequested;

  const closePicker = () => {
    setPickerOpen(false);
    if (addRequested) setSearchParams({}, { replace: true });
  };
  const [highlightKey, setHighlightKey] = useState<string | null>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

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
          <div className="eyebrow reveal">Side by side</div>
          <h1 className="page__title reveal">Compare Traditions</h1>
          <p className="page__lead reveal">
            Select up to four religions and see at a glance where they align, diverge, and quietly
            echo one another across the millennia.
          </p>
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
                    aria-label={`Remove ${r.name}`}
                  >
                    ✕
                  </button>
                  <div className="cmp-header__dot" style={{ background: r.accent }} />
                  <Link to={`/religion/${r.id}`} className="cmp-header__name">
                    {r.name}
                  </Link>
                  <div className="cmp-header__meta">
                    {formatYear(r.origin)} · {formatFollowers(r.followers)}
                  </div>
                </div>
              ))}
              {selected.length < 4 && (
                <button className="cmp-header cmp-header--add" onClick={() => setPickerOpen(true)}>
                  <span className="cmp-header__plus">+</span>
                  <span>Add religion</span>
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
                    {r.name.split(" ")[0]}
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
              <h3 className="cmp-facts__title">At a glance</h3>
              <div className="cmp-facts__grid">
                {selected.map((r) => (
                  <div key={r.id} className="cmp-fact card" style={{ "--accent": r.accent } as React.CSSProperties}>
                    <div className="cmp-fact__name">{r.name}</div>
                    <FactRow label="Origin" value={formatYear(r.origin)} />
                    <FactRow label="Age" value={`${ageOf(r.origin, r.ended)} yrs`} />
                    <FactRow label="Followers" value={r.followers > 0 ? formatFollowers(r.followers) : "—"} />
                    <FactRow label="Countries" value={r.countries > 0 ? String(r.countries) : "—"} />
                    <FactRow label="Family" value={r.family} />
                    <FactRow label="Region" value={r.region} />
                    <FactRow label="Status" value={r.extinct ? "Extinct" : r.living ? "Living" : "Historical"} />
                  </div>
                ))}
              </div>
            </div>

            <div className="cmp-actions">
              <button className="btn btn--ghost" onClick={clearCompare}>
                Clear all
              </button>
              <button className="btn btn--outline" onClick={() => setPickerOpen(true)}>
                Add another
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
  return (
    <>
      <div
        className="mx__rowhead"
        data-row={feature.key}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {feature.label}
      </div>
      {religions.map((r) => {
        const v = feature.get(r);
        return (
          <div key={r.id} className={`mx-cell mx-cell--${v}`} data-row={feature.key}>
            {v === true && <CheckIcon />}
            {v === false && <DashIcon />}
            {v === "partial" && <span className="mx-cell__partial">~</span>}
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
  return (
    <div className="cmp-empty card">
      <div className="cmp-empty__icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.4">
          <path d="M12 3v18M3 12h18" strokeLinecap="round" opacity="0.5" />
          <circle cx="12" cy="12" r="9" opacity="0.3" />
        </svg>
      </div>
      <h2 className="cmp-empty__title">Nothing to compare yet</h2>
      <p className="cmp-empty__lead">
        Add two or more religions to see them side by side. Try Hinduism, Buddhism, Christianity,
        and Islam — or any mix that interests you.
      </p>
      <button className="btn btn--primary" onClick={onPick}>
        Choose religions
      </button>
      <Link to="/timeline" className="cmp-empty__link">
        or browse the timeline →
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
          <h3>Add a religion</h3>
          <button className="picker__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <input
          className="picker__search"
          placeholder="Search by name, family, or region…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <div className="picker__list">
          {list.map((r) => (
            <button key={r.id} className="picker__item" onClick={() => onPick(r.id)}>
              <span className="picker__item-dot" style={{ background: r.accent }} />
              <span className="picker__item-name">{r.name}</span>
              <span className="picker__item-meta">
                {r.family} · {formatYear(r.origin)}
              </span>
            </button>
          ))}
          {list.length === 0 && (
            <div className="picker__empty">No matches for "{query}".</div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M6 12h12" strokeLinecap="round" />
    </svg>
  );
}
