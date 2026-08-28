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

const TRANSLATIONS = {
  en: {
    title: "Traditions Directory",
    eyebrow: "All {count} traditions",
    lead: "A complete index of every faith, philosophy, and spiritual path in the World Religions Explorer — from Sumerian city-gods to Rastafari, from ancient mysteries to living traditions. Search, filter, and explore the full landscape.",
    searchPlaceholder: "Search traditions, concepts, practices...",
    searchAria: "Search traditions",
    status: "Status",
    statusAll: "All ({count})",
    statusLiving: "Living ({count})",
    statusHistorical: "Historical ({count})",
    family: "Family",
    allFamilies: "All families",
    region: "Region",
    allRegions: "All regions",
    era: "Era",
    allEras: "All eras",
    sortBy: "Sort by",
    sortAlphabetical: "Alphabetical",
    sortOldest: "Oldest first",
    sortNewest: "Newest first",
    sortFollowers: "Most followers",
    filtersActive: "{count} filter active",
    filtersActivePlural: "{count} filters active",
    clearAll: "Clear all",
    showingResults: "Showing {count} of {total} traditions",
    noResults: "No traditions match your search criteria. Try adjusting your filters.",
    cardHistorical: "† Historical",
    cardPresent: " – present",
    followersM: "{count}M followers",
    followersK: "{count}K followers",
    followers: "{count} followers",
    filterByFamily: "Filter by family",
    filterByRegion: "Filter by region",
    filterByChronology: "Filter by chronology",
    sortTraditions: "Sort traditions",
    familyNames: {
      "Abrahamic": "Abrahamic",
      "Indian": "Indian",
      "Iranian": "Iranian",
      "East Asian": "East Asian",
      "Indo-European": "Indo-European",
      "Indigenous": "Indigenous",
      "African": "African",
      "Modern": "Modern"
    } as Record<Family, string>,
    regionNames: {
      "Middle East": "Middle East",
      "South Asia": "South Asia",
      "East Asia": "East Asia",
      "Central Asia": "Central Asia",
      "Europe": "Europe",
      "Africa": "Africa",
      "Americas": "Americas",
      "Oceania": "Oceania"
    } as Record<Region, string>,
    eraNames: {
      "Ancient (before 0 CE)": "Ancient (before 0 CE)",
      "Classical (0-1000 CE)": "Classical (0-1000 CE)",
      "Medieval (1000-1500 CE)": "Medieval (1000-1500 CE)",
      "Modern (1500+ CE)": "Modern (1500+ CE)"
    } as Record<string, string>
  },
  fa: {
    title: "فهرست سنت‌ها و آیین‌ها",
    eyebrow: "تمامی {count} سنت",
    lead: "نمایه‌ای کامل از هر آیین، فلسفه و مسیر معنوی در جستجوگر ادیان جهان — از خدایان‌شهرهای سومری تا راستافاری، و از اسرار باستانی تا سنت‌های زنده. در کل این چشم‌انداز جستجو، فیلتر و کاوش کنید.",
    searchPlaceholder: "جستجو در سنت‌ها، مفاهیم، آیین‌ها...",
    searchAria: "جستجوی سنت‌ها",
    status: "وضعیت",
    statusAll: "همه ({count})",
    statusLiving: "پویا / زنده ({count})",
    statusHistorical: "تاریخی / منسوخ ({count})",
    family: "خانواده",
    allFamilies: "همه‌ی خانواده‌ها",
    region: "منطقه",
    allRegions: "همه‌ی منطقه‌ها",
    era: "دوران",
    allEras: "همه‌ی دوران‌ها",
    sortBy: "مرتب‌سازی",
    sortAlphabetical: "الفبایی",
    sortOldest: "قدیمی‌ترین نخست",
    sortNewest: "جدیدترین نخست",
    sortFollowers: "بیشترین پیروان",
    filtersActive: "{count} فیلتر فعال است",
    filtersActivePlural: "{count} فیلتر فعال است",
    clearAll: "پاک کردن همه",
    showingResults: "نمایش {count} از {total} سنت",
    noResults: "هیچ سنتی با معیارهای جستجوی شما مطابقت ندارد. فیلترها را تغییر دهید.",
    cardHistorical: "† تاریخی",
    cardPresent: " – تاکنون",
    followersM: "{count} میلیون پیرو",
    followersK: "{count} هزار پیرو",
    followers: "{count} پیرو",
    filterByFamily: "فیلتر بر اساس خانواده",
    filterByRegion: "فیلتر بر اساس منطقه",
    filterByChronology: "فیلتر بر اساس دوران",
    sortTraditions: "مرتب‌سازی سنت‌ها",
    familyNames: {
      "Abrahamic": "ابراهیمی",
      "Indian": "هندی",
      "Iranian": "ایرانی",
      "East Asian": "شرق آسیا",
      "Indo-European": "هندواروپایی",
      "Indigenous": "بومی",
      "African": "آفریقایی و جوامع پراکنده",
      "Modern": "مدرن"
    } as Record<Family, string>,
    regionNames: {
      "Middle East": "خاورمیانه",
      "South Asia": "جنوب آسیا",
      "East Asia": "شرق آسیا",
      "Central Asia": "آسیای مرکزی",
      "Europe": "اروپا",
      "Africa": "آفریقا",
      "Americas": "قاره آمریکا",
      "Oceania": "اقیانوسیه"
    } as Record<Region, string>,
    eraNames: {
      "Ancient (before 0 CE)": "باستان (پیش از میلاد)",
      "Classical (0-1000 CE)": "کلاسیک (۰-۱۰۰۰ میلادی)",
      "Medieval (1000-1500 CE)": "قرون وسطی (۱۰۰۰-۱۵۰۰ میلادی)",
      "Modern (1500+ CE)": "مدرن (۱۵۰۰+ میلادی)"
    } as Record<string, string>
  }
};

