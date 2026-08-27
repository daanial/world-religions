import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RELIGIONS, type Religion, type Family, type Region } from "../data/religions";
import { formatYear } from "../lib/format";
import { getReligionImageSrc, getReligionThumbnailSrc } from "../lib/religionImages";
import { usePageSeo } from "../lib/seo";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useLocale, withLocale } from "../lib/locale";
import Starfield from "../components/Starfield";

type SortOption = "alphabetical" | "oldest" | "newest" | "followers";
type StatusFilter = "all" | "living" | "extinct";

const familyOptions: Family[] = [
  "Abrahamic",
  "Indian",
  "Iranian",
  "East Asian",
  "Indo-European",
  "Indigenous",
  "African",
  "Modern",
];

const regionOptions: Region[] = [
  "Middle East",
  "South Asia",
  "East Asia",
  "Central Asia",
  "Europe",
  "Africa",
  "Americas",
  "Oceania",
];

const chronologyRanges = [
  { label: "Ancient (before 0 CE)", min: -Infinity, max: 0 },
  { label: "Classical (0-1000 CE)", min: 0, max: 1000 },
  { label: "Medieval (1000-1500 CE)", min: 1000, max: 1500 },
  { label: "Modern (1500+ CE)", min: 1500, max: Infinity },
];

