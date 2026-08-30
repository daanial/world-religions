export const BUDDHISM_META_FA = {
  name: "بودیسم",
  family: "هندی",
  region: "شرق آسیا",
  blurb: "راه میانه برای پایان دادن به رنج.",
  description: "سیدارتَه گوتَمه، بودا، آموخت که رنج از تشنگی و نادانی پدید می‌آید و از راه هشتگانهٔ شریف پایان‌پذیر است. مکاتب ترواده، مهایانه و وجره‌یانه دارما را در سراسر آسیا گسترش دادند.",
  practices: ["مراقبه (ویپَسّنا، زازِن)", "ذهن‌آگاهی", "زندگی رهبانی", "زیارت"],
  coreIdeas: [
    { label: "بیداری", value: "نیروانه — خاموشی تشنگی" },
    { label: "کارما", value: "کنش ارادی، باززایی را شرطی می‌کند" },
    { label: "پس از مرگ", value: "باززایی تا رهایی؛ بدون روح جاودان" },
  ],
  sacredTexts: [
    { name: "تیپیتکه (کانون پالی)", description: "کهن‌ترین کانون کامل بودایی که به زبان پالی حفظ شده و برای بودیسم ترواده اعتبار دارد. این مجموعه از سه سبد تشکیل می‌شود: وینایه، سوتّه و اَبهیدَمه." },
    { name: "سوتراهای مهایانه", description: "کتابخانه‌ای گسترده از متون مورد احترام بوداییان مهایانه، از جمله سوتراي نیلوفر، قلب و الماس. این متون آرمان بودیستوه، تهی‌بودن و طبیعت بودا را شرح می‌دهند." },
    { name: "کانگیور تبتی", description: "«کلام ترجمه‌شدهٔ بودا»، مجموعه‌ای ۱۰۸جلدی از متون تبتی برای مکاتب وجره‌یانه که سوتراها، آموزه‌های مهایانه و متون تانتریک را دربرمی‌گیرد." },
  ],
} as const;

export const ISLAM_META_FA = {
  name: "اسلام",
  family: "ابراهیمی",
  region: "خاورمیانه",
  blurb: "توحید، عدالت و تسلیم آگاهانه در برابر خداوند.",
  description: "اسلام سنتی توحیدی است که با قرآن، پیامبری محمد و جامعهٔ نخستین مدینه شناخته می‌شود. سنی، شیعه و اباضی شاخه‌های اصلی آن‌اند و میراث اسلامی در فرهنگ‌های گوناگون شکل‌های متنوعی یافته است.",
  practices: ["نمازهای روزانه", "روزهٔ رمضان", "زکات و صدقه", "حج و زیارت"],
  coreIdeas: [{ label: "خدا", value: "توحید — یگانگی خداوند" }, { label: "جامعه", value: "امت — پیوند جهانی مسلمانان" }, { label: "رستگاری", value: "ایمان، عمل صالح و رحمت الهی" }],
  sacredTexts: [{ name: "قرآن", description: "متن مقدس و وحی الهی در اسلام." }, { name: "حدیث و سنت", description: "گزارش‌ها و الگوهای منسوب به پیامبر که در اخلاق و فقه نقش دارند." }, { name: "تفسیر و فقه", description: "میراث گستردهٔ شرح قرآن و استنباط احکام در مکتب‌های اسلامی." }]
} as const;

export const JUDAISM_META_FA = {
  name: "یهودیت",
  family: "ابراهیمی",
  region: "خاورمیانه",
  blurb: "زندگی در عهد، مطالعهٔ تورات و تقدیس روزمره.",
  description: "یهودیت سنت دینی و قومی یهودیان است که بر یکتاپرستی، عهد، تورات، فرمان‌های دینی و مسئولیت اخلاقی استوار است. شاخه‌های ارتدوکس، محافظه‌کار، اصلاح‌طلب و جریان‌های فرهنگی شکل‌های گوناگون آن را نمایندگی می‌کنند.",
  practices: ["شبات و دعا", "مطالعهٔ تورات", "جشن‌های سالانه", "صدقه و عمل اخلاقی"],
  coreIdeas: [{ label: "عهد", value: "رابطهٔ مسئولانهٔ خدا و قوم اسرائیل" }, { label: "راه", value: "هلاخا — زندگی بر پایهٔ فرمان‌ها" }, { label: "جامعه", value: "حفظ حافظه، متن و هویت در نسل‌ها" }],
  sacredTexts: [{ name: "تنخ", description: "کتاب مقدس عبری شامل تورات، پیامبران و نوشته‌ها." }, { name: "تلمود", description: "گفت‌وگوها و تحلیل‌های ربانی دربارهٔ تورات شفاهی." }, { name: "میدراش و آثار فقهی", description: "سنت‌های تفسیری، روایی و حقوقی یهودی." }]
} as const;

