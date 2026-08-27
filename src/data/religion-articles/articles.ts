import type { ReligionArticle } from "./types";
import { buddhismArticle } from "./buddhism";
import { hinduismArticle } from "./hinduism";
import { jainismArticle } from "./jainism";
import { sikhismArticle } from "./sikhism";
import { christianityArticle } from "./christianity";
import { islamArticle } from "./islam";
import { judaismArticle } from "./judaism";
import { zoroastrianArticle } from "./zoroastrian";
import { taoismArticle } from "./taoism";
import { confucianismArticle } from "./confucianism";
import { shintoArticle } from "./shinto";
import { koreanShinArticle } from "./korean-shin";
import { chineseFolkArticle } from "./chinese-folk";
import { bahaiArticle } from "./bahai";
import { caodaiArticle } from "./caodai";
import { bonArticle } from "./bon";
import { yazidiArticle } from "./yazidi";
import { druseArticle } from "./druse";
import { mandaeanArticle } from "./mandaean";
import { samaritanArticle } from "./samaritan";
import { yorubaArticle } from "./yoruba";
import { ifaArticle } from "./ifa";
import { santeriaArticle } from "./santeria";
import { vodouArticle } from "./vodou";
import { candombleArticle } from "./candomble";
import { rastafariArticle } from "./rastafari";
import { navajoArticle } from "./navajo";
import { inuitArticle } from "./inuit";
import { maoriArticle } from "./maori";

