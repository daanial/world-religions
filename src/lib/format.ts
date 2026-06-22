/** Format a year (negative = BCE) as a readable string. */
export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year).toLocaleString()} BCE`;
  if (year === 0) return "1 CE";
  return `${year.toLocaleString()} CE`;
}

/** Compact year formatting for axis ticks. */
export function formatYearShort(year: number): string {
  const abs = Math.abs(year);
  if (year < 0) {
    if (abs >= 1000) return `${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k BCE`;
    return `${abs} BCE`;
  }
  if (abs >= 1000) return `${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k CE`;
  return `${abs}`;
}

/** Format follower counts: 1.2B, 9.4M, 13K */
export function formatFollowers(n: number): string {
  if (n === 0) return "—";
  if (n >= 1e9) return `${(n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1)}K`;
  return n.toString();
}

/** Age of a religion in years (from origin to now or to its extinction). */
export function ageOf(origin: number, ended?: number): number {
  const end = ended ?? new Date().getFullYear();
  return end - origin;
}

/** Duration label. */
export function formatDuration(origin: number, ended?: number): string {
  const end = ended ?? new Date().getFullYear();
  const span = end - origin;
  if (span >= 1000) return `${(span / 1000).toFixed(span % 1000 === 0 ? 0 : 1)}k years`;
  return `${span} years`;
}