export const HINDUISM_META_FA = {
  name: "هندوئیسم",
  family: "هندی",
  region: "جنوب آسیا",
  blurb: "سنتی چندلایه از دارما، عبادت، فلسفه و رهایی.",
  description: "هندوئیسم مجموعه‌ای از سنت‌های دینی و فلسفی هند است، نه نظامی با بنیان‌گذار یا اعتقادنامهٔ واحد. دارما، کارما، سمساره، موکشَه و راه‌های گوناگون عبادت و یوگا در مکاتب متنوع آن جای دارند.",
  practices: ["پوجا و پیشکش", "یوگا و مراقبه", "جشن‌ها و روزه‌ها", "زیارت معابد و رودها"],
  coreIdeas: [{ label: "راه", value: "دارما — وظیفه و نظم اخلاقی" }, { label: "چرخه", value: "کارما و سمساره — پیامد و باززایی" }, { label: "رهایی", value: "موکشَه — رهایی از چرخه" }],
  sacredTexts: [{ name: "وداها", description: "کهن‌ترین متون سنسکریت ودایی." }, { name: "اوپانیشادها", description: "متون فلسفی دربارهٔ خود و واقعیت نهایی." }, { name: "گیتا و حماسه‌ها", description: "آثاری چون بهاگاوادگیتا، مهابهاراتا و رامایانا." }]
} as const;

export const BAHAI_META_FA = {
  name: "آیین بهائی",
  family: "ابراهیمی",
  region: "خاورمیانه",
  blurb: "یگانگی خدا، دین و انسانیت در پرتو وحی مترقی.",
  description: "آیین بهائی که بهاءالله در ایران بنیان گذاشت، یگانگی خدا، دین و انسانیت را آموزش می‌دهد. این آیین ادیان بزرگ جهان را فصل‌های پی‌درپی یک آموزش الهی می‌داند و برای صلح جهانی، برابری و هماهنگی علم و دین فراخوان می‌دهد.",
  practices: ["نماز واجب روزانه", "روزهٔ سالانه", "پرهیز از الکل", "مشورت اجتماعی"],
  coreIdeas: [{ label: "خدا", value: "یک خدای ناشناختنی" }, { label: "رستگاری", value: "پیشرفت معنوی در سراسر ابدیت" }, { label: "یگانگی", value: "همهٔ ادیان یک سرچشمه دارند" }],
  sacredTexts: [{ name: "کتاب اقدس", description: "کتاب مقدس‌تر بهاءالله که قوانین و نهادهای جامعهٔ بهائی را مقرر می‌کند و دربارهٔ نماز، روزه، ازدواج، ارث و حذف روحانیت است." }, { name: "کتاب ایقان", description: "اثر مهم الهیاتی بهاءالله دربارهٔ ماهیت مترقی وحی و تفسیر نمادهای متون پیشین." }, { name: "کلمات مکنونه", description: "مجموعه‌ای از قطعه‌های کوتاه و شاعرانه به فارسی و عربی دربارهٔ رابطهٔ روح با خدا و اخلاق بهائی." }]
} as const;

export const GNOSTICISM_META_FA = {
  name: "گنوسیسم",
  family: "ابراهیمی",
  region: "خاورمیانه",
  blurb: "شناخت پنهان (گنوسیس) در جهانی مادیِ ناقص.",
  description: "مجموعه‌ای از جنبش‌های آغاز دوران مسیحی که آموزش می‌دادند کیهان مادی آفرینش ناقص موجودی فروتر (دمیورگ) است، و نجات از راه شناخت پنهان روحانی (گنوسیس) به دست می‌آید، نه صرفاً ایمان یا شریعت. معلمان گنوسی چون والنتینوس و باسیلیدس هم‌زمان با مسیحیت ارتدکس رونق داشتند، پیش از آن‌که به‌عنوان بدعت سرکوب شوند.",
  practices: ["مطالعه و تأمل", "تشرف پنهانی", "کناره‌گیری زاهدانه"],
  coreIdeas: [
    { label: "کیهان", value: "جهان مادی به‌مثابهٔ آفرینش ناقص دمیورگی فروتر" },
    { label: "نجات", value: "گنوسیس — شناخت مستقیم روحانی، نه صرفاً ایمان" },
  ],
  sacredTexts: [
    { name: "کتابخانهٔ نجع حمادی", description: "مجموعه‌ای از بیش از ۵۰ متن قبطی که در سال ۱۹۴۵ نزدیک نجع حمادی در مصر کشف شد، از جمله انجیل توما و انجیل حقیقت. این کتاب‌ها احتمالاً حدود سدهٔ چهارم میلادی به دست راهبانی، برای گریز از نابودی پس از محکومیت گنوسیسم به‌عنوان بدعت، دفن شده بودند؛ کشف دوبارهٔ آن‌ها فهم مدرن از تنوع مسیحیت اولیه را دگرگون کرد." },
    { name: "انجیل توما", description: "مجموعه‌ای از ۱۱۴ گفتار منسوب به عیسی، بدون روایت یا داستان تصلیب، که بر خودشناسی به‌عنوان راه ملکوت الهی تأکید دارد. این انجیل که در میان متون نجع حمادی یافت شد، رشته‌ای از سنت اولیهٔ عیسی را بیرون از اناجیل رسمی حفظ کرده است." },
  ],
} as const;

