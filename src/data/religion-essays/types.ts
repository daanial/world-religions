export interface ReligionSource {
  label: string;
  href: string;
}

export interface ReligionEssay {
  /** Two or three paragraphs, ~250–350 words total. */
  paragraphs: string[];
  sources: ReligionSource[];
}