export const ARTICLES: Record<string, ReligionArticle> = {
  "bahai": bahaiArticle,
  "caodai": caodaiArticle,
  "bon": bonArticle,
  "buddhism": buddhismArticle,
  "canaanite": {
    overview: [
      "Canaanite religion was the polytheistic tradition of the Levantine coast and inland regions during the second and first millennia BCE. It is known primarily from Ugaritic texts discovered at Ras Shamra (ancient Ugarit) in Syria, along with archaeological remains and references in Egyptian, Mesopotamian, and biblical sources. The pantheon was headed by El, a senior father-god, alongside Baal (storm and fertility), Anat (war), and Asherah (often linked with fertility and motherhood). Gods were organized in a divine council, a motif echoed in later Northwest Semitic literature and royal ideology.",
      "Mythic narratives such as the Baal Cycle describe cosmic battles, royal enthronement, and seasonal cycles of drought and renewal. Temples and high-place sanctuaries hosted animal sacrifice, libations, and festivals tied to agricultural rhythms. The underworld deity Mot personified death in a shadowy realm rather than a structured moral afterlife. Cult practices at sites across Palestine, Phoenicia, and Syria show regional variation while sharing common divine names and ritual patterns. Phoenician colonies spread Canaanite deities and cult forms across the Mediterranean, linking Levantine religion to wider ancient networks of trade and settlement.",
      "As Israelite and Judahite religion developed, biblical texts polemicize against Canaanite practices and deities, yet also preserve linguistic and conceptual overlap-such as the plural term elohim and Asherah pole debates. Scholars debate the precise relationship between Canaanite religion and early Israelite belief, but the Ugaritic corpus remains indispensable for reconstructing the broader religious world of the ancient Levant and its shared cultural vocabulary across competing kingdoms, city-states, and scribal traditions."
    ],
    history: {
      title: "Historical Development",
      content: ["The beliefs of the Levantine coast, sharing roots with later Israelite religion. A council of gods led by El, the storm-god Baal, and goddess Asherah. The Hebrew Bible preserves echoes of this world in its polemic against them.\", sacredTexts: [ { name: \"Ugaritic texts (Baal Cycle)\""],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Council of gods (Elohim)",
      "Afterlife: Shadowy realm of Mot"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Ugaritic texts (Baal Cycle): Clay tablets from Ugarit (modern Ras Shamra) recording myths of the storm-god Baal's battle with Yam (Sea) and Mot (Death). They depict El as father of the gods and Asherah as consort of El, offering a window into Levantine religion before Israelite monotheism. The Baal Cycle was recited at seasonal festivals and shaped Near Eastern storm-god mythology for centuries."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include High-place altars, Animal sacrifice, Libations."],
    },
    sources: [
      { label: "Britannica - Canaanite religion", href: "https://www.britannica.com/topic/Canaanite-religion" },
      { label: "World History Encyclopedia - Canaanite religion", href: "https://www.worldhistory.org/Canaanite_Religion/" },
      { label: "Met Museum - Levant", href: "https://www.metmuseum.org/toah/ht/04/wam.html" },
    ],
  },
  "candomble": candombleArticle,
  "chinese-folk": chineseFolkArticle,
  "christianity": christianityArticle,
  "confucianism": confucianismArticle,
  "dreamtime": {
    overview: [
      "Aboriginal Australian spiritual traditions, often discussed under the English term Dreaming, are the religious lifeways of the First Nations peoples of the Australian continent. Aboriginal English terms such as Tjukurrpa, Ngarranggarni, or other language-specific names better reflect local meaning than any single translation. These traditions hold that Ancestral beings shaped land, law, language, and social order in the founding era and remain present through country, ceremony, and story. Land is therefore inseparable from morality, identity, and cosmic order rather than mere property.",
      "Hundreds of distinct nations maintain separate languages, song cycles, and custodial responsibilities. Songlines trace routes of creation across vast distances, encoded in narrative, dance, and visual designs whose full meaning is often restricted by gender, age, and initiation status. Elders determine what knowledge may be shared with outsiders and under what conditions. Ceremonies renew country, teach law, and transmit knowledge through corroboree and other rites. Colonization, missionization, frontier violence, and assimilation policies caused profound loss, yet Aboriginal peoples continue to practice, adapt, and defend sacred law under contemporary legal and political struggle.",
      "Responsible scholarship uses terminology preferred by local communities, recognizes limits on public disclosure, and rejects treating Aboriginal religion as one primitive uniform belief. Native title, repatriation, and land management partnerships increasingly draw on Aboriginal cosmology. The Dreaming is understood by many Aboriginal teachers as eternal and ongoing rather than confined to a distant mythic past. Uluru and other sacred sites illustrate ongoing debates over access, tourism, and custodial authority. Diversity among desert, coastal, and urban Aboriginal communities remains a defining feature of any accurate account."
    ],
    history: {
      title: "Historical Development",
      content: ["The 'Dreaming' (Tjukurrpa) describes the ancestor-beings who sang the world into form in the dawn time - and continue to sustain it. Land, law, and ancestry are inseparable; ceremony renews the creation.\", sacredTexts: [ { name: \"(Songlines, rock art, oral law)\", descriptio"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Cosmos: Eternal Dreaming - past, present, future at once",
      "Soul: Reincarnation of ancestral spirits"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Songlines, rock art, oral law): Aboriginal sacred knowledge is encoded in songlines - paths across the continent that trace the journeys of ancestral beings during the Dreaming. Rock art, ceremony, and oral law together preserve Tjukurrpa, the timeless creation order. Each language group holds its own chapters of this living library, tied to specific Country and passed through initiation."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Songlines, Initiation, Corroboree ceremonies, Caring for Country."],
    },
    sources: [
      { label: "AIATSIS - Aboriginal Spirituality", href: "https://aiatsis.gov.au/explore/articles/aboriginal-spirituality" },
      { label: "Britannica - Australian Aboriginal peoples", href: "https://www.britannica.com/topic/Australian-Aboriginal" },
      { label: "UNESCO - Australian Indigenous Heritage", href: "https://whc.unesco.org/en/statesparties/au" },
    ],
  },
  "druidic": {
    overview: [
      "Celtic druidism refers to the priestly and learned traditions of ancient Celtic societies in Gaul, Britain, and Ireland before and during early Christianization. Druids appear in Greco-Roman accounts-especially Julius Caesar's Gallic Wars-as judges, advisors, teachers, and ritual specialists who transmitted lore orally. They reportedly oversaw sacrifices, calendar rites, and legal disputes, exercising significant authority within tribal structures. No druidic texts survive from the pre-Roman period, leaving their beliefs and rituals largely indirect and open to scholarly debate.",
      "Direct evidence from druids themselves is absent; reconstruction relies on external descriptions, later Irish and Welsh medieval texts (which may blend pre-Christian and Christian elements), and archaeology. Caesar claimed Celts believed in reincarnation and the soul's immortality, though such reports may reflect Roman interpretive frameworks. Seasonal festivals such as Samhain and Beltane, sacred groves, and veneration of natural landmarks are commonly associated with Celtic religious life, supported in part by later Irish tradition and archaeological sites such as ritual enclosures and votive deposits.",
      "The druidic class was largely suppressed under Roman rule in Gaul and Britain and declined as Christianity spread across the former Celtic world. Irish and Welsh sagas later preserved figures such as the filid and bards, whose roles may echo druidic functions, though continuity is debated by historians. Modern neo-druid movements draw inspiration from ancient sources but are new religious constructions rather than survivals of ancient practice. Scholars therefore distinguish carefully between historically attested ancient Celtic religion and contemporary revivalist traditions, acknowledging substantial gaps in the evidence and limits of Roman eyewitness accounts."
    ],
    history: {
      title: "Historical Development",
      content: ["The priestly traditions of the ancient Celts. Druids were judges, poets, and ritual specialists who transmitted cosmology orally. Sacred groves, seasonal fire-festivals (Samhain, Beltane), and a belief in reincarnation shaped Celtic life.\", sacredTexts: [ { name: \"(Oral tradition -"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Reincarnation: Soul passes to new body",
      "Deity: Many regional gods and goddesses"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral tradition - recorded by Caesar & Irish monks): Celtic druids transmitted theology, law, and ritual through memorized verse over generations, forbidding written records of their deepest teachings. Roman writers like Julius Caesar and later Irish Christian monks preserved fragments of this oral corpus in Latin and Gaelic manuscripts. What survives describes a cosmos of many gods, sacred groves, and the soul's passage between lives."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Seasonal fire festivals, Oak & mistletoe rites, Oral bardic training."],
    },
    sources: [
      { label: "Britannica - Druid", href: "https://www.britannica.com/topic/Druid" },
      { label: "World History Encyclopedia - Druid", href: "https://www.worldhistory.org/Druid/" },
      { label: "National Museum of Ireland - Celtic religion", href: "https://www.museum.ie/en-IE/Collections-Research/Research/Research-Guides/Celtic-Religion" },
    ],
  },
  "druse": druseArticle,
  "egyptian": {
    overview: [
      "Ancient Egyptian religion spanned more than three millennia, from the early dynastic period through the Roman era, and shaped every dimension of Egyptian civilization. Its core concept was maat-cosmic order, truth, and justice-which pharaohs were obliged to uphold as intermediaries between gods and humanity. The pantheon included solar deities such as Ra, funerary gods such as Osiris and Anubis, and widely venerated figures such as Isis and Hathor. Temple cults, local shrines, and household piety coexisted within a flexible theological landscape that tolerated regional variation.",
      "Egyptians believed the soul comprised multiple components, including the ka (life force) and ba (personality), which required preservation after death. Funerary practices-mummification, tomb furnishing, and spells from the Pyramid Texts, Coffin Texts, and Book of the Dead-aimed to secure safe passage through the underworld. In the judgment scene, the heart of the deceased was weighed against the feather of maat; the justified could enter the Field of Reeds, while the condemned faced annihilation. Priestly colleges maintained temple rituals, and festival calendars aligned worship with the agricultural year and the annual rhythm of the Nile flood.",
      "Religious expression changed over time: the Amarna period briefly elevated Aten, and later periods saw growing prominence of Osiris and Isis across the Mediterranean. Monumental architecture at Karnak, Luxor, and the Valley of the Kings reflects sustained investment in divine kingship and afterlife theology. Egyptian ideas about judgment, resurrection, and divine mediation influenced neighboring cultures and later religious thought, leaving a lasting imprint on Mediterranean spirituality and conceptions of moral order."
    ],
    history: {
      title: "Historical Development",
      content: ["A 3,000-year tradition centered on maat (cosmic order), divine kingship, and an elaborate afterlife. The dead faced judgment: their heart weighed against the feather of truth. Gods like Ra, Osiris, and Isis governed cycles of sun, Nile, and rebirth.\", sacredTexts: [ { name: \"Pyrami"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Field of Reeds for the justified",
      "Judgement: Heart weighed against maat",
      "Liberation: Eternal union with the gods"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Pyramid Texts: The oldest religious writings in the world, carved inside Fifth and Sixth Dynasty pyramids around 2400 BCE. These spells and hymns guided the pharaoh's soul through the afterlife, invoking Osiris and the gods of the Duat. They form the foundation of all later Egyptian funerary literature.",
      "Book of the Dead: A collection of spells written on papyrus scrolls and placed in tombs from the New Kingdom onward. The most famous passage describes the weighing of the heart against the feather of Maat before Osiris. It offered ordinary Egyptians, not just kings, a map to navigate judgment and reach the Field of Reeds.",
      "Coffin Texts: Middle Kingdom spells painted inside wooden coffins, democratizing afterlife knowledge once reserved for royalty. They expanded on Pyramid Text themes with new spells for protection, transformation, and cosmic travel. Many motifs in the Book of the Dead first appear here."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Mummification, Temple cult, Funerary rites, Solar worship."],
    },
    sources: [
      { label: "Britannica - Egyptian religion", href: "https://www.britannica.com/topic/Egyptian-religion" },
      { label: "BBC Religion - Ancient Egypt", href: "https://www.bbc.co.uk/religion/religions/egypt/" },
      { label: "Met Museum - Ancient Egypt", href: "https://www.metmuseum.org/toah/ht/03/afe.html" },
    ],
  },
  "gnosticism": {
    overview: [
      "Gnosticism names a family of religious movements that emerged within early Christianity and Second Temple Judaism, flourishing across the Mediterranean and Near East from roughly the first through fourth centuries CE. Rather than a single organized church, it comprised diverse teachers and schools united by a shared cosmological instinct: a remote, unknowable supreme God (often called the Monad) stands apart from the flawed material cosmos, which was instead fashioned by a lesser, ignorant creator figure - the demiurge, sometimes named Yaldabaoth. Human beings carry a fragment of divine light trapped within matter, exiled from the pleroma, the true realm of fullness and light.",
      "Salvation in Gnostic thought came not through faith or institutional sacrament but through gnosis - direct, experiential knowledge of one's true divine origin, transmitted by a redeemer figure (in Christian Gnostic systems, typically Jesus) who awakens the trapped spark to its source. Teachers such as Valentinus and Basilides, active in second-century Alexandria and Rome, developed elaborate systematic theologies mapping the emanation of divine beings (aeons) from the Monad down to the material world. This emphasis on esoteric knowledge over ecclesial authority put Gnostic Christians at odds with proto-orthodox bishops such as Irenaeus, who condemned them at length as heretics.",
      "For centuries Gnosticism was known almost entirely through these hostile heresiological accounts, until the 1945 discovery of the Nag Hammadi library in Egypt - over fifty Coptic manuscripts including the Gospel of Thomas and the Apocryphon of John - gave scholars direct access to Gnostic voices for the first time. Proto-orthodox condemnation, the institutional consolidation of the church, and later the decline of late antiquity's religious pluralism combined to nearly extinguish organized Gnostic communities, though Mandaeism, a distinct Gnostic-influenced religion of Iraq and Iran, survives as a living tradition to this day."
    ],
    history: {
      title: "Historical Development",
      content: ["A constellation of early Christian-era movements teaching that the material cosmos was the flawed creation of a lesser being (the demiurge), and that salvation came through secret spiritual knowledge (gnosis) rather than faith or law alone. Gnostic teachers such as Valentinus and Basilides flourishe"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Cosmos: Material world as flawed creation of a lesser demiurge",
      "Salvation: Gnosis - direct spiritual knowledge, not faith alone"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Nag Hammadi library: A cache of over 50 Coptic texts discovered near Nag Hammadi, Egypt in 1945, including the Gospel of Thomas and Gospel of Truth. Likely buried by monks around the fourth century to escape destruction after Gnosticism was condemned as heresy, its rediscovery transformed modern understanding of early Christian diversity.",
      "Gospel of Thomas: A collection of 114 sayings attributed to Jesus, lacking narrative or a crucifixion account, emphasizing self-knowledge as the path to the divine kingdom. Found among the Nag Hammadi texts, it preserves a strand of early Jesus tradition outside the canonical gospels."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Study & contemplation, Secret initiation, Ascetic withdrawal."],
    },
    sources: [
      { label: "Britannica - Gnosticism", href: "https://www.britannica.com/topic/Gnosticism" },
      { label: "Internet Encyclopedia of Philosophy - Gnosticism", href: "https://iep.utm.edu/gnostic/" },
      { label: "World History Encyclopedia - Gnosticism", href: "https://www.worldhistory.org/Gnosticism/" },
    ],
  },
  "greek-roman": {
    overview: ["The polytheism of the classical Mediterranean - Olympian gods, civic cult, mystery religions, and the Olympian pantheon that seeded Western art and myth. Its philosophical critics (the Stoics, Platonists) fed into later theology.\", sacredTexts: [ { name: \"Iliad & Odyssey\", description: \"Homer's epic poems, composed orally around the eighth century BCE and foundational to Greek identity. The Iliad recounts the wrath of Achilles during the Trojan War; the Odyssey follows Odysseus's long voyage home. Both portray the gods as active participants in human affairs, rewarding honor and punishing hubris.\", }, { name: \"Theogony\", description: \"Hesiod's poem tracing the genealogy of the Greek gods from Chaos through the reign of Zeus. It explains the succession of divine rulers and the origins of natural forces and human woes. Greeks treated it as a canonical account of how the cosmos and Olympian order came to be.\", }, { name: \"Aeneid\", description: \"Virgil's Roman epic linking the Trojan hero Aeneas to the founding of Rome and the Julian dynasty. It blends Greek myth with Roman piety, portraying destiny (fatum) as guided by Jupiter and fate. The poem became the literary scripture of Roman civic religion and imperial ideology.\", }, ], practices: [\"Sacrifice\", \"Oracles\", \"Mystery rites (Eleusis)\", \"Public festivals\"], coreIdeas: [ { label: \"Afterlife\", value: \"Hades for most; Elysium for heroes\" }, { label: \"Sin\", value: \"Hubris provoking divine retribution (nemesis)\" }, ], conceptPositions: { \"mysticism\": \"affirmed\", \"polytheism\": \"affirmed\", \"sacrifice\": \"affirmed\", \"soul\": \"affirmed"],
    history: {
      title: "Historical Development",
      content: ["The polytheism of the classical Mediterranean - Olympian gods, civic cult, mystery religions, and the Olympian pantheon that seeded Western art and myth. Its philosophical critics (the Stoics, Platonists) fed into later theology.\", sacredTexts: [ { name: \"Iliad & Odyssey\","],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Hades for most; Elysium for heroes",
      "Sin: Hubris provoking divine retribution (nemesis)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Iliad & Odyssey: Homer's epic poems, composed orally around the eighth century BCE and foundational to Greek identity. The Iliad recounts the wrath of Achilles during the Trojan War; the Odyssey follows Odysseus's long voyage home. Both portray the gods as active participants in human affairs, rewarding honor and punishing hubris.",
      "Theogony: Hesiod's poem tracing the genealogy of the Greek gods from Chaos through the reign of Zeus. It explains the succession of divine rulers and the origins of natural forces and human woes. Greeks treated it as a canonical account of how the cosmos and Olympian order came to be.",
      "Aeneid: Virgil's Roman epic linking the Trojan hero Aeneas to the founding of Rome and the Julian dynasty. It blends Greek myth with Roman piety, portraying destiny (fatum) as guided by Jupiter and fate. The poem became the literary scripture of Roman civic religion and imperial ideology."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Sacrifice, Oracles, Mystery rites (Eleusis), Public festivals."],
    },
    sources: [],
  },
  "hinduism": hinduismArticle,
  "ifa": ifaArticle,
  "inuit": inuitArticle,
  "islam": islamArticle,
  "jainism": jainismArticle,
  "judaism": judaismArticle,
  "korean-shin": koreanShinArticle,
  "mandaean": mandaeanArticle,
  "manichaean": {
    overview: [
      "Manichaeism was founded by the prophet Mani (c. 216-276 CE) in the Sasanian Persian Empire. Mani proclaimed a universal revelation synthesizing elements drawn from Zoroastrian, Christian, and Buddhist traditions. Its cosmology describes a primordial conflict between the Realm of Light and the Realm of Darkness, with the material world formed from mixed light and matter. Humans contain light particles trapped in flesh, and salvation involves liberating this light through knowledge (gnosis) and ascetic discipline taught by the prophet and his disciples.",
      "The community divided into the Elect-an ascetic elite who practiced strict dietary and purity rules-and Hearers, lay supporters who provided food and goods to the Elect, thereby participating indirectly in the liberation of light. Ritual meals, confession, and missionary activity spread the faith along trade routes from the Roman Mediterranean to Central Asia and China. Manichaean art and texts, including fragments of the Shabuhragan and writings discovered in Turfan and Egypt, attest to its once-wide reach across diverse linguistic and cultural settings. Mani's own missionary journeys reportedly extended from the Roman frontier to India.",
      "Manichaeism provoked fierce opposition from Zoroastrian, Christian, and Islamic authorities and was eventually outlawed across most regions. Augustine of Hippo, once a Hearers, later wrote extensively against the faith. By the late Middle Ages it had largely disappeared, though its dualist cosmology influenced polemical labels and theological debates across the Mediterranean world. Today scholars study Manichaeism primarily through surviving fragments, recognizing it as one of antiquity's most geographically expansive missionary religions despite the near-total loss of its canonical literature."
    ],
    history: {
      title: "Historical Development",
      content: ["Founded by the prophet Mani, Manichaeism was once a rival to Christianity from Rome to China. It taught a radical cosmic dualism - light (spirit, good) trapped in the material world of darkness - and a path of liberation through ascetic 'Elect' and lay 'Hearers.'\", sacredTexts: [ {"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Liberation: Release of light-particles from matter",
      "Sin: Feeding the body feeds darkness"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Shabuhragan: A Middle Persian text composed for King Shapur I, presenting Mani's teachings on the cosmic struggle between light and darkness. It outlines the three ages of world history and the role of prophets across cultures. The work was once widely circulated along Silk Road trade routes.",
      "Gospel of Mani: Mani's own account of his divine calling and mission to complete the revelations of Buddha, Zoroaster, and Jesus. It presented Manichaeism as the final, universal religion synthesizing earlier traditions. Only fragments survive in Coptic, Middle Persian, and Chinese translations.",
      "Arzhang: An illustrated 'Picture Book' attributed to Mani, using paintings to teach cosmology to audiences across languages and literacy levels. It depicted the realms of light, the material prison, and the path of liberation. Church authorities ordered its destruction, and no copy survives intact today."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Vegetarianism, Confession, Ritual meals, Missionary journeys."],
    },
    places: {
      title: "Sacred Places",
      content: ["Important sites: babylon."],
    },
    sources: [
      { label: "Britannica - Manichaeism", href: "https://www.britannica.com/topic/Manichaeism" },
      { label: "Stanford Encyclopedia - Manichaeism", href: "https://plato.stanford.edu/entries/manichaeism/" },
      { label: "World History Encyclopedia - Manichaeism", href: "https://www.worldhistory.org/Manichaeism/" },
    ],
  },
  "maori": maoriArticle,
  "mesoamerican": {
    overview: [
      "Mesoamerican religion refers to the shared cosmological framework of the Aztec (Mexica), Maya, and neighboring civilizations of pre-Columbian Mexico and Central America. Both traditions envisioned a layered universe - commonly thirteen heavens above and nine underworld levels below - connected by a central world-tree (the Maya yaxche, or ceiba) at the axis of creation. Among the Aztec, the concept of teotl, a single dynamic, self-generating sacred force, underlay a populous pantheon including Huitzilopochtli (sun and war), Tlaloc (rain), and Quetzalcoatl (wind and knowledge); Maya religion centered figures such as Itzamna, the creator, Chaac, god of rain, and the Maize God, whose myth-cycle is preserved in the Popol Vuh's tale of the Hero Twins descending into the underworld Xibalba.",
      "Sacrifice - of maize, animals, elite blood offered through ritual bloodletting, and at times human life - was understood as cosmologically necessary, sustaining a sun and world believed to be inherently fragile and cyclical. The Aztec 52-year New Fire ceremony renewed the cosmos against threatened destruction, while the Maya 260-day tzolkin calendar and Long Count structured ritual and divinatory life around recurring cycles of time. Temple pyramids such as Tenochtitlan's Templo Mayor and countless Maya ceremonial centers anchored public ritual, priestly bloodletting, and the periodic reenactment of these founding myths through festival and calendar-based ceremony.",
      "Spanish conquest - Tenochtitlan's fall in 1521 and the last independent Maya polity's surrender in 1697 - dismantled the state-sponsored priesthoods and temple systems that had organized public Mesoamerican religion for centuries. Forced conversion followed, yet indigenous cosmology did not simply vanish: it persisted through syncretism, visible in the Virgin of Guadalupe's assimilation of Aztec religious geography, the Day of the Dead's blending with Catholic All Souls observance, and the Maya cargo system's fusion of ancestral mountain spirits with Catholic saints and religious brotherhoods that continue in indigenous communities today."
    ],
    history: {
      title: "Historical Development",
      content: ["The shared religious world of the Aztec (Mexica), Maya, and their Mesoamerican neighbors - a cosmos of layered heavens and underworlds, cyclical calendars, and deities demanding blood and maize in exchange for the sun's continued rising. Temple pyramids, ballcourt ritual, and painted codices recorde"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Cosmos: Cyclical ages sustained by sacrifice",
      "Afterlife: Destination determined by manner of death, not conduct"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Popol Vuh: The K'iche' Maya 'Book of Counsel,' recorded in the sixteenth century using Latin script to preserve oral tradition, narrating the creation of the world, the hero twins' defeat of the underworld lords, and the origin of humanity from maize. It is the most complete surviving account of Maya cosmology.",
      "Florentine Codex: A sixteenth-century bilingual (Nahuatl/Spanish) ethnographic compilation overseen by the friar Bernardino de Sahagún, drawing on interviews with Aztec elders to record deities, rituals, and cosmology before their suppression. It remains the single richest source on Aztec religious life."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Human & blood sacrifice, Ballgame ritual, Calendar-based ceremony, Temple pilgrimage."],
    },
    sources: [
      { label: "Britannica - Aztec religion", href: "https://www.britannica.com/topic/Aztec-religion" },
      { label: "Britannica - Maya religion", href: "https://www.britannica.com/topic/Maya-religion" },
      { label: "World History Encyclopedia - Maya Religion", href: "https://www.worldhistory.org/Maya_Religion/" },
    ],
  },
  "mithraism": {
    overview: [
      "Mithraism was a Roman mystery cult prominent from roughly the first through fourth centuries CE, especially among soldiers, merchants, and imperial officials stationed along trade routes. It centered on the god Mithras, depicted in the iconic tauroctony-slaying a bull in a cave-an image found in hundreds of underground temples (mithraea) across the Roman Empire. The cult's origins are debated; Roman Mithraism shares the name of the ancient Iranian divinity Mithra, but its iconography and initiation structure appear to be a distinct Greco-Roman development rather than a direct Iranian import.",
      "Initiates progressed through seven grades, often symbolized by ritual implements and planetary associations, and participated in communal meals. Mithraea were small, enclosed spaces modeling the cave of the myth, with benches for dining and the tauroctony relief as focal point. No comprehensive scripture survives; knowledge derives from inscriptions, frescoes, and archaeological remains. The cult promised cosmic salvation and the soul's ascent through celestial gates, though the precise theology must be inferred cautiously from fragmentary evidence and the symbolic program of initiation scenes.",
      "Mithraism coexisted with civic pagan cults and early Christianity, and scholars have long debated parallels and competition between the two traditions in the Roman frontier provinces and major urban centers. By the late fourth century the cult had largely vanished, possibly suppressed alongside other non-Christian practices across the empire. Because written doctrine is scarce, many details of belief and ritual remain uncertain, and reconstructions continue to rely heavily on material culture and comparative study of mystery religions in late antiquity."
    ],
    history: {
      title: "Historical Development",
      content: ["A Roman mystery religion popular among soldiers, centered on the god Mithras slaying the cosmic bull. Initiation through seven grades promised salvation of the soul after death. Its underground mithraea spread across the Empire.\", sacredTexts: [ { name: \"(Mostly lost - iconography"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Salvation: Liberated ascent of the soul through the planets",
      "Deity: Mithras, a solar intermediary"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Mostly lost - iconography & inscriptions survive): Mithraism was a secret initiatory cult whose written scriptures were never publicly circulated and have almost entirely perished. What remains are inscriptions in mithraea across the Roman Empire and the rich iconography of the tauroctony - Mithras slaying the cosmic bull. Initiates learned the faith's seven grades and salvation myth through ritual drama rather than reading."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Initiation grades, Ritual meals, Bull-slaying rite (tauroctony)."],
    },
    sources: [
      { label: "Britannica - Mithraism", href: "https://www.britannica.com/topic/Mithraism" },
      { label: "World History Encyclopedia - Mithraism", href: "https://www.worldhistory.org/Mithraism/" },
      { label: "Met Museum - Roman art", href: "https://www.metmuseum.org/toah/ht/05/rom.html" },
    ],
  },
  "navajo": navajoArticle,
  "norse": {
    overview: [
      "Norse paganism was the pre-Christian religious tradition of Scandinavia and other Germanic peoples from roughly the Viking Age and earlier periods. Its mythology, preserved mainly in thirteenth-century Icelandic sources such as the Poetic Edda and Snorri Sturluson's Prose Edda, describes two divine families-the Aesir (including Odin, Thor, and Frigg) and the Vanir (including Njord and Freyja). The cosmos was structured around Yggdrasil, the world tree connecting multiple realms, including Asgard, Midgard, and Hel. These texts were compiled long after conversion but draw on older oral poetry.",
      "Worship centered on blót (sacrificial feasts), votive offerings, and sacred sites such as groves and halls. Seiðr and galdr denote forms of ritual magic associated especially with Odin and certain practitioners. Norse sources present varied afterlife destinations: Valhalla for some warriors, Hel's realm for many of the dead, and other halls tied to specific deities. Fate (wyrd) and the norns who shape destiny give the mythology a notably fatalistic tone, culminating in Ragnarök, the prophesied destruction and renewal of the world. Kinship and ancestral honor framed much of religious obligation in daily life.",
      "Archaeological evidence-including figurines, amulets, and ship burials-corroborates aspects of literary accounts, though Christian scribes shaped the written record centuries after widespread conversion. Runestones and place names preserve invocations of Thor and other gods. Modern popular images of Norse religion often simplify or romanticize the tradition. Scholarly reconstruction therefore combines cautious reading of medieval texts with material evidence from across northern Europe, acknowledging that pre-Christian practice likely varied among regions, social groups, and periods of contact with Christian kingdoms."
    ],
    history: {
      title: "Historical Development",
      content: ["The pre-Christian religion of Scandinavia and the Germanic peoples - Aesir and Vanir gods, the world-tree Yggdrasil, and a fatalistic cosmos ending in Ragnarök. Valor in battle could earn a place in Valhalla.\", sacredTexts: [ { name: \"Poetic Edda\", description: \"A"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Valhalla, Hel, or the halls of other gods",
      "Fate: Norns weave inescapable destiny"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Poetic Edda: A collection of Old Norse poems preserved in the Codex Regius, including the Völuspá (prophecy of the seeress) and tales of Odin, Thor, and Loki. It recounts the creation of the world, the gods' deeds, and the foretold destruction of Ragnarök. These verses were the primary source for later Scandinavian understanding of the mythic past.",
      "Prose Edda (Snorri): Written around 1220 by the Icelandic scholar Snorri Sturluson to preserve and explain skaldic poetry for future generations. It retells myths in accessible prose and includes a dialogue between Gylfi and the Aesir gods. Snorri's work is the most systematic surviving account of Norse cosmology and divine genealogy."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Blót sacrifice, Runes, Seiðr magic, Feasting."],
    },
    sources: [
      { label: "Britannica - Germanic religion", href: "https://www.britannica.com/topic/Germanic-religion-and-mythology" },
      { label: "World History Encyclopedia - Norse mythology", href: "https://www.worldhistory.org/Norse_Mythology/" },
      { label: "BBC History - Vikings", href: "https://www.bbc.co.uk/history/ancient/vikings/" },
    ],
  },
  "rastafari": rastafariArticle,
  "samaritan": samaritanArticle,
  "santeria": santeriaArticle,
  "shinto": shintoArticle,
  "sikhism": sikhismArticle,
  "slavic-baltic": {
    overview: ["The pre-Christian religions of the Slavic and Baltic peoples, centered on sky and thunder gods (Perun, Perkūnas), household and ancestor spirits, and sacred groves. Lithuania's official conversion in 1387 marked the end of the last state-level pagan religion in Europe, though folk customs persisted alongside Christianity for centuries.\", sacredTexts: [ { name: \"(Oral tradition - chronicled by Christian scribes)\", description: \"Slavic and Baltic paganism left no native scripture; what is known comes from outside accounts - the Russian Primary Chronicle's description of Perun's idols in Kyiv, and German missionary reports on Baltic grove-worship and priesthoods. Folk songs, festivals, and place names preserved fragments long after formal conversion.\", }, ], practices: [\"Sacred grove worship\", \"Ancestor & household spirits\", \"Seasonal fire festivals\", \"Divination\"], coreIdeas: [ { label: \"Deity\", value: \"Perun/Perkūnas (thunder) and a wider pantheon\" }, { label: \"Afterlife\", value: \"Ancestral spirits (dziady) honored at seasonal rites\" }, ], conceptPositions: { \"mysticism\": \"affirmed\", \"polytheism\": \"affirmed\", \"sacrifice\": \"affirmed"],
    history: {
      title: "Historical Development",
      content: ["The pre-Christian religions of the Slavic and Baltic peoples, centered on sky and thunder gods (Perun, Perkūnas), household and ancestor spirits, and sacred groves. Lithuania's official conversion in 1387 marked the end of the last state-level pagan religion in Europe, though folk customs persisted"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Perun/Perkūnas (thunder) and a wider pantheon",
      "Afterlife: Ancestral spirits (dziady) honored at seasonal rites"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral tradition - chronicled by Christian scribes): Slavic and Baltic paganism left no native scripture; what is known comes from outside accounts - the Russian Primary Chronicle's description of Perun's idols in Kyiv, and German missionary reports on Baltic grove-worship and priesthoods. Folk songs, festivals, and place names preserved fragments long after formal conversion."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Sacred grove worship, Ancestor & household spirits, Seasonal fire festivals, Divination."],
    },
    sources: [],
  },
  "stoicism": {
    overview: [
      "Stoicism is a Hellenistic school of philosophy founded in Athens around 300 BCE by Zeno of Citium. It takes its name from the Stoa Poikile, the painted colonnade where Zeno taught. Unlike purely theoretical inquiry, Stoicism was conceived as a practical philosophy aimed at living well through reason and moral discipline. Early Stoics such as Cleanthes and Chrysippus developed a systematic worldview spanning logic, physics, and ethics, while later Roman Stoics including Seneca, Epictetus, and Marcus Aurelius emphasized personal conduct, resilience, and civic duty. Although not a religion in the conventional sense, Stoicism functioned for many adherents as a comprehensive guide to character, fate, and the human place within nature.",
      "Central to Stoic ethics is the claim that virtue-understood as wisdom, justice, courage, and moderation-is the only true good, while externals such as wealth, reputation, and even health are indifferent to happiness. The Stoics taught that the cosmos is governed by logos, a rational divine principle, and that human beings share in this reason. Emotional disturbance arises from mistaken judgments about what matters; the ideal Stoic sage responds to events with equanimity rather than destructive passion. Epictetus famously distinguished between what is within our control and what is not, urging attention to intention and character rather than outcomes. This framework offered a way to endure political instability, personal loss, and social inequality without abandoning moral responsibility.",
      "Stoicism influenced Roman law, early Christian thought, and later philosophical traditions, even as its institutional school declined in late antiquity. Its ideas reappeared in Renaissance humanism, early modern ethics, and contemporary popular philosophy focused on mindfulness and resilience. Modern scholarship treats Stoicism as a major source for ancient psychology, political theory, and cosmopolitan ethics. Whether read through the Meditations of Marcus Aurelius, the Discourses of Epictetus, or the letters of Seneca, the tradition continues to attract readers seeking a disciplined, rational approach to life's uncertainties."
    ],
    history: {
      title: "Historical Development",
      content: ["Founded in Athens by Zeno, Stoicism taught that virtue - wisdom, courage, justice, temperance - is the only true good, and that peace comes from distinguishing what we control from what we don't. It shaped Roman law, Christian ethics, and modern cognitive therapy.\", sacredTexts: [ {"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Sin: Error of judgment, not evil essence",
      "Liberation: Apatheia - freedom from destructive passions",
      "Deity: Logos - divine reason pervading all"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Meditations (Marcus Aurelius): Private philosophical notes written by the Roman emperor Marcus Aurelius during military campaigns in the second century CE. He reflects on virtue, duty, mortality, and aligning the mind with nature's rational order. Never intended for publication, it became one of the most widely read works of Stoic practice.",
      "Enchiridion (Epictetus): A concise handbook compiled by Epictetus's student Arrian from the philosopher's classroom teachings. It distills Stoic ethics into practical rules: distinguish what is in your control from what is not, and guard your judgments. The Enchiridion served as a daily manual for Stoic living for centuries.",
      "Letters (Seneca): Moral letters from the Roman statesman Seneca to his friend Lucilius, covering grief, anger, wealth, friendship, and death. Written in elegant prose, they apply Stoic principles to the dilemmas of everyday life. Seneca's letters bridge philosophy and literature, making Stoicism accessible beyond the lecture hall."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Morning meditation, Negative visualization, Journaling, Self-examination."],
    },
    sources: [
      { label: "Stanford Encyclopedia - Stoicism", href: "https://plato.stanford.edu/entries/stoicism/" },
      { label: "Britannica - Stoicism", href: "https://www.britannica.com/topic/Stoicism" },
      { label: "Internet Encyclopedia of Philosophy - Stoicism", href: "https://iep.utm.edu/stoicism/" },
    ],
  },
  "sumerian": {
    overview: [
      "Sumerian religion was the religious system of the city-states of southern Mesopotamia from roughly the fourth millennium BCE until Sumerian culture was absorbed into broader Babylonian traditions. It centered on a large pantheon of gods tied to cities, natural forces, and cosmic order. Major deities included An (sky), Enlil (air and sovereignty), Enki (wisdom and water), and Inanna (love, fertility, and war). Each city maintained temples as economic and ritual centers where priests mediated between communities and divine powers through offerings, hymns, and seasonal festivals.",
      "Sumerian cosmology envisioned a layered universe: heavens above, the flat earth, and the subterranean realm of the dead. The underworld, often called Kur, offered a shadowy existence rather than a moral paradise or hell. Humans were created, according to myths such as the Atra-Hasis epic, to labor for the gods. The Epic of Gilgamesh, among the earliest literary works, explores mortality, kingship, and the limits of human wisdom. Ziggurats and temple complexes expressed the bond between earthly rulers and divine patrons, while divination and extispicy guided political decisions.",
      "Much of what scholars know comes from cuneiform tablets discovered at sites such as Ur, Uruk, and Nippur. Sumerian motifs-creation from clay, flood narratives, divine councils-reappear in later Akkadian, Babylonian, and biblical traditions. While beliefs varied across centuries and cities, the pattern of city patron deities, temple economies, and ritual calendars remained defining features until Mesopotamian religion evolved under successive empires. Kingship itself was understood as a divinely sanctioned office, with rulers bearing titles such as shepherd of the people."
    ],
    history: {
      title: "Historical Development",
      content: ["The religious world of Sumer in southern Mesopotamia - a pantheon of city patron deities, temple economies, and the earliest written myths such as the Epic of Gilgamesh. Sumerian cosmology described a layered universe of heaven, earth, and underworld, and introduced many motifs that echo through lat"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Gloomy underworld (Kur), no judgment paradise",
      "Sin: Offense against cosmic order ordained by gods",
      "Deity: Polytheistic pantheon with patron city-gods"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Epic of Gilgamesh: The earliest surviving epic poem, telling of King Gilgamesh of Uruk and his quest for immortality after the death of his friend Enkidu. It explores friendship, kingship, and the limits of human life against the gods' decree of mortality. Tablet fragments from the third millennium BCE preserve a story that influenced later Near Eastern and Greek literature.",
      "Enuma Elish (inherited): The Babylonian creation epic, composed in Akkadian and recited at the New Year festival. It describes how Marduk defeated the primordial goddess Tiamat and ordered the cosmos from her body. Sumerian cities later inherited and adapted this myth as Babylon rose to regional dominance.",
      "Sumerian King List: A chronicle blending history and legend, listing kings of Sumer from before the Flood through historical dynasties. It asserts that kingship descended from heaven and legitimized successive rulers. The text reveals how Sumerians understood divine authority and the cyclical rise and fall of cities."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Temple offerings, Ziggurat rituals, Divination, New Year festivals."],
    },
    places: {
      title: "Sacred Places",
      content: ["Important sites: babylon."],
    },
    sources: [
      { label: "Britannica - Mesopotamian religion", href: "https://www.britannica.com/topic/Mesopotamian-religion" },
      { label: "Met Museum - Mesopotamia", href: "https://www.metmuseum.org/toah/ht/02/wam.html" },
      { label: "BBC Religion - Ancient Mesopotamia", href: "https://www.bbc.co.uk/religion/religions/islam/history/mesopotamia_1.shtml" },
    ],
  },
  "taoism": taoismArticle,
  "tengrism": {
    overview: [
      "Tengrism is the traditional religious framework of Turkic and Mongol peoples of the Eurasian steppe, centered on Tengri (Tengeri), the Eternal Blue Sky, as supreme cosmic authority. Alongside Tengri, communities venerated ancestral spirits, local earth and mountain deities (such as Etugen in Mongol tradition), and nature powers linked to water, fire, and the hunt. The religion is best understood as an animistic and shamanic system rather than a centralized doctrinal faith with fixed scriptures or a single priestly hierarchy.",
      "Shamans (kam or böö) mediated between human communities and the spirit world through trance, song, and ritual journeying. Sacred mountains, trees, and springs served as sites of prayer and offering. Rulers such as Genghis Khan invoked Tengri's mandate to legitimize conquest and governance, as reflected in the Secret History of the Mongols and Orkhon inscriptions. Ancestor veneration and oaths sworn under the sky reinforced social bonds across nomadic societies that lacked permanent temples. Hunting rites and weather magic also formed part of the broader spiritual repertoire of steppe peoples.",
      "Tengrism declined in prominence as Buddhism, Islam, and Christianity spread across Central Asia, yet practices and beliefs persisted in folk tradition and were revived in modern nationalist and spiritual movements in Kazakhstan, Mongolia, and other states. Contemporary Tengrism varies widely and often blends ancient motifs with modern identity politics and state-sponsored heritage projects. Scholars treat both historical steppe religion and present-day revival forms with attention to regional diversity, nomadic ecology, and limited pre-modern textual sources that rarely record theology in systematic doctrinal form."
    ],
    history: {
      title: "Historical Development",
      content: ["The animistic-sky religion of the Turkic and Mongol nomads, centered on Tengri, the supreme sky-god. It venerated ancestors, sacred mountains, and the balance of all things. Genghis Khan ruled with Tengri's mandate.\", sacredTexts: [ { name: \"(Oral - Inscriptions of Orkhon, Secret H"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Ancestral spirit world",
      "Deity: Tengri, the Eternal Blue Sky"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - Inscriptions of Orkhon, Secret History of the Mongols): Tengrism's core teachings were passed orally among Turkic and Mongol peoples, with no single canonical scripture. The Orkhon inscriptions of the eighth century preserve early Turkic prayers to Tengri and the ancestors of the Göktürk khagans. The Secret History of the Mongols, written in the thirteenth century, records Genghis Khan's mandate from the Eternal Blue Sky and the shamanic world of the steppe."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Shamanic trance, Sky & mountain veneration, Ancestor rites."],
    },
    sources: [
      { label: "Britannica - Tengri", href: "https://www.britannica.com/topic/Tengri" },
      { label: "World History Encyclopedia - Tengrism", href: "https://www.worldhistory.org/Tengrism/" },
      { label: "Smithsonian - Genghis Khan", href: "https://www.si.edu/newsdesk/snapshot/genghis-khan" },
    ],
  },
  "vodou": vodouArticle,
  "wicca": {
    overview: [
      "Wicca is a modern religious movement that emerged in mid-twentieth-century Britain and is often classified under contemporary Paganism. Its public form is commonly traced to Gerald Gardner, who published works in the 1950s describing witchcraft as a surviving nature religion. Scholars debate how much Gardner drew on folklore, ceremonial magic, and literary sources rather than an unbroken ancient lineage, but Wicca quickly developed into a self-conscious tradition with ritual structures, initiatory groups, and published liturgy. From Britain it spread to North America and beyond, adapting to local cultures while retaining a shared emphasis on seasonal cycles, personal experience, and ritual practice.",
      "Most Wiccan groups honor a pair of deities, often described as the Goddess and the God, whose relationship mirrors natural cycles of birth, growth, decline, and renewal. Worship typically centers on the Wheel of the Year, eight seasonal festivals known as sabbats, alongside esbats tied to lunar phases. Rituals may include casting a circle, invoking deities, sharing food and drink, and symbolic acts of magic understood as focused intention rather than supernatural coercion. Ethical guidance is often summarized in the Wiccan Rede, commonly rendered as an injunction to harm none, though interpretations vary across traditions. Some initiatory paths, such as Gardnerian and Alexandrian Wicca, maintain formal degrees and coven structure, while eclectic and solitary practitioners compose their own rites from published materials and personal inspiration.",
      "Today Wicca encompasses diverse lineages, from structured covens to solitary practitioners, and enjoys legal recognition as a religion in several countries. Contemporary Wiccans engage questions of gender, environmental responsibility, and interfaith relations while drawing on both historical research and living ritual innovation. Academic studies treat Wicca as a significant example of modern Pagan identity formation, illustrating how new religious movements reconstruct ancient motifs for present spiritual needs."
    ],
    history: {
      title: "Historical Development",
      content: ["Introduced by Gerald Gardner, Wicca is a nature-revering paganism honoring a Goddess and God, the Wheel of the Year, and ethical magic. Its Wiccan Rede - 'harm none, do what ye will' - centers its ethics.\", sacredTexts: [ { name: \"Book of Shadows\", description: \"A"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Goddess and God; immanent in nature",
      "Sin: Threefold return of harm done",
      "Afterlife: Summerland between rebirths"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Book of Shadows: A personal or coven journal of rituals, spells, invocations, and seasonal rites, traditionally copied by hand from teacher to student. Gerald Gardner's version, published in the 1950s, helped standardize modern Wiccan practice. Each practitioner or coven maintains their own, making it a living rather than fixed scripture.",
      "Charge of the Goddess: A prose poem attributed to Doreen Valiente, spoken in the voice of the Goddess to her worshippers. It declares 'harm none, do what ye will' and invites devotees to seek the divine within nature. Recited at many Wiccan rituals, it is the tradition's best-known declaration of ethics and theology."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Coven or solitary ritual, Sabbats (8/year), Magic (spellcraft), Esbat (moon rites)."],
    },
    sources: [
      { label: "Britannica - Wicca", href: "https://www.britannica.com/topic/Wicca" },
      { label: "BBC Religion - Wicca", href: "https://www.bbc.co.uk/religion/religions/paganism/subdivisions/wicca.shtml" },
      { label: "Pew Research Center - Modern Paganism", href: "https://www.pewresearch.org/religion/2021/12/07/what-we-know-about-religious-neopagans-in-the-u-s/" },
      { label: "Oxford Research Encyclopedia - Contemporary Paganism", href: "https://oxfordre.com/religion/display/10.1093/acrefore/9780199340378.001.0001/acrefore-9780199340378-e-255" },
    ],
  },
  "yazidi": yazidiArticle,
  "yoruba": yorubaArticle,
  "zoroastrian": zoroastrianArticle,
};