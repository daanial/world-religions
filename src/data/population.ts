/** Unified religion population categories used across all anchor years. */
export type ReligionCategory =
  | "Christianity"
  | "Islam"
  | "Hinduism"
  | "Buddhism"
  | "Folk Religions"
  | "Other Religions"
  | "Judaism"
  | "Unaffiliated";

export const RELIGION_CATEGORIES: ReligionCategory[] = [
  "Christianity",
  "Islam",
  "Hinduism",
  "Buddhism",
  "Folk Religions",
  "Other Religions",
  "Judaism",
  "Unaffiliated",
];

/** Stable legend / fill colors reused in absolute and percentage views. */
export const CATEGORY_COLORS: Record<ReligionCategory, string> = {
  Christianity: "#6A7BD8",
  Islam: "#3FB8AF",
  Hinduism: "#E6B450",
  Buddhism: "#D8485B",
  "Folk Religions": "#9B7DE0",
  "Other Religions": "#7CB87C",
  Judaism: "#4A90D9",
  Unaffiliated: "#8A8F9E",
};

export type DataEra = "historical" | "mixed" | "projected";

export interface PopulationSnapshot {
  year: number;
  worldPopulation: number;
  /** Absolute counts by category. */
  values: Record<ReligionCategory, number>;
  /** Percent of world population (0–100). */
  percentages: Record<ReligionCategory, number>;
  era: DataEra;
  sourceNote: string;
}

/** Discrete anchor years — only these contain real measurements. */
export const ANCHOR_YEARS = [1900, 1950, 1970, 2000, 2010, 2020, 2026, 2050, 2075] as const;

export const YEAR_MIN = ANCHOR_YEARS[0];
export const YEAR_MAX = ANCHOR_YEARS[ANCHOR_YEARS.length - 1];

/** Last year treated as observed estimate (not projection). */
export const LAST_OBSERVED_YEAR = 2026;

function pct(value: number, world: number): number {
  return world > 0 ? (value / world) * 100 : 0;
}

function snapshot(
  year: number,
  worldPopulation: number,
  values: Record<ReligionCategory, number>,
  era: DataEra,
  sourceNote: string,
): PopulationSnapshot {
  const percentages = {} as Record<ReligionCategory, number>;
  for (const cat of RELIGION_CATEGORIES) {
    percentages[cat] = pct(values[cat], worldPopulation);
  }
  return { year, worldPopulation, values, percentages, era, sourceNote };
}

/** Split 1950 lumped "Other religions" using average ratios from 1900 & 1970. */
function split1950Lumped(lumpedOther: number): Pick<
  Record<ReligionCategory, number>,
  "Folk Religions" | "Other Religions" | "Judaism"
> {
  const folk1900 = 379_974_000 + 117_313_000;
  const other1900 = 5_986_000 + 2_962_000;
  const jew1900 = 11_725_000;
  const total1900 = folk1900 + other1900 + jew1900;

  const folk1970 = 238_645_000 + 171_674_000;
  const other1970 = 39_557_000 + 10_668_000;
  const jew1970 = 13_917_000;
  const total1970 = folk1970 + other1970 + jew1970;

  const folkRatio = (folk1900 / total1900 + folk1970 / total1970) / 2;
  const otherRatio = (other1900 / total1900 + other1970 / total1970) / 2;
  const jewRatio = (jew1900 / total1900 + jew1970 / total1970) / 2;
  const norm = folkRatio + otherRatio + jewRatio;

  return {
    "Folk Religions": Math.round((folkRatio / norm) * lumpedOther),
    "Other Religions": Math.round((otherRatio / norm) * lumpedOther),
    Judaism: Math.round((jewRatio / norm) * lumpedOther),
  };
}

