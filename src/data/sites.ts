// Sacred sites for the globe view.

export interface SacredSite {
  id: string;
  name: string;
  lat: number;
  lng: number;
  accent: string;
  blurb: string;
  description: string;
  religions: string[]; // religion ids that revere this site
}

export const SITES: SacredSite[] = [
  {
    id: "jerusalem",
    name: "Jerusalem",
    lat: 31.7683,
    lng: 35.2137,
    accent: "#D8485B",
    blurb: "Holy to Judaism, Christianity, and Islam alike.",
    description:
      "Few cities carry such weight. Jerusalem holds the Temple Mount (Judaism's holiest site), the Church of the Holy Sepulchre (where Christians venerate Christ's tomb), and the al-Aqsa Mosque and Dome of the Rock — from which Muslims believe Muhammad ascended to heaven.",
    religions: ["judaism", "christianity", "islam", "bahai"],
  },
  {
    id: "varanasi",
    name: "Varanasi",
    lat: 25.3176,
    lng: 82.9739,
    accent: "#F0933B",
    blurb: "Shiva's eternal city on the Ganges.",
    description:
      "For over 3,000 years, Hindus have bathed in the Ganges at Varanasi (Kashi), believing its waters purify karma and that to die here breaks the cycle of rebirth. Ghats line the river, each a stage of life, death, and cremation.",
    religions: ["hinduism", "buddhism"],
  },
  {
    id: "mecca",
    name: "Mecca",
    lat: 21.3891,
    lng: 39.8579,
    accent: "#E6B450",
    blurb: "The Kaaba and the heart of Islam.",
    description:
      "The birthplace of Muhammad and the destination of the Hajj — the pilgrimage every able Muslim undertakes at least once. The Kaaba, a cube at the Masjid al-Haram, is the focal point of Muslim prayer worldwide.",
    religions: ["islam"],
  },
  {
    id: "lhasa",
    name: "Lhasa",
    lat: 29.652,
    lng: 91.1721,
    accent: "#E6B450",
    blurb: "The forbidden city of Tibetan Buddhism.",
    description:
      "Once seat of the Dalai Lamas, Lhasa is the spiritual heart of Vajrayana Buddhism. The Potala Palace and Jokhang Temple draw pilgrims who prostrate themselves across the Tibetan plateau.",
    religions: ["buddhism"],
  },
  {
    id: "babylon",
    name: "Babylon",
    lat: 32.5422,
    lng: 44.422,
    accent: "#9B7DE0",
    blurb: "The tower, the exile, and the dawn of empires.",
    description:
      "Babylon and nearby Mesopotamian cities seeded Sumerian, Babylonian, and Manichaean worlds. Its ziggurats inspired the Tower of Babel; its exile shaped Jewish scripture; here Mani taught and died.",
    religions: ["sumerian", "manichaean"],
  },
  {
    id: "persepolis",
    name: "Persepolis",
    lat: 29.9354,
    lng: 52.8916,
    accent: "#D69A2C",
    blurb: "Ceremonial capital of the Zoroastrian Achaemenids.",
    description:
      "Ritual capital of the Persian Empire, founded by Darius the Great. The Achaemenid kings ruled by the Zoroastrian ideal of kingship in harmony with Ahura Mazda — 'the Wise Lord.'",
    religions: ["zoroastrian"],
  },
  {
    id: "bodhgaya",
    name: "Bodh Gaya",
    lat: 24.6961,
    lng: 84.9911,
    accent: "#E6B450",
    blurb: "Where the Buddha sat beneath the Bodhi tree.",
    description:
      "The most sacred site of Buddhism. Here Siddhartha Gautama attained enlightenment beneath the Bodhi tree. The Mahabodhi Temple marks the spot; pilgrims from every Buddhist school still come to meditate.",
    religions: ["buddhism"],
  },
  {
    id: "amritsar",
    name: "Amritsar",
    lat: 31.634,
    lng: 74.8723,
    accent: "#F0933B",
    blurb: "The Golden Temple and the heart of Sikhism.",
    description:
      "Home of the Harmandir Sahib — the Golden Temple — the spiritual center of Sikhism. The temple sits in the middle of the Amrit Sarovar, the 'pool of nectar' that gives the city its name.",
    religions: ["sikhism"],
  },
  {
    id: "ise",
    name: "Ise",
    lat: 34.4879,
    lng: 136.7084,
    accent: "#3FB8AF",
    blurb: "Japan's most sacred Shinto shrines.",
    description:
      "The Ise Jingu enshrines Amaterasu, the sun goddess and ancestral deity of the Imperial family. Rebuilt every twenty years for over a millennium, it embodies Shinto's renewal and continuity.",
    religions: ["shinto"],
  },
  {
    id: "teotihuacan",
    name: "Teotihuacán",
    lat: 19.6925,
    lng: -98.8436,
    accent: "#F0933B",
    blurb: "The Avenue of the Dead and the Pyramid of the Sun.",
    description:
      "A vast Mesoamerican ceremonial center whose builders are still unknown. Its pyramids and temples encoded a cosmos of sun, sacrifice, and the rain gods of pre-Aztec Mexico.",
    religions: [],
  },
];

// Convert lat/lng to a point on a unit sphere (Three.js coordinate)
export function latLngToVec3(lat: number, lng: number, radius = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