export default function Traditions() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: "Traditions Directory",
    description:
      "Browse all 44 religious and philosophical traditions from 6,000 years of human history. Search, filter by family, region, and time period.",
    path: "/traditions",
  });

  const statusFilter = (searchParams.get("status") as StatusFilter) || "all";
  const familyFilter = searchParams.get("family") || "";
  const regionFilter = searchParams.get("region") || "";
  const chronologyFilter = searchParams.get("chronology") || "";
  const sortBy = (searchParams.get("sort") as SortOption) || "alphabetical";

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filtered = useMemo(() => {
    let result = [...RELIGIONS];

    // Status filter
    if (statusFilter === "living") {
      result = result.filter((r) => r.living);
    } else if (statusFilter === "extinct") {
      result = result.filter((r) => !r.living);
    }

    // Family filter
    if (familyFilter) {
      result = result.filter((r) => r.family === familyFilter);
    }

    // Region filter
    if (regionFilter) {
      result = result.filter((r) => r.region === regionFilter);
    }

    // Chronology filter
    if (chronologyFilter) {
      const range = chronologyRanges.find((cr) => cr.label === chronologyFilter);
      if (range) {
        result = result.filter((r) => r.origin >= range.min && r.origin < range.max);
      }
    }

    // Search filter - now includes aliases
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((r) => {
        const searchableText = [
          r.name,
          ...(r.aliases || []),
          r.blurb,
          r.description,
          r.region,
          r.family,
          ...r.practices,
          ...Object.keys(r.conceptPositions || {}),
        ].join(" ").toLowerCase();
        return searchableText.includes(term);
      });
    }

    return result;
  }, [statusFilter, familyFilter, regionFilter, chronologyFilter, searchTerm]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sortBy) {
      case "oldest":
        return copy.sort((a, b) => a.origin - b.origin);
      case "newest":
        return copy.sort((a, b) => b.origin - a.origin);
      case "followers":
        return copy.sort((a, b) => b.followers - a.followers);
      case "alphabetical":
      default:
        return copy.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sortBy]);

  const activeFilterCount = [
    statusFilter !== "all" ? 1 : 0,
    familyFilter ? 1 : 0,
    regionFilter ? 1 : 0,
    chronologyFilter ? 1 : 0,
  ].reduce((sum, v) => sum + v, 0);

  const handleClearFilters = () => {
    setSearchParams({});
    setSearchTerm("");
  };

  return (
    <div className="page traditions-page" ref={rootRef}>
      <Starfield density="calm" drift={false} />

      <div className="container">
        <header className="page__head traditions-page__head">
          <div className="eyebrow reveal">All {RELIGIONS.length} traditions</div>
          <h1 className="page__title reveal">Traditions Directory</h1>
          <p className="page__lead reveal">
            A complete index of every faith, philosophy, and spiritual path in the World Religions
            Explorer — from Sumerian city-gods to Rastafari, from ancient mysteries to living
            traditions. Search, filter, and explore the full landscape.
          </p>
        </header>

        <div className="traditions-controls glass reveal">
          <div className="traditions-search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search traditions, concepts, practices..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateFilter("search", e.target.value);
              }}
              className="traditions-search__input"
              aria-label="Search traditions"
            />
          </div>

          <div className="traditions-filters">
            <div className="traditions-filter-group">
              <label className="traditions-filter-label">Status</label>
              <div className="traditions-filter-chips">
                <button
                  className={`filter-chip ${statusFilter === "all" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "")}
                  aria-pressed={statusFilter === "all"}
                >
                  All ({RELIGIONS.length})
                </button>
                <button
                  className={`filter-chip ${statusFilter === "living" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "living")}
                  aria-pressed={statusFilter === "living"}
                >
                  Living ({RELIGIONS.filter((r) => r.living).length})
                </button>
                <button
                  className={`filter-chip ${statusFilter === "extinct" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "extinct")}
                  aria-pressed={statusFilter === "extinct"}
                >
                  Historical ({RELIGIONS.filter((r) => !r.living).length})
                </button>
              </div>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">Family</label>
              <select
                className="traditions-select"
                value={familyFilter}
                onChange={(e) => updateFilter("family", e.target.value)}
                aria-label="Filter by family"
              >
                <option value="">All families</option>
                {familyOptions.map((f) => (
                  <option key={f} value={f}>
                    {f} ({RELIGIONS.filter((r) => r.family === f).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">Region</label>
              <select
                className="traditions-select"
                value={regionFilter}
                onChange={(e) => updateFilter("region", e.target.value)}
                aria-label="Filter by region"
              >
                <option value="">All regions</option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r} ({RELIGIONS.filter((rel) => rel.region === r).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">Era</label>
              <select
                className="traditions-select"
                value={chronologyFilter}
                onChange={(e) => updateFilter("chronology", e.target.value)}
                aria-label="Filter by chronology"
              >
                <option value="">All eras</option>
                {chronologyRanges.map((cr) => (
                  <option key={cr.label} value={cr.label}>
                    {cr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">Sort by</label>
              <select
                className="traditions-select"
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                aria-label="Sort traditions"
              >
                <option value="alphabetical">Alphabetical</option>
                <option value="oldest">Oldest first</option>
                <option value="newest">Newest first</option>
                <option value="followers">Most followers</option>
              </select>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="traditions-active-filters">
              <span className="traditions-active-filters__label">
                {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
              </span>
              <button onClick={handleClearFilters} className="btn--ghost btn--sm">
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="traditions-results reveal">
          <div className="traditions-results__header">
            <p className="traditions-results__count">
              Showing {sorted.length} of {RELIGIONS.length} traditions
            </p>
          </div>

          {sorted.length === 0 ? (
            <div className="traditions-empty card">
              <p>No traditions match your search criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="traditions-grid reveal-stagger">
              {sorted.map((religion) => (
                <TraditionCard key={religion.id} religion={religion} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TraditionCardProps {
  religion: Religion;
}

function TraditionCard({ religion }: TraditionCardProps) {
  const locale = useLocale();
  const imageSrc = getReligionThumbnailSrc(religion.id) ?? getReligionImageSrc(religion.id);
  const followersText = religion.living
    ? religion.followers >= 1000000
      ? `${(religion.followers / 1000000).toFixed(1)}M followers`
      : religion.followers >= 1000
        ? `${(religion.followers / 1000).toFixed(0)}K followers`
        : `${religion.followers} followers`
    : null;

  return (
    <Link to={withLocale(locale, `/religion/${religion.id}`)} className="tradition-card card">
      {imageSrc && (
        <div className="tradition-card__image">
          <img src={imageSrc} alt={`${religion.name} hero`} loading="lazy" />
        </div>
      )}
      <div className="tradition-card__content">
        <div className="tradition-card__header">
          <h3 className="tradition-card__name">{religion.name}</h3>
          {religion.extinct && <span className="tradition-card__extinct">† Historical</span>}
        </div>
        <div className="tradition-card__meta">
          <span className="tradition-card__date">
            {formatYear(religion.origin)}
            {religion.ended ? ` – ${formatYear(religion.ended)}` : " – present"}
          </span>
          {followersText && <span className="tradition-card__followers">{followersText}</span>}
        </div>
        <p className="tradition-card__blurb">{religion.blurb}</p>
        <div className="tradition-card__footer">
          <span className="tag">{religion.family}</span>
          <span className="tag">{religion.region}</span>
          <span className="tradition-card__arrow" style={{ color: religion.accent }}>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
