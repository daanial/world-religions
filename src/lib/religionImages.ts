const RELIGION_IMAGE_FILES: Record<string, string> = {
  sumerian: "sumerian.png",
  egyptian: "egyptian.png",
  zoroastrian: "Zoroastrianism.png",
  canaanite: "Canaanite.png",
  "greek-roman": "Greco-Roman.png",
  norse: "Norse.png",
  druidic: "Celtic.png",
  manichaean: "Manichaeism.png",
  tengrism: "tengrism.png",
  mithraism: "Mithraism.png",
  hinduism: "Hindu.png",
  buddhism: "Buddhism.png",
  jainism: "jainism.png",
  sikhism: "Sikhism.png",
  judaism: "judaism.png",
  christianity: "christianity.png",
  islam: "islam.png",
  bahai: "bahai.png",
  taoism: "daoism.png",
  shinto: "shinto.png",
  gnosticism: "gnosticism.png",
  confucianism: "confucianism.png",
  mesoamerican: "mesoamerican.png",
  mandaean: "mandaean.png",
  yoruba: "yoruba.png",
  bon: "bon.png",
  stoicism: "stoicism.png",
  "slavic-baltic": "slavic-baltic.png",
  samaritan: "samaritan.png",
  cheondogyo: "cheondogyo.png",
  "chinese-folk": "chinese-folk.png",
  caodai: "caodai.png",
};

export function getReligionImageSrc(religionId: string): string | undefined {
  const file = RELIGION_IMAGE_FILES[religionId];
  return file ? `/assets/img/${file}` : undefined;
}

const RELIGION_THUMBNAIL_FILES: Record<string, string> = {
  bahai: "bahai-thumb.png",
  taoism: "daoism-thumb.png",
  shinto: "shinto-thumb.png",
  gnosticism: "gnosticism-thumb.png",
  confucianism: "confucianism-thumb.png",
  mesoamerican: "mesoamerican-thumb.png",
  mandaean: "mandaean-thumb.png",
  yoruba: "yoruba-thumb.png",
  bon: "bon-thumb.png",
  stoicism: "stoicism-thumb.png",
  "slavic-baltic": "slavic-baltic-thumb.png",
  samaritan: "samaritan-thumb.png",
  cheondogyo: "cheondogyo-thumb.png",
  "chinese-folk": "chinese-folk-thumb.png",
  caodai: "caodai-thumb.png",
};

export function getReligionThumbnailSrc(religionId: string): string | undefined {
  const file = RELIGION_THUMBNAIL_FILES[religionId];
  return file ? `/assets/img/${file}` : undefined;
}
