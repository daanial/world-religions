// World Religions dataset
// 30+ religions, philosophical traditions, and ancient belief systems.
// Dates are given as years (negative = BCE). `extinct` marks faiths no longer widely practiced.

export type Region =
  | "Middle East"
  | "South Asia"
  | "East Asia"
  | "Central Asia"
  | "Europe"
  | "Africa"
  | "Americas"
  | "Oceania";

export type Family =
  | "Abrahamic"
  | "Indian"
  | "Iranian"
  | "East Asian"
  | "Indo-European"
  | "Indigenous"
  | "African"
  | "Modern";

export interface ConceptTag {
  soul?: boolean;
  salvation?: boolean;
  sacrifice?: boolean;
  enlightenment?: boolean;
  judgement?: boolean;
  nonviolence?: boolean;
  mysticism?: boolean;
  monotheism?: boolean;
  polytheism?: boolean;
  reincarnation?: boolean;
  karma?: boolean;
  liberation?: boolean;
  heaven?: boolean;
  hell?: boolean;
  sin?: boolean;
  meditation?: boolean;
  prayer?: boolean;
  fasting?: boolean;
  pilgrimage?: boolean;
}

export interface SacredText {
  name: string;
  description: string;
}

export interface Religion {
  id: string;
  name: string;
  family: Family;
  region: Region;
  origin: number; // year founded (negative = BCE)
  ended?: number; // year effectively extinct (negative = BCE)
  extinct?: boolean;
  living: boolean;
  followers: number; // approximate adherents today
  countries: number; // present in N countries
  accent: string; // hex accent color
  blurb: string;
  description: string;
  sacredTexts: SacredText[];
  practices: string[];
  coreIdeas: { label: string; value: string }[];
  concepts: (keyof ConceptTag)[]; // concept ids this faith engages
  splitsFrom?: string; // parent religion id (for timeline splits)
  cities?: string[]; // sacred city ids
}

// accent palette per the spec
const A = {
  gold: "#E6B450",
  saffron: "#F0933B",
  turquoise: "#3FB8AF",
  crimson: "#D8485B",
  violet: "#9B7DE0",
  teal: "#2EA8A0",
  rose: "#E0708E",
  amber: "#D69A2C",
  jade: "#5FBF8F",
  indigo: "#6A7BD8",
};

