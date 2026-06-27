export interface TimelineQuote {
  text: string;
  source: string;
  note?: string;
}

export interface TimelineFigure {
  id: string;
  name: string;
  tradition: string;
  dates: string;
  sortYear: number;
  bio: string;
  quotes?: TimelineQuote[];
  noQuotes?: boolean;
  accent?: string;
}

export interface TimelineSection {
  id: string;
  title: string;
  subtitle?: string;
  figures: TimelineFigure[];
}

export const INWARD_PATHS_INTRO = {
  eyebrow: "Pilgrim Paths",
  title: "Inward Paths",
  subtitle: "Spirituality & Mysticism",
  lead:
    "Eighteen figures across three millennia — sages, poets, philosophers, and interpreters — whose inward turn shaped how traditions speak of the unseen. Scroll the spine to walk the line.",
  editorialNote:
    "All quotes below are kept short and attributed to their translator where the translator matters. Sanskrit and Sufi source texts are ancient and free; specific modern English translations may be copyrighted — this page leans on 19th- and early-20th-century public-domain translations wherever they exist. Where a figure left no reliable direct quotes (Luria), we say so rather than invent one.",
};

export const INWARD_PATHS_SECTIONS: TimelineSection[] = [
  {
    id: "historical-core",
    title: "Historical Core",
    figures: [
      {
        id: "yajnavalkya",
        name: "Yajnavalkya",
        tradition: "Hinduism (Upanishadic)",
        dates: "traditionally placed c. 7th century BCE",
        sortYear: -700,
        accent: "var(--saffron)",
        bio: "Yajnavalkya appears in the Brihadaranyaka Upanishad, one of the oldest and most philosophically dense Upanishads, as a sage about to renounce household life. Before he leaves, his wife Maitreyi asks whether wealth could make her immortal; he tells her it cannot, and what follows is one of the foundational texts of Vedantic philosophy — a teaching that the self (Atman) is not loved for anything else, but is the very thing for whose sake everything else is loved, and that it is ultimately identical with Brahman, the ground of all reality. His method of arriving at this — endlessly negating every description (\"not this, not that\") rather than positively defining the Self — became the template for centuries of Hindu apophatic theology and directly anticipates Shankara's Advaita Vedanta nearly 1,500 years later.",
        quotes: [
          {
            text: "It is not for the love of the husband that the husband is dear, but for the love of the Self.",
            source: "Brihadaranyaka Upanishad 2.4.5 (trans. S. Radhakrishnan)",
          },
          {
            text: "Neti, neti — \"Not this, not that.\"",
            source: "Recurring formula in the Brihadaranyaka Upanishad for describing the Self",
          },
        ],
      },
      {
        id: "laozi",
        name: "Laozi",
        tradition: "Daoism",
        dates: "traditionally 6th century BCE (semi-legendary)",
        sortYear: -600,
        accent: "var(--turquoise)",
        bio: "Laozi (\"Old Master\") is the figure traditionally credited with the Tao Te Ching, a short, riddling text that underlies all of Daoist thought. Whether he existed as a single historical person is genuinely disputed by scholars — the text may be a compilation — but the tradition holds he was a court archivist who, disillusioned with the corruption of the Zhou court, rode an ox out of civilization and was persuaded by a border guard to write down his teaching before disappearing into the mountains. The core idea is wu wei, \"non-action\" — not laziness, but a way of acting so attuned to the natural grain of things that it requires no force. The Dao itself is explicitly described as something language cannot capture, which makes the text one of the earliest and purest statements of apophatic (negative) mysticism in any tradition.",
        quotes: [
          {
            text: "The Tao that can be named is not the eternal Tao.",
            source: "Tao Te Ching, ch. 1",
          },
          {
            text: "Nature does not hurry, yet everything is accomplished.",
            source: "Paraphrase widely drawn from Tao Te Ching ch. 23's teaching on naturalness",
            note: "Treat as a gloss rather than a literal line",
          },
        ],
      },
      {
        id: "mahavira",
        name: "Mahavira",
        tradition: "Jainism",
        dates: "traditionally c. 599–527 BCE (dating debated)",
        sortYear: -550,
        accent: "var(--gold)",
        bio: "Mahavira was a prince of the Kshatriya caste in what is now Bihar, India, who at around 30 renounced his wealth and family to pursue liberation through extreme asceticism — fasting, nakedness, and rigorous non-harming that went well beyond what most other Indian renunciant traditions practiced. After twelve years of austerity he attained kevala jnana, omniscience, and spent the rest of his life teaching what became Jainism's core ethical architecture: ahimsa (non-violence) as the absolute first principle, extended not just to humans but to all living things including insects and microorganisms, alongside truthfulness, non-stealing, chastity, and non-attachment. His teachings were transmitted orally and later compiled in the Agamas; Jain monks' practice today — sweeping the path ahead of them, straining drinking water — still directly enacts his cosmology of life everywhere.",
        quotes: [
          {
            text: "All breathing, existing, living, sentient creatures should not be slain, nor treated with violence, nor abused, nor tormented, nor driven away.",
            source: "Acaranga Sutra, Book 1 (trans. Hermann Jacobi)",
          },
          {
            text: "Live and let live.",
            source: "Standard English gloss of Jain ahimsa teaching attributed to Mahavira",
            note: "Summary rather than a verbatim quote",
          },
        ],
      },
      {
        id: "gautama-buddha",
        name: "Gautama Buddha",
        tradition: "Buddhism",
        dates: "traditional dates c. 563–483 BCE (scholars favor c. 480–400 BCE)",
        sortYear: -500,
        accent: "var(--turquoise)",
        bio: "Born a prince in what is now Nepal, Siddhartha Gautama left a life of privilege at 29 after encountering old age, sickness, and death, and spent years in extreme asceticism before concluding that self-mortification was as much a dead end as indulgence — leading him to the \"Middle Way.\" Under a fig tree in Bodh Gaya he attained enlightenment, arriving at the Four Noble Truths: that life involves suffering, that suffering has a cause (craving), that the cause can end, and that there is a path to end it. What makes Buddha a mystic rather than simply an ethicist is the claim underneath all of it: that the sense of a fixed, separate self is itself the root illusion generating craving, and that direct meditative insight — not belief — dissolves it. He spent 45 years teaching across northern India before his death.",
        quotes: [
          {
            text: "All that we are is the result of what we have thought.",
            source: "Dhammapada, opening verse (trans. F. Max Müller)",
          },
          {
            text: "Work out your own salvation. Do not depend on others.",
            source: "Dhammapada, traditional rendering of the Buddha's reported last teaching",
          },
        ],
      },
      {
        id: "nagarjuna",
        name: "Nagarjuna",
        tradition: "Buddhism (Madhyamaka)",
        dates: "c. 150–250 CE",
        sortYear: 200,
        accent: "var(--turquoise)",
        bio: "Nagarjuna is the philosophical architect of Mahayana Buddhism's central concept, shunyata (emptiness), and is regarded in Tibetan and East Asian traditions as something like a \"second Buddha.\" His major work, the Mulamadhyamakakarika (\"Root Verses on the Middle Way\"), uses relentless logical analysis — not meditation reports — to argue that nothing has independent, self-contained existence; everything arises only in dependence on everything else, and even that dependence is itself empty of fixed essence. This is a genuinely strange move for a mystic: rather than describing an ecstatic experience of unity, he tries to logically demonstrate that the very category of \"independently existing things\" collapses under scrutiny, leaving emptiness not as nihilism but as the condition that makes change, causation, and the Buddhist path itself possible at all.",
        quotes: [
          {
            text: "Since all is empty, all is possible.",
            source: "Widely attributed summary of Nagarjuna's argument in the Mulamadhyamakakarika",
            note: "Well-known paraphrase rather than a single verbatim verse",
          },
          {
            text: "Whatever is dependently arisen, that is explained to be emptiness.",
            source: "Mulamadhyamakakarika 24.18 (trans. Jay Garfield), shortened",
          },
        ],
      },
      {
        id: "adi-shankara",
        name: "Adi Shankara",
        tradition: "Hinduism (Advaita Vedanta)",
        dates: "traditional dates 788–820 CE",
        sortYear: 800,
        accent: "var(--saffron)",
        bio: "Shankara was a South Indian philosopher-monk who, in a short life, systematized Advaita (\"non-dual\") Vedanta into the form it largely still holds today, writing commentaries on the Upanishads, the Bhagavad Gita, and the Brahma Sutras, and founding monastic centers (mathas) in four corners of India that still operate. His central claim, building directly on Yajnavalkya's earlier teaching, is radical: ultimate reality (Brahman) and the individual self (Atman) are not merely connected but identical, and the entire experienced world of separate things is maya — not nonexistent, but not ultimately real either, more like a dream that feels solid until you wake. He is said to have debated rival philosophers across India and died around age 32, though traditional accounts of his life vary widely in detail.",
        quotes: [
          {
            text: "Brahman is real, the world is unreal; the individual self is non-different from Brahman.",
            source: "Traditional summary verse (Brahma satyam jagat mithya, jivo brahmaiva na aparah) attributed to Shankara",
          },
        ],
      },
      {
        id: "rabia-al-adawiyya",
        name: "Rabia al-Adawiyya",
        tradition: "Sufism",
        dates: "c. 717–801 CE, Basra",
        sortYear: 760,
        accent: "var(--crimson)",
        bio: "Rabia is the first major woman in the Sufi tradition and one of its most influential figures of any gender, though almost nothing she wrote survives in her own hand — her sayings and poems come down through later biographers, chiefly the 13th-century poet Attar. Born into poverty, possibly sold into slavery before being freed, she became an ascetic who refused marriage proposals (including, tradition says, from the governor of Basra) to devote herself entirely to God. Her lasting contribution was reorienting Sufi practice away from fear of hell or hope of paradise — which she considered a kind of transaction — toward love of God as the only legitimate motive for worship, a shift that shaped everything that came after her, including Rumi and Ibn Arabi.",
        quotes: [
          {
            text: "I have loved Thee with two loves — a selfish love and a love that is worthy of Thee.",
            source: "Attributed to Rabia via Attar's Memorial of the Saints; translation widely varies",
          },
          {
            text: "If I adore You out of fear of Hell, burn me in Hell.",
            source: "Attributed to Rabia via the same biographical tradition",
          },
        ],
      },
      {
        id: "ibn-arabi",
        name: "Ibn Arabi",
        tradition: "Sufism / Islamic metaphysics",
        dates: "1165–1240 CE",
        sortYear: 1200,
        accent: "var(--crimson)",
        bio: "Born in Murcia in Muslim Spain (al-Andalus) and dying in Damascus, Ibn Arabi was the most systematic metaphysician Sufism produced, writing hundreds of works including the sprawling Meccan Revelations and the dense Bezels of Wisdom. His central doctrine, wahdat al-wujud (\"unity of being\"), holds that there is, at the deepest level, only one Being — God — and that all apparent multiplicity is God's self-disclosure through an infinite range of forms. This led him to startling positions for a devout Muslim theologian: that God appears to each person according to that person's own capacity to perceive, and that the heart of someone who has truly realized this unity can no longer be confined to any one religious form. He remains one of the most contested figures in Islamic intellectual history — revered by some Sufi orders, viewed with suspicion by some orthodox jurists.",
        quotes: [
          {
            text: "My heart has become capable of every form.",
            source: "Tarjuman al-Ashwaq (The Interpreter of Desires)",
          },
        ],
      },
      {
        id: "dogen",
        name: "Dogen",
        tradition: "Zen Buddhism (Soto school)",
        dates: "1200–1253 CE",
        sortYear: 1225,
        accent: "var(--turquoise)",
        bio: "Dogen traveled from Japan to China as a young monk searching for an authentic teacher, and returned having found one in the Soto Zen lineage, which he then transplanted to Japan and refounded at Eihei-ji monastery. His central practice, shikantaza (\"just sitting\"), rejects meditation as a means to a future enlightenment in favor of treating the act of sitting itself as enlightenment already fully present — practice and realization are not cause and effect but one act. His essay \"Genjokoan\" contains Zen's most quoted single passage on selfhood, and his concept of uji (\"being-time\") argues that time is not a container things move through but inseparable from the things and acts that constitute each present moment — a position some later commentators have compared to aspects of process philosophy.",
        quotes: [
          {
            text: "To study the Buddha Way is to study the self. To study the self is to forget the self.",
            source: "Genjokoan; phrasing varies slightly by translator, but this two-clause core is consistent across nearly all renderings",
          },
        ],
      },
      {
        id: "rumi",
        name: "Jalal al-Din Rumi",
        tradition: "Sufism (Persian)",
        dates: "1207–1273 CE",
        sortYear: 1240,
        accent: "var(--crimson)",
        bio: "Rumi was born in Balkh (in present-day Afghanistan) and fled west with his family ahead of the Mongol invasions, eventually settling in Konya, in present-day Turkey, where he became a respected jurist and theologian — until his meeting with the wandering mystic Shams-e Tabrizi transformed him. Their intense friendship, and Shams's disappearance or murder a few years later, triggered the outpouring of ecstatic poetry that became the Masnavi and the Divan-e Shams, tens of thousands of verses on love as the engine of the universe and the soul's longing for God as a form of homesickness. The Mevlevi Sufi order — the \"whirling dervishes\" — grew out of his circle after his death. He is now, by most counts, the best-selling poet in the United States, though the version most American readers encounter (Coleman Barks's free renderings) is a paraphrase, not a translation from the original Persian.",
        quotes: [
          {
            text: "The lamps are different, but the light is the same.",
            source: "Widely circulated short aphorism drawn from Rumi's poetry",
            note: "If quoting at length, use a literal scholarly translation (e.g. Nicholson) rather than popular Barks free-verse versions",
          },
        ],
      },
      {
        id: "meister-eckhart",
        name: "Meister Eckhart",
        tradition: "Christianity (Dominican)",
        dates: "c. 1260–1328 CE",
        sortYear: 1290,
        accent: "var(--gold)",
        bio: "A German Dominican friar and one of the most intellectually rigorous theologians of the medieval church, Eckhart preached sermons (often in German rather than scholarly Latin, unusually) that pushed orthodox Christian mysticism to its outer edge. His central, recurring idea is the distinction between \"God\" — the personal, nameable deity of ordinary religion — and the \"Godhead,\" a deeper, undifferentiated divine ground beyond even the concept of God, with which the innermost \"spark\" of the human soul is already, secretly, identical. This is close enough to pantheism that 28 propositions drawn from his work were condemned by Pope John XXII shortly after his death, though Eckhart died (or the process lapsed) before any formal censure of him personally took effect. He had enormous influence on later German mysticism and, in the 20th century, became a major bridge figure for Western readers interested in parallels with Zen and Advaita.",
        quotes: [
          {
            text: "The eye with which I see God is the eye with which God sees me.",
            source: "Sermon 12 (Quasi stella matutina), a recurring formulation across multiple of Eckhart's sermons",
          },
        ],
      },
      {
        id: "kabir",
        name: "Kabir",
        tradition: "North Indian Bhakti",
        dates: "traditional dates c. 1398–1518 CE (contested)",
        sortYear: 1450,
        accent: "var(--saffron)",
        bio: "Kabir was a weaver in Varanasi, almost certainly raised in a Muslim family but steeped in the devotional Hindu environment of his teacher Ramananda, and his life's work became a direct, often confrontational refusal of both traditions' formal apparatus — temple ritual, mosque ritual, caste, scripture-quoting, asceticism for its own sake — in favor of a personal, unmediated devotion to a formless divine he called by many names. He composed in vernacular Hindi rather than Sanskrit or Persian, making his verses (dohas) accessible to ordinary people in a way most prior religious literature wasn't, and he is revered today by Hindus, Muslims, and Sikhs alike — several of his verses were incorporated directly into the Sikh scripture, the Guru Granth Sahib. Rabindranath Tagore's 1915 English translation, Songs of Kabir, remains the standard public-domain entry point.",
        quotes: [
          {
            text: "O friend! hope for Him whilst you live, know whilst you live: for in life deliverance abides.",
            source: "Songs of Kabir, trans. Rabindranath Tagore (1915)",
          },
        ],
      },
      {
        id: "teresa-of-avila",
        name: "Teresa of Ávila",
        tradition: "Catholic mysticism (Carmelite)",
        dates: "1515–1582 CE",
        sortYear: 1550,
        accent: "var(--crimson)",
        bio: "Teresa entered a Carmelite convent in Ávila, Spain, at 18 and, after years of relatively conventional religious life, underwent a profound conversion experience in her 40s that launched both an intense mystical life and a practical reform movement — she founded over a dozen new convents under a stricter, more contemplative rule, traveling and negotiating with often-hostile Church authorities despite the era's deep suspicion of women claiming direct spiritual authority. Her major works, The Interior Castle and her Autobiography, map the soul's progress toward union with God through a series of \"mansions,\" using strikingly physical, often erotic imagery to describe states of prayer — most famously her account of a vision in which an angel pierces her heart with a flaming golden spear, later immortalized in Bernini's sculpture. She was named a Doctor of the Church in 1970, one of the first women so honored.",
        quotes: [
          {
            text: "The important thing is not to think much but to love much.",
            source: "The Interior Castle, traditional rendering",
            note: "\"Christ has no body now but yours\" is not an authentic Teresa quote — it is an 1888 Methodist/Quaker composite frequently misattributed to her",
          },
        ],
      },
      {
        id: "isaac-luria",
        name: "Isaac Luria",
        tradition: "Jewish Kabbalah",
        dates: "1534–1572 CE, Safed",
        sortYear: 1550,
        accent: "var(--gold)",
        bio: "Luria — known as \"the Ari,\" the Lion — spent only the last two years of his short life teaching in Safed, in Ottoman Palestine, before dying in a plague at 38, yet his system became the single most influential development in Jewish mysticism after the Zohar itself. He wrote almost nothing down; his entire cosmology survives because his student Chaim Vital recorded and compiled his oral teachings, chiefly in the work Etz Chaim (\"Tree of Life\"). His central, startling idea is tzimtzum: that creation began not with God expanding outward but contracting inward, withdrawing to make room for a world that could exist as something other than God. The \"vessels\" meant to contain the divine light that flowed into that space then shattered, scattering sparks of holiness trapped in the material world — and humanity's task, tikkun olam (\"repair of the world\"), is to gather and liberate them through ethical and spiritual practice. This last idea has since traveled far beyond Kabbalah into general Jewish social-justice language.",
        noQuotes: true,
      },
      {
        id: "ramakrishna",
        name: "Ramakrishna",
        tradition: "Hinduism (Bengali bhakti)",
        dates: "1836–1886 CE",
        sortYear: 1860,
        accent: "var(--saffron)",
        bio: "Ramakrishna was a temple priest at the Dakshineswar Kali temple near Calcutta who pursued direct mystical experience with an intensity and breadth almost unmatched in the historical record — he didn't just practice within Hindu devotional and Vedantic frameworks, but for periods also practiced as a Muslim and as a Christian, reporting that each path led him to the same ultimate realization. This became the basis of his most lasting teaching, jatha mata, tatha patha — \"as many faiths, so many paths\" — a foundational text for modern religious pluralism. He left no writings of his own; his teachings survive through \"M\" (Mahendranath Gupta), a disciple who recorded his conversations, published as The Gospel of Sri Ramakrishna. His chief disciple, Swami Vivekananda, carried his teaching to the West at the 1893 World's Parliament of Religions in Chicago, effectively introducing Vedanta to a Western audience for the first time.",
        quotes: [
          {
            text: "As many faiths, so many paths.",
            source: "Recorded teaching, jatha mata, tatha patha",
          },
          {
            text: "God can be reached by different religions. Many rivers flow by many ways but they fall into the sea. They all are one.",
            source: "The Gospel of Sri Ramakrishna (trans. Swami Nikhilananda), shortened",
          },
        ],
      },
    ],
  },
  {
    id: "modern-reception",
    title: "Modern Western Reception",
    subtitle:
      "Interpreters and popularizers who brought mystical traditions to a Western audience — not realized mystics within a living lineage in the same sense as the figures above.",
    figures: [
      {
        id: "thomas-merton",
        name: "Thomas Merton",
        tradition: "Christianity (Trappist)",
        dates: "1915–1968 CE",
        sortYear: 1940,
        accent: "var(--gold)",
        bio: "Merton converted to Catholicism as a young man and entered the Trappist monastery of Gethsemani in Kentucky in 1941, where he remained a monk for the rest of his life while becoming, almost accidentally, one of the most widely read spiritual writers of the 20th century — his 1948 autobiography The Seven Storey Mountain was a surprise bestseller. Unusually for a cloistered monk, Merton spent his later years in deep, serious engagement with Buddhism (he corresponded with and met the Dalai Lama and D.T. Suzuki), Sufism, and Zen, treating interfaith contemplative dialogue as a genuine theological project rather than a curiosity. His core teaching distinguishes the \"false self\" — the socially constructed identity built from achievement, opinion, and ego — from the \"true self,\" already hidden in God, that contemplative practice gradually uncovers. He died in Thailand in 1968, accidentally electrocuted, while on a trip to meet with Asian Buddhist monks.",
        quotes: [
          {
            text: "Selflessness is my true self. Love is my name.",
            source: "New Seeds of Contemplation (1961), shortened",
          },
        ],
      },
      {
        id: "alan-watts",
        name: "Alan Watts",
        tradition: "Interpreter of Zen and Daoism",
        dates: "1915–1973 CE",
        sortYear: 1950,
        accent: "var(--turquoise)",
        bio: "British-born and trained initially toward Anglican priesthood, Watts left the church, moved to the United States, and became the single most effective popularizer of Zen Buddhism and Taoism for a mid-century Western audience — through books like The Way of Zen and a long-running radio and television presence. He was candid that he wasn't a Zen master or guru but an entertainer and \"philosophical entertainer,\" translating Eastern non-dual ideas into accessible Western idiom, often through the central metaphor of the self as a wave that mistakenly believes itself separate from the ocean. His influence on the American counterculture of the 1960s — and on how several generations of Westerners first encountered ideas like emptiness and non-attachment — is hard to overstate, even though scholars of Buddhism and Daoism have long noted that his renderings simplify and sometimes distort the source traditions.",
        quotes: [
          {
            text: "You are the universe experiencing itself.",
            source: "Recurring formulation across multiple lectures and books, including The Book: On the Taboo Against Knowing Who You Are",
          },
        ],
      },
      {
        id: "eckhart-tolle",
        name: "Eckhart Tolle",
        tradition: "Contemporary popular nonduality",
        dates: "b. 1948",
        sortYear: 1997,
        accent: "var(--gold)",
        bio: "Tolle, born in Germany, reports undergoing a sudden, transformative inner shift at 29 following years of depression, after which he spent years effectively homeless, sitting on park benches in what he describes as a state of intense peace, before eventually writing The Power of Now (1997), which became a global bestseller after Oprah Winfrey's endorsement. His teaching draws heavily — critics would say almost entirely — on Zen, Advaita Vedanta (particularly the lineage running through Ramana Maharshi), and Krishnamurti, repackaged in plain, largely tradition-free language centered on presence: the claim that psychological suffering exists only in identification with thought and time, and dissolves the moment attention rests fully in the present \"Now.\" He represents the furthest point on this list from a mystic operating within an inherited lineage — he is a synthesizer presenting older nondual insights to an audience that, for the most part, has no other contact with the traditions he's drawing from.",
        quotes: [
          {
            text: "You are not your mind.",
            source: "The Power of Now (1997)",
          },
        ],
      },
    ],
  },
];

export const INWARD_PATHS_FRAMING = {
  title: "A note on what this timeline argues",
  body: "Putting all eighteen of these on one visual timeline makes an argument by its layout: that \"mysticism\" is one coherent thing wearing different traditional costumes. That's the perennialist position (Aldous Huxley's framing, ultimately), and it's a real, substantive position — but it's contested by serious scholars of religion (Steven Katz being the most cited) who argue mystical experience is shaped by its tradition, not a shared core dressed differently. You don't have to resolve that argument on the page, but naming it turns this from \"look how similar all mystics are\" into \"here's a long-running debate about whether mystics are similar at all, illustrated.\" That's a stronger, more honest page — and it's exactly the kind of move that separates a religious-studies-literate site from a curated Pinterest board.",
};

export function getAllFigures(): TimelineFigure[] {
  return INWARD_PATHS_SECTIONS.flatMap((s) => s.figures).sort((a, b) => a.sortYear - b.sortYear);
}
