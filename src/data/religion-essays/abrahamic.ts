import type { ReligionEssay } from "./types";

export const ABRAHAMIC_ESSAYS: Record<string, ReligionEssay> = {
  judaism: {
    paragraphs: [
      "Judaism is the religion of the Jewish people, rooted in a covenant between God and Israel as narrated in the Hebrew Bible. Scholars trace its formation through centuries of Israelite history, from early Iron Age communities in the Levant to the consolidation of monotheistic worship centered on YHWH. The destruction of the First and Second Temples in Jerusalem (586 BCE and 70 CE) reshaped Jewish life, shifting emphasis from sacrificial worship toward Torah study, prayer, and observance of mitzvot. Rabbinic Judaism, articulated in the Mishnah and Talmud, became the dominant form after late antiquity and continues to guide Orthodox, Conservative, and Reform communities worldwide.",
      "Jewish identity intertwines religious practice, ethnic heritage, and shared memory of exile and return. Core observances include Shabbat, dietary laws (kashrut), lifecycle rituals, and pilgrimage festivals such as Passover and Sukkot. Theological views vary: many Jews affirm a personal God who acts in history, while others emphasize ethical monotheism, mysticism (Kabbalah), or cultural continuity without strict theism. Debates over messianism, resurrection, and the afterlife (Olam Ha-Ba) persist across denominations. Despite diaspora, persecution, and modern secularization, Judaism has preserved textual traditions, legal reasoning, and communal institutions that also supplied foundational narratives for Christianity and Islam.",
      "Today Judaism is practiced on every inhabited continent, with major centers in Israel and North America. Contemporary issues include the relationship between religion and Zionism, gender roles in worship, intermarriage, and the meaning of Jewish peoplehood in pluralist societies. Academic study treats Judaism as both a living faith and a subject of history, archaeology, and comparative religion, examining how a small ancient people maintained continuity across millennia of political change.",
    ],
    sources: [
      { label: "Britannica: Judaism", href: "https://www.britannica.com/topic/Judaism" },
      { label: "BBC Religion: Judaism", href: "https://www.bbc.co.uk/religion/religions/judaism/" },
      { label: "Stanford Encyclopedia of Philosophy: Judaism", href: "https://plato.stanford.edu/entries/judaism/" },
      { label: "Pew Research Center: Jewish Americans", href: "https://www.pewresearch.org/religion/2021/05/11/jewish-americans-in-2020/" },
    ],
  },

  christianity: {
    paragraphs: [
      "Christianity emerged in first-century Roman Palestine among followers of Jesus of Nazareth, a Jewish teacher executed by Roman authorities. Early believers proclaimed that God had raised Jesus from the dead and that he was the Messiah (Christ) foretold in Hebrew scripture. The movement spread through the Mediterranean via apostles, missionaries such as Paul, and urban networks, gradually distinguishing itself from Judaism while retaining the Hebrew Bible as the Old Testament. By the fourth century, Christianity became the favored religion of the Roman Empire; councils at Nicaea (325) and Chalcedon (451) helped define orthodox doctrine concerning the Trinity and the nature of Christ.",
      "Christians hold the Bible as sacred scripture, comprising the Old and New Testaments. Central teachings include the incarnation, atonement through Christ's death and resurrection, grace, and the call to love God and neighbor. Sacramental life varies by tradition but commonly includes baptism and Eucharist. Major branches include Roman Catholicism, Eastern Orthodoxy, and Protestantism, which further divides into denominations shaped by Reformation debates over authority, salvation, and scripture. Monasticism, missionary activity, and engagement with philosophy and science have marked Christian history, as have schisms, crusades, and reform movements.",
      "With roughly two billion adherents, Christianity is the world's largest religion, present in nearly every country. Its cultural influence extends to art, law, education, and ethics, while global South growth has shifted demographic centers away from Europe. Contemporary Christianity grapples with secularism, ecumenism, social justice, and internal diversity on issues from biblical interpretation to gender and sexuality. Scholars study Christianity as a historical movement, a theological system, and a global cultural force shaped by local languages and societies.",
    ],
    sources: [
      { label: "Britannica: Christianity", href: "https://www.britannica.com/topic/Christianity" },
      { label: "BBC Religion: Christianity", href: "https://www.bbc.co.uk/religion/religions/christianity/" },
      { label: "Stanford Encyclopedia of Philosophy: Christianity", href: "https://plato.stanford.edu/entries/christianity/" },
      { label: "Pew Research Center: Global Christianity", href: "https://www.pewresearch.org/religion/2011/12/19/global-christianity-excerpts-from-the-full-report/" },
    ],
  },

  islam: {
    paragraphs: [
      "Islam is a monotheistic tradition founded in seventh-century Arabia, when the Prophet Muhammad received revelations he understood as the word of God (Allah). These revelations, collected in the Qur'an, affirm earlier prophets including Abraham, Moses, and Jesus while presenting Muhammad as the final messenger in a line of divine guidance. Muhammad's migration from Mecca to Medina (622 CE, the hijra) marks the start of the Islamic calendar and the formation of a cohesive Muslim community. Within decades of his death in 632, Arab-Muslim armies had expanded across the Middle East and North Africa, bringing Islam into contact with Persian, Byzantine, and Central Asian cultures.",
      "Muslims profess tawhid, the absolute oneness of God, and seek submission (islam) to divine will through faith and practice. The Five Pillars structure religious life: the shahada (declaration of faith), salat (ritual prayer), zakat (almsgiving), sawm (fasting during Ramadan), and hajj (pilgrimage to Mecca for those able). Islamic law (sharia) draws on the Qur'an, the sunna (Muhammad's example recorded in hadith), and centuries of jurisprudential reasoning, producing schools of thought such as Hanafi, Maliki, Shafi'i, and Hanbali. A political succession dispute after Muhammad's death contributed to the Sunni-Shia division, which remains significant though both branches share core beliefs.",
      "Islam is the world's second-largest religion, with diverse expressions from West Africa to Southeast Asia. Sufi mysticism, philosophical theology (kalam), and institutions such as madrasas and waqf endowments have shaped intellectual history. Modern Muslim societies debate reform, gender roles, political Islam, and relations with non-Muslim majorities. Academic study examines Islam as scripture, law, civilization, and lived practice, emphasizing regional variation rather than a single monolithic culture.",
    ],
    sources: [
      { label: "Britannica: Islam", href: "https://www.britannica.com/topic/Islam" },
      { label: "BBC Religion: Islam", href: "https://www.bbc.co.uk/religion/religions/islam/" },
      { label: "Stanford Encyclopedia of Philosophy: Islam", href: "https://plato.stanford.edu/entries/islam/" },
      { label: "Pew Research Center: The Future of World Religions", href: "https://www.pewresearch.org/religion/2015/04/02/religious-projections-2010-2050/" },
    ],
  },

  bahai: {
    paragraphs: [
      "The Bahá'í Faith originated in nineteenth-century Persia amid the messianic expectations of Shia Islam. In 1844, Siyyid Ali Muhammad of Shiraz declared himself the Bab (Gate), preparing the way for a greater figure. After the Bab's execution in 1850, Mirza Husayn-Ali Nuri, known as Bahá'u'lláh, announced in 1863 that he was the promised manifestation of God for this age. Bahá'u'lláh's exile to Baghdad, Constantinople, Adrianople, and finally Akka (Acre) spread his teachings across the Ottoman Empire. His writings, including the Kitáb-i-Aqdas and Kitáb-i-Íqán, form the canonical scripture of the tradition.",
      "Bahá'ís teach the oneness of God, the essential unity of all religions, and the unity of humanity regardless of race, nationality, or gender. They regard Abraham, Krishna, Moses, Buddha, Jesus, Muhammad, and the Bab as successive messengers who revealed divine guidance suited to their eras. Core practices include daily prayer, a nineteen-day annual fast, and abstention from alcohol and partisan politics. Governance rests on elected councils at local, national, and international levels, with the Universal House of Justice in Haifa, Israel, as the supreme institution. There is no clergy; individual investigation of truth is encouraged.",
      "Today the Bahá'í Faith claims several million adherents in virtually every country, though precise counts are debated because many national censuses do not list it separately. Bahá'í communities emphasize education, gender equality, interfaith dialogue, and social development projects. The faith maintains a distinctive calendar of nineteen months and holds regular devotional gatherings open to all. Scholars classify the movement as an independent world religion that emerged from an Islamic milieu while articulating a universalist theology distinct from both Islam and Christianity.",
    ],
    sources: [
      { label: "Britannica: Bahá'í Faith", href: "https://www.britannica.com/topic/Bahai-Faith" },
      { label: "BBC Religion: Bahá'í", href: "https://www.bbc.co.uk/religion/religions/bahai/" },
      { label: "Bahá'í Reference Library", href: "https://www.bahai.org/library/" },
      { label: "Pew Research Center: Bahá'ís", href: "https://www.pewresearch.org/religion/2012/12/18/global-religious-landscape-bahais/" },
    ],
  },

  druse: {
    paragraphs: [
      "The Druze are an ethno-religious community centered in the Levant, especially Lebanon, Syria, and Israel. Their tradition emerged in the eleventh century from Ismaili Shia Islam during the Fatimid Caliphate. Hamza ibn Ali and other missionaries, acting under the authority of the caliph al-Hakim bi-Amr Allah, composed the Rasa'il al-Hikma (Epistles of Wisdom), which remain the core sacred texts. After al-Hakim's disappearance in 1021, the movement closed to new converts and developed into a distinct community with its own theology, endogamy, and social structure.",
      "Druze doctrine is esoteric and largely concealed from outsiders. Initiated elders (uqqal) study sacred writings and lead communal life, while the majority (juhhal) participate in ritual and social obligations without access to the full teachings. Beliefs include strict monotheism, the transmigration of souls, and a cyclical view of history in which God periodically sends prophets and mentors. Al-Hakim is revered as a manifestation of the divine, though Druze theology resists simple categorization as either Islamic sect or separate religion. Religious practice emphasizes moral conduct, hospitality, and loyalty to the community rather than public proselytism.",
      "Estimated at roughly one million worldwide, Druze identity combines faith, kinship, and Arabic language. They have played notable roles in Levantine politics and military service while maintaining religious discretion. Weekly gatherings on Thursday evenings and annual festivals mark the religious calendar, though public ritual remains modest compared with the inner life of the uqqal. Academic sources treat Druze history as a case study in how a closed initiatory tradition preserves cohesion under minority status across centuries of Ottoman, colonial, and national-state rule.",
    ],
    sources: [
      { label: "Britannica: Druze", href: "https://www.britannica.com/topic/Druze" },
      { label: "BBC Religion: Druze", href: "https://www.bbc.co.uk/religion/religions/druze/" },
      { label: "Encyclopaedia Iranica: Druze", href: "https://www.iranicaonline.org/articles/druze" },
    ],
  },

  yazidi: {
    paragraphs: [
      "Yazidism is a monotheistic tradition of the Kurdish-speaking peoples of northern Iraq, Syria, Turkey, and the diaspora. Its origins are debated: some scholars see roots in pre-Islamic Mesopotamian and Iranian religion, while Yazidis themselves trace a line of divine revelation through a series of peacock angels. The central figure is Melek Taus (Tawusi Malak), the Peacock Angel, whom Yazidis venerate as God's chief emissary. Lalish, a valley shrine in Iraqi Kurdistan, is the faith's holiest site and the destination of an annual six-day pilgrimage.",
      "Yazidi cosmology describes God creating the world and entrusting it to seven angels, among whom Melek Taus holds primacy. Oral and written traditions, including the Meshaf Resh (Black Book) and Kitêba Cilwe (Book of Revelation), preserve hymns, myths, and laws, though their historical antiquity is contested by scholars. Social organization divides members into castes of sheikhs, pirs, and murids, with strict endogamy and rules governing purity, diet, and baptism (mor kirin). Yazidism is non-proselytizing; one must be born into the community.",
      "Yazidis have endured persecution for centuries, often misidentified by outsiders as devil worshipers because of misunderstandings about Melek Taus. The 2014 genocide by the Islamic State group displaced and killed thousands, accelerating emigration and international advocacy for Yazidi rights. Qewals, hereditary bards, transmit sacred hymns (qewls) that sustain communal memory where written records are scarce. Researchers study Yazidism as a distinct Kurdish religious heritage that blends ancient Near Eastern motifs with elements shaped by contact with Islam and Christianity, while remaining a living minority tradition under pressure.",
    ],
    sources: [
      { label: "Britannica: Yazīdī", href: "https://www.britannica.com/topic/Yazidi" },
      { label: "BBC Religion: Yazidi", href: "https://www.bbc.co.uk/religion/religions/yazidi/" },
      { label: "United Nations: Yazidi Documentation", href: "https://www.un.org/en/genocideprevention/documents/public-awareness-and-education-tools/About-Yezidis-in-Iraq.pdf" },
      { label: "Encyclopaedia Iranica: Yazidis", href: "https://www.iranicaonline.org/articles/yazidis" },
    ],
  },

  mandaean: {
    paragraphs: [
      "Mandaeism is a Gnostic monotheistic religion whose adherents trace their origin to first-century followers of John the Baptist, whom they revere as their greatest prophet and final teacher — while explicitly rejecting Jesus and Muhammad. Mandaean texts such as the Haran Gawaita describe an early migration from Palestine through Haran to southern Mesopotamia to escape persecution, though scholars continue to debate whether the tradition's roots are ultimately Palestinian or native to Mesopotamia. What is clear is that by the Parthian and Sasanian periods, Mandaean communities were established in the marshlands of what is now southern Iraq and southwestern Iran, worshipping Hayyi Rabbi, 'the Great Life,' as their supreme, unknowable God.",
      "Central to Mandaean practice is baptism (masbuta), performed repeatedly in flowing 'living water' rather than as a one-time rite of conversion, alongside the masiqta, a ceremony guiding the soul's ascent after death. Cosmology describes emanations from the divine, including angelic beings (uthras) such as Manda d-Hayyi, and a hierarchy of prophets from Adam and Seth through John the Baptist. Scripture — the Ginza Rabba, the Qulasta prayerbook, and the Book of John — survives in Mandaic, an Eastern Aramaic dialect, and is copied and guarded by a hereditary priesthood organized into three grades: tarmidia, ganzibra, and rishama.",
      "Under Islamic rule Mandaeans were recognized as 'People of the Book,' identified with the Quranic Sabians, which afforded the community legal protection for centuries. That protection collapsed after the 2003 Iraq invasion: sectarian violence drove the Iraqi Mandaean population down from a substantial, centuries-old community to a small fraction of its former size within a few years, scattering most survivors into diaspora across Europe, Australia, and North America. Today an estimated 60,000–70,000 Mandaeans remain worldwide, making the preservation of Mandaic language, priestly ordination, and river-baptism ritual outside their ancestral marshlands an active and urgent concern for the community.",
    ],
    sources: [
      {
        label: "Britannica — Mandaeanism",
        href: "https://www.britannica.com/topic/Mandaeanism",
      },
      {
        label: "Encyclopaedia Iranica — Mandaeans",
        href: "https://www.iranicaonline.org/articles/mandaeans-i-general",
      },
      {
        label: "Minority Rights Group — Mandaeans",
        href: "https://minorityrights.org/communities/mandaeans/",
      },
    ],
  },

  samaritan: {
    paragraphs: [
      "Samaritans are an ethno-religious community descended from the ancient Israelites of the northern Kingdom of Israel, centering their worship on Mount Gerizim rather than Jerusalem. Their own tradition claims unbroken descent from the tribes of Ephraim and Manasseh; Jewish sources instead trace their distinct identity to population changes following the Assyrian conquest of the eighth century BCE. Modern scholarship suggests neither a wholesale population replacement nor a simple continuity, but a gradual crystallization of separate Samaritan identity during the Persian and Hellenistic periods, as the northern Israelite community developed its own priesthood, calendar, and holy site independent of Jerusalem.",
      "The decisive rupture with Judaism deepened over centuries and turned violent around 110 BCE, when the Hasmonean ruler John Hyrcanus destroyed the Samaritan temple atop Mount Gerizim. Samaritans accept only the Torah — in their own textual recension, the Samaritan Pentateuch, written in Paleo-Hebrew script and differing from the Jewish Masoretic text in thousands of details, most consequentially in identifying Gerizim as God's chosen sanctuary — and reject the later Prophets, Writings, and rabbinic tradition entirely. A hereditary high priesthood, currently numbering its leader as the 133rd since Aaron, oversees practices including strict Sabbath and dietary law and an annual Passover animal sacrifice performed on the mountain itself.",
      "Centuries of pressure under successive empires reduced the community to the brink of disappearance: today roughly 900 Samaritans survive, split almost evenly between Kiryat Luza on Mount Gerizim in the West Bank and the city of Holon in Israel, making them one of the smallest continuously practicing religious communities in the world. Straddling the Israeli-Palestinian divide, Samaritans hold both Israeli and Palestinian citizenship in many cases and maintain relations with both communities. Scholars regard the Samaritans as a living witness to a form of Israelite religion that diverged from — rather than descended from — the Judaism that produced the Hebrew Bible's later books.",
    ],
    sources: [
      {
        label: "Britannica — Samaritan",
        href: "https://www.britannica.com/topic/Samaritan",
      },
      {
        label: "Jewish Virtual Library — The Samaritans",
        href: "https://www.jewishvirtuallibrary.org/the-samaritans",
      },
      {
        label: "Bible Odyssey (Society of Biblical Literature) — Samaritans",
        href: "https://www.bibleodyssey.org/people/related-articles/samaritans",
      },
    ],
  },
};
