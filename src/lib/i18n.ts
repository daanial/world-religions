/**
 * Chrome/UI string dictionary — for short, structural, repeated copy
 * (nav labels, buttons, empty states). NOT for long-form page content
 * (About's essay, Landing's hero paragraphs, religion articles) — those
 * live in their own locale-scoped content modules so a translator works
 * with full paragraphs in context, not fragmented dictionary keys.
 * See docs/i18n-persian.md for the full picture and the translation
 * workflow.
 *
 * Every key below MUST exist in both `en` and `fa`. `useT()` falls back
 * to the English string if a Persian value is still empty, so an
 * in-progress translation never renders blank — it just reads in English
 * until that key is filled in.
 */
import { useLocale, type LocaleCode } from "./locale";

export interface UiStrings {
  skipToContent: string;
  loading: string;
  navHome: string;
  navTimeline: string;
  navGlobe: string;
  navTraditions: string;
  navCompare: string;
  navConcepts: string;
  navPilgrimage: string;
  navInwardPaths: string;
  navAbout: string;
  navMenuOpen: string;
  navMenuClose: string;
  navSoundOn: string;
  navSoundOff: string;
  navAchievementsUnlocked: string;
  footerTagline: string;
  footerExploreTitle: string;
  footerCreditTitle: string;
  footerCreditNote: string;
  footerStackLabel: string;
  notFoundTitle: string;
  notFoundLead: string;
  notFoundCta: string;
  notFoundSeoTitle: string;
  notFoundSeoDescription: string;
  navSoundToggleAria: string;
  navPrimaryAria: string;
  navLanguageAria: string;
  footerNavAria: string;
  footerStackAria: string;
  footerBottomFine: string;
  conceptsSeoTitle: string;
  conceptsSeoDescription: string;
  conceptsEyebrow: string;
  conceptsTitle: string;
  conceptsLead: string;
  conceptsExplore: string;
  conceptsSelected: string;
  conceptsTraditionSingular: string;
  conceptsTraditionPlural: string;
  conceptsDetailEyebrow: string;
  conceptsClose: string;
  conceptsConnected: string;
  conceptsEngaging: string;
  conceptsNoneTagged: string;
}

const en: UiStrings = {
  skipToContent: "Skip to main content",
  loading: "Loading…",
  navHome: "Home",
  navTimeline: "Timeline",
  navGlobe: "Globe",
  navTraditions: "Traditions",
  navCompare: "Compare",
  navConcepts: "Concepts",
  navPilgrimage: "Pilgrimage",
  navInwardPaths: "Inward Paths",
  navAbout: "About",
  navMenuOpen: "Open menu",
  navMenuClose: "Close menu",
  navSoundOn: "Mute ambient soundscape",
  navSoundOff: "Play ambient soundscape",
  navAchievementsUnlocked: "achievements unlocked",
  footerTagline:
    "A study aid and visual essay across 6,000 years of belief. Figures are approximate — traditions overlap, evolve, and resist tidy categories.",
  footerExploreTitle: "Explore",
  footerCreditTitle: "An educational project by",
  footerCreditNote: "Built for curiosity — no accounts, no tracking, open to wander.",
  footerStackLabel: "Made with",
  notFoundTitle: "Lost in the cosmos",
  notFoundLead: "This path leads nowhere — perhaps it was never drawn on the map.",
  notFoundCta: "Return home",
  notFoundSeoTitle: "Page not found",
  notFoundSeoDescription: "The page you requested could not be found on World Religions Explorer.",
  navSoundToggleAria: "Toggle ambient sound",
  navPrimaryAria: "Primary",
  navLanguageAria: "Language",
  footerNavAria: "Footer navigation",
  footerStackAria: "Technologies used",
  footerBottomFine: "World Religions Explorer · For educational use",
  conceptsSeoTitle: "Concept Network",
  conceptsSeoDescription:
    "Explore a force-directed map of karma, salvation, sacrifice, enlightenment, and other ideas shared across world religions.",
  conceptsEyebrow: "The big ideas",
  conceptsTitle: "Concept Network",
  conceptsLead:
    "The world's religions converge on a handful of great ideas — soul, salvation, karma, judgement. Tap any concept to see the traditions that hold it and the ideas that connect to it.",
  conceptsExplore: "Explore",
  conceptsSelected: "Selected",
  conceptsTraditionSingular: "tradition",
  conceptsTraditionPlural: "traditions",
  conceptsDetailEyebrow: "Concept detail",
  conceptsClose: "Close",
  conceptsConnected: "Connected concepts",
  conceptsEngaging: "Traditions engaging this concept",
  conceptsNoneTagged: "No traditions tagged yet.",
};

