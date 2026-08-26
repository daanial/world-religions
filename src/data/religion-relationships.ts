// Editorial relationship graph for all 44 traditions
// Each relationship explains WHY traditions are connected, with confidence levels

export type RelationshipKind =
  | "Historical descent"
  | "Mutual influence"
  | "Shared geography"
  | "Ritual/textual connections"
  | "Useful contrasts";

export type Confidence = "high" | "medium" | "low";

export interface ReligionRelationship {
  from: string; // religion ID
  to: string; // religion ID
  kind: RelationshipKind;
  why: string; // 1-2 sentence scholarly explanation
  confidence: Confidence;
  bidirectional?: boolean; // if true, the relationship is mutual; otherwise it's directed
}

export const RELIGION_RELATIONSHIPS: ReligionRelationship[] = [
  // ========== Ancient / Extinct ==========
  
  // Sumerian
  {
    from: "sumerian",
    to: "egyptian",
    kind: "Shared geography",
    why: "Both Bronze Age civilizations developed temple-based polytheism with patron deities and elaborate afterlife cosmologies. Trade and diplomatic contact connected Mesopotamia and Egypt.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "sumerian",
    to: "canaanite",
    kind: "Mutual influence",
    why: "Canaanite religion inherited Mesopotamian cosmic imagery, including flood myths and council-of-gods motifs. Both cultures shared cuneiform-influenced writing and ritual traditions.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "sumerian",
    to: "zoroastrian",
    kind: "Mutual influence",
    why: "Zoroastrianism emerged in dialogue with Mesopotamian dualism and cosmic battle themes. Early Persian empires absorbed and transformed Sumerian-Babylonian religious concepts.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "sumerian",
    to: "judaism",
    kind: "Ritual/textual connections",
    why: "Genesis flood narrative and creation motifs echo Gilgamesh and Enuma Elish. Israelite exiles in Babylon engaged deeply with Mesopotamian theological themes.",
    confidence: "high",
  },
  {
    from: "sumerian",
    to: "greek-roman",
    kind: "Useful contrasts",
    why: "Both polytheistic temple systems, but Sumerian gods were tied to city-states and cosmic order (me), while Greek gods were more anthropomorphic and capricious.",
    confidence: "high",
    bidirectional: true,
  },

  // Egyptian
  {
    from: "egyptian",
    to: "greek-roman",
    kind: "Mutual influence",
    why: "Hellenistic Egypt blended Isis worship into Greco-Roman mystery cults. Egyptian funerary practices and afterlife judgment influenced Orphic and Pythagorean thought.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "egyptian",
    to: "christianity",
    kind: "Ritual/textual connections",
    why: "Early Christian monasticism took root in Egypt's desert. Coptic Christianity inherited and transformed Egyptian iconography and pilgrimage traditions.",
    confidence: "high",
  },
  {
    from: "egyptian",
    to: "gnosticism",
    kind: "Mutual influence",
    why: "Gnostic texts from Nag Hammadi (Egypt) adapted Egyptian cosmological dualism and ritual secrecy. Hermetic writings blended Egyptian and Greek esoteric traditions.",
    confidence: "high",
  },
  {
    from: "egyptian",
    to: "judaism",
    kind: "Useful contrasts",
    why: "Hebrew exodus narrative defines Israelite identity against Egyptian polytheism and divine kingship. Prophetic monotheism emerged partly in opposition to Egyptian ritual.",
    confidence: "high",
  },

  // Zoroastrian
  {
    from: "zoroastrian",
    to: "judaism",
    kind: "Mutual influence",
    why: "Babylonian exile brought Jewish elites under Persian Zoroastrian rule. Concepts of apocalypse, resurrection, and cosmic dualism entered Judaism during this period.",
    confidence: "high",
  },
  {
    from: "zoroastrian",
    to: "christianity",
    kind: "Mutual influence",
    why: "Christian eschatology, heaven and hell, and Satan as cosmic adversary bear Zoroastrian influence. Magi visiting Jesus reflect Persian priestly recognition.",
    confidence: "medium",
  },
  {
    from: "zoroastrian",
    to: "islam",
    kind: "Shared geography",
    why: "Islam emerged in regions formerly under Sassanian Persian (Zoroastrian) rule. Quranic angelology and final judgment echo Zoroastrian themes.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "zoroastrian",
    to: "manichaean",
    kind: "Historical descent",
    why: "Mani was raised in a Zoroastrian context and adapted its dualism radically. Manichaeism presented itself as fulfilling Zoroaster's revelation.",
    confidence: "high",
  },
  {
    from: "zoroastrian",
    to: "yazidi",
    kind: "Mutual influence",
    why: "Yazidism preserves pre-Islamic Kurdish and Iranian religious elements, including angelic hierarchies and cosmic battle motifs reminiscent of Zoroastrianism.",
    confidence: "medium",
  },

  // Canaanite
  {
    from: "canaanite",
    to: "judaism",
    kind: "Historical descent",
    why: "Israelite religion emerged within Canaanite culture, inheriting and transforming El, Asherah, and Baal worship into Yahwistic monotheism.",
    confidence: "high",
  },
  {
    from: "canaanite",
    to: "greek-roman",
    kind: "Ritual/textual connections",
    why: "Phoenician (Canaanite) colonization spread Levantine deities like Melqart and Astarte to Mediterranean colonies, where they merged with Greek pantheons.",
    confidence: "high",
  },

  // Greco-Roman
  {
    from: "greek-roman",
    to: "norse",
    kind: "Useful contrasts",
    why: "Both Indo-European polytheisms with sky-father figures (Zeus/Jupiter vs. Odin), but Roman civic cult contrasts with Norse warrior eschatology and Ragnarök fatalism.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "greek-roman",
    to: "druidic",
    kind: "Mutual influence",
    why: "Roman conquest brought Celtic druids into contact with Hellenistic philosophy. Caesar's ethnography (though biased) records druidic teachings on reincarnation resembling Pythagorean ideas.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "greek-roman",
    to: "stoicism",
    kind: "Historical descent",
    why: "Stoicism emerged directly from Hellenistic Athens as a philosophical reform of Greek cosmology, ethics, and civic religion.",
    confidence: "high",
  },
  {
    from: "greek-roman",
    to: "christianity",
    kind: "Mutual influence",
    why: "Christianity spread through Roman imperial structures and adopted Greek philosophical vocabulary (Logos, hypostasis). Early theology was forged in dialogue with Platonism and Stoicism.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "greek-roman",
    to: "mithraism",
    kind: "Shared geography",
    why: "Mithraic mysteries thrived in Roman military camps alongside state cult. Both operated in the same civic and legal space of the Empire.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "greek-roman",
    to: "gnosticism",
    kind: "Mutual influence",
    why: "Gnostic cosmologies borrowed heavily from Platonic metaphysics (demiurge, emanations) while critiquing material creation.",
    confidence: "high",
  },

  // Norse
  {
    from: "norse",
    to: "slavic-baltic",
    kind: "Shared geography",
    why: "Both northern European Indo-European paganisms with overlapping thunder-god cults (Thor/Perun), sacred groves, and seasonal fire festivals.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "norse",
    to: "druidic",
    kind: "Useful contrasts",
    why: "Both Celtic and Norse paganism emphasized oral transmission and priestly specialists, but Norse eschatology was fatalistic (Ragnarök) while druidic cosmology centered cyclical rebirth.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "norse",
    to: "wicca",
    kind: "Ritual/textual connections",
    why: "Modern Wicca draws heavily on romanticized Norse runes, Eddic lore, and Asatru revival, though with significant 20th-century invention.",
    confidence: "low",
  },

  // Druidic
  {
    from: "druidic",
    to: "wicca",
    kind: "Ritual/textual connections",
    why: "Wicca's seasonal Wheel of the Year (Samhain, Beltane) appropriates Celtic fire festivals, though most druidic doctrine was lost and reconstructed imaginatively.",
    confidence: "low",
  },
  {
    from: "druidic",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Christian missionaries targeted druidic authority structures. Irish monastic Christianity preserved fragments of pre-Christian lore in hagiography and marginalia.",
    confidence: "high",
  },
  {
    from: "druidic",
    to: "slavic-baltic",
    kind: "Shared geography",
    why: "Both preserved Indo-European sacred grove traditions and oral transmission longer than southern Europe, facing similar medieval Christian suppression.",
    confidence: "medium",
    bidirectional: true,
  },

  // Manichaean
  {
    from: "manichaean",
    to: "buddhism",
    kind: "Mutual influence",
    why: "Manichaeism spread along Silk Road trade routes, absorbing and transmitting Buddhist monastic structures, vegetarianism, and cosmological vocabulary.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "manichaean",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Christianity and Manichaeism competed for converts in late antiquity. Augustine famously left Manichaeism for Christianity, critiquing its dualism in his writings.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "manichaean",
    to: "islam",
    kind: "Useful contrasts",
    why: "Islam encountered Manichaean communities in Persia and Central Asia, rejecting their dualism while engaging with their scriptural and missionary models.",
    confidence: "medium",
  },
  {
    from: "manichaean",
    to: "gnosticism",
    kind: "Mutual influence",
    why: "Manichaeism systematized Gnostic dualism into a world religion with canonical scriptures, priesthood, and missionary structure.",
    confidence: "high",
  },

  // Tengrism
  {
    from: "tengrism",
    to: "buddhism",
    kind: "Mutual influence",
    why: "Mongol and Turkic empires brought Tengrist shamanism into sustained contact with Tibetan Buddhism. Many Mongol leaders patronized both traditions.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "tengrism",
    to: "islam",
    kind: "Shared geography",
    why: "Central Asian Turkic peoples gradually converted to Islam while retaining Tengrist shamanic practices, ancestor veneration, and sacred mountain pilgrimage.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "tengrism",
    to: "confucianism",
    kind: "Useful contrasts",
    why: "Nomadic Tengrist sky-worship contrasts with sedentary Confucian ancestor cult and agricultural ritual, representing steppe vs. agrarian Chinese religious worlds.",
    confidence: "medium",
  },
  {
    from: "tengrism",
    to: "bon",
    kind: "Mutual influence",
    why: "Pre-Buddhist Bön and Tengrist shamanism share Central Asian roots, including sky deity veneration, shamanic trance, and sacred landscape orientation.",
    confidence: "medium",
    bidirectional: true,
  },

  // Mithraism
  {
    from: "mithraism",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Both mystery religions competed for Roman military and urban followers. Mithraism's all-male initiatory grades contrast with Christianity's cross-gender communal meal.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "mithraism",
    to: "zoroastrian",
    kind: "Ritual/textual connections",
    why: "Roman Mithras derives from Iranian Mithra, a Zoroastrian yazata (divine being), though Roman cult developed independently with distinct iconography.",
    confidence: "medium",
  },

  // Gnosticism
  {
    from: "gnosticism",
    to: "christianity",
    kind: "Historical descent",
    why: "Gnostic teachers like Valentinus and Basilides operated within early Christian communities, reinterpreting Jesus as revealer of secret knowledge.",
    confidence: "high",
  },
  {
    from: "gnosticism",
    to: "mandaean",
    kind: "Mutual influence",
    why: "Mandaeism is the only surviving Gnostic tradition, preserving dualism, ritual baptism, and Aramaic scripture reminiscent of other ancient Gnostic movements.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "gnosticism",
    to: "islam",
    kind: "Useful contrasts",
    why: "Islamic theology rejected Gnostic dualism and secret knowledge, affirming one creator and universal revelation through Muhammad.",
    confidence: "medium",
  },

  // Mesoamerican
  {
    from: "mesoamerican",
    to: "inuit",
    kind: "Useful contrasts",
    why: "Both indigenous American cosmologies, but Mesoamerican urban temple ritual and cyclical calendar contrast with Arctic animism and shamanic negotiation with animal spirits.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "mesoamerican",
    to: "navajo",
    kind: "Shared geography",
    why: "Both developed in the Americas with distinct but parallel cosmologies involving sacred directions, cyclical time, and ceremonial healing tied to cosmic balance.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "mesoamerican",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Spanish conquest violently suppressed Mesoamerican temple cult, yet indigenous cosmology persisted in hybrid folk Catholicism.",
    confidence: "high",
  },

  // Slavic-Baltic
  {
    from: "slavic-baltic",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Lithuania was the last pagan state in Europe (converted 1387). Christian chronicles preserved fragments of Baltic and Slavic mythology while condemning it.",
    confidence: "high",
  },
  {
    from: "slavic-baltic",
    to: "tengrism",
    kind: "Useful contrasts",
    why: "Both steppe and forest Indo-European paganisms with thunder gods, but Slavic-Baltic tradition was more agrarian and sedentary than Tengrist nomadic shamanism.",
    confidence: "medium",
  },

  // ========== Living: Indian ==========

  // Hinduism
  {
    from: "hinduism",
    to: "buddhism",
    kind: "Historical descent",
    why: "Buddhism emerged as a reform movement within the Vedic-Upanishadic world, retaining karma and rebirth while rejecting caste, sacrifice, and atman.",
    confidence: "high",
  },
  {
    from: "hinduism",
    to: "jainism",
    kind: "Historical descent",
    why: "Jainism arose alongside Buddhism in the 6th century BCE as a sramana (renunciant) challenge to Brahmanical orthodoxy.",
    confidence: "high",
  },
  {
    from: "hinduism",
    to: "sikhism",
    kind: "Historical descent",
    why: "Sikhism synthesized Hindu bhakti devotion with Islamic monotheism in 15th-century Punjab, retaining karma and reincarnation while rejecting caste.",
    confidence: "high",
  },
  {
    from: "hinduism",
    to: "buddhism",
    kind: "Mutual influence",
    why: "Hindu tantra, yoga, and temple ritual absorbed Buddhist philosophical and meditative techniques over centuries of coexistence in South and Southeast Asia.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "hinduism",
    to: "chinese-folk",
    kind: "Ritual/textual connections",
    why: "Hindu-Buddhist syncretism spread via Silk Road and maritime trade, influencing Chinese deity cults and ritual calendars.",
    confidence: "medium",
  },
  {
    from: "hinduism",
    to: "bon",
    kind: "Mutual influence",
    why: "Buddhist transmission from India to Tibet carried Hindu tantric deities, cosmology, and ritual into Bön's later systematization.",
    confidence: "medium",
  },

  // Buddhism
  {
    from: "buddhism",
    to: "taoism",
    kind: "Mutual influence",
    why: "Chan (Zen) Buddhism emerged from dialogue between Mahayana and Daoist naturalism. Both traditions share non-theistic meditation and paradoxical teaching methods.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "buddhism",
    to: "shinto",
    kind: "Shared geography",
    why: "Buddhism entered Japan in the 6th century CE and coexisted syncretically with Shinto for over a millennium, with shared temples and kami-buddha associations.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "buddhism",
    to: "confucianism",
    kind: "Useful contrasts",
    why: "Confucian filial piety and ritual propriety (li) contrasts with Buddhist monastic renunciation and critique of worldly attachment, generating centuries of debate in China.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "buddhism",
    to: "bon",
    kind: "Mutual influence",
    why: "Tibetan Buddhism and Bön influenced each other profoundly after Buddhism's arrival in Tibet. Both traditions now share monastic structures, tantric practices, and debate traditions.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "buddhism",
    to: "stoicism",
    kind: "Useful contrasts",
    why: "Both teach liberation from destructive passions through mindful control of judgment, though Buddhism emphasizes emptiness and Stoicism emphasizes rational order.",
    confidence: "medium",
    bidirectional: true,
  },

  // Jainism
  {
    from: "jainism",
    to: "buddhism",
    kind: "Shared geography",
    why: "Both emerged in the same Gangetic plain sramana milieu, sharing meditation, monasticism, and karma doctrine while differing on violence, soul, and liberation.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "jainism",
    to: "hinduism",
    kind: "Mutual influence",
    why: "Jain emphasis on ahimsa (non-violence) influenced Hindu vegetarianism and temple ritual. Jain philosophers debated with Vedantins and preserved Sanskrit learning.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "jainism",
    to: "sikhism",
    kind: "Shared geography",
    why: "Both traditions emerged in North India with strong non-violence ethics and rejection of caste hierarchy, though Sikhism developed a martial defense tradition.",
    confidence: "medium",
  },

  // Sikhism
  {
    from: "sikhism",
    to: "islam",
    kind: "Mutual influence",
    why: "Sikhism arose in Mughal Punjab, synthesizing Islamic monotheism and egalitarianism with Hindu bhakti. Guru Granth Sahib includes Sufi and Hindu saint poetry.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "sikhism",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Both affirm one personal God and salvation through divine grace, but Sikhism retains karma and reincarnation, while Christianity centers on Christ's unique incarnation.",
    confidence: "medium",
  },

  // ========== Living: Abrahamic ==========

  // Judaism
  {
    from: "judaism",
    to: "christianity",
    kind: "Historical descent",
    why: "Christianity emerged as a Jewish messianic movement proclaiming Jesus as fulfillment of Torah and prophets, later separating into distinct religions.",
    confidence: "high",
  },
  {
    from: "judaism",
    to: "islam",
    kind: "Mutual influence",
    why: "Islam acknowledges Jewish prophets and scripture while asserting Muhammad as final prophet. Medieval Jewish philosophy (Maimonides) engaged deeply with Islamic kalam.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "judaism",
    to: "samaritan",
    kind: "Historical descent",
    why: "Samaritans trace their lineage to the northern Israelite kingdom, preserving a distinct Torah text and temple on Mount Gerizim rather than Jerusalem.",
    confidence: "high",
  },
  {
    from: "judaism",
    to: "mandaean",
    kind: "Shared geography",
    why: "Mandaeism originated in the Jordan Valley or Mesopotamia, contemporaneous with early Judaism. Both use Aramaic and practice ritual immersion.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "judaism",
    to: "rastafari",
    kind: "Ritual/textual connections",
    why: "Rastafari reads the Hebrew Bible through an Afrocentric lens, identifying Ethiopia as Zion and Haile Selassie as a messianic figure in the line of David and Solomon.",
    confidence: "medium",
  },

  // Christianity
  {
    from: "christianity",
    to: "islam",
    kind: "Mutual influence",
    why: "Islam emerged in dialogue with Christian communities, affirming Jesus as prophet and virgin-born while rejecting the Trinity and crucifixion.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "christianity",
    to: "bahai",
    kind: "Ritual/textual connections",
    why: "Bahá'í Faith affirms Jesus as divine manifestation and one stage in progressive revelation, including him among the prophets from Abraham to Bahá'u'lláh.",
    confidence: "high",
  },
  {
    from: "christianity",
    to: "rastafari",
    kind: "Historical descent",
    why: "Rastafari emerged from Ethiopian Orthodox and Jamaican Protestant contexts, reinterpreting the Bible as a narrative of Black liberation and Ethiopian divinity.",
    confidence: "high",
  },
  {
    from: "christianity",
    to: "santeria",
    kind: "Mutual influence",
    why: "Enslaved Yoruba peoples in Cuba syncretized orishas with Catholic saints, creating Santería as a survival strategy under colonial suppression.",
    confidence: "high",
  },
  {
    from: "christianity",
    to: "vodou",
    kind: "Mutual influence",
    why: "Haitian Vodou blends West African lwa with Catholic saints and liturgy, forged in plantation slavery and the Haitian Revolution.",
    confidence: "high",
  },
  {
    from: "christianity",
    to: "candomble",
    kind: "Mutual influence",
    why: "Candomblé in Brazil preserves Yoruba orixá worship under a Catholic veneer, though modern practice increasingly emphasizes African roots over syncretism.",
    confidence: "high",
  },

  // Islam
  {
    from: "islam",
    to: "bahai",
    kind: "Historical descent",
    why: "Bahá'í Faith emerged from 19th-century Shia Islam in Persia, with the Báb and Bahá'u'lláh claiming new revelation completing Islamic prophecy.",
    confidence: "high",
  },
  {
    from: "islam",
    to: "druse",
    kind: "Historical descent",
    why: "Druze faith originated as an 11th-century Ismaili Shia offshoot venerating Caliph al-Hakim, later developing into a closed esoteric tradition.",
    confidence: "high",
  },
  {
    from: "islam",
    to: "yazidi",
    kind: "Shared geography",
    why: "Yazidis live in Kurdish regions historically under Islamic rule. Yazidism preserves pre-Islamic Iranian and Mesopotamian elements while engaging with Sufi vocabulary.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "islam",
    to: "sikhism",
    kind: "Mutual influence",
    why: "Sikhism emerged in Mughal India, synthesizing Sufi devotion and Islamic monotheism with Hindu bhakti. Sikh-Muslim coexistence and conflict shaped Punjabi history.",
    confidence: "high",
    bidirectional: true,
  },

  // Bahá'í
  {
    from: "bahai",
    to: "judaism",
    kind: "Ritual/textual connections",
    why: "Bahá'í Faith recognizes Moses and Jewish prophets as part of progressive revelation, affirming Judaism's role in preparing humanity for later manifestations.",
    confidence: "medium",
  },
  {
    from: "bahai",
    to: "zoroastrian",
    kind: "Ritual/textual connections",
    why: "Bahá'u'lláh acknowledged Zoroaster as a divine manifestation. Bahá'í cosmology includes Zoroastrianism in its schema of progressive revelation.",
    confidence: "medium",
  },
  {
    from: "bahai",
    to: "buddhism",
    kind: "Ritual/textual connections",
    why: "Bahá'í writings affirm Buddha as a manifestation of God for his age, integrating Buddhism into the Faith's universal vision of progressive revelation.",
    confidence: "medium",
  },

  // Mandaean
  {
    from: "mandaean",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Mandaeism venerates John the Baptist as prophet while rejecting Jesus and Muhammad. Both share Aramaic roots but diverge on messianic claims.",
    confidence: "high",
  },

  // Samaritan
  {
    from: "samaritan",
    to: "christianity",
    kind: "Shared geography",
    why: "New Testament's Good Samaritan parable reflects first-century tensions. Samaritans and Jews shared Levantine origins but diverged on temple and scripture.",
    confidence: "high",
  },

  // ========== Living: East Asian ==========

  // Taoism
  {
    from: "taoism",
    to: "confucianism",
    kind: "Useful contrasts",
    why: "Taoist wu-wei (effortless action) and naturalness critiques Confucian ritual propriety (li) and social hierarchy. Both coexisted as complementary Chinese worldviews.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "taoism",
    to: "chinese-folk",
    kind: "Mutual influence",
    why: "Taoist priests perform rituals for Chinese folk religion, blending Daoist cosmology with local deity cults and ancestor veneration.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "taoism",
    to: "shinto",
    kind: "Useful contrasts",
    why: "Both emphasize natural harmony and ritual purity, but Taoism developed philosophical texts and alchemy while Shinto remained more localized and mythic.",
    confidence: "medium",
    bidirectional: true,
  },

  // Confucianism
  {
    from: "confucianism",
    to: "shinto",
    kind: "Mutual influence",
    why: "Confucian texts and ancestor rites entered Japan alongside Buddhism, influencing Shinto's ritual formalization and Neo-Confucian court ideology.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "confucianism",
    to: "chinese-folk",
    kind: "Mutual influence",
    why: "Confucian filial piety and ancestor veneration form the ethical backbone of Chinese folk religious practice. Scholar-official class patronized both.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "confucianism",
    to: "korean-shin",
    kind: "Mutual influence",
    why: "Cheondogyo synthesized Confucian ethics with monotheistic theology, calling for moral reform and social equality in Korean society under Japanese occupation.",
    confidence: "high",
  },

  // Shinto
  {
    from: "shinto",
    to: "chinese-folk",
    kind: "Shared geography",
    why: "Both are diffuse traditions centered on local deities, ancestor spirits, and seasonal festivals, though Shinto is uniquely tied to Japanese imperial mythology.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "shinto",
    to: "maori",
    kind: "Useful contrasts",
    why: "Both are indigenous Polynesian/East Asian religions emphasizing ancestor spirits, sacred landscape, and ritual purity, but with distinct cosmologies.",
    confidence: "low",
    bidirectional: true,
  },

  // Cheondogyo (Korean Shin)
  {
    from: "korean-shin",
    to: "christianity",
    kind: "Mutual influence",
    why: "Cheondogyo absorbed Christian monotheism and egalitarian ethics while asserting Korean religious independence from Western missionary influence.",
    confidence: "medium",
  },
  {
    from: "korean-shin",
    to: "buddhism",
    kind: "Mutual influence",
    why: "Cheondogyo adapted Buddhist meditative practice and cosmological vocabulary into its incantation and prayer system.",
    confidence: "medium",
  },

  // Chinese Folk
  {
    from: "chinese-folk",
    to: "caodai",
    kind: "Ritual/textual connections",
    why: "Cao Đài adapted Chinese spirit-writing séances and ancestor veneration, blending them with French spiritism and Vietnamese national identity.",
    confidence: "high",
  },
  {
    from: "chinese-folk",
    to: "buddhism",
    kind: "Mutual influence",
    why: "Chinese folk religion absorbed Buddhist Bodhisattvas (Guanyin, Dizang) into its pantheon, while Buddhist temples serve folk ritual needs.",
    confidence: "high",
    bidirectional: true,
  },

  // Cao Đài
  {
    from: "caodai",
    to: "buddhism",
    kind: "Ritual/textual connections",
    why: "Cao Đài includes Buddha among its revealed prophets and practices vegetarian fasting and temple worship resembling Buddhist tradition.",
    confidence: "high",
  },
  {
    from: "caodai",
    to: "christianity",
    kind: "Ritual/textual connections",
    why: "Cao Đài incorporates Jesus as a divine messenger and structures its Holy See like a Catholic diocese, reflecting French colonial influence.",
    confidence: "medium",
  },
  {
    from: "caodai",
    to: "taoism",
    kind: "Ritual/textual connections",
    why: "Cao Đài venerates Laozi and practices spirit-writing rituals resembling Taoist mediumship and divination.",
    confidence: "high",
  },

  // Bön
  {
    from: "bon",
    to: "hinduism",
    kind: "Mutual influence",
    why: "Buddhist transmission carried Hindu tantric deities and rituals to Tibet, which Bön absorbed and indigenized alongside indigenous shamanic elements.",
    confidence: "medium",
  },
  {
    from: "bon",
    to: "islam",
    kind: "Shared geography",
    why: "Tibetan regions bordered Central Asian Muslim communities. Bön practitioners occasionally encountered Islamic culture through trade and pilgrimage routes.",
    confidence: "low",
  },

  // ========== Living: Iranian / Modern ==========

  // Yazidi
  {
    from: "yazidi",
    to: "christianity",
    kind: "Shared geography",
    why: "Yazidis coexisted with Syriac Christians in northern Mesopotamia for centuries, sharing Aramaic linguistic heritage and facing similar persecution.",
    confidence: "medium",
  },
  {
    from: "yazidi",
    to: "druse",
    kind: "Useful contrasts",
    why: "Both are closed Middle Eastern minority faiths preserving esoteric doctrines and caste structures, but with different theological origins (Iranian vs. Islamic).",
    confidence: "medium",
    bidirectional: true,
  },

  // Druze
  {
    from: "druse",
    to: "christianity",
    kind: "Shared geography",
    why: "Druze communities in the Levant coexisted with Maronite Christians, forming political alliances and sharing villages while maintaining distinct religious boundaries.",
    confidence: "medium",
  },
  {
    from: "druse",
    to: "gnosticism",
    kind: "Ritual/textual connections",
    why: "Druze cosmology preserves Neoplatonic and Ismaili Gnostic themes: esoteric knowledge, cosmic emanations, and reincarnation of souls.",
    confidence: "medium",
  },

  // ========== Living: Indigenous / African ==========

  // Santería
  {
    from: "santeria",
    to: "yoruba",
    kind: "Historical descent",
    why: "Santería is Cuban Yoruba religion, preserving orisha worship, Ifá divination, and ritual structures brought by enslaved Yoruba people.",
    confidence: "high",
  },
  {
    from: "santeria",
    to: "vodou",
    kind: "Shared geography",
    why: "Both Afro-Caribbean religions preserve West African deity worship under colonial syncretism, though Santería is more Yoruba-focused and Vodou blends Yoruba, Fon, and Kongo.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "santeria",
    to: "candomble",
    kind: "Shared geography",
    why: "Both are African diaspora religions preserving Yoruba orisha/orixá worship in the Americas, with parallel ritual structures and divination systems.",
    confidence: "high",
    bidirectional: true,
  },

  // Yoruba
  {
    from: "yoruba",
    to: "ifa",
    kind: "Historical descent",
    why: "Ifá is Yoruba religion's divination corpus and priesthood, foundational to Yoruba cosmology and diaspora practices.",
    confidence: "high",
  },
  {
    from: "yoruba",
    to: "vodou",
    kind: "Mutual influence",
    why: "Haitian Vodou's lwa include Yoruba orishas (Shango, Ogun) brought by enslaved Yoruba, blended with Fon and Kongo deities.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "yoruba",
    to: "candomble",
    kind: "Historical descent",
    why: "Candomblé is Brazilian Yoruba religion, preserving orisha worship, Yoruba language in liturgy, and Ifá divination in terreiro temples.",
    confidence: "high",
  },

  // Vodou
  {
    from: "vodou",
    to: "candomble",
    kind: "Useful contrasts",
    why: "Both are Afro-diasporic traditions, but Vodou is more French-Creole and politically linked to Haitian independence, while Candomblé is Portuguese-Brazilian with stronger Yoruba linguistic retention.",
    confidence: "medium",
    bidirectional: true,
  },

  // Inuit
  {
    from: "inuit",
    to: "navajo",
    kind: "Shared geography",
    why: "Both are indigenous North American spiritual systems centered on shamanic practice, animal spirits, and taboo systems, though in vastly different ecosystems.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "inuit",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Christian missions suppressed Inuit shamanic traditions in the Arctic. Today many Inuit practice hybrid Christianity retaining elements of traditional cosmology.",
    confidence: "high",
  },

  // Navajo
  {
    from: "navajo",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Christian missions sought to suppress Diné ceremonies. Contemporary Navajo Nation navigates hybrid identities, with some practicing both traditions.",
    confidence: "high",
  },

  // Māori
  {
    from: "maori",
    to: "dreamtime",
    kind: "Shared geography",
    why: "Both are indigenous Oceanic/Polynesian spiritual systems centered on ancestor spirits, oral tradition, and sacred landscapes, though culturally distinct.",
    confidence: "medium",
    bidirectional: true,
  },
  {
    from: "maori",
    to: "christianity",
    kind: "Mutual influence",
    why: "Christian missions in New Zealand transformed Māori society. Today many Māori practice hybrid Christianity incorporating traditional whakapapa and tikanga.",
    confidence: "high",
    bidirectional: true,
  },

  // Aboriginal Dreaming
  {
    from: "dreamtime",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Christian missions disrupted Aboriginal law and ceremony. Contemporary Aboriginal communities revitalize Dreaming traditions while some practice hybrid Christianity.",
    confidence: "high",
  },
  {
    from: "dreamtime",
    to: "hinduism",
    kind: "Useful contrasts",
    why: "Both affirm reincarnation and an eternal, cyclical cosmos, but Aboriginal Dreaming is tied to specific Country and Songlines, while Hindu cosmology is more textualized and caste-hierarchical.",
    confidence: "low",
  },

  // Ifá
  {
    from: "ifa",
    to: "santeria",
    kind: "Ritual/textual connections",
    why: "Santería babalawos practice Ifá divination, preserving Yoruba odu corpus and ritual structures in Cuban diaspora communities.",
    confidence: "high",
  },
  {
    from: "ifa",
    to: "candomble",
    kind: "Ritual/textual connections",
    why: "Candomblé priests consult Ifá divination, maintaining Yoruba odu tradition and babalawo lineages in Brazilian terreiros.",
    confidence: "high",
  },

  // Candomblé
  {
    from: "candomble",
    to: "vodou",
    kind: "Shared geography",
    why: "Both are Afro-diasporic religions in the Americas, preserving West African deity worship through trance possession and drumming ceremonies.",
    confidence: "high",
    bidirectional: true,
  },

  // ========== Living: Philosophical / Modern ==========

  // Stoicism
  {
    from: "stoicism",
    to: "christianity",
    kind: "Mutual influence",
    why: "Stoic vocabulary (Logos, providence) entered Christian theology. Early Church Fathers engaged Stoic ethics while critiquing its pantheism.",
    confidence: "high",
    bidirectional: true,
  },
  {
    from: "stoicism",
    to: "confucianism",
    kind: "Useful contrasts",
    why: "Both emphasize virtue, duty, and mastery of emotions, though Stoicism centers cosmic rationality (Logos) while Confucianism centers social ritual (li).",
    confidence: "medium",
    bidirectional: true,
  },

  // Wicca
  {
    from: "wicca",
    to: "christianity",
    kind: "Useful contrasts",
    why: "Wicca emerged in mid-20th-century Britain as a neo-pagan revival critiquing Christian monotheism and re-imagining pre-Christian European spirituality.",
    confidence: "high",
  },
  {
    from: "wicca",
    to: "greek-roman",
    kind: "Ritual/textual connections",
    why: "Wicca appropriates Greco-Roman goddess worship (Diana, Hecate) and mystery initiation, though with heavy 20th-century reconstruction.",
    confidence: "low",
  },

  // Rastafari
  {
    from: "rastafari",
    to: "christianity",
    kind: "Historical descent",
    why: "Rastafari reinterprets the Christian Bible as a narrative of Black liberation, identifying Haile Selassie as returned Christ and Ethiopia as Zion.",
    confidence: "high",
  },
  {
    from: "rastafari",
    to: "judaism",
    kind: "Ritual/textual connections",
    why: "Rastafari identifies with the Hebrew Bible's exodus narrative, Ethiopian Jewish (Beta Israel) heritage, and Solomonic kingship lineage.",
    confidence: "medium",
  },
];

// Helper function to get all relationships for a given religion ID
export function getRelationshipsFor(religionId: string): ReligionRelationship[] {
  return RELIGION_RELATIONSHIPS.filter(
    (rel) => rel.from === religionId || (rel.bidirectional && rel.to === religionId)
  );
}

// Helper function to get a directional relationship (respecting bidirectional flag)
export function getDirectionalRelationship(
  fromId: string,
  relationship: ReligionRelationship
): { targetId: string; kind: RelationshipKind; why: string; confidence: Confidence } {
  if (relationship.from === fromId) {
    return {
      targetId: relationship.to,
      kind: relationship.kind,
      why: relationship.why,
      confidence: relationship.confidence,
    };
  } else {
    // This is a bidirectional relationship viewed from the 'to' side
    return {
      targetId: relationship.from,
      kind: relationship.kind,
      why: relationship.why,
      confidence: relationship.confidence,
    };
  }
}
