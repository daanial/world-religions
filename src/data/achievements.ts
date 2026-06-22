import { RELIGIONS } from "./religions";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  check: (s: { visited: Set<string>; compareIds: string[]; comparedEver: Set<string> }) => boolean;
}

const abrahamic = ["judaism", "christianity", "islam", "bahai", "druse"];
const extinct = RELIGIONS.filter((r) => r.extinct).map((r) => r.id);

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Open your first religion.",
    check: (s) => s.visited.size >= 1,
  },
  {
    id: "abrahamic-tour",
    title: "Children of Abraham",
    description: "Visit all Abrahamic religions.",
    check: (s) => abrahamic.every((id) => s.visited.has(id)),
  },
  {
    id: "compared-ten",
    title: "The Comparator",
    description: "Compare 10 different religions (cumulative).",
    check: (s) => s.comparedEver.size >= 10,
  },
  {
    id: "extinct-explorer",
    title: "Echoes of the Dead",
    description: "Explore every extinct faith.",
    check: (s) => extinct.every((id) => s.visited.has(id)),
  },
  {
    id: "all-living",
    title: "Living Tapestry",
    description: "Visit every currently-practiced religion.",
    check: (s) => RELIGIONS.filter((r) => r.living).every((r) => s.visited.has(r.id)),
  },
  {
    id: "scholar",
    title: "Scholar",
    description: "Visit 20 religions.",
    check: (s) => s.visited.size >= 20,
  },
];
