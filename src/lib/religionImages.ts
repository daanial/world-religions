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
};

export function getReligionImageSrc(religionId: string): string | undefined {
  const file = RELIGION_IMAGE_FILES[religionId];
  return file ? `/assets/img/${file}` : undefined;
}
