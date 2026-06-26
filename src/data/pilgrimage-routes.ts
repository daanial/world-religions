export type RouteKey = "all" | "hajj" | "camino" | "chakchak" | "buddhist" | "kumbh";

export type RouteMapKind = "radial" | "circuit" | "rotation";

export interface MapPoint {
  x: number;
  y: number;
  label: string;
  isDest?: boolean;
}

export interface PilgrimageRoute {
  name: string;
  era: string;
  cadence: string;
  mapKind: RouteMapKind;
  destination?: keyof typeof POINTS;
  sources?: (keyof typeof POINTS)[];
  circuit?: (keyof typeof POINTS)[];
  rotation?: (keyof typeof POINTS)[];
  accent: string;
  religionIds: string[];
}

export const POINTS = {
  paris: { x: 330, y: 92, label: "Paris" },
  lepuy: { x: 298, y: 168, label: "Le Puy" },
  arles: { x: 348, y: 236, label: "Arles" },
  damascus: { x: 562, y: 222, label: "Damascus" },
  cairo: { x: 476, y: 286, label: "Cairo" },
  kufa: { x: 686, y: 244, label: "Kufa" },
  medina: { x: 628, y: 348, label: "Medina" },
  tehran: { x: 822, y: 162, label: "Tehran" },
  kerman: { x: 904, y: 322, label: "Kerman" },
  yazd: { x: 876, y: 248, label: "Yazd" },
  mumbai: { x: 1000, y: 400, label: "Mumbai" },
  santiago: { x: 138, y: 168, label: "Santiago de Compostela", isDest: true },
  mecca: { x: 614, y: 388, label: "Mecca", isDest: true },
  chakchak: { x: 856, y: 258, label: "Chak Chak", isDest: true },
  bodhgaya: { x: 840, y: 380, label: "Bodh Gaya" },
  sarnath: { x: 880, y: 340, label: "Sarnath" },
  kushinagar: { x: 920, y: 320, label: "Kushinagar" },
  lumbini: { x: 900, y: 300, label: "Lumbini", isDest: true },
  prayagraj: { x: 780, y: 360, label: "Prayagraj" },
  haridwar: { x: 740, y: 280, label: "Haridwar" },
  nashik: { x: 720, y: 420, label: "Nashik" },
  ujjain: { x: 760, y: 380, label: "Ujjain" },
} as const satisfies Record<string, MapPoint>;

export const ROUTES: Record<Exclude<RouteKey, "all">, PilgrimageRoute> = {
  hajj: {
    name: "The Hajj",
    era: "7th c. – present",
    cadence: "Once yearly, fixed lunar dates",
    mapKind: "radial",
    destination: "mecca",
    sources: ["damascus", "cairo", "kufa"],
    accent: "var(--gold)",
    religionIds: ["islam"],
  },
  camino: {
    name: "Camino de Santiago",
    era: "9th c. – present",
    cadence: "Year-round, self-paced",
    mapKind: "radial",
    destination: "santiago",
    sources: ["paris", "lepuy", "arles"],
    accent: "var(--crimson)",
    religionIds: ["christianity"],
  },
  chakchak: {
    name: "Chak Chak (Pir-e Sabz)",
    era: "7th c. – present",
    cadence: "Annual, 14–18 June",
    mapKind: "radial",
    destination: "chakchak",
    sources: ["tehran", "kerman", "yazd", "mumbai"],
    accent: "#D69A2C",
    religionIds: ["zoroastrian"],
  },
  buddhist: {
    name: "The Four Great Places (Char Mahapadhana)",
    era: "5th c. BCE – present",
    cadence: "Year-round; Vesak draws largest crowds",
    mapKind: "circuit",
    circuit: ["bodhgaya", "sarnath", "kushinagar", "lumbini"],
    accent: "var(--jade)",
    religionIds: ["buddhism"],
  },
  kumbh: {
    name: "Kumbh Mela",
    era: "Ancient – present",
    cadence: "Rotating host city, roughly every 12 years",
    mapKind: "rotation",
    rotation: ["prayagraj", "haridwar", "ujjain", "nashik"],
    accent: "var(--saffron)",
    religionIds: ["hinduism"],
  },
};

export const ROUTE_ORDER: Exclude<RouteKey, "all">[] = [
  "hajj",
  "camino",
  "chakchak",
  "buddhist",
  "kumbh",
];

export function bow(
  p1: MapPoint,
  p2: MapPoint,
  amt = 0.16
): { mx: number; my: number } {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy);
  const nx = -dy / dist;
  const ny = dx / dist;
  return {
    mx: (p1.x + p2.x) / 2 + nx * dist * amt,
    my: (p1.y + p2.y) / 2 + ny * dist * amt,
  };
}

export function pointKeysForRoute(routeKey: Exclude<RouteKey, "all">): string[] {
  const route = ROUTES[routeKey];
  if (route.mapKind === "radial" && route.destination && route.sources) {
    return [route.destination, ...route.sources];
  }
  if (route.mapKind === "circuit" && route.circuit) {
    return route.circuit;
  }
  if (route.mapKind === "rotation" && route.rotation) {
    return route.rotation;
  }
  return [];
}

