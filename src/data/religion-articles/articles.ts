import type { ReligionArticle } from "./types";
import { buddhismArticle } from "./buddhism";
import { hinduismArticle } from "./hinduism";
import { jainismArticle } from "./jainism";
import { sikhismArticle } from "./sikhism";
import { christianityArticle } from "./christianity";

export const ARTICLES: Record<string, ReligionArticle> = {
  "bahai": {
    overview: [
      "The Bahá'í Faith originated in nineteenth-century Persia amid the messianic expectations of Shia Islam. In 1844, Siyyid Ali Muhammad of Shiraz declared himself the Bab (Gate), preparing the way for a greater figure. After the Bab's execution in 1850, Mirza Husayn-Ali Nuri, known as Bahá'u'lláh, announced in 1863 that he was the promised manifestation of God for this age. Bahá'u'lláh's exile to Baghdad, Constantinople, Adrianople, and finally Akka (Acre) spread his teachings across the Ottoman Empire. His writings, including the Kitáb-i-Aqdas and Kitáb-i-Íqán, form the canonical scripture of the tradition.",
      "Bahá'ís teach the oneness of God, the essential unity of all religions, and the unity of humanity regardless of race, nationality, or gender. They regard Abraham, Krishna, Moses, Buddha, Jesus, Muhammad, and the Bab as successive messengers who revealed divine guidance suited to their eras. Core practices include daily prayer, a nineteen-day annual fast, and abstention from alcohol and partisan politics. Governance rests on elected councils at local, national, and international levels, with the Universal House of Justice in Haifa, Israel, as the supreme institution. There is no clergy; individual investigation of truth is encouraged.",
      "Today the Bahá'í Faith claims several million adherents in virtually every country, though precise counts are debated because many national censuses do not list it separately. Bahá'í communities emphasize education, gender equality, interfaith dialogue, and social development projects. The faith maintains a distinctive calendar of nineteen months and holds regular devotional gatherings open to all. Scholars classify the movement as an independent world religion that emerged from an Islamic milieu while articulating a universalist theology distinct from both Islam and Christianity."
    ],
    history: {
      title: "Historical Development",
      content: ["Founded by Bahá'u'lláh in Persia, the Bahá'í Faith teaches the oneness of God, religion, and humanity. It sees the world's great faiths as successive chapters of one divine education, and calls for world peace, equality, and the harmony of science and religion.\", sacredTexts: [ { n"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: One unknowable God",
      "Salvation: Spiritual progress across eternity",
      "Unity: All religions share one source"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Kitáb-i-Aqdas: Bahá'u'lláh's 'Most Holy Book,' written in Arabic and Persian, establishing laws and institutions for the Bahá'í community. It covers prayer, fasting, marriage, inheritance, and the abolition of clergy. Bahá'ís regard it as the charter for a unified global civilization grounded in justice and equality.",
      "Kitáb-i-Íqán: The 'Book of Certitude,' Bahá'u'lláh's major theological work explaining the progressive nature of divine revelation. It interprets symbols in past scriptures and demonstrates how Abraham, Moses, Jesus, Muhammad, and the Báb each opened a new chapter of one education. It is considered essential reading for understanding Bahá'í belief.",
      "Hidden Words: A collection of brief, lyrical passages in Arabic and Persian offering spiritual counsel on the soul's relationship to God. Written in the voice of God addressing humanity, they distill Bahá'í ethics into accessible meditations. Many Bahá'ís memorize and recite them in daily devotional practice."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Daily prayer, Annual fasting, No alcohol, Consultation."],
    },
    sources: [
      { label: "Britannica: Bahá'í Faith", href: "https://www.britannica.com/topic/Bahai-Faith" },
      { label: "BBC Religion: Bahá'í", href: "https://www.bbc.co.uk/religion/religions/bahai/" },
      { label: "Bahá'í Reference Library", href: "https://www.bahai.org/library/" },
      { label: "Pew Research Center: Bahá'ís", href: "https://www.pewresearch.org/religion/2012/12/18/global-religious-landscape-bahais/" },
    ],
  },
  "bon": {
    overview: [
      "Bön is the indigenous religious tradition of Tibet, with roots that predate the arrival of Buddhism. Early Bön involved priests called kushen who conducted rituals - including animal sacrifice and death rites - for the kings of the Yarlung dynasty; scholars remain divided on whether its deepest origins lie in local Tibetan practice, in the neighboring Zhangzhung culture, or in outside influences such as Zoroastrianism. Bön's own tradition holds that it was taught by Tonpa Shenrab (Shenrab Miwo), a figure said to have attained enlightenment centuries before the historical Buddha in a land called Olmo Lungring, west of Tibet - though his historicity is not established by outside evidence.",
      "After Buddhism's arrival in Tibet, Bön was marginalized but underwent a significant renaissance in the tenth and eleventh centuries, during which it developed into a literate, systematized religion with its own monastic institutions closely paralleling - and in significant respects converging with - Tibetan Buddhism, especially the Nyingma school. Scholars disagree sharply on how to characterize this relationship: some argue Bön functions essentially as a variant of Tibetan Buddhism that preserves older, pre-Buddhist elements, while others hold it only crystallized as a self-conscious, independent religious system in response to and competition with Buddhism itself. Bönpo and Buddhist practitioners nonetheless regard their traditions as distinct, tracing authority to different lineages.",
      "Bön's canon - the Bön Kangyur and Bön Tengyur - covers sutras, tantras, and philosophical commentary, with many teachings said to have been hidden as termas (treasures) during periods of persecution and later rediscovered by treasure-finders (tertöns). Practice spans nine vehicles ranging from divination and ritual magic to advanced Dzogchen meditation. Chinese occupation of Tibet destroyed most Bön monasteries, though many have since been rebuilt, notably Menri monastery in India; in 1979 the 14th Dalai Lama formally recognized Bön as equal in status to Tibet's Buddhist schools. An estimated 400,000 Bönpo practice today across the Tibetan plateau and its diaspora."
    ],
    history: {
      title: "Historical Development",
      content: ["The indigenous religious tradition of Tibet, predating the arrival of Buddhism and later systematized into a literate monastic tradition with its own canon, monasteries, and lineages closely paralleling Tibetan Buddhism. Bönpo venerate the legendary founder Tonpa Shenrab and maintain distinct cosmol"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Founder: Tonpa Shenrab, legendary founding teacher",
      "Path: Nine Ways (theg pa dgu) from shamanic ritual to monastic philosophy"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Bön Kangyur: Bön's canonical scripture collection, paralleling the structure of the Tibetan Buddhist Kangyur, containing teachings attributed to Tonpa Shenrab across the tradition's 'Nine Ways' (vehicles) of practice. It covers cosmology, ritual, monastic discipline, and esoteric meditation."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Monastic study, Sky burial & death rites, Divination & astrology, Circumambulation (counter-clockwise)."],
    },
    sources: [
      { label: "Britannica - Bon religion", href: "https://www.britannica.com/topic/Bon-religion" },
      { label: "Oxford Bibliographies - Bon", href: "https://www.oxfordbibliographies.com/display/document/obo-9780195393521/obo-9780195393521-0069.xml" },
      { label: "The Tibetan & Himalayan Library, University of Virginia", href: "https://www.thlib.org" },
    ],
  },
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
  "candomble": {
    overview: [
      "Candomblé is an Afro-Brazilian religion that took shape in nineteenth-century Bahia among enslaved and freed Africans, blending West and Central African traditions - chiefly Yoruba, Fon, and Bantu - with the Roman Catholicism imposed by Portuguese colonizers. The religion organized itself into distinct denominations called nações (nations), each preserving the language, deities, and ritual vocabulary of a different African tradition: Nagô or Ketu (Yoruba-derived), Jeje (Fon-derived), and Angola (Bantu-derived) remain the three most prominent lineages, each maintained with considerable independence from the others.",
      "Worship centers on the orixás, spirits who mediate between humanity and Olorun, the distant supreme creator; each orixá carries a distinct personality, domain, and moral character - commonly described as morally ambiguous rather than purely good - and every practitioner is understood to have a tutelary orixá shaping their own temperament. Ritual life unfolds in community temple-houses called terreiros, led by priestesses (mãe de santo) or priests (pai de santo), where drumming, dance, and possession trance allow orixás to manifest directly among worshippers, alongside animal offerings and divination. Under colonial pressure, each orixá was historically paired with a corresponding Catholic saint, a syncretism that let the religion survive within an officially Catholic society.",
      "Candomblé endured decades of legal suppression and social stigma in Brazil, with police raids on terreiros continuing into the twentieth century, before gaining formal legal protection and growing public visibility from the 1970s onward. In recent decades many terreiros have moved to re-emphasize their specifically African liturgical roots and Yoruba-derived ritual language, distancing themselves from the heavier Catholic syncretism seen in related traditions such as Cuban Santería. Practiced today across Brazil and increasingly in diaspora communities abroad, Candomblé is recognized by scholars as one of the most historically documented and institutionally organized African-diaspora religions in the Americas."
    ],
    history: {
      title: "Historical Development",
      content: ["An Afro-Brazilian religion formed by enslaved Yoruba, Fon, and Bantu peoples in Bahia, centering on the worship of orixás (deities) through drumming, dance, and trance possession within community temples called terreiros. Distinct from the more Catholic-syncretized Santería, Candomblé has increasing"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Olorun above; orixás as forces of nature and personality",
      "Afterlife: Return to ancestral and orixá realms"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - itan & Ifá-related divination corpus): Candomblé transmits its theology orally through itan (myths of the orixás) and divination systems related to Ifá, taught within terreiro lineages under a mãe or pai de santo (priestess or priest). There is no single written scripture; authority rests in initiation and oral memory passed from generation to generation."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Drumming & trance possession, Orixá initiation, Animal & food offerings, Terreiro festivals."],
    },
    sources: [
      { label: "Britannica - Candomblé", href: "https://www.britannica.com/topic/Candomble" },
      { label: "Harvard Divinity School Religious Literacy Project - Candomblé", href: "https://rlp.hds.harvard.edu/faq/candomble" },
      { label: "Smithsonian Folklife - Afro-Brazilian Religion", href: "https://festival.si.edu/" },
    ],
  },
  "caodai": {
    overview: [
      "Cao Đài was formally established on October 7, 1926, in Tây Ninh, southern Vietnam, growing out of a spiritualist circle that had begun meeting in Saigon the previous year. Its founders - including Cao Quỳnh Cư, Cao Hoài Sang, Lê Văn Trung, and Phạm Công Tắc - presented the new faith as a deliberate synthesis: Confucian ethical precepts, Taoist ritual practice, Buddhist teachings on karma and rebirth, and an organizational hierarchy modeled on Roman Catholicism, unified under the worship of a single God, Cao Đài. Adherents refer to their faith as the 'Third Universal Redemption' - a final revelation completing two earlier eras of divine communication with humanity through history's great prophets.",
      "Cao Đài's most recognizable symbol, the Divine Eye, appears throughout its temples to represent God's all-seeing presence. Its founding scriptures - the Tân Luật (Canonical Codes) and Pháp Chánh Truyền (Religious Constitution) - were composed in part through spirit-writing séances, a mediumistic practice influenced by the French spiritist Allan Kardec, through which adherents believe they received guidance from God and a pantheon of spirits that includes historical and literary figures such as Victor Hugo and Sun Yat-sen. Core practices include prayer, ancestor veneration, vegetarianism on set days, and a commitment to nonviolence.",
      "The Tây Ninh Holy See, with its ornately colorful cathedral, remains Cao Đài's spiritual center and a major site of Vietnamese religious tourism. Estimates of the faith's following vary considerably depending on source and methodology - Vietnamese government figures place adherents at 4.4 to 6 million, while United Nations estimates from 2015 suggest a smaller figure near 2.5 million - but by any measure Cao Đài ranks among Vietnam's largest indigenous new religious movements, with additional communities in the Vietnamese diaspora in the United States, France, and Cambodia."
    ],
    history: {
      title: "Historical Development",
      content: ["Founded in 1926 in Tây Ninh, Vietnam, Cao Đài teaches that God has revealed truth progressively through history - via Buddha, Confucius, Moses, Jesus, and Muhammad among others - and now offers a 'Third Amnesty' uniting these revelations. Its striking Holy See temple and all-seeing Divine Eye symbol"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Cao Đài - the one God behind all revelations",
      "Salvation: Union of world religions in a final 'Third Amnesty'"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Compilation of Divine Messages (Thánh Ngôn Hiệp Tuyển): A collection of messages Cao Đài adherents believe were received through spirit-writing séances from God and a pantheon of saints - including Victor Hugo and Sun Yat-sen - during the religion's founding years. It forms the core scriptural basis for Cao Đài doctrine and ritual."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Spirit-writing séances, Vegetarian fasting days, Ancestor veneration, Temple worship at Tây Ninh Holy See."],
    },
    sources: [
      { label: "Britannica - Cao Dai", href: "https://www.britannica.com/topic/Cao-Dai" },
      { label: "Harvard Divinity School Religious Literacy Project - Caodaism", href: "https://rlp.hds.harvard.edu/" },
      { label: "Pluralism Project, Harvard University - Caodaism", href: "https://pluralism.org/caodaism" },
    ],
  },
  "chinese-folk": {
    overview: ["The diffuse, non-institutional religious life of China - ancestor veneration, household and local deities, temple fairs, and divination - practiced alongside and interwoven with Buddhism, Taoism, and Confucianism rather than as a separate exclusive faith. It has no single founder, clergy, or canon, but persists as the most widely practiced belief system in China.\", sacredTexts: [ { name: \"(No single canon - almanacs, temple liturgies, local gazetteers)\", description: \"Chinese folk religion has no unified scripture; practice draws on the Tongshu (popular almanac) for auspicious timing, temple-specific liturgies for local deities and city gods, and orally transmitted ancestor-veneration customs. Its authority rests in community practice and lineage rather than a fixed text.\", }, ], practices: [\"Ancestor veneration\", \"Temple fairs & processions\", \"Incense offerings\", \"Fengshui & divination\"], coreIdeas: [ { label: \"Deity\", value: \"Layered pantheon of ancestors, local gods, and celestial bureaucracy\" }, { label: \"Afterlife\", value: \"Ancestors sustained by descendants' offerings\" }, ], conceptPositions: { \"mysticism\": \"affirmed\", \"polytheism\": \"affirmed\", \"prayer\": \"affirmed\", \"soul\": \"affirmed"],
    history: {
      title: "Historical Development",
      content: ["The diffuse, non-institutional religious life of China - ancestor veneration, household and local deities, temple fairs, and divination - practiced alongside and interwoven with Buddhism, Taoism, and Confucianism rather than as a separate exclusive faith. It has no single founder, clergy, or canon,"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Layered pantheon of ancestors, local gods, and celestial bureaucracy",
      "Afterlife: Ancestors sustained by descendants' offerings"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(No single canon - almanacs, temple liturgies, local gazetteers): Chinese folk religion has no unified scripture; practice draws on the Tongshu (popular almanac) for auspicious timing, temple-specific liturgies for local deities and city gods, and orally transmitted ancestor-veneration customs. Its authority rests in community practice and lineage rather than a fixed text."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Ancestor veneration, Temple fairs & processions, Incense offerings, Fengshui & divination."],
    },
    sources: [],
  },
  "christianity": christianityArticle,
  "confucianism": {
    overview: [
      "Confucianism derives from Kong Qiu (551-479 BCE), known in the West as Confucius, who sought to restore social harmony through moral cultivation rather than punitive law alone. The Lunyu (Analects), compiled by disciples, records his teachings on ren (benevolence), li (ritual propriety), yi (righteousness), and xiao (filial piety). Confucianism presents a this-worldly ethical system focused on character, reciprocal obligations among ruler, minister, parent, and child, and the belief that virtuous leadership inspires virtuous subjects. Heaven (Tian) appears not as a personal deity but as a moral order that responds to human conduct, rewarding sincerity and condemning cruelty or neglect of duty. Education, ritual performance, and self-examination were central means by which individuals and communities cultivated lasting virtue.",
      "Over centuries, Confucian thought shaped Chinese imperial education, civil service examinations, and state ritual throughout the empire. Mencius expanded the tradition's moral psychology, arguing that humans possess innate tendencies toward goodness. Later Neo-Confucians such as Zhu Xi integrated metaphysics, cosmology, and disciplined self-cultivation through study and quiet-sitting meditation. Although rarely classified as a religion in the Western sense, Confucianism functioned as a civil religion with rites honoring Heaven and ancestors. Its influence extends across Korea, Japan, and Vietnam, where adapted Confucian norms informed law, family structure, gender roles, and governance for many centuries. The Five Classics and Four Books became standard curricula throughout East Asia, embedding Confucian values in elite and, gradually, broader social life. Contemporary debates revisit Confucian resources for ethics, democracy, and ecological responsibility, examining how classical ideals might address present social challenges."
    ],
    history: {
      title: "Historical Development",
      content: ["Confucius taught that a stable society rests on ren (humaneness), li (ritual propriety), and filial piety. Confucianism shaped Chinese government, family, and education for two millennia - more an ethical philosophy than a faith about gods.\", sacredTexts: [ { name: \"Analects\","],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Virtue: Ren - humaneness, the supreme virtue",
      "Sin: Failing in duty or ritual propriety",
      "Deity: Heaven (Tian) as moral order, not a person"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Analects: A collection of sayings and conversations of Confucius, compiled by his disciples after his death in 479 BCE. It addresses governance, personal cultivation, filial piety, and the virtue of ren (humaneness). For two millennia it was the core text of China's civil service examinations and moral education.",
      "Mencius: The teachings of Mencius (Mengzi, fourth century BCE), who argued that human nature is inherently good and that righteous governance flows from benevolent rulers. He defended the common people's right to resist tyranny and developed Confucian ideas of moral intuition. The text is one of the Four Books central to Neo-Confucianism.",
      "Five Classics: A set of ancient texts - including the Book of Documents, Book of Songs, Book of Rites, Book of Changes (I Ching), and Spring and Autumn Annals - that Confucius is traditionally said to have edited. They cover history, poetry, ritual, divination, and chronicle. Confucian education treated mastery of the Classics as the foundation of wisdom and virtue."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Ancestor veneration, Ritual (li), Self-cultivation, Study."],
    },
    sources: [
      { label: "Stanford Encyclopedia of Philosophy - Confucius", href: "https://plato.stanford.edu/entries/confucius/" },
      { label: "Encyclopaedia Britannica - Confucianism", href: "https://www.britannica.com/topic/Confucianism" },
      { label: "Columbia University - Confucianism in China", href: "https://afe.easia.columbia.edu/special/china_general_confucian.htm" },
      { label: "Stanford Encyclopedia of Philosophy - Neo-Confucianism", href: "https://plato.stanford.edu/entries/neo-confucian/" },
    ],
  },
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
  "druse": {
    overview: [
      "The Druze are an ethno-religious community centered in the Levant, especially Lebanon, Syria, and Israel. Their tradition emerged in the eleventh century from Ismaili Shia Islam during the Fatimid Caliphate. Hamza ibn Ali and other missionaries, acting under the authority of the caliph al-Hakim bi-Amr Allah, composed the Rasa'il al-Hikma (Epistles of Wisdom), which remain the core sacred texts. After al-Hakim's disappearance in 1021, the movement closed to new converts and developed into a distinct community with its own theology, endogamy, and social structure.",
      "Druze doctrine is esoteric and largely concealed from outsiders. Initiated elders (uqqal) study sacred writings and lead communal life, while the majority (juhhal) participate in ritual and social obligations without access to the full teachings. Beliefs include strict monotheism, the transmigration of souls, and a cyclical view of history in which God periodically sends prophets and mentors. Al-Hakim is revered as a manifestation of the divine, though Druze theology resists simple categorization as either Islamic sect or separate religion. Religious practice emphasizes moral conduct, hospitality, and loyalty to the community rather than public proselytism.",
      "Estimated at roughly one million worldwide, Druze identity combines faith, kinship, and Arabic language. They have played notable roles in Levantine politics and military service while maintaining religious discretion. Weekly gatherings on Thursday evenings and annual festivals mark the religious calendar, though public ritual remains modest compared with the inner life of the uqqal. Academic sources treat Druze history as a case study in how a closed initiatory tradition preserves cohesion under minority status across centuries of Ottoman, colonial, and national-state rule."
    ],
    history: {
      title: "Historical Development",
      content: ["An offshoot of Ismaili Shia Islam that became its own tradition. Druze believe in one God, reincarnation, and a final judgment. The faith's inner teachings are secret, reserved for the initiated 'uqqal.'\", sacredTexts: [ { name: \"Rasa'il al-Hikma (Epistles of Wisdom)\", desc"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: One transcendent God",
      "Reincarnation: Successive rebirths of the soul",
      "Judgement: Final accounting at the end of cycles"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Rasa'il al-Hikma (Epistles of Wisdom): A collection of 111 epistles composed by Hamza ibn Ali and other missionaries during the Fatimid period, forming the sole canonical scripture of the Druze faith. They expound a Neoplatonic cosmology, the unity of God, and the cyclical appearance of divine messengers. Only the initiated 'uqqal' may study them; the text remains closed to outsiders and converts."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Thursday meetings, Initiation, Modest dress."],
    },
    sources: [
      { label: "Britannica: Druze", href: "https://www.britannica.com/topic/Druze" },
      { label: "BBC Religion: Druze", href: "https://www.bbc.co.uk/religion/religions/druze/" },
      { label: "Encyclopaedia Iranica: Druze", href: "https://www.iranicaonline.org/articles/druze" },
    ],
  },
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
  "ifa": {
    overview: [
      "Ifá is a Yoruba divination and wisdom tradition centered on Orunmila, the orisha of knowledge, and the corpus of odu, or sacred signs, interpreted through ritual tools such as palm nuts or a divining chain. Babalawos and iyanifas, trained priests of Ifá, recite verses, proverbs, and prescriptions associated with each of the 256 odu combinations to guide clients on destiny, ethics, health, and community relations. Ifá is simultaneously a religious office, a literary archive, and a philosophy of character, fate, and social responsibility transmitted chiefly through apprenticeship and memory.",
      "Ifá practice extends beyond Nigeria to Benin, Togo, and diaspora communities where Yoruba religion took root, including Cuban Santería and related lineages. Regional schools differ in initiation requirements, verse recension, and relationship to other orisha cults. Offerings known as ebo, ancestor consultation, and festival observance integrate Ifá into broader Yoruba ritual life rather than isolating it as mere fortune-telling. UNESCO recognition of Ifá oral corpus highlights its status as one of the world's major bodies of oral literature and moral instruction.",
      "Colonial and modern pressures reshaped access to training, gender roles in priesthood, and public perception of divination. Contemporary babalawos navigate legal regulation, interfaith society, and global interest in African spirituality while maintaining standards of initiation and secrecy. Annual festivals and congresses of Ifá priests in Nigeria and the diaspora reinforce shared standards while allowing regional variation. Scholars distinguish Ifá as a rigorous hermeneutic system with its own epistemology from popular stereotypes of magic. Respectful study acknowledges national and lineage diversity and the authority of initiated practitioners over interpretive traditions."
    ],
    history: {
      title: "Historical Development",
      content: ["Ifá is both a divination system and a body of wisdom literature (odu) consulted through sacred palm nuts or chain. Its babalawos (priests) interpret the 256 odu - one of the world's great oral corpora.\", sacredTexts: [ { name: \"Odu Ifá (256 verses)\", description:"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Olodumare; Orunmila as wisdom-keeper",
      "Destiny: Each soul chooses its fate (ayanmo)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Odu Ifá (256 verses): The heart of Ifá divination: 256 odu, each comprising hundreds of verses of myth, proverb, and ritual prescription attributed to the orisha Orunmila. Babalawos memorize vast portions over decades and cast odu through palm nuts or a divining chain to answer life's questions. This corpus is among the largest bodies of oral wisdom literature in the world."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Divination, Ebo (offerings), Ancestor consultation."],
    },
    sources: [
      { label: "Britannica - Ifa", href: "https://www.britannica.com/topic/Ifa" },
      { label: "UNESCO - Ifa Divination System", href: "https://ich.unesco.org/en/RL/ifa-divination-system-00963" },
      { label: "Smithsonian - Yoruba Divination", href: "https://africa.si.edu/exhibitions/current-exhibitions/yoruba/divination/" },
    ],
  },
  "inuit": {
    overview: [
      "Inuit religious traditions encompass the spiritual lifeways of Inuit peoples across the Arctic, including present-day Greenland, Canada, Alaska, and Chukotka. Historically these traditions were oral and embedded in hunting, kinship, and seasonal movement on the land and sea. Central themes include the shared soul or inua of humans and animals, the need for respectful treatment of game, and the role of the angakkuq, or shaman, who mediated between communities and powerful spiritual beings. Sedna or similar sea spirits appear in many narratives as guardians of marine animals, whose goodwill was essential for survival.",
      "Inuit groups are diverse, and beliefs varied by region, band, and historical period. Tunghak, Nuliajuk, and other names and stories reflect local cosmology rather than one standardized pantheon. Taboos governing food preparation, childbirth, and hunting success functioned as moral and ecological discipline. Contact with missionaries, traders, and colonial governments transformed public practice, yet many Inuit communities retain combinations of Christian faith and inherited spiritual values, including respect for elders, animals, and the land. Seasonal hunting cycles continue to frame moral teaching even where older public ritual forms have changed.",
      "Scholars today approach Inuit religion through archaeology, ethnography, and collaboration with Inuit knowledge holders rather than solely through outsider accounts. Arctic climate change, sedentarization, and language shift have altered how traditions are transmitted, while revitalization efforts seek to preserve songs, stories, and ethical relationships with the environment. Inuit-owned institutions increasingly guide research priorities and public interpretation. Academic writing distinguishes historical pre-Christian practice from contemporary Inuit spirituality, which remains dynamic and internally varied across the circumpolar North."
    ],
    history: {
      title: "Historical Development",
      content: ["The spiritual world of the Inuit held that animals and humans share souls. Shamans (angakkuq) negotiated with Sedna, goddess of the sea, to release game. Taboos and proper ritual kept the cosmic balance.\", sacredTexts: [ { name: \"(Oral tradition)\", description: \"I"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Soul: Animals and humans share souls (inua)",
      "Sin: Breaking taboos angers Sedna"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral tradition): Inuit spiritual knowledge was transmitted through stories, songs, and taboos passed down by elders and shamans across the Arctic. Tales of Sedna, the sea goddess, and the angakkuq's journeys to the spirit world explained hunting fortunes and cosmic balance. No written canon existed; the land, animals, and oral narratives together formed the sacred record."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Shamanic journeys, Taboo observance, Ancestor respect."],
    },
    sources: [
      { label: "Britannica - Inuit", href: "https://www.britannica.com/topic/Inuit" },
      { label: "Smithsonian Arctic Studies Center", href: "https://www.smithsonianmag.com/smithsonian-institution/the-arctic-studies-center-180949088/" },
      { label: "Canadian Museum of History - Inuit", href: "https://www.historymuseum.ca/cmc/exhibitions/civil/inuit/inuit00e.html" },
    ],
  },
  "islam": {
    overview: [
      "Islam is a monotheistic tradition founded in seventh-century Arabia, when the Prophet Muhammad received revelations he understood as the word of God (Allah). These revelations, collected in the Qur'an, affirm earlier prophets including Abraham, Moses, and Jesus while presenting Muhammad as the final messenger in a line of divine guidance. Muhammad's migration from Mecca to Medina (622 CE, the hijra) marks the start of the Islamic calendar and the formation of a cohesive Muslim community. Within decades of his death in 632, Arab-Muslim armies had expanded across the Middle East and North Africa, bringing Islam into contact with Persian, Byzantine, and Central Asian cultures.",
      "Muslims profess tawhid, the absolute oneness of God, and seek submission (islam) to divine will through faith and practice. The Five Pillars structure religious life: the shahada (declaration of faith), salat (ritual prayer), zakat (almsgiving), sawm (fasting during Ramadan), and hajj (pilgrimage to Mecca for those able). Islamic law (sharia) draws on the Qur'an, the sunna (Muhammad's example recorded in hadith), and centuries of jurisprudential reasoning, producing schools of thought such as Hanafi, Maliki, Shafi'i, and Hanbali. A political succession dispute after Muhammad's death contributed to the Sunni-Shia division, which remains significant though both branches share core beliefs.",
      "Islam is the world's second-largest religion, with diverse expressions from West Africa to Southeast Asia. Sufi mysticism, philosophical theology (kalam), and institutions such as madrasas and waqf endowments have shaped intellectual history. Modern Muslim societies debate reform, gender roles, political Islam, and relations with non-Muslim majorities. Academic study examines Islam as scripture, law, civilization, and lived practice, emphasizing regional variation rather than a single monolithic culture."
    ],
    history: {
      title: "Historical Development",
      content: ["Islam teaches that God (Allah) revealed His final guidance to the Prophet Muhammad through the Qur'an. The Five Pillars shape a Muslim's life: declaration of faith, prayer, charity, fasting, and pilgrimage. Sunni and Shia branches emerged after Muhammad's death.\", sacredTexts: [ {"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: Tawhid - absolute oneness of Allah",
      "Sin: Disobedience to Allah's will",
      "Afterlife: Paradise (Jannah) or Hell (Jahannam)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Qur'an: Islam's central revelation, believed to be the literal word of God (Allah) as dictated to the Prophet Muhammad through the angel Gabriel over twenty-three years. It is organized into 114 surahs (chapters) arranged largely by length, not chronology. Muslims recite it in Arabic in daily prayer, and memorizing the entire text is a mark of great devotion.",
      "Hadith: Collections of reports about the words, deeds, and approvals of the Prophet Muhammad, compiled by scholars in the centuries after his death. Hadith provide the practical model (sunna) for living out Qur'anic principles in daily life. Sunni and Shia Muslims recognize different canonical collections, reflecting early community divisions.",
      "Sunnah: The lived tradition and normative example of the Prophet Muhammad, derived from Hadith and early community practice. It covers everything from prayer posture to business ethics and family law. Together with the Qur'an, the Sunnah forms the primary source of Islamic law (sharia) and spiritual guidance."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Salat (5 daily prayers), Sawm (Ramadan fast), Zakat (charity), Hajj pilgrimage."],
    },
    places: {
      title: "Sacred Places",
      content: ["Important sites: mecca, jerusalem."],
    },
    sources: [
      { label: "Britannica: Islam", href: "https://www.britannica.com/topic/Islam" },
      { label: "BBC Religion: Islam", href: "https://www.bbc.co.uk/religion/religions/islam/" },
      { label: "Stanford Encyclopedia of Philosophy: Islam", href: "https://plato.stanford.edu/entries/islam/" },
      { label: "Pew Research Center: The Future of World Religions", href: "https://www.pewresearch.org/religion/2015/04/02/religious-projections-2010-2050/" },
    ],
  },
  "jainism": jainismArticle,
  "judaism": {
    overview: [
      "Judaism is the religion of the Jewish people, rooted in a covenant between God and Israel as narrated in the Hebrew Bible. Scholars trace its formation through centuries of Israelite history, from early Iron Age communities in the Levant to the consolidation of monotheistic worship centered on YHWH. The destruction of the First and Second Temples in Jerusalem (586 BCE and 70 CE) reshaped Jewish life, shifting emphasis from sacrificial worship toward Torah study, prayer, and observance of mitzvot. Rabbinic Judaism, articulated in the Mishnah and Talmud, became the dominant form after late antiquity and continues to guide Orthodox, Conservative, and Reform communities worldwide.",
      "Jewish identity intertwines religious practice, ethnic heritage, and shared memory of exile and return. Core observances include Shabbat, dietary laws (kashrut), lifecycle rituals, and pilgrimage festivals such as Passover and Sukkot. Theological views vary: many Jews affirm a personal God who acts in history, while others emphasize ethical monotheism, mysticism (Kabbalah), or cultural continuity without strict theism. Debates over messianism, resurrection, and the afterlife (Olam Ha-Ba) persist across denominations. Despite diaspora, persecution, and modern secularization, Judaism has preserved textual traditions, legal reasoning, and communal institutions that also supplied foundational narratives for Christianity and Islam.",
      "Today Judaism is practiced on every inhabited continent, with major centers in Israel and North America. Contemporary issues include the relationship between religion and Zionism, gender roles in worship, intermarriage, and the meaning of Jewish peoplehood in pluralist societies. Academic study treats Judaism as both a living faith and a subject of history, archaeology, and comparative religion, examining how a small ancient people maintained continuity across millennia of political change."
    ],
    history: {
      title: "Historical Development",
      content: ["Judaism traces its origin to Abraham and the covenant at Sinai, where God revealed the Torah. Through exile and diaspora it preserved monotheism, ethical law, and the hope of redemption, becoming the root of Christianity and Islam.\", sacredTexts: [ { name: \"Torah\", descript"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: YHWH, one God of the covenant",
      "Sin: Violation of the covenant (mitzvot)",
      "Afterlife: Varied - Olam Ha-Ba; resurrection debated"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Torah: The first five books of the Hebrew Bible - Genesis, Exodus, Leviticus, Numbers, and Deuteronomy - traditionally attributed to Moses. It records creation, the covenant at Sinai, and the laws governing Israelite life. Torah scrolls are handwritten on parchment and read in full over the course of each synagogue year.",
      "Tanakh: The complete Hebrew Bible, comprising Torah (Law), Nevi'im (Prophets), and Ketuvim (Writings). It spans from creation through exile and return, forming the scriptural foundation of Judaism. The Prophets call Israel to justice; the Writings include Psalms, Proverbs, Job, and Esther.",
      "Talmud: A vast compendium of rabbinic debate, law, and lore compiled between the third and sixth centuries CE in two versions: the Babylonian and Jerusalem Talmuds. It interprets the Torah and applies its principles to every aspect of life. Studying Talmud is the central intellectual and spiritual discipline of rabbinic Judaism."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Shabbat, Kosher diet, Prayer (3x daily), Pilgrimage festivals."],
    },
    places: {
      title: "Sacred Places",
      content: ["Important sites: jerusalem."],
    },
    sources: [
      { label: "Britannica: Judaism", href: "https://www.britannica.com/topic/Judaism" },
      { label: "BBC Religion: Judaism", href: "https://www.bbc.co.uk/religion/religions/judaism/" },
      { label: "Stanford Encyclopedia of Philosophy: Judaism", href: "https://plato.stanford.edu/entries/judaism/" },
      { label: "Pew Research Center: Jewish Americans", href: "https://www.pewresearch.org/religion/2021/05/11/jewish-americans-in-2020/" },
    ],
  },
  "korean-shin": {
    overview: ["Founded by Choe Je-u, Cheondogyo fused Confucian ethics, Buddhist practice, and a monotheistic belief in Haneullim (the Lord of Heaven). It became a rallying point for Korean national identity under Japanese rule.\", sacredTexts: [ { name: \"Donggyeong Daejeon\", description: \"The 'Classic of the Eastern Scripture,' the primary scripture of Cheondogyo compiled by Choe Je-u's followers. It records divine revelations received through incantation and presents the doctrine of Haneullim, the Lord of Heaven dwelling within all people. The text calls for moral reform, equality, and the realization of paradise on earth.\", }, { name: \"Yongdam Yusa\", description: \"A collection of teachings, hymns, and narratives associated with Choe Je-u and early Cheondogyo leaders. It preserves the movement's origin story and its fusion of Confucian ethics, Buddhist practice, and monotheistic faith. The work remains central to Cheondogyo worship and Korean nationalist identity.\", }, ], practices: [\"Incantation (sicheonnyeong)\", \"Daily prayer\", \"Equality rituals\"], coreIdeas: [ { label: \"Monotheism\", value: \"Haneullim - God within all humans\" }, { label: \"Salvation\", value: \"Bringing heaven to earth\" }, ], conceptPositions: { \"monotheism\": \"affirmed\", \"mysticism\": \"affirmed\", \"prayer\": \"affirmed"],
    history: {
      title: "Historical Development",
      content: ["Founded by Choe Je-u, Cheondogyo fused Confucian ethics, Buddhist practice, and a monotheistic belief in Haneullim (the Lord of Heaven). It became a rallying point for Korean national identity under Japanese rule.\", sacredTexts: [ { name: \"Donggyeong Daejeon\", description:"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: Haneullim - God within all humans",
      "Salvation: Bringing heaven to earth"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Donggyeong Daejeon: The 'Classic of the Eastern Scripture,' the primary scripture of Cheondogyo compiled by Choe Je-u's followers. It records divine revelations received through incantation and presents the doctrine of Haneullim, the Lord of Heaven dwelling within all people. The text calls for moral reform, equality, and the realization of paradise on earth.",
      "Yongdam Yusa: A collection of teachings, hymns, and narratives associated with Choe Je-u and early Cheondogyo leaders. It preserves the movement's origin story and its fusion of Confucian ethics, Buddhist practice, and monotheistic faith. The work remains central to Cheondogyo worship and Korean nationalist identity."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Incantation (sicheonnyeong), Daily prayer, Equality rituals."],
    },
    sources: [],
  },
  "mandaean": {
    overview: [
      "Mandaeism is a Gnostic monotheistic religion whose adherents trace their origin to first-century followers of John the Baptist, whom they revere as their greatest prophet and final teacher - while explicitly rejecting Jesus and Muhammad. Mandaean texts such as the Haran Gawaita describe an early migration from Palestine through Haran to southern Mesopotamia to escape persecution, though scholars continue to debate whether the tradition's roots are ultimately Palestinian or native to Mesopotamia. What is clear is that by the Parthian and Sasanian periods, Mandaean communities were established in the marshlands of what is now southern Iraq and southwestern Iran, worshipping Hayyi Rabbi, 'the Great Life,' as their supreme, unknowable God.",
      "Central to Mandaean practice is baptism (masbuta), performed repeatedly in flowing 'living water' rather than as a one-time rite of conversion, alongside the masiqta, a ceremony guiding the soul's ascent after death. Cosmology describes emanations from the divine, including angelic beings (uthras) such as Manda d-Hayyi, and a hierarchy of prophets from Adam and Seth through John the Baptist. Scripture - the Ginza Rabba, the Qulasta prayerbook, and the Book of John - survives in Mandaic, an Eastern Aramaic dialect, and is copied and guarded by a hereditary priesthood organized into three grades: tarmidia, ganzibra, and rishama.",
      "Under Islamic rule Mandaeans were recognized as 'People of the Book,' identified with the Quranic Sabians, which afforded the community legal protection for centuries. That protection collapsed after the 2003 Iraq invasion: sectarian violence drove the Iraqi Mandaean population down from a substantial, centuries-old community to a small fraction of its former size within a few years, scattering most survivors into diaspora across Europe, Australia, and North America. Today an estimated 60,000-70,000 Mandaeans remain worldwide, making the preservation of Mandaic language, priestly ordination, and river-baptism ritual outside their ancestral marshlands an active and urgent concern for the community."
    ],
    history: {
      title: "Historical Development",
      content: ["A Gnostic monotheistic religion originating in the Jordan Valley or southern Mesopotamia in the early centuries CE, venerating John the Baptist and practicing repeated ritual immersion in flowing water (masbuta) as its central rite. Mandaeans speak a distinct Aramaic dialect and today survive mainly"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Cosmos: World of Light vs. flawed material creation",
      "Salvation: Purification through repeated baptism in flowing water"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Ginza Rabba: The 'Great Treasure,' Mandaeism's principal scripture, combining cosmological teaching, hymns, and moral instruction in the Mandaic Aramaic language. It describes the World of Light, the flawed material creation, and the soul's ascent after death. Priests guard and copy the text by hand as a sacred duty.",
      "Book of John (Drasha d-Yahia): A scripture centered on John the Baptist, whom Mandaeans revere as the true prophet of their faith while rejecting Jesus and Muhammad. It recounts his birth, teaching, and baptismal ministry in the Jordan. It is recited during major Mandaean rituals and festivals."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Ritual immersion (masbuta), Living-water baptism, Priestly ordination, Avoidance of intermarriage."],
    },
    sources: [
      { label: "Britannica - Mandaeanism", href: "https://www.britannica.com/topic/Mandaeanism" },
      { label: "Encyclopaedia Iranica - Mandaeans", href: "https://www.iranicaonline.org/articles/mandaeans-i-general" },
      { label: "Minority Rights Group - Mandaeans", href: "https://minorityrights.org/communities/mandaeans/" },
    ],
  },
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
  "maori": {
    overview: [
      "Māori religion describes the spiritual traditions of the indigenous Polynesian people of Aotearoa New Zealand. Cosmogonic narratives tell of Ranginui, the sky father, and Papatūānuku, the earth mother, whose separation by their children opened the world to light and human life. Whakapapa, or genealogy, links people to gods, ancestors, landforms, and living communities in a single relational order. Concepts of tapu, noa, and mana regulate sacred restriction, release, and spiritual authority across social, political, and environmental relationships.",
      "Māori spirituality is not monolithic; iwi and hapū maintain distinct histories, deities of local importance, and ceremonial protocols on marae. Karakia, or incantations, accompany daily tasks, meetings, and rites of passage. Seasonal observances and tribal histories shape which narratives and protocols take precedence in each region. Ancestors remain active in moral guidance and collective identity, while tā moko and other practices encode lineage and status. Contact with Christianity from the nineteenth century produced diverse outcomes, including syncretic forms, prophetic movements such as Pai Mārire, and ongoing debate over faith and tradition.",
      "Today many Māori identify across a spectrum of religious affiliation while asserting tino rangatiratanga, or self-determination, over sacred knowledge and land. Revitalization of te reo Māori and customary law has renewed ceremonial life and environmental ethics grounded in kaitiakitanga, guardianship of place. Treaty settlements and co-governance arrangements increasingly embed Māori spiritual values in resource management. Scholars and Māori communities alike caution against treating Māori belief as static folklore. Respectful account recognizes iwi authority, the living marae as theological center, and diversity among urban and rural Māori experience."
    ],
    history: {
      title: "Historical Development",
      content: ["Māori cosmology traces whakapapa (genealogy) linking all life to Ranginui (sky) and Papatūānuku (earth). Tapu (sacred restriction) and mana (spiritual power) order relationships between people, ancestors, and land.\", sacredTexts: [ { name: \"(Oral - whakapapa, karakia)\", des"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Io supreme; gods of nature",
      "Soul: Wairua continues among ancestors"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - whakapapa, karakia): Māori sacred knowledge is carried in whakapapa (genealogical chants linking all beings to Ranginui and Papatūānuku) and karakia (incantations for every occasion from birth to harvest). These are recited on the marae and taught within iwi (tribal) communities. Written collections exist, but oral performance on ancestral land remains the authoritative form."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Karakia (incantations), Marae gatherings, Tā moko, Ancestor veneration."],
    },
    sources: [
      { label: "Te Ara - Māori Religion", href: "https://teara.govt.nz/en/maori-religion-and-belief" },
      { label: "Britannica - Māori", href: "https://www.britannica.com/topic/Maori" },
      { label: "UNESCO - Māori Cultural Heritage", href: "https://ich.unesco.org/en/state/aotearoa-new-zealand-NZ" },
    ],
  },
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
  "navajo": {
    overview: [
      "Navajo spirituality, practiced by the Diné people of the American Southwest, is organized around hózhó, a concept of beauty, balance, and harmony that permeates health, ethics, and relations with the natural world. The Holy People, or Diyin Diné'é, are powerful beings who taught ceremonies, songs, and moral order in the emergence narratives that structure Diné identity. Illness and misfortune are often understood as disharmony rather than isolated physical failure, requiring restoration through ceremonial knowledge performed by trained singers and medicine practitioners.",
      "Ceremonial life is extensive and locally varied. The Blessingway, Nightway, and other rites employ sandpaintings, prayer, and song cycles that are sacred and restricted; many details are not shared with uninitiated outsiders. Some ceremonies extend over several nights and require precise oral recitation learned across decades of training. Sweat lodge, prayer, and offerings connect individuals to clans, landscapes, and ancestral instructions. Diné religion is not a separate compartment from daily life but a framework linking language, kinship, land tenure, and healing. Practices and emphases differ among communities on and off the Navajo Nation.",
      "Colonial displacement, boarding schools, resource extraction, and commercial misuse of sacred symbols have threatened ceremonial integrity, prompting Diné leaders to defend religious privacy and cultural property. Contemporary Diné may also participate in Christianity or other faiths while maintaining traditional ceremonies. Scholarly and medical institutions increasingly recognize ceremonial healing as part of a broader cultural ecology. Federal law and tribal governance now restrict unauthorized reproduction of sacred imagery. Respectful study acknowledges limits on public knowledge and privileges Diné definitions of what may be spoken or represented."
    ],
    history: {
      title: "Historical Development",
      content: ["The Diné walk in hózhó - beauty, balance, harmony. Ceremonies like the Blessingway restore this balance; sandpaintings and songs heal illness understood as disharmony, not germs.\", sacredTexts: [ { name: \"(Oral - ceremonial songs & sandpaintings)\", description: \"D"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Sin: Disharmony (hóchxó) requiring restoration",
      "Deity: Holy People (Diyin Diné'é)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - ceremonial songs & sandpaintings): Diné healing and blessing ceremonies rely on precisely memorized songs and sandpainting designs that must be executed without error. Each ceremony - such as the Blessingway or Enemy Way - has its own narrative cycle tied to the Holy People who taught these rites. Knowledge is held by medicine men and women and passed through apprenticeship, not published texts."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Sandpainting healing, Sweat lodge, Blessingway ceremony."],
    },
    sources: [
      { label: "Britannica - Navajo", href: "https://www.britannica.com/topic/Navajo-people" },
      { label: "Smithsonian - Navajo Culture", href: "https://www.smithsonianmag.com/smithsonian-institution/navajo-180949088/" },
      { label: "National Park Service - Diné History", href: "https://www.nps.gov/articles/dine-history-and-culture.htm" },
    ],
  },
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
  "rastafari": {
    overview: [
      "Rastafari emerged in 1930s Jamaica among marginalized Afro-Jamaican communities as a spiritual and political response to British colonial rule, drawing heavily on the Ethiopianist current in Black religious thought and Marcus Garvey's Pan-African 'Back-to-Africa' movement. Early preachers, most notably Leonard Howell, proclaimed that the November 1930 coronation of Ras Tafari Makonnen as Emperor Haile Selassie I of Ethiopia fulfilled biblical prophecy, identifying the new emperor as a divine figure - for many adherents, the Second Coming of Christ in African form. The movement built its own reading of the Bible around this event, treating Western colonial society as 'Babylon' and Ethiopia, or Africa more broadly, as 'Zion,' the promised land of return.",
      "Central to Rastafari life is the 'grounding' or 'reasoning' - informal communal gatherings for theological discussion - alongside larger Nyabinghi Assemblies marked by drumming, chanting, and dance on dates significant to Ethiopian and Selassie-related history. Adherents commonly follow Ital dietary principles emphasizing natural, minimally processed food, wear their hair in uncut dreadlocks as a mark of covenant and African identity, and regard cannabis ('ganja') as a sacrament supporting meditation and spiritual insight rather than recreational use. Rastafari has no central church hierarchy or canonical creed; belief and practice vary considerably across 'mansions' or branches such as the Nyabinghi Order, Bobo Ashanti, and the Twelve Tribes of Israel.",
      "Haile Selassie's death in 1975 posed a theological challenge that the movement absorbed in varied ways, with some adherents reaffirming his spiritual divinity regardless of physical death and others reinterpreting his role more symbolically. From its Jamaican origins, Rastafari gained enormous international visibility through reggae music in the 1960s and 70s, particularly the work of Bob Marley, though scholars caution that musical popularity does not equate to religious adherence. Estimates place the global Rastafari community at roughly 700,000 to one million people, concentrated in Jamaica and the wider Caribbean diaspora but present worldwide."
    ],
    history: {
      title: "Historical Development",
      content: ["A religious and political movement that emerged in 1930s Jamaica following the coronation of Ethiopian Emperor Haile Selassie I, whom followers regard as a divine figure and the fulfillment of biblical prophecy. Rastafari combines a reinterpretation of the Bible, resistance to colonial 'Babylon' sys"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Haile Selassie I as divine, Jah manifest",
      "Liberation: Repatriation from 'Babylon' to Zion (Africa)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["The Bible (Rastafari reading): Rastafari does not produce a separate scripture but reinterprets the Christian Bible - particularly the Book of Revelation and Psalms - through an Afrocentric lens identifying Ethiopia as Zion and Haile Selassie as a messianic figure. The Kebra Nagast, an Ethiopian text on Solomon and Sheba, is also widely revered."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Reasoning (communal discussion), Nyabinghi drumming & chanting, Ital diet, Ganja as sacrament."],
    },
    sources: [
      { label: "Britannica - Rastafari", href: "https://www.britannica.com/topic/Rastafarianism" },
      { label: "BBC Religion - Rastafari", href: "https://www.bbc.co.uk/religion/religions/rastafari/" },
      { label: "Encyclopedia.com - Rastafarianism", href: "https://www.encyclopedia.com/environment/encyclopedias-almanacs-transcripts-and-maps/rastafarianism" },
    ],
  },
  "samaritan": {
    overview: [
      "Samaritans are an ethno-religious community descended from the ancient Israelites of the northern Kingdom of Israel, centering their worship on Mount Gerizim rather than Jerusalem. Their own tradition claims unbroken descent from the tribes of Ephraim and Manasseh; Jewish sources instead trace their distinct identity to population changes following the Assyrian conquest of the eighth century BCE. Modern scholarship suggests neither a wholesale population replacement nor a simple continuity, but a gradual crystallization of separate Samaritan identity during the Persian and Hellenistic periods, as the northern Israelite community developed its own priesthood, calendar, and holy site independent of Jerusalem.",
      "The decisive rupture with Judaism deepened over centuries and turned violent around 110 BCE, when the Hasmonean ruler John Hyrcanus destroyed the Samaritan temple atop Mount Gerizim. Samaritans accept only the Torah - in their own textual recension, the Samaritan Pentateuch, written in Paleo-Hebrew script and differing from the Jewish Masoretic text in thousands of details, most consequentially in identifying Gerizim as God's chosen sanctuary - and reject the later Prophets, Writings, and rabbinic tradition entirely. A hereditary high priesthood, currently numbering its leader as the 133rd since Aaron, oversees practices including strict Sabbath and dietary law and an annual Passover animal sacrifice performed on the mountain itself.",
      "Centuries of pressure under successive empires reduced the community to the brink of disappearance: today roughly 900 Samaritans survive, split almost evenly between Kiryat Luza on Mount Gerizim in the West Bank and the city of Holon in Israel, making them one of the smallest continuously practicing religious communities in the world. Straddling the Israeli-Palestinian divide, Samaritans hold both Israeli and Palestinian citizenship in many cases and maintain relations with both communities. Scholars regard the Samaritans as a living witness to a form of Israelite religion that diverged from - rather than descended from - the Judaism that produced the Hebrew Bible's later books."
    ],
    history: {
      title: "Historical Development",
      content: ["A monotheistic tradition tracing itself to the ancient Israelites of the northern kingdom, centered on Mount Gerizim rather than Jerusalem as the chosen holy site. Long estranged from mainstream Judaism, the Samaritan community today numbers under a thousand, split between Kiryat Luza on Mount Geriz"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Monotheism: One God, worshipped at Mount Gerizim",
      "Scripture: Torah alone, in its Samaritan textual form"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["Samaritan Pentateuch: The Samaritan community's version of the Torah, written in the ancient Hebrew (Paleo-Hebrew) script and differing from the Jewish Masoretic text in thousands of details - most significantly in naming Mount Gerizim, not Jerusalem, as God's chosen sanctuary. It is the sole scriptural canon of Samaritanism, without the later Prophets or Writings accepted in Judaism."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Passover sacrifice on Mount Gerizim, Sabbath observance, Priestly (Cohen) lineage."],
    },
    sources: [
      { label: "Britannica - Samaritan", href: "https://www.britannica.com/topic/Samaritan" },
      { label: "Jewish Virtual Library - The Samaritans", href: "https://www.jewishvirtuallibrary.org/the-samaritans" },
      { label: "Bible Odyssey (Society of Biblical Literature) - Samaritans", href: "https://www.bibleodyssey.org/people/related-articles/samaritans" },
    ],
  },
  "santeria": {
    overview: [
      "Santería is an Afro-Caribbean religious tradition that developed among Yoruba-speaking enslaved people and their descendants in colonial Cuba. It centers on devotion to the orishas, divine forces linked to nature, human character, and daily life, under the distant creator Olodumare. Practitioners honor orishas through drumming ceremonies called bembe, divination, offerings, and initiation into priesthoods. Catholic saints were historically paired with orishas in a process of syncretism, though communities differ today in how explicitly they maintain or reinterpret that pairing.",
      "Beliefs and practices vary among Cuban, Puerto Rican, Dominican, and diaspora communities in the United States and elsewhere. Some lineages emphasize strict adherence to Yoruba-derived ritual forms, while others adapt to local cultures and legal contexts governing animal sacrifice and public ceremony. Orisha devotion is integrated with ancestor veneration, ethical guidance from divination, and obligations to one's religious house. Scholars classify Santería as part of a wider complex of African diaspora religions alongside Candomblé and Vodou, each rooted in distinct historical conditions rather than identical doctrine.",
      "Academic study treats Santería as a living tradition in which theology is transmitted orally, through ritual performance, and through priestly apprenticeship. Initiates maintain altars, receive the orishas through consecrated vessels, and consult Ifá or diloggún divination to navigate illness, relationships, and misfortune. Contemporary practitioners also navigate stereotypes rooted in colonial and missionary prejudice. Legal recognition has grown in some countries, yet practitioners still confront discrimination. Respectful scholarship recognizes Santería as a coherent religious system with its own moral logic, not a folkloric adjunct to Catholicism, while acknowledging genuine diversity of practice across houses and regions."
    ],
    history: {
      title: "Historical Development",
      content: ["Born in colonial Cuba, Santería blends West African Yoruba religion with Catholicism. Orishas (deities) are honored through drumming, dance, divination, and syncretized with Catholic saints.\", sacredTexts: [ { name: \"(Oral - Ifá divination corpus)\", description: \""],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Olodumare above; orishas as emanations",
      "Afterlife: Ancestors reborn or with the orishas"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - Ifá divination corpus): Santería preserves its deepest teachings through the Ifá divination system, an oral corpus of 256 odu (signs) memorized by babalawos and Santería priests. Each odu carries myths, proverbs, and prescriptions for offerings to the orishas. The tradition was carried from West Africa to Cuba under slavery and passed down through initiation lineages rather than written books."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Bembé drumming, Divination (Ifá/Diloggún), Animal offering, Altars (soperas)."],
    },
    sources: [
      { label: "Britannica - Santería", href: "https://www.britannica.com/topic/Santera" },
      { label: "Smithsonian - African Diaspora Religions", href: "https://www.smithsonianmag.com/history/the-african-diaspora-religions-180976441/" },
      { label: "UNESCO - Intangible Cultural Heritage", href: "https://ich.unesco.org/en/home" },
    ],
  },
  "shinto": {
    overview: [
      "Shinto, literally the way of the kami, is Japan's indigenous religious tradition centered on kami, spirits or sacred presences associated with natural features, ancestors, and notable historical figures. Early myths recorded in the Kojiki and Nihon Shoki describe the origin of the archipelago and the descent of imperial lineage from Amaterasu, the sun goddess and chief kami. Shinto emphasizes purity (harae), gratitude, seasonal celebration, and respect for place rather than systematic theology, founder doctrine, or fixed scripture in the manner of many world religions. Kami are not omnipotent gods but localized powers to be approached with reverence, often through offerings of rice, sake, and symbolic objects. Pollution (kegare), understood as contact with death or disorder, is removed through ritual cleansing rather than moral guilt in a Western theological sense.",
      "Shrines (jinja), marked by torii gates, serve as sites for offerings, prayer, and community festivals (matsuri). Priests (kannushi) perform purifications and rites; worshipers often clap and bow to honor kami. Since the introduction of Buddhism in the sixth century, Shinto has coexisted with and sometimes merged into syncretic forms (shinbutsu-shugo), though the Meiji-era policy of shinbutsu bunri formally separated institutions. State Shinto of the early twentieth century politicized shrine worship, a chapter scholars treat with critical attention when discussing religion and nationalism. Contemporary Shinto ranges from household god-shelves (kamidana) to national shrine complexes, remaining integral to Japanese life-cycle ceremonies, agriculture, and cultural identity while adapting to modern civic life. Scholars note that Shinto's diffuse character resists narrow doctrinal definition yet remains central to Japanese senses of belonging and landscape."
    ],
    history: {
      title: "Historical Development",
      content: ["Shinto venerates the kami - spirits of nature, ancestors, and places. It emphasizes purity, ritual, and harmony with the land. Shrines, torii gates, and seasonal matsuri anchor Japanese spiritual life alongside Buddhism.\", sacredTexts: [ { name: \"Kojiki\", description:"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Myriad kami inhabiting nature",
      "Sin: Pollution (kegare), cleansed by ritual",
      "Afterlife: Ancestral spirit realm"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Kojiki: Japan's oldest chronicle, compiled in 712 CE, recording myths of the kami from creation through the age of the emperors. It tells of Izanagi and Izanami creating the islands, Amaterasu hiding in a cave, and the divine descent of Japan's imperial line. Written in a mix of Chinese characters and phonetic Japanese, it anchors Shinto ritual and national identity.",
      "Nihon Shoki: The 'Chronicles of Japan,' completed in 720 CE as a more formal, Chinese-style history parallel to the Kojiki. It includes alternate versions of creation myths and extensive genealogies of gods and emperors. Together with the Kojiki, it provides the mythological framework for shrine worship and imperial ceremony."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Purification (harae), Shrine offerings, Matsuri festivals, Ancestor rites."],
    },
    sources: [
      { label: "Encyclopaedia Britannica - Shinto", href: "https://www.britannica.com/topic/Shinto" },
      { label: "Asian Art Museum - Introduction to Shinto", href: "https://education.asianart.org/resources/introduction-to-shinto/" },
      { label: "World History Encyclopedia - Shinto", href: "https://www.worldhistory.org/Shinto/" },
    ],
  },
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
  "taoism": {
    overview: [
      "Taoism, also called Daoism, took shape in China during the Warring States period and is closely linked to the Daodejing, traditionally attributed to Laozi, and the Zhuangzi. Its central concept is the Dao, the ineffable Way that generates, sustains, and returns all things. Classical Taoist thought counsels alignment with natural patterns, wu wei (non-coercive action), simplicity, and humility rather than rigid striving or artificial social contrivance. Philosophical Taoism offers a reflective critique of conventional morality and political ambition, inviting practitioners to recognize the spontaneous order already present in the cosmos and to value emptiness, flexibility, and the relativity of human distinctions. The Zhuangzi in particular celebrates transformation, playfulness, and freedom from fixed categories of right and wrong.",
      "From the Han dynasty onward, religious Taoism developed into organized priesthoods, temples, liturgy, and communal festivals across China. It incorporated cosmology, divination, alchemy, and practices aimed at health, exorcism, and longevity, drawing on a vast pantheon that includes the Three Pure Ones, local deities, and immortals (xian). Taoist meditation, qigong, talismanic arts, and internal alchemy persist in East Asia and the global diaspora today. Scholars often distinguish philosophical from religious Taoism, though historically the boundary is porous: many communities treat Laozi's teachings and ritual practice as complementary paths toward harmony with the Dao. The Daozang, a massive canon compiled over centuries, preserves ritual manuals, histories, and commentaries that document this diverse tradition. Today Taoist ideas also influence medicine, martial arts, and environmental ethics beyond formal religious affiliation, reflecting the tradition's enduring cultural reach."
    ],
    history: {
      title: "Historical Development",
      content: ["Taoism teaches harmony with the Tao, the ineffable source and flow of all things. Laozi's Tao Te Ching counsels wu-wei (effortless action) and naturalness. Religious Taoism added a vast pantheon, alchemy, and longevity practices.\", sacredTexts: [ { name: \"Tao Te Ching\", des"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Liberation: Wu-wei - effortless alignment with the Tao",
      "Deity: The Tao, and a pantheon of immortals",
      "Afterlife: Becoming a xian (immortal)"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Tao Te Ching: A brief classic of 81 chapters traditionally attributed to Laozi, though likely compiled by multiple authors over time. It teaches the Tao - the nameless source of all things - and counsels wu-wei, acting in harmony with nature rather than forcing outcomes. Its paradoxical verses have been translated more often than almost any book except the Bible.",
      "Zhuangzi: Named for the philosopher Zhuang Zhou (fourth century BCE), this text uses fables, humor, and paradox to celebrate spontaneity and freedom from rigid categories. Its famous butterfly dream passage questions the boundary between self and world. It complements the Tao Te Ching as the second pillar of philosophical Taoism.",
      "Daozang: The vast Taoist canon, comprising over 1,400 texts collected over centuries and formally compiled in the Ming dynasty. It includes alchemical manuals, ritual liturgies, commentaries, and biographies of immortals. Religious Taoism draws on the Daozang for temple practice, meditation, and the quest for longevity."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Qigong, Tai chi, Meditation, Alchemical arts."],
    },
    sources: [
      { label: "Stanford Encyclopedia of Philosophy - Daoism", href: "https://plato.stanford.edu/entries/daoism/" },
      { label: "Encyclopaedia Britannica - Taoism", href: "https://www.britannica.com/topic/Taoism" },
      { label: "Columbia University - Taoism in China", href: "https://afe.easia.columbia.edu/special/china_general_taoism.htm" },
    ],
  },
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
  "vodou": {
    overview: [
      "Haitian Vodou is a religion forged in colonial Saint-Domingue through the encounter of West and Central African traditions, Indigenous knowledge, and Catholic colonial culture. Practitioners honor Bondye, a distant supreme creator understood as beyond direct human petition, and serve the lwa, spirits associated with natural forces, historical figures, and human archetypes. Ceremonies feature drumming, song, dance, offerings, and spirit possession in which a lwa may temporarily manifest through a devotee to counsel and heal the community. Ancestors remain present in daily moral life and ritual obligation.",
      "Vodou is not a single uniform church but a family of lineages, temples, and regional styles across Haiti and its diaspora. Rites, pantheon emphasis, and language of prayer differ among communities in Port-au-Prince, the Artibonite, rural provinces, and Haitian communities abroad. Initiation grades, priestly roles such as houngan and mambo, and the keeping of peristyle altars structure religious authority. Misrepresentation in colonial propaganda, sensational media, and foreign misunderstanding has long obscured Vodou's status as a coherent ethical and communal system with its own theology of the soul, misfortune, and restoration.",
      "Academic and Haitian scholars alike stress that Vodou sustained resistance, memory, and social cohesion through slavery, independence, dictatorship, and disaster. Healing, divination, and moral instruction are integrated rather than separated from worship. The 2003 recognition of Vodou as an official religion in Haiti affirmed its public standing, though prejudice persists abroad. Contemporary Vodou navigates poverty, migration, evangelical opposition, and tourism, yet remains vital in Haitian public and private life. Responsible description recognizes diversity among practitioners and rejects stereotypes that reduce Vodou to magic or superstition rather than religion."
    ],
    history: {
      title: "Historical Development",
      content: ["Forged in colonial Haiti from West African, Kongo, and Catholic roots, Vodou honors a distant creator (Bondye) reached through the lwa - spirits of nature, ancestors, and human archetypes served in drumming ceremonies.\", sacredTexts: [ { name: \"(Oral tradition)\", descriptio"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Bondye above; the lwa as intermediaries",
      "Soul: Two souls - gros-bon-ange and ti-bon-ange"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral tradition): Haitian Vodou has no single written scripture; its theology is transmitted through songs, prayers, and ritual knowledge passed from houngan and mambo to initiates. Creation stories of Bondye and the lwa, along with hundreds of ritual songs, are learned by heart across generations. This oral corpus was forged in slavery, blending Yoruba, Kongo, and Catholic elements into a living tradition."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Drumming ceremonies, Altar service, Possession trance, Ancestor veneration."],
    },
    sources: [
      { label: "Britannica - Vodou", href: "https://www.britannica.com/topic/Vodou" },
      { label: "Smithsonian - Vodou", href: "https://www.smithsonianmag.com/arts-culture/vodou-142965516/" },
      { label: "BBC Religion - Vodou", href: "https://www.bbc.co.uk/religion/religions/vodou/" },
    ],
  },
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
  "yazidi": {
    overview: [
      "Yazidism is a monotheistic tradition of the Kurdish-speaking peoples of northern Iraq, Syria, Turkey, and the diaspora. Its origins are debated: some scholars see roots in pre-Islamic Mesopotamian and Iranian religion, while Yazidis themselves trace a line of divine revelation through a series of peacock angels. The central figure is Melek Taus (Tawusi Malak), the Peacock Angel, whom Yazidis venerate as God's chief emissary. Lalish, a valley shrine in Iraqi Kurdistan, is the faith's holiest site and the destination of an annual six-day pilgrimage.",
      "Yazidi cosmology describes God creating the world and entrusting it to seven angels, among whom Melek Taus holds primacy. Oral and written traditions, including the Meshaf Resh (Black Book) and Kitêba Cilwe (Book of Revelation), preserve hymns, myths, and laws, though their historical antiquity is contested by scholars. Social organization divides members into castes of sheikhs, pirs, and murids, with strict endogamy and rules governing purity, diet, and baptism (mor kirin). Yazidism is non-proselytizing; one must be born into the community.",
      "Yazidis have endured persecution for centuries, often misidentified by outsiders as devil worshipers because of misunderstandings about Melek Taus. The 2014 genocide by the Islamic State group displaced and killed thousands, accelerating emigration and international advocacy for Yazidi rights. Qewals, hereditary bards, transmit sacred hymns (qewls) that sustain communal memory where written records are scarce. Researchers study Yazidism as a distinct Kurdish religious heritage that blends ancient Near Eastern motifs with elements shaped by contact with Islam and Christianity, while remaining a living minority tradition under pressure."
    ],
    history: {
      title: "Historical Development",
      content: ["An ancient Kurdish monotheism centered on Melek Taus, the Peacock Angel. Yazidis blend Persian, Mesopotamian, and Abrahamic elements with strict endogamy and a caste of sheikhs and pirs.\", sacredTexts: [ { name: \"Meshaf Resh\", description: \"The 'Black Book,' the p"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Xwedê, served by seven angels incl. Melek Taus",
      "Sin: Marriage outside caste; certain foods"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Meshaf Resh: The 'Black Book,' the primary written scripture of Yazidism, kept at the Lalish sanctuary in Iraqi Kurdistan. It recounts the creation of the world by Xwedê and the role of Melek Taus, the Peacock Angel, as God's chief emissary. Access is restricted to Yazidi clergy, and the text is never read aloud in public.",
      "Kitêba Cilwe (traditionally oral): The 'Book of Revelation' or 'Book of Illumination,' containing hymns and prayers traditionally transmitted orally among Yazidi sheikhs and pirs. It praises the seven angels and the Peacock Angel's role in creation and redemption. Like much Yazidi scripture, it blends written and oral transmission within a closed community."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Annual Lalish pilgrimage, Baptism (mor kirin), Caste traditions."],
    },
    sources: [
      { label: "Britannica: Yazīdī", href: "https://www.britannica.com/topic/Yazidi" },
      { label: "BBC Religion: Yazidi", href: "https://www.bbc.co.uk/religion/religions/yazidi/" },
      { label: "United Nations: Yazidi Documentation", href: "https://www.un.org/en/genocideprevention/documents/public-awareness-and-education-tools/About-Yezidis-in-Iraq.pdf" },
      { label: "Encyclopaedia Iranica: Yazidis", href: "https://www.iranicaonline.org/articles/yazidis" },
    ],
  },
  "yoruba": {
    overview: [
      "Yoruba religion is the indigenous spiritual tradition of the Yoruba-speaking peoples of southwestern Nigeria, Benin, and Togo, with ancient roots in West African city-states such as Ife and Oyo. Its cosmology places Olodumare, the supreme creator, above a vast pantheon of orishas who govern rivers, iron, wisdom, thunder, and other domains of existence. Priests, diviners, and devotees maintain shrines, perform festivals, and offer sacrifices to sustain reciprocal relationships between humans, ancestors, and divine powers. The religion is primarily oral, encoded in myth, praise poetry, ritual gesture, and the Ifá divination corpus.",
      "Regional and lineage variation is substantial. Orisha prominence differs among Yoruba subgroups, and practices in Nigeria are not identical to those preserved in Brazil, Cuba, Trinidad, or other diaspora settings seeded by the transatlantic slave trade. Ancestor veneration through egungun masquerades, lineage rites, and memorial observances remains central across many communities. Ethical life is often understood through concepts such as good character (iwa pele) and alignment with one's chosen destiny, themes developed in Ifá literature and community teaching rather than a single written creed.",
      "Colonialism, Christian mission, and modern nation-states reshaped but did not erase Yoruba religious life. Today millions of Yoruba people identify as Muslim or Christian while also maintaining orisha devotion, and others practice Yoruba religion as their primary faith. Urban migration and new media have created fresh forums for debate about authenticity, gender roles, and adaptation. Scholars emphasize that Yoruba spirituality is a living, plural field of traditions rather than a fixed ancient system frozen in time. Respectful study attends to local authority, ritual secrecy, and the distinction between insider knowledge and outside academic description."
    ],
    history: {
      title: "Historical Development",
      content: ["The indigenous religion of the Yoruba people of Nigeria, centered on Olodumare (the supreme creator) and the orishas - deities governing forces of nature and human affairs. It seeded Santería, Candomblé, and other diaspora faiths.\", sacredTexts: [ { name: \"(Oral - Ifá corpus, Odu I"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Deity: Olodumare and hundreds of orishas",
      "Afterlife: Ancestors (egun) guide the living"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: ["(Oral - Ifá corpus, Odu Ifá): Yoruba religion's wisdom literature lives in the Ifá corpus - 256 odu, each with hundreds of associated verses, stories, and rituals. Babalawos spend decades memorizing this material and consult it through divination with palm nuts or a divining chain. It governs everything from naming ceremonies to moral guidance and offerings to the orishas."],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Ifá divination, Orisha festivals, Ebo (offerings), Egungun masquerade."],
    },
    sources: [
      { label: "Britannica - Yoruba religion", href: "https://www.britannica.com/topic/Yoruba-religion" },
      { label: "BBC Religion - Yoruba", href: "https://www.bbc.co.uk/religion/religions/yoruba/" },
      { label: "Smithsonian - Yoruba Art and Culture", href: "https://africa.si.edu/exhibitions/current-exhibitions/yoruba/" },
    ],
  },
  "zoroastrian": {
    overview: [
      "Zoroastrianism is among the world's oldest continuously practiced religions, rooted in the teachings attributed to the prophet Zarathustra (Zoroaster), traditionally placed in ancient eastern Iran. Its central figure is Ahura Mazda, the Wise Lord, source of truth (asha) and goodness. The religion describes a cosmic struggle between order and the destructive spirit Angra Mainyu (Ahriman). Humans participate in this struggle through moral choice, prayer, and righteous action. The oldest portions of the Avesta, especially the Gathas, are attributed to Zarathustra himself and form the doctrinal core of the tradition.",
      "Zoroastrian theology emphasizes individual judgment: after death the soul crosses the Chinvat Bridge, proceeding to heaven or hell according to its deeds. A final renovation (frashokereti) and the coming of a savior (Saoshyant) are expected to restore creation. Fire, symbolizing divine light and purity, is central to temple worship, though Zoroastrians do not worship fire itself. Purity codes, charity, and the sacred girdle (kusti) mark daily religious life, while the twin principles of good thoughts, good words, and good deeds guide ethical conduct among lay and priestly communities alike.",
      "From the Achaemenid through Sasanian empires, Zoroastrianism shaped Iranian culture and influenced Judaism, Christianity, and Islam through concepts of monotheism, angelology, judgment, and eschatology. After the Arab conquest of Persia, communities persisted in Iran and India (Parsis), where fire temples and seasonal festivals such as Nowruz continued. Today small but active populations remain, particularly in India and Iran, maintaining ancient rituals while adapting to modern circumstances, diaspora life, and concerns about community continuity."
    ],
    history: {
      title: "Historical Development",
      content: ["Founded by Zarathustra, Zoroastrianism posits Ahura Mazda, the Wise Lord, locked in cosmic struggle with Angra Mainyu. It introduced influential ideas: a single good creator, judgment of every soul, heaven and hell, and a final savior (Saoshyant). It profoundly shaped Judaism, Christianity, and Isla"],
    },
    worldview: {
      title: "Core Beliefs",
      content: [
      "Afterlife: Chinvat Bridge to heaven or hell",
      "Sin: Choosing the lie (druj) over truth (asha)",
      "Monotheism: Ahura Mazda, uncreated Wise Lord"
    ],
    },
    texts: {
      title: "Sacred Texts",
      content: [
      "Avesta: The primary collection of Zoroastrian scripture, transmitted orally for centuries before being written in Middle Persian. Only about one quarter of the original corpus survives today. It contains hymns, liturgies, and laws attributed to the prophet Zarathustra and his followers.",
      "Gathas: Seventeen hymns composed in Old Avestan, widely regarded as the words of Zarathustra himself. They praise Ahura Mazda and call humanity to choose asha (truth) over druj (the lie). The Gathas are the theological heart of the faith and are recited in every major Zoroastrian ceremony.",
      "Vendidad: A legal and ritual text focused on purity, the battle against evil, and proper conduct toward fire, water, earth, and plants. It preserves myths of creation and the origin of death and disease. Priests consult it for rules governing daily life and ritual cleanliness."
    ],
    },
    practice: {
      title: "Practices",
      content: ["Key practices include Fire temples, Sacred thread (kusti), Purity rituals, Charity."],
    },
    places: {
      title: "Sacred Places",
      content: ["Important sites: persepolis."],
    },
    sources: [
      { label: "Stanford Encyclopedia - Zoroastrianism", href: "https://plato.stanford.edu/entries/zoroastrian/" },
      { label: "Britannica - Zoroastrianism", href: "https://www.britannica.com/topic/Zoroastrianism" },
      { label: "BBC Religion - Zoroastrianism", href: "https://www.bbc.co.uk/religion/religions/zoroastrian/" },
    ],
  },
};