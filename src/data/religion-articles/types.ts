export interface ReligionSource {
  label: string;
  href: string;
}

export interface ReligionArticleSection {
  title: string;
  content: string[];
}

export interface ReligionArticle {
  /** Overview section - current essay paragraphs */
  overview: string[];
  
  /** Historical development and origins */
  history?: ReligionArticleSection;
  
  /** Core worldview, metaphysics, and beliefs */
  worldview?: ReligionArticleSection;
  
  /** Sacred texts and canonical literature */
  texts?: ReligionArticleSection;
  
  /** Ritual practices, observances, and spiritual disciplines */
  practice?: ReligionArticleSection;
  
  /** Internal diversity: schools, sects, regional variations */
  diversity?: ReligionArticleSection;
  
  /** Communities today: demographics, diaspora, institutions */
  communities?: ReligionArticleSection;
  
  /** Sacred places: pilgrimage sites, holy cities, temples */
  places?: ReligionArticleSection;
  
  /** Contemporary debates and issues */
  debates?: ReligionArticleSection;
  
  /** Key terms with brief definitions */
  keyTerms?: Array<{ term: string; definition: string }>;
  
  /** Further reading and sources */
  sources: ReligionSource[];
}
