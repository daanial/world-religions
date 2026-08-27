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
import { dreamtimeArticle } from "./dreamtime";
import { sumerianArticle } from "./sumerian";
import { egyptianArticle } from "./egyptian";
import { canaaniteArticle } from "./canaanite";
import { greekRomanArticle } from "./greek-roman";
import { norseArticle } from "./norse";
import { druidicArticle } from "./druidic";
import { manichaeanArticle } from "./manichaean";
import { tengrismArticle } from "./tengrism";
import { mithraismArticle } from "./mithraism";
import { gnosticismArticle } from "./gnosticism";
import { mesoamericanArticle } from "./mesoamerican";

export const ARTICLES: Record<string, ReligionArticle> = {
  "bahai": bahaiArticle,
  "caodai": caodaiArticle,
  "bon": bonArticle,
  "buddhism": buddhismArticle,
  "canaanite": canaaniteArticle,
  "candomble": candombleArticle,
  "chinese-folk": chineseFolkArticle,
  "christianity": christianityArticle,
  "confucianism": confucianismArticle,
  "dreamtime": dreamtimeArticle,
  "druidic": druidicArticle,
  "druse": druseArticle,
  "egyptian": egyptianArticle,
  "gnosticism": gnosticismArticle,
  "greek-roman": greekRomanArticle,
  "hinduism": hinduismArticle,
  "ifa": ifaArticle,
  "inuit": inuitArticle,
  "islam": islamArticle,
  "jainism": jainismArticle,
  "judaism": judaismArticle,
  "korean-shin": koreanShinArticle,
  "mandaean": mandaeanArticle,
  "manichaean": manichaeanArticle,
  "maori": maoriArticle,
  "mesoamerican": mesoamericanArticle,
  "mithraism": mithraismArticle,
  "navajo": navajoArticle,
  "norse": norseArticle,
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
  "sumerian": sumerianArticle,
  "taoism": taoismArticle,
  "tengrism": tengrismArticle,
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