const RAW_SNAPSHOTS: PopulationSnapshot[] = [
  snapshot(
    1900,
    1_619_625_000,
    {
      Christianity: 558_346_000,
      Islam: 200_301_000,
      Hinduism: 202_976_000,
      Buddhism: 126_946_000,
      "Folk Religions": 379_974_000 + 117_313_000,
      "Other Religions": 5_986_000 + 2_962_000,
      Judaism: 11_725_000,
      Unaffiliated: 3_028_000 + 226_000,
    },
    "historical",
    "CSGC 2026 (World Christian Database)",
  ),
  (() => {
    const split = split1950Lumped(656_936_000);
    return snapshot(
      1950,
      2_536_431_000,
      {
        Christianity: 867_459_000,
        Islam: 344_955_000,
        Hinduism: 319_590_000,
        Buddhism: 177_550_000,
        "Folk Religions": split["Folk Religions"],
        "Other Religions": split["Other Religions"],
        Judaism: split.Judaism,
        Unaffiliated: 129_358_000 + 40_583_000,
      },
      "historical",
      "Johnson & Grim / WRD 2012 (1950 lump split estimated)",
    );
  })(),
  snapshot(
    1970,
    3_694_684_000,
    {
      Christianity: 1_222_867_000,
      Islam: 576_995_000,
      Hinduism: 455_729_000,
      Buddhism: 234_130_000,
      "Folk Religions": 238_645_000 + 171_674_000,
      "Other Religions": 39_557_000 + 10_668_000,
      Judaism: 13_917_000,
      Unaffiliated: 543_609_000 + 165_156_000,
    },
    "historical",
    "CSGC 2026",
  ),
  snapshot(
    2000,
    6_171_703_000,
    {
      Christianity: 1_993_436_000,
      Islam: 1_311_342_000,
      Hinduism: 842_884_000,
      Buddhism: 448_943_000,
      "Folk Religions": 422_590_000 + 226_919_000,
      "Other Religions": 63_518_000 + 21_576_000,
      Judaism: 12_942_000,
      Unaffiliated: 647_584_000 + 138_298_000,
    },
    "historical",
    "CSGC 2026",
  ),
  snapshot(
    2010,
    6_900_000_000,
    {
      Christianity: 2_200_000_000,
      Islam: 1_600_000_000,
      Hinduism: 1_032_000_000,
      Buddhism: 488_000_000,
      "Folk Religions": 405_000_000,
      "Other Religions": 58_000_000,
      Judaism: 13_900_000,
      Unaffiliated: 1_100_000_000,
    },
    "mixed",
    "Pew 2015 (retired narrative figures)",
  ),
  snapshot(
    2020,
    7_887_001_000,
    {
      Christianity: 2_526_029_000,
      Islam: 1_917_487_000,
      Hinduism: 1_097_448_000,
      Buddhism: 528_137_000,
      "Folk Religions": 456_538_000 + 293_413_000,
      "Other Religions": 68_256_000 + 29_292_000,
      Judaism: 15_239_000,
      Unaffiliated: 756_480_000 + 148_297_000,
    },
    "historical",
    "CSGC 2026",
  ),
  snapshot(
    2026,
    8_300_678_000,
    {
      Christianity: 2_673_989_000,
      Islam: 2_105_142_000,
      Hinduism: 1_148_172_000,
      Buddhism: 535_726_000,
      "Folk Religions": 449_231_000 + 309_298_000,
      "Other Religions": 67_964_000 + 31_276_000,
      Judaism: 15_765_000,
      Unaffiliated: 764_998_000 + 146_970_000,
    },
    "historical",
    "CSGC 2026 (latest estimate)",
  ),
  snapshot(
    2050,
    9_300_000_000,
    {
      Christianity: 2_900_000_000,
      Islam: 2_800_000_000,
      Hinduism: 1_384_000_000,
      Buddhism: 488_000_000,
      "Folk Religions": 449_000_000,
      "Other Religions": 61_000_000,
      Judaism: 16_100_000,
      Unaffiliated: 1_230_000_000,
    },
    "projected",
    "Pew 2015 projection (retired)",
  ),
  snapshot(
    2075,
    10_250_496_000,
    {
      Christianity: 3_675_544_000,
      Islam: 3_422_840_000,
      Hinduism: 1_193_892_000,
      Buddhism: 430_019_000,
      "Folk Religions": 354_417_000 + 267_472_000,
      "Other Religions": 57_773_000 + 45_899_000,
      Judaism: 20_439_000,
      Unaffiliated: 632_734_000 + 83_687_000,
    },
    "projected",
    "CSGC 2026 projection",
  ),
];

export const POPULATION_SNAPSHOTS: PopulationSnapshot[] = RAW_SNAPSHOTS;

/** Linear interpolation factor between two anchor years. */
function lerpFactor(year: number, y0: number, y1: number): number {
  if (y1 === y0) return 0;
  return Math.max(0, Math.min(1, (year - y0) / (y1 - y0)));
}

function findBracket(year: number): { before: PopulationSnapshot; after: PopulationSnapshot } {
  const clamped = Math.max(YEAR_MIN, Math.min(YEAR_MAX, year));
  let before = POPULATION_SNAPSHOTS[0];
  let after = POPULATION_SNAPSHOTS[POPULATION_SNAPSHOTS.length - 1];

  for (let i = 0; i < POPULATION_SNAPSHOTS.length - 1; i++) {
    const a = POPULATION_SNAPSHOTS[i];
    const b = POPULATION_SNAPSHOTS[i + 1];
    if (clamped >= a.year && clamped <= b.year) {
      before = a;
      after = b;
      break;
    }
  }

  return { before, after };
}

/** Interpolate absolute counts at any year between anchor keyframes. */
export function interpolatePopulation(year: number): {
  year: number;
  worldPopulation: number;
  values: Record<ReligionCategory, number>;
  percentages: Record<ReligionCategory, number>;
  isProjected: boolean;
  beforeYear: number;
  afterYear: number;
} {
  const clamped = Math.max(YEAR_MIN, Math.min(YEAR_MAX, year));
  const { before, after } = findBracket(clamped);
  const t = lerpFactor(clamped, before.year, after.year);

  const values = {} as Record<ReligionCategory, number>;
  for (const cat of RELIGION_CATEGORIES) {
    values[cat] = Math.round(before.values[cat] + t * (after.values[cat] - before.values[cat]));
  }

  const worldPopulation = Math.round(
    before.worldPopulation + t * (after.worldPopulation - before.worldPopulation),
  );

  const percentages = {} as Record<ReligionCategory, number>;
  for (const cat of RELIGION_CATEGORIES) {
    percentages[cat] = pct(values[cat], worldPopulation);
  }

  return {
    year: clamped,
    worldPopulation,
    values,
    percentages,
    isProjected: clamped > LAST_OBSERVED_YEAR,
    beforeYear: before.year,
    afterYear: after.year,
  };
}

/** Dense series for stacked-area rendering (linear interpolation between anchors). */
export function buildDenseSeries(
  stepYears = 1,
): { year: number; values: Record<ReligionCategory, number>; percentages: Record<ReligionCategory, number> }[] {
  const out: ReturnType<typeof buildDenseSeries> = [];
  for (let y = YEAR_MIN; y <= YEAR_MAX; y += stepYears) {
    const snap = interpolatePopulation(y);
    out.push({ year: snap.year, values: snap.values, percentages: snap.percentages });
  }
  return out;
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  return n.toLocaleString();
}

export function isAnchorYear(year: number): boolean {
  return (ANCHOR_YEARS as readonly number[]).includes(Math.round(year));
}