export function getCaption(routeKey: RouteKey): { meta: string; title: string; fact: string } {
  if (routeKey === "all") {
    return {
      meta: "Five faiths · many shapes",
      title: "Many roads, one destination — or none at all",
      fact: "Islam, Christianity, and Zoroastrianism built converging paths to a single shrine. Buddhism strung four sacred sites into a circuit. Hinduism rotates a gathering among four river cities. Same impulse — to travel toward the sacred — expressed in radically different geometries.",
    };
  }
  const route = ROUTES[routeKey];
  return {
    meta: `${route.era} · ${route.cadence}`,
    title: route.name,
    fact: "",
  };
}

export interface PilgrimageSectionContent {
  religionLabel: string;
  route: string;
  locations: string;
  paragraphs: string[];
  videoId?: string;
}

export const PILGRIMAGE_CONTENT: Record<Exclude<RouteKey, "all">, PilgrimageSectionContent> = {
  hajj: {
    religionLabel: "Islam",
    videoId: "OhsVEqFxC4E",
    route:
      "Historically three caravan roads converging on Mecca: the Syrian route, Damascus to Medina, 1,307 km; the Egyptian route, Cairo through Ajrud, Suez, the Sinai, Aqaba, and Yanbu, to Medina and Mecca; and the Iraqi route (Darb Zubayda), Kufa through Fayd and the Najd to Medina and Mecca. Today almost all pilgrims fly into Jeddah or Medina, but the rite itself still retraces a fixed short sequence of stops around Mecca — Mina, Mount Arafat, Muzdalifah.",
    locations:
      "Mecca (Kaaba, Masjid al-Haram) and Medina (Prophet's Mosque), Saudi Arabia; historic departure points at Damascus, Cairo, and Kufa.",
    paragraphs: [
      "The rite predates Islam — Mecca was already a pilgrimage destination for pagan Arabs — and Muhammad reformed the existing pilgrimage tradition around 632 CE, fixing it as one of Islam's five pillars. For the next twelve centuries, getting there was the hard part: caravans formed in Damascus, Cairo, and Baghdad, sometimes waiting ten days to gather stragglers and pay tribute to the tribes whose territory they'd cross, before setting out across genuinely dangerous desert. Medieval travelers like Ibn Battuta and Ibn Jubayr left detailed accounts of these journeys, and the routes themselves — forts, wells, and waystations — are substantial enough that Saudi Arabia has put them forward for UNESCO World Heritage status as a single serial site.",
      "The Hajj itself runs on fixed lunar dates (8–13 Dhu al-Hijjah) and follows a precise sequence: entering a state of ritual purity (ihram), seven circuits of the Kaaba (tawaf), a fast walk between the hills of Safa and Marwah re-enacting Hagar's search for water, a day standing in prayer on the plain of Arafat, and a symbolic stoning of pillars representing temptation, timed to coincide with Eid al-Adha. It's obligatory once in a lifetime for every Muslim who is physically and financially able — the only one of these five pilgrimages with that kind of binding force.",
    ],
  },
  camino: {
    religionLabel: "Christianity",
    videoId: "2SX9YNQVCLM",
    route:
      "A genuine network rather than one road: Via Podiensis, 762 km from Le Puy-en-Velay; Via Turonensis, 1,021 km from Paris; Camino del Norte, 817 km along Spain's northern coast; Camino Portugués, 608 km from Lisbon; and the Via de la Plata from Seville, all eventually feeding into the Camino Francés for the final stretch into Galicia.",
    locations:
      "Santiago de Compostela, Spain (the cathedral holds the relics of St. James), with feeder routes starting across France, Portugal, and Spain.",
    paragraphs: [
      "The cult began with the supposed 9th-century discovery of the apostle James's remains in northwestern Spain, and the route's first detailed guide appears in the 12th-century Codex Calixtinus. In 1997 the Council of Europe declared the Camino the First European Cultural Itinerary, recognizing it as a symbol of nearly a thousand years of pan-European movement — pilgrims from Germany, Switzerland, and Italy all funneled into the French routes long before \"European cooperation\" was a political concept.",
      "Unlike Hajj, there's no fixed calendar and no obligation — pilgrims walk (or cycle) at any time of year, staying in pilgrim hostels (albergues) and collecting stamps in a pilgrim passport along the way. To receive the official Compostela certificate you need to cover at least the final 100 km on foot, or 200 km by bicycle — which is why many modern pilgrims start at Sarria rather than walk the full 780 km from the French border. The walk ends with a Pilgrim's Mass at the cathedral and, traditionally, an embrace of the saint's statue.",
    ],
  },
  chakchak: {
    religionLabel: "Zoroastrianism",
    route:
      "Pilgrims converge from Tehran, Kerman, the city of Yazd, and the Indian Parsi diaspora onto a single mountain shrine; the final stretch is on foot, up a long staircase cut into the cliff face — 238 to 360 steps depending on the source.",
    locations: "Chak Chak / Pir-e Sabz shrine, near Ardakan, Yazd Province, Iran.",
    paragraphs: [
      "The site's founding legend dates to 640 CE, when Nikbanu, daughter of the last Sasanian king Yazdegerd III, was said to have been sheltered inside the mountain while fleeing the Arab conquest of Iran. For centuries afterward, Zoroastrians under Islamic rule maintained the shrine quietly; 19th- and 20th-century philanthropy from Parsi donors in India, notably Manekji Hataria, funded its repair and preservation at a point when the community's numbers in Iran were shrinking under social and economic pressure.",
      "Each year from 14 to 18 June, thousands of Zoroastrians from Iran, India, and elsewhere gather at the fire temple. Tradition holds that pilgrims dismount and finish the approach on foot once the shrine comes into view. The days are spent in prayer, reciting the Avesta, lighting candles, and — distinctively — communally baking and sharing a votive bread called seerag in honor of Nikbanu and the pilgrims' own ancestors. It's the smallest pilgrimage of the five by orders of magnitude, but structurally it's a near-exact miniature of Hajj: scattered origins, one fixed point, fixed dates.",
    ],
  },
  buddhist: {
    religionLabel: "Buddhism",
    route:
      "Geographically, the modern \"Buddhist Circuit\" runs Bodh Gaya → Sarnath/Varanasi (roughly 255 km) → Kushinagar (roughly 220–280 km) → Lumbini, Nepal (roughly 180 km, crossing at the Sunauli/Gorakhpur border). Pilgrims often extend it to the \"Eight Great Places\" by adding Rajgir, Nalanda, Vaishali, and Sravasti.",
    locations:
      "Lumbini, Nepal (birth); Bodh Gaya, Bihar, India (enlightenment, Mahabodhi Temple); Sarnath, Uttar Pradesh, India, near Varanasi (first sermon); Kushinagar, Uttar Pradesh, India (death/parinirvana).",
    paragraphs: [
      "This is the one pilgrimage on the list with a founder's direct endorsement: in the Mahaparinibbana Sutta, the Buddha tells his attendant Ananda that a devout follower should visit these four places with reverence, though — and this is the key contrast with Hajj — he recommended rather than commanded it. Emperor Ashoka, in the 3rd century BCE, visited all four and marked them with pillars and stupas, effectively building the pilgrimage infrastructure that later archaeology would rely on. Buddhism then largely disappeared from its land of origin by around the 12th century CE, and the sites fell into obscurity until 19th-century British archaeologist Alexander Cunningham rediscovered them, with Sri Lankan activist Anagarika Dharmapala later leading their restoration.",
      "Practice centers on circumambulation, meditation, and chanting rather than a single fixed rite. At Bodh Gaya, pilgrims meditate near the Bodhi Tree and circle the Mahabodhi Temple; at Sarnath, hundreds gather each evening to chant the Dhammacakka Pavattana Sutta — the Buddha's own first sermon, recited on the spot where he gave it. There's no fixed pilgrimage season, though Buddha Purnima (Vesak) draws the largest crowds. It's the most philosophically distinct entry here: a pilgrimage built entirely on invitation, not obligation.",
    ],
  },
  kumbh: {
    religionLabel: "Hinduism",
    videoId: "LPa5nEPJRjE",
    route:
      "Not a road network — a rotation. The same event cycles among four fixed cities — Prayagraj, Haridwar, Nashik, and Ujjain — roughly every twelve years, tied to the astrological position of Jupiter. Pilgrims converge on whichever city is hosting that cycle by rail, road, and air from across India and the world.",
    locations:
      "Prayagraj (Triveni Sangam, the confluence of the Ganges, Yamuna, and mythical Saraswati), Haridwar (Ganges), Nashik (Godavari), Ujjain (Shipra) — all in India.",
    paragraphs: [
      "According to the Puranas, these four sites received drops of amrita, the nectar of immortality, during the Samudra Manthana — the churning of the cosmic ocean — which is the mythic basis for their sanctity. The modern naming and scale are more recent than the underlying tradition: attendance has grown from 70 million in 2007, to 120 million in 2013, to 240 million in 2019, to over 660 million at the 2025 Maha Kumbh in Prayagraj — coinciding with a planetary alignment that recurs only once every 144 years, and now the largest human gathering ever recorded.",
      "The central rite is a timed ritual bath (shahi snan) at the river confluence on specific astrologically determined days, believed to cleanse sin and advance spiritual liberation. Bathing order follows a strict hierarchy of Hindu ascetic orders (akharas), with the famously austere, ash-covered Naga sadhus entering first. Around the bathing itself grows a temporary city of tents housing millions for weeks at a time, with continuous discourses, communal kitchens, and processions along the ghats. Of the five pilgrimages here, it's the only one that isn't a path at all — it's a location that physically relocates, by rule, once every twelve years.",
    ],
  },
};

export const ROUTE_JUMP_LABELS: Record<Exclude<RouteKey, "all">, string> = {
  hajj: "Hajj",
  camino: "Camino",
  chakchak: "Chak Chak",
  buddhist: "Buddhist Circuit",
  kumbh: "Kumbh Mela",
};