export default function Traditions() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const locale = useLocale();
  const t = TRANSLATIONS[locale];

  useScrollReveal(rootRef);
  useStaggerReveal(rootRef);

  usePageSeo({
    title: t.title,
    description: locale === "fa"
      ? "در میان تمام ۴۴ سنت دینی و فلسفی در طول ۶,۰۰۰ سال تاریخ بشر جستجو کنید. قابلیت فیلتر بر اساس خانواده، منطقه و دوره‌ی زمانی."
      : "Browse all 44 religious and philosophical traditions from 6,000 years of human history. Search, filter by family, region, and time period.",
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
          <div className="eyebrow reveal">
            {t.eyebrow.replace("{count}", String(RELIGIONS.length))}
          </div>
          <h1 className="page__title reveal">{t.title}</h1>
          <p className="page__lead reveal">{t.lead}</p>
        </header>

        <div className="traditions-controls glass reveal">
          <div className="traditions-search">
            <SearchIcon />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                updateFilter("search", e.target.value);
              }}
              className="traditions-search__input"
              aria-label={t.searchAria}
            />
          </div>

          <div className="traditions-filters">
            <div className="traditions-filter-group">
              <label className="traditions-filter-label">{t.status}</label>
              <div className="traditions-filter-chips">
                <button
                  className={`filter-chip ${statusFilter === "all" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "")}
                  aria-pressed={statusFilter === "all"}
                >
                  {t.statusAll.replace("{count}", String(RELIGIONS.length))}
                </button>
                <button
                  className={`filter-chip ${statusFilter === "living" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "living")}
                  aria-pressed={statusFilter === "living"}
                >
                  {t.statusLiving.replace("{count}", String(RELIGIONS.filter((r) => r.living).length))}
                </button>
                <button
                  className={`filter-chip ${statusFilter === "extinct" ? "filter-chip--active" : ""}`}
                  onClick={() => updateFilter("status", "extinct")}
                  aria-pressed={statusFilter === "extinct"}
                >
                  {t.statusHistorical.replace("{count}", String(RELIGIONS.filter((r) => !r.living).length))}
                </button>
              </div>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">{t.family}</label>
              <select
                className="traditions-select"
                value={familyFilter}
                onChange={(e) => updateFilter("family", e.target.value)}
                aria-label={t.filterByFamily}
              >
                <option value="">{t.allFamilies}</option>
                {familyOptions.map((f) => (
                  <option key={f} value={f}>
                    {t.familyNames[f]} ({RELIGIONS.filter((r) => r.family === f).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">{t.region}</label>
              <select
                className="traditions-select"
                value={regionFilter}
                onChange={(e) => updateFilter("region", e.target.value)}
                aria-label={t.filterByRegion}
              >
                <option value="">{t.allRegions}</option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {t.regionNames[r]} ({RELIGIONS.filter((rel) => rel.region === r).length})
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">{t.era}</label>
              <select
                className="traditions-select"
                value={chronologyFilter}
                onChange={(e) => updateFilter("chronology", e.target.value)}
                aria-label={t.filterByChronology}
              >
                <option value="">{t.allEras}</option>
                {chronologyRanges.map((cr) => (
                  <option key={cr.label} value={cr.label}>
                    {t.eraNames[cr.label] || cr.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="traditions-filter-group">
              <label className="traditions-filter-label">{t.sortBy}</label>
              <select
                className="traditions-select"
                value={sortBy}
                onChange={(e) => updateFilter("sort", e.target.value)}
                aria-label={t.sortTraditions}
              >
                <option value="alphabetical">{t.sortAlphabetical}</option>
                <option value="oldest">{t.sortOldest}</option>
                <option value="newest">{t.sortNewest}</option>
                <option value="followers">{t.sortFollowers}</option>
              </select>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="traditions-active-filters">
              <span className="traditions-active-filters__label">
                {activeFilterCount === 1
                  ? t.filtersActive.replace("{count}", String(activeFilterCount))
                  : t.filtersActivePlural.replace("{count}", String(activeFilterCount))}
              </span>
              <button onClick={handleClearFilters} className="btn--ghost btn--sm">
                {t.clearAll}
              </button>
            </div>
          )}
        </div>

        <div className="traditions-results reveal">
          <div className="traditions-results__header">
            <p className="traditions-results__count">
              {t.showingResults
                .replace("{count}", String(sorted.length))
                .replace("{total}", String(RELIGIONS.length))}
            </p>
          </div>

          {sorted.length === 0 ? (
            <div className="traditions-empty card">
              <p>{t.noResults}</p>
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
  const t = TRANSLATIONS[locale];
  const imageSrc = getReligionThumbnailSrc(religion.id) ?? getReligionImageSrc(religion.id);
  const followersText = religion.living
    ? religion.followers >= 1000000
      ? t.followersM.replace("{count}", (religion.followers / 1000000).toFixed(1))
      : religion.followers >= 1000
        ? t.followersK.replace("{count}", (religion.followers / 1000).toFixed(0))
        : t.followers.replace("{count}", String(religion.followers))
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
          {religion.extinct && <span className="tradition-card__extinct">{t.cardHistorical}</span>}
        </div>
        <div className="tradition-card__meta">
          <span className="tradition-card__date">
            {formatYear(religion.origin)}
            {religion.ended ? ` – ${formatYear(religion.ended)}` : t.cardPresent}
          </span>
          {followersText && <span className="tradition-card__followers">{followersText}</span>}
        </div>
        <p className="tradition-card__blurb">{religion.blurb}</p>
        <div className="tradition-card__footer">
          <span className="tag">{t.familyNames[religion.family]}</span>
          <span className="tag">{t.regionNames[religion.region]}</span>
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