export const RELIGIONS: Religion[] = [
  // ---- Ancient / Extinct ----
  {
    id: "sumerian",
    name: "Sumerian Religion",
    family: "Indo-European",
    region: "Middle East",
    origin: -3500,
    ended: -500,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.gold,
    blurb: "The cradle of written myth, city-gods and ziggurats.",
    description:
      "The religious world of Sumer in southern Mesopotamia — a pantheon of city patron deities, temple economies, and the earliest written myths such as the Epic of Gilgamesh. Sumerian cosmology described a layered universe of heaven, earth, and underworld, and introduced many motifs that echo through later Near Eastern traditions.",
    sacredTexts: [
      {
        name: "Epic of Gilgamesh",
        description:
          "The earliest surviving epic poem, telling of King Gilgamesh of Uruk and his quest for immortality after the death of his friend Enkidu. It explores friendship, kingship, and the limits of human life against the gods' decree of mortality. Tablet fragments from the third millennium BCE preserve a story that influenced later Near Eastern and Greek literature.",
      },
      {
        name: "Enuma Elish (inherited)",
        description:
          "The Babylonian creation epic, composed in Akkadian and recited at the New Year festival. It describes how Marduk defeated the primordial goddess Tiamat and ordered the cosmos from her body. Sumerian cities later inherited and adapted this myth as Babylon rose to regional dominance.",
      },
      {
        name: "Sumerian King List",
        description:
          "A chronicle blending history and legend, listing kings of Sumer from before the Flood through historical dynasties. It asserts that kingship descended from heaven and legitimized successive rulers. The text reveals how Sumerians understood divine authority and the cyclical rise and fall of cities.",
      },
    ],
    practices: ["Temple offerings", "Ziggurat rituals", "Divination", "New Year festivals"],
    coreIdeas: [
      { label: "Afterlife", value: "Gloomy underworld (Kur), no judgment paradise" },
      { label: "Sin", value: "Offense against cosmic order ordained by gods" },
      { label: "Deity", value: "Polytheistic pantheon with patron city-gods" },
    ],
    concepts: ["polytheism", "sacrifice", "soul", "prayer"],
    cities: ["babylon"],
  },
  {
    id: "egyptian",
    name: "Ancient Egyptian Religion",
    family: "African",
    region: "Africa",
    origin: -3000,
    ended: 500,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.gold,
    blurb: "Pharaohs, mummification, and the weighing of the heart.",
    description:
      "A 3,000-year tradition centered on maat (cosmic order), divine kingship, and an elaborate afterlife. The dead faced judgment: their heart weighed against the feather of truth. Gods like Ra, Osiris, and Isis governed cycles of sun, Nile, and rebirth.",
    sacredTexts: [
      {
        name: "Pyramid Texts",
        description:
          "The oldest religious writings in the world, carved inside Fifth and Sixth Dynasty pyramids around 2400 BCE. These spells and hymns guided the pharaoh's soul through the afterlife, invoking Osiris and the gods of the Duat. They form the foundation of all later Egyptian funerary literature.",
      },
      {
        name: "Book of the Dead",
        description:
          "A collection of spells written on papyrus scrolls and placed in tombs from the New Kingdom onward. The most famous passage describes the weighing of the heart against the feather of Maat before Osiris. It offered ordinary Egyptians, not just kings, a map to navigate judgment and reach the Field of Reeds.",
      },
      {
        name: "Coffin Texts",
        description:
          "Middle Kingdom spells painted inside wooden coffins, democratizing afterlife knowledge once reserved for royalty. They expanded on Pyramid Text themes with new spells for protection, transformation, and cosmic travel. Many motifs in the Book of the Dead first appear here.",
      },
    ],
    practices: ["Mummification", "Temple cult", "Funerary rites", "Solar worship"],
    coreIdeas: [
      { label: "Afterlife", value: "Field of Reeds for the justified" },
      { label: "Judgement", value: "Heart weighed against maat" },
      { label: "Liberation", value: "Eternal union with the gods" },
    ],
    concepts: ["soul", "judgement", "sacrifice", "heaven", "polytheism"],
  },
  {
    id: "zoroastrian",
    name: "Zoroastrianism",
    family: "Iranian",
    region: "Middle East",
    origin: -1500,
    living: true,
    followers: 130000,
    countries: 6,
    accent: A.amber,
    blurb: "The first great monotheism — light against darkness.",
    description:
      "Founded by Zarathustra, Zoroastrianism posits Ahura Mazda, the Wise Lord, locked in cosmic struggle with Angra Mainyu. It introduced influential ideas: a single good creator, judgment of every soul, heaven and hell, and a final savior (Saoshyant). It profoundly shaped Judaism, Christianity, and Islam.",
    sacredTexts: [
      {
        name: "Avesta",
        description:
          "The primary collection of Zoroastrian scripture, transmitted orally for centuries before being written in Middle Persian. Only about one quarter of the original corpus survives today. It contains hymns, liturgies, and laws attributed to the prophet Zarathustra and his followers.",
      },
      {
        name: "Gathas",
        description:
          "Seventeen hymns composed in Old Avestan, widely regarded as the words of Zarathustra himself. They praise Ahura Mazda and call humanity to choose asha (truth) over druj (the lie). The Gathas are the theological heart of the faith and are recited in every major Zoroastrian ceremony.",
      },
      {
        name: "Vendidad",
        description:
          "A legal and ritual text focused on purity, the battle against evil, and proper conduct toward fire, water, earth, and plants. It preserves myths of creation and the origin of death and disease. Priests consult it for rules governing daily life and ritual cleanliness.",
      },
    ],
    practices: ["Fire temples", "Sacred thread (kusti)", "Purity rituals", "Charity"],
    coreIdeas: [
      { label: "Afterlife", value: "Chinvat Bridge to heaven or hell" },
      { label: "Sin", value: "Choosing the lie (druj) over truth (asha)" },
      { label: "Monotheism", value: "Ahura Mazda, uncreated Wise Lord" },
    ],
    concepts: ["monotheism", "heaven", "hell", "judgement", "sin", "soul", "prayer", "mysticism"],
    cities: ["persepolis"],
  },
  {
    id: "canaanite",
    name: "Canaanite Religion",
    family: "Indo-European",
    region: "Middle East",
    origin: -2000,
    ended: -500,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.amber,
    blurb: "El, Baal, Asherah — the gods of the Levant.",
    description:
      "The beliefs of the Levantine coast, sharing roots with later Israelite religion. A council of gods led by El, the storm-god Baal, and goddess Asherah. The Hebrew Bible preserves echoes of this world in its polemic against them.",
    sacredTexts: [
      {
        name: "Ugaritic texts (Baal Cycle)",
        description:
          "Clay tablets from Ugarit (modern Ras Shamra) recording myths of the storm-god Baal's battle with Yam (Sea) and Mot (Death). They depict El as father of the gods and Asherah as consort of El, offering a window into Levantine religion before Israelite monotheism. The Baal Cycle was recited at seasonal festivals and shaped Near Eastern storm-god mythology for centuries.",
      },
    ],
    practices: ["High-place altars", "Animal sacrifice", "Libations"],
    coreIdeas: [
      { label: "Deity", value: "Council of gods (Elohim)" },
      { label: "Afterlife", value: "Shadowy realm of Mot" },
    ],
    concepts: ["polytheism", "sacrifice", "soul"],
  },
  {
    id: "greek-roman",
    name: "Greco-Roman Religion",
    family: "Indo-European",
    region: "Europe",
    origin: -800,
    ended: 500,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.turquoise,
    blurb: "Olympus, oracles, and the rites of the polis.",
    description:
      "The polytheism of the classical Mediterranean — Olympian gods, civic cult, mystery religions, and the Olympian pantheon that seeded Western art and myth. Its philosophical critics (the Stoics, Platonists) fed into later theology.",
    sacredTexts: [
      {
        name: "Iliad & Odyssey",
        description:
          "Homer's epic poems, composed orally around the eighth century BCE and foundational to Greek identity. The Iliad recounts the wrath of Achilles during the Trojan War; the Odyssey follows Odysseus's long voyage home. Both portray the gods as active participants in human affairs, rewarding honor and punishing hubris.",
      },
      {
        name: "Theogony",
        description:
          "Hesiod's poem tracing the genealogy of the Greek gods from Chaos through the reign of Zeus. It explains the succession of divine rulers and the origins of natural forces and human woes. Greeks treated it as a canonical account of how the cosmos and Olympian order came to be.",
      },
      {
        name: "Aeneid",
        description:
          "Virgil's Roman epic linking the Trojan hero Aeneas to the founding of Rome and the Julian dynasty. It blends Greek myth with Roman piety, portraying destiny (fatum) as guided by Jupiter and fate. The poem became the literary scripture of Roman civic religion and imperial ideology.",
      },
    ],
    practices: ["Sacrifice", "Oracles", "Mystery rites (Eleusis)", "Public festivals"],
    coreIdeas: [
      { label: "Afterlife", value: "Hades for most; Elysium for heroes" },
      { label: "Sin", value: "Hubris provoking divine retribution (nemesis)" },
    ],
    concepts: ["polytheism", "sacrifice", "soul", "mysticism"],
  },
  {
    id: "norse",
    name: "Norse Paganism",
    family: "Indo-European",
    region: "Europe",
    origin: -500,
    ended: 1100,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.indigo,
    blurb: "Odin, Thor, Valhalla, and Ragnarök.",
    description:
      "The pre-Christian religion of Scandinavia and the Germanic peoples — Aesir and Vanir gods, the world-tree Yggdrasil, and a fatalistic cosmos ending in Ragnarök. Valor in battle could earn a place in Valhalla.",
    sacredTexts: [
      {
        name: "Poetic Edda",
        description:
          "A collection of Old Norse poems preserved in the Codex Regius, including the Völuspá (prophecy of the seeress) and tales of Odin, Thor, and Loki. It recounts the creation of the world, the gods' deeds, and the foretold destruction of Ragnarök. These verses were the primary source for later Scandinavian understanding of the mythic past.",
      },
      {
        name: "Prose Edda (Snorri)",
        description:
          "Written around 1220 by the Icelandic scholar Snorri Sturluson to preserve and explain skaldic poetry for future generations. It retells myths in accessible prose and includes a dialogue between Gylfi and the Aesir gods. Snorri's work is the most systematic surviving account of Norse cosmology and divine genealogy.",
      },
    ],
    practices: ["Blót sacrifice", "Runes", "Seiðr magic", "Feasting"],
    coreIdeas: [
      { label: "Afterlife", value: "Valhalla, Hel, or the halls of other gods" },
      { label: "Fate", value: "Norns weave inescapable destiny" },
    ],
    concepts: ["polytheism", "sacrifice", "soul", "mysticism"],
  },
  {
    id: "druidic",
    name: "Celtic Druidism",
    family: "Indo-European",
    region: "Europe",
    origin: -400,
    ended: 600,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.jade,
    blurb: "Druids, sacred groves, and the wheel of the year.",
    description:
      "The priestly traditions of the ancient Celts. Druids were judges, poets, and ritual specialists who transmitted cosmology orally. Sacred groves, seasonal fire-festivals (Samhain, Beltane), and a belief in reincarnation shaped Celtic life.",
    sacredTexts: [
      {
        name: "(Oral tradition — recorded by Caesar & Irish monks)",
        description:
          "Celtic druids transmitted theology, law, and ritual through memorized verse over generations, forbidding written records of their deepest teachings. Roman writers like Julius Caesar and later Irish Christian monks preserved fragments of this oral corpus in Latin and Gaelic manuscripts. What survives describes a cosmos of many gods, sacred groves, and the soul's passage between lives.",
      },
    ],
    practices: ["Seasonal fire festivals", "Oak & mistletoe rites", "Oral bardic training"],
    coreIdeas: [
      { label: "Reincarnation", value: "Soul passes to new body" },
      { label: "Deity", value: "Many regional gods and goddesses" },
    ],
    concepts: ["polytheism", "reincarnation", "sacrifice", "mysticism"],
  },
  {
    id: "manichaean",
    name: "Manichaeism",
    family: "Iranian",
    region: "Middle East",
    origin: 240,
    ended: 1400,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.violet,
    blurb: "A world religion of light and darkness, from Persia to China.",
    description:
      "Founded by the prophet Mani, Manichaeism was once a rival to Christianity from Rome to China. It taught a radical cosmic dualism — light (spirit, good) trapped in the material world of darkness — and a path of liberation through ascetic 'Elect' and lay 'Hearers.'",
    sacredTexts: [
      {
        name: "Shabuhragan",
        description:
          "A Middle Persian text composed for King Shapur I, presenting Mani's teachings on the cosmic struggle between light and darkness. It outlines the three ages of world history and the role of prophets across cultures. The work was once widely circulated along Silk Road trade routes.",
      },
      {
        name: "Gospel of Mani",
        description:
          "Mani's own account of his divine calling and mission to complete the revelations of Buddha, Zoroaster, and Jesus. It presented Manichaeism as the final, universal religion synthesizing earlier traditions. Only fragments survive in Coptic, Middle Persian, and Chinese translations.",
      },
      {
        name: "Arzhang",
        description:
          "An illustrated 'Picture Book' attributed to Mani, using paintings to teach cosmology to audiences across languages and literacy levels. It depicted the realms of light, the material prison, and the path of liberation. Church authorities ordered its destruction, and no copy survives intact today.",
      },
    ],
    practices: ["Vegetarianism", "Confession", "Ritual meals", "Missionary journeys"],
    coreIdeas: [
      { label: "Liberation", value: "Release of light-particles from matter" },
      { label: "Sin", value: "Feeding the body feeds darkness" },
    ],
    concepts: ["monotheism", "soul", "judgement", "sin", "mysticism"],
    cities: ["babylon"],
  },
  {
    id: "tengrism",
    name: "Tengrism",
    family: "Indo-European",
    region: "Central Asia",
    origin: -1000,
    living: true,
    followers: 50000,
    countries: 3,
    accent: A.teal,
    blurb: "Eternal Blue Sky — the faith of the steppe.",
    description:
      "The animistic-sky religion of the Turkic and Mongol nomads, centered on Tengri, the supreme sky-god. It venerated ancestors, sacred mountains, and the balance of all things. Genghis Khan ruled with Tengri's mandate.",
    sacredTexts: [
      {
        name: "(Oral — Inscriptions of Orkhon, Secret History of the Mongols)",
        description:
          "Tengrism's core teachings were passed orally among Turkic and Mongol peoples, with no single canonical scripture. The Orkhon inscriptions of the eighth century preserve early Turkic prayers to Tengri and the ancestors of the Göktürk khagans. The Secret History of the Mongols, written in the thirteenth century, records Genghis Khan's mandate from the Eternal Blue Sky and the shamanic world of the steppe.",
      },
    ],
    practices: ["Shamanic trance", "Sky & mountain veneration", "Ancestor rites"],
    coreIdeas: [
      { label: "Afterlife", value: "Ancestral spirit world" },
      { label: "Deity", value: "Tengri, the Eternal Blue Sky" },
    ],
    concepts: ["polytheism", "soul", "mysticism"],
  },
  {
    id: "mithraism",
    name: "Mithraism",
    family: "Iranian",
    region: "Europe",
    origin: 100,
    ended: 400,
    extinct: true,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.indigo,
    blurb: "The mystery cult of the bull-slayer Mithras.",
    description:
      "A Roman mystery religion popular among soldiers, centered on the god Mithras slaying the cosmic bull. Initiation through seven grades promised salvation of the soul after death. Its underground mithraea spread across the Empire.",
    sacredTexts: [
      {
        name: "(Mostly lost — iconography & inscriptions survive)",
        description:
          "Mithraism was a secret initiatory cult whose written scriptures were never publicly circulated and have almost entirely perished. What remains are inscriptions in mithraea across the Roman Empire and the rich iconography of the tauroctony — Mithras slaying the cosmic bull. Initiates learned the faith's seven grades and salvation myth through ritual drama rather than reading.",
      },
    ],
    practices: ["Initiation grades", "Ritual meals", "Bull-slaying rite (tauroctony)"],
    coreIdeas: [
      { label: "Salvation", value: "Liberated ascent of the soul through the planets" },
      { label: "Deity", value: "Mithras, a solar intermediary" },
    ],
    concepts: ["soul", "salvation", "sacrifice", "mysticism"],
  },

  // ---- Living: Indian ----
  {
    id: "hinduism",
    name: "Hinduism",
    family: "Indian",
    region: "South Asia",
    origin: -2000,
    living: true,
    followers: 1200000000,
    countries: 100,
    accent: A.saffron,
    blurb: "The oldest living religion — many paths to one truth.",
    description:
      "A vast family of traditions without a single founder, rooted in the Vedas and flowering through Upanishads, epics, and bhakti. Hindus explore dharma (duty), karma (cause and effect), samsara (rebirth), and moksha (liberation) through countless deities and paths.",
    sacredTexts: [
      {
        name: "Vedas",
        description:
          "The oldest and most authoritative Hindu scriptures, composed in Sanskrit between roughly 1500 and 500 BCE. The four collections — Rig, Sama, Yajur, and Atharva — contain hymns, rituals, and cosmological speculations recited by Brahmin priests. They are regarded as shruti, 'that which is heard,' revealed directly to ancient sages.",
      },
      {
        name: "Upanishads",
        description:
          "Philosophical texts appended to the Vedas, exploring the nature of Brahman (ultimate reality) and Atman (the self). They move from ritual sacrifice toward inner contemplation and the quest for moksha. The Chandogya and Brihadaranyaka Upanishads are among the most influential, shaping Hindu, Buddhist, and Western philosophy.",
      },
      {
        name: "Bhagavad Gita",
        description:
          "A 700-verse dialogue between the warrior Arjuna and the god Krishna, embedded in the Mahabharata epic. Krishna teaches the paths of devotion (bhakti), selfless action (karma yoga), and knowledge (jnana) as routes to liberation. It is one of the most widely read and commented-upon texts in Hindu tradition.",
      },
      {
        name: "Mahabharata",
        description:
          "The world's longest epic poem, telling of the great war between the Pandava and Kaurava clans and the fall of the dharma age. It weaves together history, mythology, law, and philosophy across roughly 100,000 verses. The Bhagavad Gita forms its spiritual climax, and the epic's moral dilemmas remain central to Hindu thought.",
      },
      {
        name: "Ramayana",
        description:
          "The epic of Prince Rama, an avatar of Vishnu, who rescues his wife Sita from the demon king Ravana with the help of Hanuman. It celebrates dharma, devotion, and ideal kingship, and is recited and performed across South and Southeast Asia. Valmiki's Sanskrit version is the best known, though regional retellings abound.",
      },
    ],
    practices: ["Puja", "Yoga & meditation", "Pilgrimage (tirtha)", "Festivals (Diwali, Holi)"],
    coreIdeas: [
      { label: "Liberation", value: "Moksha — release from samsara" },
      { label: "Karma", value: "Actions shape future rebirths" },
      { label: "Deity", value: "Brahman beneath many forms (Brahma, Vishnu, Shiva)" },
    ],
    concepts: ["soul", "reincarnation", "karma", "liberation", "meditation", "nonviolence", "mysticism", "polytheism", "pilgrimage"],
    cities: ["varanasi"],
  },
  {
    id: "buddhism",
    name: "Buddhism",
    family: "Indian",
    region: "South Asia",
    origin: -500,
    living: true,
    followers: 520000000,
    countries: 60,
    accent: A.gold,
    blurb: "The Middle Way to the end of suffering.",
    description:
      "Founded by Siddhartha Gautama, the Buddha taught that suffering arises from craving and ignorance, and that it can end through the Eightfold Path. Schools like Theravada, Mahayana, and Vajrayana spread the dharma across Asia.",
    sacredTexts: [
      {
        name: "Tipitaka (Pali Canon)",
        description:
          "The earliest complete Buddhist canon, preserved in Pali and authoritative for Theravada Buddhism. It is divided into three 'baskets': Vinaya (monastic rules), Sutta (discourses of the Buddha), and Abhidhamma (philosophical analysis). Composed and memorized orally for centuries, it was first written down in Sri Lanka around the first century BCE.",
      },
      {
        name: "Mahayana Sutras",
        description:
          "A vast library of texts revered by Mahayana Buddhists, including the Lotus Sutra, Heart Sutra, and Diamond Sutra. They emphasize the bodhisattva ideal — postponing one's own nirvana to save all beings — and introduce concepts like emptiness (shunyata) and Buddha-nature. Many were composed in Sanskrit between the first century BCE and fifth century CE.",
      },
      {
        name: "Tibetan Kangyur",
        description:
          "The 'Translated Word of the Buddha,' a 108-volume collection of scriptures in Tibetan used by Vajrayana schools. It includes Hinayana, Mahayana, and tantric texts, many translated from Sanskrit during Tibet's classical period. Monasteries treat the Kangyur as physically sacred, and public readings confer great merit.",
      },
    ],
    practices: ["Meditation (vipassana, zazen)", "Mindfulness", "Monasticism", "Pilgrimage"],
    coreIdeas: [
      { label: "Enlightenment", value: "Nirvana — extinguishing of craving" },
      { label: "Karma", value: "Intentional action conditions rebirth" },
      { label: "Afterlife", value: "Rebirth until liberation; no eternal soul" },
    ],
    concepts: ["soul", "reincarnation", "karma", "liberation", "enlightenment", "meditation", "nonviolence", "mysticism"],
    cities: ["lhasa"],
    splitsFrom: "hinduism",
  },
  {
    id: "jainism",
    name: "Jainism",
    family: "Indian",
    region: "South Asia",
    origin: -600,
    living: true,
    followers: 4500000,
    countries: 10,
    accent: A.jade,
    blurb: "Radical nonviolence and the soul's absolute freedom.",
    description:
      "Jains pursue ahimsa (nonviolence) to its logical extreme, holding every living being possesses a soul (jiva) that can attain kevala — omniscient liberation. The monastic vow sweeps the path before walking, lest one harm an insect.",
    sacredTexts: [
      {
        name: "Agamas",
        description:
          "The canonical scriptures of Jainism, believed to preserve the teachings of Mahavira and earlier Tirthankaras as memorized by his disciples. They cover cosmology, ethics, and the path to kevala (omniscient liberation). Digambara and Svetambara Jains recognize different Agama collections, reflecting a centuries-old schism.",
      },
      {
        name: "Tattvartha Sutra",
        description:
          "A systematic philosophical text by Umasvati (c. 2nd–5th century CE) accepted by both major Jain sects. It defines the seven (or nine) fundamental truths (tattvas), including soul, karma, and liberation. It is the only Jain scripture universally recognized across traditions.",
      },
      {
        name: "Kalpa Sutra",
        description:
          "A Svetambara text recounting the lives of the Tirthankaras, especially Parshvanatha and Mahavira, and prescribing monastic rules. It is read aloud during Paryushana, Jainism's most important festival of repentance and renewal. Its biographical sections inspire lay and monastic devotion alike.",
      },
    ],
    practices: ["Extreme ahimsa", "Fasting (sallekhana)", "Meditation", "Five vows"],
    coreIdeas: [
      { label: "Nonviolence", value: "Ahimsa toward all jiva" },
      { label: "Liberation", value: "Kevala — the soul freed from karmic matter" },
      { label: "Soul", value: "Every being has an individual jiva" },
    ],
    concepts: ["soul", "reincarnation", "karma", "liberation", "nonviolence", "meditation", "fasting"],
    splitsFrom: "hinduism",
  },
  {
    id: "sikhism",
    name: "Sikhism",
    family: "Indian",
    region: "South Asia",
    origin: 1500,
    living: true,
    followers: 30000000,
    countries: 30,
    accent: A.saffron,
    blurb: "One creator, equality, and honest work.",
    description:
      "Founded by Guru Nanak in Punjab, Sikhism teaches one formless God (Ik Onkar), the equality of all people regardless of caste or gender, and a life of honest work (kirat karni) and selfless service (seva).",
    sacredTexts: [
      {
        name: "Guru Granth Sahib",
        description:
          "Sikhism's eternal Guru, a single volume of hymns and poetry compiled by the fifth Guru, Arjan, and finalized by the tenth Guru, Gobind Singh. It includes writings of six Sikh Gurus plus saints from Hindu and Muslim backgrounds, sung in gurdwaras worldwide. The book is treated as a living presence — enthroned, covered, and addressed directly in worship.",
      },
    ],
    practices: ["Kirtan (sacred song)", "Langar (free kitchen)", "Five Ks", "Simran (remembrance)"],
    coreIdeas: [
      { label: "Monotheism", value: "Ik Onkar — one timeless creator" },
      { label: "Salvation", value: "Union with God through Nam and seva" },
      { label: "Equality", value: "No caste, no gender hierarchy" },
    ],
    concepts: ["monotheism", "soul", "karma", "liberation", "prayer", "nonviolence"],
  },

  // ---- Living: Abrahamic ----
  {
    id: "judaism",
    name: "Judaism",
    family: "Abrahamic",
    region: "Middle East",
    origin: -1800,
    living: true,
    followers: 15000000,
    countries: 90,
    accent: A.crimson,
    blurb: "The covenant between one God and a people.",
    description:
      "Judaism traces its origin to Abraham and the covenant at Sinai, where God revealed the Torah. Through exile and diaspora it preserved monotheism, ethical law, and the hope of redemption, becoming the root of Christianity and Islam.",
    sacredTexts: [
      {
        name: "Torah",
        description:
          "The first five books of the Hebrew Bible — Genesis, Exodus, Leviticus, Numbers, and Deuteronomy — traditionally attributed to Moses. It records creation, the covenant at Sinai, and the laws governing Israelite life. Torah scrolls are handwritten on parchment and read in full over the course of each synagogue year.",
      },
      {
        name: "Tanakh",
        description:
          "The complete Hebrew Bible, comprising Torah (Law), Nevi'im (Prophets), and Ketuvim (Writings). It spans from creation through exile and return, forming the scriptural foundation of Judaism. The Prophets call Israel to justice; the Writings include Psalms, Proverbs, Job, and Esther.",
      },
      {
        name: "Talmud",
        description:
          "A vast compendium of rabbinic debate, law, and lore compiled between the third and sixth centuries CE in two versions: the Babylonian and Jerusalem Talmuds. It interprets the Torah and applies its principles to every aspect of life. Studying Talmud is the central intellectual and spiritual discipline of rabbinic Judaism.",
      },
    ],
    practices: ["Shabbat", "Kosher diet", "Prayer (3x daily)", "Pilgrimage festivals"],
    coreIdeas: [
      { label: "Monotheism", value: "YHWH, one God of the covenant" },
      { label: "Sin", value: "Violation of the covenant (mitzvot)" },
      { label: "Afterlife", value: "Varied — Olam Ha-Ba; resurrection debated" },
    ],
    concepts: ["monotheism", "soul", "sin", "judgement", "prayer", "fasting", "pilgrimage"],
    cities: ["jerusalem"],
    splitsFrom: "canaanite",
  },
  {
    id: "christianity",
    name: "Christianity",
    family: "Abrahamic",
    region: "Middle East",
    origin: 30,
    living: true,
    followers: 2700000000,
    countries: 230,
    accent: A.crimson,
    blurb: "Salvation through Christ, God incarnate.",
    description:
      "Christianity proclaims that God became human in Jesus of Nazareth, whose death and resurrection opened salvation to all. It split into Catholic, Orthodox, and Protestant branches, becoming the world's largest religion.",
    sacredTexts: [
      {
        name: "The Bible (Old & New Testaments)",
        description:
          "Christianity's single sacred library, comprising the Hebrew Scriptures (Old Testament) and writings about Jesus and the early Church (New Testament). The Gospels narrate the life, death, and resurrection of Jesus; the Epistles and Acts spread his teachings across the Mediterranean world. Catholic, Orthodox, and Protestant canons differ slightly, but all center on Christ as God's definitive revelation.",
      },
    ],
    practices: ["Baptism", "Eucharist", "Prayer", "Lent fasting", "Pilgrimage"],
    coreIdeas: [
      { label: "Salvation", value: "Grace through faith in Christ" },
      { label: "Sin", value: "Original and personal sin, redeemed by Christ" },
      { label: "Afterlife", value: "Heaven, hell, (purgatory in Catholicism)" },
    ],
    concepts: ["monotheism", "soul", "salvation", "sin", "judgement", "heaven", "hell", "prayer", "fasting", "mysticism", "pilgrimage"],
    splitsFrom: "judaism",
    cities: ["jerusalem"],
  },
  {
    id: "islam",
    name: "Islam",
    family: "Abrahamic",
    region: "Middle East",
    origin: 610,
    living: true,
    followers: 1900000000,
    countries: 200,
    accent: A.gold,
    blurb: "Submission to the will of Allah.",
    description:
      "Islam teaches that God (Allah) revealed His final guidance to the Prophet Muhammad through the Qur'an. The Five Pillars shape a Muslim's life: declaration of faith, prayer, charity, fasting, and pilgrimage. Sunni and Shia branches emerged after Muhammad's death.",
    sacredTexts: [
      {
        name: "Qur'an",
        description:
          "Islam's central revelation, believed to be the literal word of God (Allah) as dictated to the Prophet Muhammad through the angel Gabriel over twenty-three years. It is organized into 114 surahs (chapters) arranged largely by length, not chronology. Muslims recite it in Arabic in daily prayer, and memorizing the entire text is a mark of great devotion.",
      },
      {
        name: "Hadith",
        description:
          "Collections of reports about the words, deeds, and approvals of the Prophet Muhammad, compiled by scholars in the centuries after his death. Hadith provide the practical model (sunna) for living out Qur'anic principles in daily life. Sunni and Shia Muslims recognize different canonical collections, reflecting early community divisions.",
      },
      {
        name: "Sunnah",
        description:
          "The lived tradition and normative example of the Prophet Muhammad, derived from Hadith and early community practice. It covers everything from prayer posture to business ethics and family law. Together with the Qur'an, the Sunnah forms the primary source of Islamic law (sharia) and spiritual guidance.",
      },
    ],
    practices: ["Salat (5 daily prayers)", "Sawm (Ramadan fast)", "Zakat (charity)", "Hajj pilgrimage"],
    coreIdeas: [
      { label: "Monotheism", value: "Tawhid — absolute oneness of Allah" },
      { label: "Sin", value: "Disobedience to Allah's will" },
      { label: "Afterlife", value: "Paradise (Jannah) or Hell (Jahannam)" },
    ],
    concepts: ["monotheism", "soul", "judgement", "sin", "heaven", "hell", "prayer", "fasting", "pilgrimage", "mysticism"],
    splitsFrom: "judaism",
    cities: ["mecca", "jerusalem"],
  },
  {
    id: "bahai",
    name: "Bahá'í Faith",
    family: "Abrahamic",
    region: "Middle East",
    origin: 1863,
    living: true,
    followers: 8000000,
    countries: 190,
    accent: A.turquoise,
    blurb: "One faith, one humanity, evolving revelation.",
    description:
      "Founded by Bahá'u'lláh in Persia, the Bahá'í Faith teaches the oneness of God, religion, and humanity. It sees the world's great faiths as successive chapters of one divine education, and calls for world peace, equality, and the harmony of science and religion.",
    sacredTexts: [
      {
        name: "Kitáb-i-Aqdas",
        description:
          "Bahá'u'lláh's 'Most Holy Book,' written in Arabic and Persian, establishing laws and institutions for the Bahá'í community. It covers prayer, fasting, marriage, inheritance, and the abolition of clergy. Bahá'ís regard it as the charter for a unified global civilization grounded in justice and equality.",
      },
      {
        name: "Kitáb-i-Íqán",
        description:
          "The 'Book of Certitude,' Bahá'u'lláh's major theological work explaining the progressive nature of divine revelation. It interprets symbols in past scriptures and demonstrates how Abraham, Moses, Jesus, Muhammad, and the Báb each opened a new chapter of one education. It is considered essential reading for understanding Bahá'í belief.",
      },
      {
        name: "Hidden Words",
        description:
          "A collection of brief, lyrical passages in Arabic and Persian offering spiritual counsel on the soul's relationship to God. Written in the voice of God addressing humanity, they distill Bahá'í ethics into accessible meditations. Many Bahá'ís memorize and recite them in daily devotional practice.",
      },
    ],
    practices: ["Daily prayer", "Annual fasting", "No alcohol", "Consultation"],
    coreIdeas: [
      { label: "Monotheism", value: "One unknowable God" },
      { label: "Salvation", value: "Spiritual progress across eternity" },
      { label: "Unity", value: "All religions share one source" },
    ],
    concepts: ["monotheism", "soul", "prayer", "fasting", "mysticism"],
    splitsFrom: "islam",
  },

  // ---- East Asian ----
  {
    id: "taoism",
    name: "Taoism",
    family: "East Asian",
    region: "East Asia",
    origin: -500,
    living: true,
    followers: 12000000,
    countries: 8,
    accent: A.jade,
    blurb: "Flowing with the Tao — the way of the universe.",
    description:
      "Taoism teaches harmony with the Tao, the ineffable source and flow of all things. Laozi's Tao Te Ching counsels wu-wei (effortless action) and naturalness. Religious Taoism added a vast pantheon, alchemy, and longevity practices.",
    sacredTexts: [
      {
        name: "Tao Te Ching",
        description:
          "A brief classic of 81 chapters traditionally attributed to Laozi, though likely compiled by multiple authors over time. It teaches the Tao — the nameless source of all things — and counsels wu-wei, acting in harmony with nature rather than forcing outcomes. Its paradoxical verses have been translated more often than almost any book except the Bible.",
      },
      {
        name: "Zhuangzi",
        description:
          "Named for the philosopher Zhuang Zhou (fourth century BCE), this text uses fables, humor, and paradox to celebrate spontaneity and freedom from rigid categories. Its famous butterfly dream passage questions the boundary between self and world. It complements the Tao Te Ching as the second pillar of philosophical Taoism.",
      },
      {
        name: "Daozang",
        description:
          "The vast Taoist canon, comprising over 1,400 texts collected over centuries and formally compiled in the Ming dynasty. It includes alchemical manuals, ritual liturgies, commentaries, and biographies of immortals. Religious Taoism draws on the Daozang for temple practice, meditation, and the quest for longevity.",
      },
    ],
    practices: ["Qigong", "Tai chi", "Meditation", "Alchemical arts"],
    coreIdeas: [
      { label: "Liberation", value: "Wu-wei — effortless alignment with the Tao" },
      { label: "Deity", value: "The Tao, and a pantheon of immortals" },
      { label: "Afterlife", value: "Becoming a xian (immortal)" },
    ],
    concepts: ["soul", "liberation", "meditation", "mysticism", "polytheism"],
  },
  {
    id: "confucianism",
    name: "Confucianism",
    family: "East Asian",
    region: "East Asia",
    origin: -500,
    living: true,
    followers: 6000000,
    countries: 5,
    accent: A.crimson,
    blurb: "Ethics, ritual, and the cultivation of virtue.",
    description:
      "Confucius taught that a stable society rests on ren (humaneness), li (ritual propriety), and filial piety. Confucianism shaped Chinese government, family, and education for two millennia — more an ethical philosophy than a faith about gods.",
    sacredTexts: [
      {
        name: "Analects",
        description:
          "A collection of sayings and conversations of Confucius, compiled by his disciples after his death in 479 BCE. It addresses governance, personal cultivation, filial piety, and the virtue of ren (humaneness). For two millennia it was the core text of China's civil service examinations and moral education.",
      },
      {
        name: "Mencius",
        description:
          "The teachings of Mencius (Mengzi, fourth century BCE), who argued that human nature is inherently good and that righteous governance flows from benevolent rulers. He defended the common people's right to resist tyranny and developed Confucian ideas of moral intuition. The text is one of the Four Books central to Neo-Confucianism.",
      },
      {
        name: "Five Classics",
        description:
          "A set of ancient texts — including the Book of Documents, Book of Songs, Book of Rites, Book of Changes (I Ching), and Spring and Autumn Annals — that Confucius is traditionally said to have edited. They cover history, poetry, ritual, divination, and chronicle. Confucian education treated mastery of the Classics as the foundation of wisdom and virtue.",
      },
    ],
    practices: ["Ancestor veneration", "Ritual (li)", "Self-cultivation", "Study"],
    coreIdeas: [
      { label: "Virtue", value: "Ren — humaneness, the supreme virtue" },
      { label: "Sin", value: "Failing in duty or ritual propriety" },
      { label: "Deity", value: "Heaven (Tian) as moral order, not a person" },
    ],
    concepts: ["soul", "mysticism", "prayer"],
  },
  {
    id: "shinto",
    name: "Shinto",
    family: "East Asian",
    region: "East Asia",
    origin: -300,
    living: true,
    followers: 50000000,
    countries: 3,
    accent: A.turquoise,
    blurb: "The way of the kami — Japan's indigenous faith.",
    description:
      "Shinto venerates the kami — spirits of nature, ancestors, and places. It emphasizes purity, ritual, and harmony with the land. Shrines, torii gates, and seasonal matsuri anchor Japanese spiritual life alongside Buddhism.",
    sacredTexts: [
      {
        name: "Kojiki",
        description:
          "Japan's oldest chronicle, compiled in 712 CE, recording myths of the kami from creation through the age of the emperors. It tells of Izanagi and Izanami creating the islands, Amaterasu hiding in a cave, and the divine descent of Japan's imperial line. Written in a mix of Chinese characters and phonetic Japanese, it anchors Shinto ritual and national identity.",
      },
      {
        name: "Nihon Shoki",
        description:
          "The 'Chronicles of Japan,' completed in 720 CE as a more formal, Chinese-style history parallel to the Kojiki. It includes alternate versions of creation myths and extensive genealogies of gods and emperors. Together with the Kojiki, it provides the mythological framework for shrine worship and imperial ceremony.",
      },
    ],
    practices: ["Purification (harae)", "Shrine offerings", "Matsuri festivals", "Ancestor rites"],
    coreIdeas: [
      { label: "Deity", value: "Myriad kami inhabiting nature" },
      { label: "Sin", value: "Pollution (kegare), cleansed by ritual" },
      { label: "Afterlife", value: "Ancestral spirit realm" },
    ],
    concepts: ["soul", "polytheism", "prayer", "pilgrimage"],
  },
  {
    id: "korean-shin",
    name: "Cheondogyo",
    family: "East Asian",
    region: "East Asia",
    origin: 1860,
    living: true,
    followers: 1000000,
    countries: 2,
    accent: A.violet,
    blurb: "Korea's 'Religion of the Heavenly Way.'",
    description:
      "Founded by Choe Je-u, Cheondogyo fused Confucian ethics, Buddhist practice, and a monotheistic belief in Haneullim (the Lord of Heaven). It became a rallying point for Korean national identity under Japanese rule.",
    sacredTexts: [
      {
        name: "Donggyeong Daejeon",
        description:
          "The 'Classic of the Eastern Scripture,' the primary scripture of Cheondogyo compiled by Choe Je-u's followers. It records divine revelations received through incantation and presents the doctrine of Haneullim, the Lord of Heaven dwelling within all people. The text calls for moral reform, equality, and the realization of paradise on earth.",
      },
      {
        name: "Yongdam Yusa",
        description:
          "A collection of teachings, hymns, and narratives associated with Choe Je-u and early Cheondogyo leaders. It preserves the movement's origin story and its fusion of Confucian ethics, Buddhist practice, and monotheistic faith. The work remains central to Cheondogyo worship and Korean nationalist identity.",
      },
    ],
    practices: ["Incantation (sicheonnyeong)", "Daily prayer", "Equality rituals"],
    coreIdeas: [
      { label: "Monotheism", value: "Haneullim — God within all humans" },
      { label: "Salvation", value: "Bringing heaven to earth" },
    ],
    concepts: ["monotheism", "prayer", "mysticism"],
  },

  // ---- Iranian / Modern ----
  {
    id: "yazidi",
    name: "Yazidism",
    family: "Iranian",
    region: "Middle East",
    origin: 1100,
    living: true,
    followers: 700000,
    countries: 5,
    accent: A.violet,
    blurb: "The peacock angel and a people of the mountains.",
    description:
      "An ancient Kurdish monotheism centered on Melek Taus, the Peacock Angel. Yazidis blend Persian, Mesopotamian, and Abrahamic elements with strict endogamy and a caste of sheikhs and pirs.",
    sacredTexts: [
      {
        name: "Meshaf Resh",
        description:
          "The 'Black Book,' the primary written scripture of Yazidism, kept at the Lalish sanctuary in Iraqi Kurdistan. It recounts the creation of the world by Xwedê and the role of Melek Taus, the Peacock Angel, as God's chief emissary. Access is restricted to Yazidi clergy, and the text is never read aloud in public.",
      },
      {
        name: "Kitêba Cilwe (traditionally oral)",
        description:
          "The 'Book of Revelation' or 'Book of Illumination,' containing hymns and prayers traditionally transmitted orally among Yazidi sheikhs and pirs. It praises the seven angels and the Peacock Angel's role in creation and redemption. Like much Yazidi scripture, it blends written and oral transmission within a closed community.",
      },
    ],
    practices: ["Annual Lalish pilgrimage", "Baptism (mor kirin)", "Caste traditions"],
    coreIdeas: [
      { label: "Deity", value: "Xwedê, served by seven angels incl. Melek Taus" },
      { label: "Sin", value: "Marriage outside caste; certain foods" },
    ],
    concepts: ["monotheism", "soul", "pilgrimage"],
  },
  {
    id: "druse",
    name: "Druze",
    family: "Abrahamic",
    region: "Middle East",
    origin: 1000,
    living: true,
    followers: 1000000,
    countries: 6,
    accent: A.indigo,
    blurb: "An esoteric Levantine faith, monotheistic and secret.",
    description:
      "An offshoot of Ismaili Shia Islam that became its own tradition. Druze believe in one God, reincarnation, and a final judgment. The faith's inner teachings are secret, reserved for the initiated 'uqqal.'",
    sacredTexts: [
      {
        name: "Rasa'il al-Hikma (Epistles of Wisdom)",
        description:
          "A collection of 111 epistles composed by Hamza ibn Ali and other missionaries during the Fatimid period, forming the sole canonical scripture of the Druze faith. They expound a Neoplatonic cosmology, the unity of God, and the cyclical appearance of divine messengers. Only the initiated 'uqqal' may study them; the text remains closed to outsiders and converts.",
      },
    ],
    practices: ["Thursday meetings", "Initiation", "Modest dress"],
    coreIdeas: [
      { label: "Monotheism", value: "One transcendent God" },
      { label: "Reincarnation", value: "Successive rebirths of the soul" },
      { label: "Judgement", value: "Final accounting at the end of cycles" },
    ],
    concepts: ["monotheism", "soul", "reincarnation", "judgement", "mysticism"],
    splitsFrom: "islam",
  },

  // ---- Indigenous / African ----
  {
    id: "santeria",
    name: "Santería",
    family: "African",
    region: "Americas",
    origin: 1700,
    living: true,
    followers: 10000000,
    countries: 30,
    accent: A.gold,
    blurb: "Yoruba orisha devotion in the Caribbean.",
    description:
      "Born in colonial Cuba, Santería blends West African Yoruba religion with Catholicism. Orishas (deities) are honored through drumming, dance, divination, and syncretized with Catholic saints.",
    sacredTexts: [
      {
        name: "(Oral — Ifá divination corpus)",
        description:
          "Santería preserves its deepest teachings through the Ifá divination system, an oral corpus of 256 odu (signs) memorized by babalawos and Santería priests. Each odu carries myths, proverbs, and prescriptions for offerings to the orishas. The tradition was carried from West Africa to Cuba under slavery and passed down through initiation lineages rather than written books.",
      },
    ],
    practices: ["Bembé drumming", "Divination (Ifá/Diloggún)", "Animal offering", "Altars (soperas)"],
    coreIdeas: [
      { label: "Deity", value: "Olodumare above; orishas as emanations" },
      { label: "Afterlife", value: "Ancestors reborn or with the orishas" },
    ],
    concepts: ["polytheism", "soul", "sacrifice", "mysticism"],
  },
  {
    id: "yoruba",
    name: "Yoruba Religion",
    family: "African",
    region: "Africa",
    origin: -200,
    living: true,
    followers: 20000000,
    countries: 12,
    accent: A.gold,
    blurb: "Olodumare and the orishas of West Africa.",
    description:
      "The indigenous religion of the Yoruba people of Nigeria, centered on Olodumare (the supreme creator) and the orishas — deities governing forces of nature and human affairs. It seeded Santería, Candomblé, and other diaspora faiths.",
    sacredTexts: [
      {
        name: "(Oral — Ifá corpus, Odu Ifá)",
        description:
          "Yoruba religion's wisdom literature lives in the Ifá corpus — 256 odu, each with hundreds of associated verses, stories, and rituals. Babalawos spend decades memorizing this material and consult it through divination with palm nuts or a divining chain. It governs everything from naming ceremonies to moral guidance and offerings to the orishas.",
      },
    ],
    practices: ["Ifá divination", "Orisha festivals", "Ebo (offerings)", "Egungun masquerade"],
    coreIdeas: [
      { label: "Deity", value: "Olodumare and hundreds of orishas" },
      { label: "Afterlife", value: "Ancestors (egun) guide the living" },
    ],
    concepts: ["polytheism", "soul", "sacrifice", "mysticism"],
  },
  {
    id: "vodou",
    name: "Haitian Vodou",
    family: "African",
    region: "Americas",
    origin: 1700,
    living: true,
    followers: 6000000,
    countries: 15,
    accent: A.crimson,
    blurb: "Bondye, the lwa, and the ancestors of Haiti.",
    description:
      "Forged in colonial Haiti from West African, Kongo, and Catholic roots, Vodou honors a distant creator (Bondye) reached through the lwa — spirits of nature, ancestors, and human archetypes served in drumming ceremonies.",
    sacredTexts: [
      {
        name: "(Oral tradition)",
        description:
          "Haitian Vodou has no single written scripture; its theology is transmitted through songs, prayers, and ritual knowledge passed from houngan and mambo to initiates. Creation stories of Bondye and the lwa, along with hundreds of ritual songs, are learned by heart across generations. This oral corpus was forged in slavery, blending Yoruba, Kongo, and Catholic elements into a living tradition.",
      },
    ],
    practices: ["Drumming ceremonies", "Altar service", "Possession trance", "Ancestor veneration"],
    coreIdeas: [
      { label: "Deity", value: "Bondye above; the lwa as intermediaries" },
      { label: "Soul", value: "Two souls — gros-bon-ange and ti-bon-ange" },
    ],
    concepts: ["polytheism", "soul", "sacrifice", "mysticism"],
  },
  {
    id: "inuit",
    name: "Inuit Religion",
    family: "Indigenous",
    region: "Americas",
    origin: -1000,
    living: false,
    followers: 0,
    countries: 0,
    accent: A.teal,
    blurb: "Sedna of the sea, shamans, and animal souls.",
    description:
      "The spiritual world of the Inuit held that animals and humans share souls. Shamans (angakkuq) negotiated with Sedna, goddess of the sea, to release game. Taboos and proper ritual kept the cosmic balance.",
    sacredTexts: [
      {
        name: "(Oral tradition)",
        description:
          "Inuit spiritual knowledge was transmitted through stories, songs, and taboos passed down by elders and shamans across the Arctic. Tales of Sedna, the sea goddess, and the angakkuq's journeys to the spirit world explained hunting fortunes and cosmic balance. No written canon existed; the land, animals, and oral narratives together formed the sacred record.",
      },
    ],
    practices: ["Shamanic journeys", "Taboo observance", "Ancestor respect"],
    coreIdeas: [
      { label: "Soul", value: "Animals and humans share souls (inua)" },
      { label: "Sin", value: "Breaking taboos angers Sedna" },
    ],
    concepts: ["polytheism", "soul", "mysticism"],
  },
  {
    id: "navajo",
    name: "Navajo (Diné) Spirituality",
    family: "Indigenous",
    region: "Americas",
    origin: 1300,
    living: true,
    followers: 300000,
    countries: 1,
    accent: A.amber,
    blurb: "Hózhó — beauty, balance, and the Blessingway.",
    description:
      "The Diné walk in hózhó — beauty, balance, harmony. Ceremonies like the Blessingway restore this balance; sandpaintings and songs heal illness understood as disharmony, not germs.",
    sacredTexts: [
      {
        name: "(Oral — ceremonial songs & sandpaintings)",
        description:
          "Diné healing and blessing ceremonies rely on precisely memorized songs and sandpainting designs that must be executed without error. Each ceremony — such as the Blessingway or Enemy Way — has its own narrative cycle tied to the Holy People who taught these rites. Knowledge is held by medicine men and women and passed through apprenticeship, not published texts.",
      },
    ],
    practices: ["Sandpainting healing", "Sweat lodge", "Blessingway ceremony"],
    coreIdeas: [
      { label: "Sin", value: "Disharmony (hóchxó) requiring restoration" },
      { label: "Deity", value: "Holy People (Diyin Diné'é)" },
    ],
    concepts: ["polytheism", "soul", "mysticism"],
  },
  {
    id: "maori",
    name: "Māori Religion",
    family: "Indigenous",
    region: "Oceania",
    origin: 1300,
    living: true,
    followers: 800000,
    countries: 2,
    accent: A.jade,
    blurb: "Io the supreme, ancestors, and the web of mana.",
    description:
      "Māori cosmology traces whakapapa (genealogy) linking all life to Ranginui (sky) and Papatūānuku (earth). Tapu (sacred restriction) and mana (spiritual power) order relationships between people, ancestors, and land.",
    sacredTexts: [
      {
        name: "(Oral — whakapapa, karakia)",
        description:
          "Māori sacred knowledge is carried in whakapapa (genealogical chants linking all beings to Ranginui and Papatūānuku) and karakia (incantations for every occasion from birth to harvest). These are recited on the marae and taught within iwi (tribal) communities. Written collections exist, but oral performance on ancestral land remains the authoritative form.",
      },
    ],
    practices: ["Karakia (incantations)", "Marae gatherings", "Tā moko", "Ancestor veneration"],
    coreIdeas: [
      { label: "Deity", value: "Io supreme; gods of nature" },
      { label: "Soul", value: "Wairua continues among ancestors" },
    ],
    concepts: ["polytheism", "soul", "mysticism"],
  },
  {
    id: "dreamtime",
    name: "Aboriginal Dreaming",
    family: "Indigenous",
    region: "Oceania",
    origin: -40000,
    living: true,
    followers: 700000,
    countries: 1,
    accent: A.amber,
    blurb: "The world's oldest continuous religion.",
    description:
      "The 'Dreaming' (Tjukurrpa) describes the ancestor-beings who sang the world into form in the dawn time — and continue to sustain it. Land, law, and ancestry are inseparable; ceremony renews the creation.",
    sacredTexts: [
      {
        name: "(Songlines, rock art, oral law)",
        description:
          "Aboriginal sacred knowledge is encoded in songlines — paths across the continent that trace the journeys of ancestral beings during the Dreaming. Rock art, ceremony, and oral law together preserve Tjukurrpa, the timeless creation order. Each language group holds its own chapters of this living library, tied to specific Country and passed through initiation.",
      },
    ],
    practices: ["Songlines", "Initiation", "Corroboree ceremonies", "Caring for Country"],
    coreIdeas: [
      { label: "Cosmos", value: "Eternal Dreaming — past, present, future at once" },
      { label: "Soul", value: "Reincarnation of ancestral spirits" },
    ],
    concepts: ["soul", "reincarnation", "mysticism"],
  },
  {
    id: "ifa",
    name: "Ifá (Yoruba Divination)",
    family: "African",
    region: "Africa",
    origin: -300,
    living: true,
    followers: 5000000,
    countries: 10,
    accent: A.amber,
    blurb: "The wisdom oracle of the Yoruba and beyond.",
    description:
      "Ifá is both a divination system and a body of wisdom literature (odu) consulted through sacred palm nuts or chain. Its babalawos (priests) interpret the 256 odu — one of the world's great oral corpora.",
    sacredTexts: [
      {
        name: "Odu Ifá (256 verses)",
        description:
          "The heart of Ifá divination: 256 odu, each comprising hundreds of verses of myth, proverb, and ritual prescription attributed to the orisha Orunmila. Babalawos memorize vast portions over decades and cast odu through palm nuts or a divining chain to answer life's questions. This corpus is among the largest bodies of oral wisdom literature in the world.",
      },
    ],
    practices: ["Divination", "Ebo (offerings)", "Ancestor consultation"],
    coreIdeas: [
      { label: "Deity", value: "Olodumare; Orunmila as wisdom-keeper" },
      { label: "Destiny", value: "Each soul chooses its fate (ayanmo)" },
    ],
    concepts: ["monotheism", "soul", "mysticism"],
  },

  // ---- Philosophical / Modern ----
  {
    id: "stoicism",
    name: "Stoicism",
    family: "Modern",
    region: "Europe",
    origin: -300,
    living: true,
    followers: 2000000,
    countries: 50,
    accent: A.turquoise,
    blurb: "Virtue as the only good; master your judgments.",
    description:
      "Founded in Athens by Zeno, Stoicism taught that virtue — wisdom, courage, justice, temperance — is the only true good, and that peace comes from distinguishing what we control from what we don't. It shaped Roman law, Christian ethics, and modern cognitive therapy.",
    sacredTexts: [
      {
        name: "Meditations (Marcus Aurelius)",
        description:
          "Private philosophical notes written by the Roman emperor Marcus Aurelius during military campaigns in the second century CE. He reflects on virtue, duty, mortality, and aligning the mind with nature's rational order. Never intended for publication, it became one of the most widely read works of Stoic practice.",
      },
      {
        name: "Enchiridion (Epictetus)",
        description:
          "A concise handbook compiled by Epictetus's student Arrian from the philosopher's classroom teachings. It distills Stoic ethics into practical rules: distinguish what is in your control from what is not, and guard your judgments. The Enchiridion served as a daily manual for Stoic living for centuries.",
      },
      {
        name: "Letters (Seneca)",
        description:
          "Moral letters from the Roman statesman Seneca to his friend Lucilius, covering grief, anger, wealth, friendship, and death. Written in elegant prose, they apply Stoic principles to the dilemmas of everyday life. Seneca's letters bridge philosophy and literature, making Stoicism accessible beyond the lecture hall.",
      },
    ],
    practices: ["Morning meditation", "Negative visualization", "Journaling", "Self-examination"],
    coreIdeas: [
      { label: "Sin", value: "Error of judgment, not evil essence" },
      { label: "Liberation", value: "Apatheia — freedom from destructive passions" },
      { label: "Deity", value: "Logos — divine reason pervading all" },
    ],
    concepts: ["soul", "liberation", "meditation"],
  },
  {
    id: "wicca",
    name: "Wicca",
    family: "Modern",
    region: "Europe",
    origin: 1950,
    living: true,
    followers: 1000000,
    countries: 40,
    accent: A.jade,
    blurb: "A modern pagan witchcraft of nature and duality.",
    description:
      "Introduced by Gerald Gardner, Wicca is a nature-revering paganism honoring a Goddess and God, the Wheel of the Year, and ethical magic. Its Wiccan Rede — 'harm none, do what ye will' — centers its ethics.",
    sacredTexts: [
      {
        name: "Book of Shadows",
        description:
          "A personal or coven journal of rituals, spells, invocations, and seasonal rites, traditionally copied by hand from teacher to student. Gerald Gardner's version, published in the 1950s, helped standardize modern Wiccan practice. Each practitioner or coven maintains their own, making it a living rather than fixed scripture.",
      },
      {
        name: "Charge of the Goddess",
        description:
          "A prose poem attributed to Doreen Valiente, spoken in the voice of the Goddess to her worshippers. It declares 'harm none, do what ye will' and invites devotees to seek the divine within nature. Recited at many Wiccan rituals, it is the tradition's best-known declaration of ethics and theology.",
      },
    ],
    practices: ["Coven or solitary ritual", "Sabbats (8/year)", "Magic (spellcraft)", "Esbat (moon rites)"],
    coreIdeas: [
      { label: "Deity", value: "Goddess and God; immanent in nature" },
      { label: "Sin", value: "Threefold return of harm done" },
      { label: "Afterlife", value: "Summerland between rebirths" },
    ],
    concepts: ["polytheism", "soul", "reincarnation", "mysticism", "nonviolence"],
  },
];
