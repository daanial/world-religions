// Persian translations for the concept network's labels/descriptions.
// Unlike the 44 religion articles (deferred), this dataset is small
// (19 short entries) and is translated in full rather than stubbed.
// See src/data/concepts.ts for the English source / ConceptId union.
import type { ConceptId } from "./concepts";

export const CONCEPTS_FA: Record<ConceptId, { label: string; description: string }> = {
  soul: { label: "روح", description: "خودِ پایدار — جاودانه، بازمتولدشونده یا مورد داوری." },
  salvation: { label: "رستگاری", description: "رهایی از گناه، مرگ یا نادانی." },
  sacrifice: { label: "قربانی", description: "پیشکشی که انسان و امر الوهی را به هم پیوند می‌دهد." },
  enlightenment: { label: "روشن‌شدگی", description: "بیداری مستقیم به ماهیت واقعیت." },
  judgement: { label: "داوری", description: "حساب‌رسیِ یک زندگی پس از مرگ." },
  nonviolence: { label: "عدم خشونت", description: "اهیمسا — سر باز زدن از آسیب رساندن به هر موجود زنده." },
  mysticism: { label: "عرفان", description: "پیوندی مستقیم و اغلب وصف‌ناپذیر با امر الوهی." },
  monotheism: { label: "یکتاپرستی", description: "یک خدا، یک سرچشمه برای همه‌چیز." },
  polytheism: { label: "چندخدایی", description: "خدایانی بسیار، چهره‌های گوناگون امر مقدس." },
  reincarnation: { label: "تناسخ", description: "بازگشت روح در کالبدهایی تازه." },
  karma: { label: "کارما", description: "کنش و پیامدهای آن در امتداد زندگی‌ها." },
  liberation: { label: "رهایی", description: "رهایی از چرخه‌ی رنج." },
  heaven: { label: "بهشت", description: "بهشت — پاداش پرهیزگاران." },
  hell: { label: "دوزخ", description: "مجازات یا جدایی از خیر." },
  sin: { label: "گناه", description: "نقض قانون الوهی یا کیهانی." },
  meditation: { label: "مراقبه", description: "پرورش منظم بینش درونی." },
  prayer: { label: "نیایش", description: "سخنی خطاب به امر الوهی." },
  fasting: { label: "روزه", description: "خودداری از خواسته‌های نفس به‌عنوان فداکاری یا تزکیه." },
  pilgrimage: { label: "زیارت", description: "سفری مقدس به مکانی مقدس." },
};