// TODO(fa-translation): fill in every value below. Leave a key as ""
// (empty string) and useT() will fall back to the English string above,
// so a partially-translated dictionary is always safe to ship.
const fa: UiStrings = {
  skipToContent: "پرش به محتوای اصلی",
  loading: "در حال بارگذاری…",
  navHome: "خانه",
  navTimeline: "جدول زمانی",
  navGlobe: "کره‌ی زمین",
  navTraditions: "سنت‌ها",
  navCompare: "مقایسه",
  navConcepts: "مفاهیم",
  navPilgrimage: "زیارت",
  navInwardPaths: "مسیرهای درونی",
  navAbout: "درباره",
  navMenuOpen: "باز کردن منو",
  navMenuClose: "بستن منو",
  navSoundOn: "خاموش کردن صدای محیط",
  navSoundOff: "پخش صدای محیط",
  navAchievementsUnlocked: "دستاورد باز شده",
  footerTagline:
    "ابزاری برای مطالعه و جستاری تصویری در امتداد ۶٬۰۰۰ سال باور. ارقام تقریبی‌اند — سنت‌ها با هم همپوشانی دارند، دگرگون می‌شوند و از دسته‌بندی‌های مرتب سر باز می‌زنند.",
  footerExploreTitle: "کاوش",
  footerCreditTitle: "پروژه‌ای آموزشی از",
  footerCreditNote: "برای کنجکاوی ساخته شده — بدون حساب کاربری، بدون ردیابی، آزاد برای گشت‌وگذار.",
  footerStackLabel: "ساخته‌شده با",
  notFoundTitle: "گم‌شده در کیهان",
  notFoundLead: "این مسیر به‌جایی نمی‌رسد — شاید هرگز روی نقشه ترسیم نشده بود.",
  notFoundCta: "بازگشت به خانه",
  notFoundSeoTitle: "صفحه پیدا نشد",
  notFoundSeoDescription: "صفحه‌ای که درخواست کردید در کاوشگر ادیان جهان یافت نشد.",
  navSoundToggleAria: "تغییر وضعیت صدای محیط",
  navPrimaryAria: "منوی اصلی",
  navLanguageAria: "زبان",
  footerNavAria: "پیوندهای پابرگ",
  footerStackAria: "فناوری‌های به‌کاررفته",
  footerBottomFine: "کاوشگر ادیان جهان · برای استفادهٔ آموزشی",
  conceptsSeoTitle: "شبکه‌ی مفاهیم",
  conceptsSeoDescription:
    "نقشه‌ای پویا از کارما، رستگاری، قربانی، روشن‌شدگی و دیگر ایده‌های مشترک میان ادیان جهان را کاوش کنید.",
  conceptsEyebrow: "ایده‌های بزرگ",
  conceptsTitle: "شبکه‌ی مفاهیم",
  conceptsLead:
    "ادیان جهان بر سرِ چند ایده‌ی بزرگ به هم می‌رسند — روح، رستگاری، کارما، داوری. روی هر مفهوم بزنید تا سنت‌هایی که به آن باور دارند و ایده‌هایی که به آن پیوند می‌خورند را ببینید.",
  conceptsExplore: "کاوش",
  conceptsSelected: "برگزیده",
  conceptsTraditionSingular: "سنت",
  conceptsTraditionPlural: "سنت",
  conceptsDetailEyebrow: "جزئیات مفهوم",
  conceptsClose: "بستن",
  conceptsConnected: "مفاهیم مرتبط",
  conceptsEngaging: "سنت‌های درگیر با این مفهوم",
  conceptsNoneTagged: "هنوز هیچ سنتی برچسب نخورده است.",
};

const DICTIONARIES: Record<LocaleCode, UiStrings> = { en, fa };

export function t(locale: LocaleCode, key: keyof UiStrings): string {
  return DICTIONARIES[locale][key] || DICTIONARIES.en[key];
}

/** Hook form: `const t = useT(); t("navHome")`. Reads locale from LocaleContext. */
export function useT() {
  const locale = useLocale();
  return (key: keyof UiStrings) => t(locale, key);
}
