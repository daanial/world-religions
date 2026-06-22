// Concept network data — nodes & edges for the force-directed graph.
// Edges describe relationships: "shared by" (religion engages this concept),
// "influenced by" (lineage between religions), "opposes" (tension/contrast).

export type ConceptId =
  | "soul"
  | "salvation"
  | "sacrifice"
  | "enlightenment"
  | "judgement"
  | "nonviolence"
  | "mysticism"
  | "monotheism"
  | "polytheism"
  | "reincarnation"
  | "karma"
  | "liberation"
  | "heaven"
  | "hell"
  | "sin"
  | "meditation"
  | "prayer"
  | "fasting"
  | "pilgrimage";

export interface ConceptNode {
  id: ConceptId;
  label: string;
  description: string;
  accent: string;
}

// Edges between concepts themselves (semantic relationships shown in the graph)
export interface ConceptEdge {
  source: ConceptId;
  target: ConceptId;
  type: "influences" | "opposes" | "pairs";
}

export const CONCEPTS: ConceptNode[] = [
  { id: "soul", label: "Soul", description: "The enduring self — eternal, reborn, or judged.", accent: "#E6B450" },
  { id: "salvation", label: "Salvation", description: "Rescue from sin, death, or ignorance.", accent: "#D8485B" },
  { id: "sacrifice", label: "Sacrifice", description: "The offering that bridges human and divine.", accent: "#F0933B" },
  { id: "enlightenment", label: "Enlightenment", description: "Direct awakening to the nature of reality.", accent: "#3FB8AF" },
  { id: "judgement", label: "Judgement", description: "The accounting of a life after death.", accent: "#9B7DE0" },
  { id: "nonviolence", label: "Nonviolence", description: "Ahimsa — refusing harm to any being.", accent: "#5FBF8F" },
  { id: "mysticism", label: "Mysticism", description: "Direct, often ineffable union with the divine.", accent: "#9B7DE0" },
  { id: "monotheism", label: "Monotheism", description: "One God, one source of all.", accent: "#D8485B" },
  { id: "polytheism", label: "Polytheism", description: "Many gods, many faces of the sacred.", accent: "#E6B450" },
  { id: "reincarnation", label: "Reincarnation", description: "Return of the soul in new bodies.", accent: "#5FBF8F" },
  { id: "karma", label: "Karma", description: "Action and its consequences across lives.", accent: "#F0933B" },
  { id: "liberation", label: "Liberation", description: "Release from the cycle of suffering.", accent: "#3FB8AF" },
  { id: "heaven", label: "Heaven", description: "Paradise — reward of the righteous.", accent: "#6A7BD8" },
  { id: "hell", label: "Hell", description: "Punishment or separation from the good.", accent: "#D8485B" },
  { id: "sin", label: "Sin", description: "The violation of divine or cosmic law.", accent: "#D8485B" },
  { id: "meditation", label: "Meditation", description: "Disciplined cultivation of insight.", accent: "#3FB8AF" },
  { id: "prayer", label: "Prayer", description: "Speech addressed to the divine.", accent: "#E6B450" },
  { id: "fasting", label: "Fasting", description: "Self-denial as devotion or purification.", accent: "#F0933B" },
  { id: "pilgrimage", label: "Pilgrimage", description: "Sacred journey to a holy place.", accent: "#9B7DE0" },
];

export const CONCEPT_EDGES: ConceptEdge[] = [
  { source: "karma", target: "reincarnation", type: "influences" },
  { source: "reincarnation", target: "liberation", type: "influences" },
  { source: "meditation", target: "enlightenment", type: "influences" },
  { source: "enlightenment", target: "liberation", type: "influences" },
  { source: "soul", target: "reincarnation", type: "pairs" },
  { source: "soul", target: "judgement", type: "pairs" },
  { source: "judgement", target: "heaven", type: "influences" },
  { source: "judgement", target: "hell", type: "influences" },
  { source: "heaven", target: "hell", type: "opposes" },
  { source: "sin", target: "judgement", type: "influences" },
  { source: "salvation", target: "sin", type: "opposes" },
  { source: "salvation", target: "heaven", type: "influences" },
  { source: "monotheism", target: "polytheism", type: "opposes" },
  { source: "monotheism", target: "prayer", type: "pairs" },
  { source: "sacrifice", target: "prayer", type: "pairs" },
  { source: "fasting", target: "meditation", type: "pairs" },
  { source: "nonviolence", target: "karma", type: "influences" },
  { source: "nonviolence", target: "sacrifice", type: "opposes" },
  { source: "mysticism", target: "meditation", type: "pairs" },
  { source: "pilgrimage", target: "prayer", type: "pairs" },
  { source: "mysticism", target: "enlightenment", type: "influences" },
];