export const CHRISTIANITY_META_FA = {
  name: "مسیحیت",
  family: "ابراهیمی",
  region: "خاورمیانه",
  blurb: "زندگی، مرگ و رستاخیز عیسای مسیح، و رستگاری از راه فیض و ایمان.",
} as const;

export const ZOROASTRIAN_META_FA = {
  name: "زرتشتی‌گری",
  family: "ایرانی",
  region: "خاورمیانه",
  blurb: "نبرد کیهانیِ راستی و دروغ در پرتو آموزه‌های اهورامزدا.",
} as const;

export const SIKHISM_META_FA = {
  name: "دین سیک",
  family: "هندی",
  region: "جنوب آسیا",
  blurb: "ارادت به واهگورو، برابری انسان‌ها و خدمت بی‌چشمداشت.",
} as const;

export const MANICHAEAN_META_FA = {
  name: "آیین مانی",
  family: "ایرانی",
  region: "خاورمیانه",
  blurb: "دوگانه‌انگاریِ کیهانیِ روشنایی و تاریکی در آموزهٔ پیامبر مانی.",
} as const;

export const MESOAMERICAN_META_FA = {
  name: "دین بین‌النهرینِ آمریکایی",
  family: "بومی",
  region: "قاره آمریکا",
  blurb: "کیهانی لایه‌لایه، قربانی مقدس و تقویم چرخه‌ای در سنت‌های آزتک و مایا.",
} as const;

export const TAOISM_META_FA = {
  name: "آیین تائو",
  family: "شرق آسیا",
  region: "شرق آسیا",
  blurb: "همسازی با تائو از راه بی‌کنشی، طبیعی‌بودن و پرورش انرژی حیاتی.",
} as const;

export const CHINESE_FOLK_META_FA = {
  name: "دین عامیانهٔ چینی",
  family: "شرق آسیا",
  region: "شرق آسیا",
  blurb: "پرستش خدایان، نیاکان و ارواح محلی در بطن زندگی روزمرهٔ چینی.",
} as const;

export const CONFUCIANISM_META_FA = {
  name: "کنفوسیوس‌گرایی",
  family: "شرق آسیا",
  region: "شرق آسیا",
  blurb: "اخلاق، آیین و خودپروری در خدمتِ هماهنگیِ اجتماعی.",
} as const;

export const SHINTO_META_FA = {
  name: "شینتو",
  family: "شرق آسیا",
  region: "شرق آسیا",
  blurb: "ستایش کامی‌ها و پیوند مقدس با طبیعت و سرزمین ژاپن.",
} as const;

export const JAINISM_META_FA = {
  name: "دین جین",
  family: "هندی",
  region: "جنوب آسیا",
  blurb: "اهیمسا و ریاضتِ سخت‌گیرانه برای رهاییِ روح از کارما.",
} as const;

export const YORUBA_META_FA = {
  name: "دین یوروبا",
  family: "آفریقایی و جوامع پراکنده",
  region: "آفریقا",
  blurb: "پرستش اوریشاها و مشورت با اوراکل ایفا در سنت یوروبا.",
} as const;

export const FA_RELIGION_META = {
  bahai: BAHAI_META_FA,
  buddhism: BUDDHISM_META_FA,
  islam: ISLAM_META_FA,
  judaism: JUDAISM_META_FA,
  hinduism: HINDUISM_META_FA,
  gnosticism: GNOSTICISM_META_FA,
  christianity: CHRISTIANITY_META_FA,
  zoroastrian: ZOROASTRIAN_META_FA,
  sikhism: SIKHISM_META_FA,
  manichaean: MANICHAEAN_META_FA,
  mesoamerican: MESOAMERICAN_META_FA,
  taoism: TAOISM_META_FA,
  "chinese-folk": CHINESE_FOLK_META_FA,
  confucianism: CONFUCIANISM_META_FA,
  shinto: SHINTO_META_FA,
  jainism: JAINISM_META_FA,
  yoruba: YORUBA_META_FA,
} as const;

export const FA_RELIGION_LABELS: Record<string, string> = {
  bahai: BAHAI_META_FA.name,
  buddhism: BUDDHISM_META_FA.name,
  hinduism: HINDUISM_META_FA.name,
  islam: ISLAM_META_FA.name,
  judaism: JUDAISM_META_FA.name,
  gnosticism: GNOSTICISM_META_FA.name,
  christianity: CHRISTIANITY_META_FA.name,
  zoroastrian: ZOROASTRIAN_META_FA.name,
  sikhism: SIKHISM_META_FA.name,
  manichaean: MANICHAEAN_META_FA.name,
  mesoamerican: MESOAMERICAN_META_FA.name,
  taoism: TAOISM_META_FA.name,
  "chinese-folk": CHINESE_FOLK_META_FA.name,
  confucianism: CONFUCIANISM_META_FA.name,
  shinto: SHINTO_META_FA.name,
  jainism: JAINISM_META_FA.name,
  yoruba: YORUBA_META_FA.name,
  canaanite: "دین کنعانی",
};
