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
import { slavicBalticArticle } from "./slavic-baltic";
import { stoicismArticle } from "./stoicism";
import { wiccaArticle } from "./wicca";

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
  "slavic-baltic": slavicBalticArticle,
  "stoicism": stoicismArticle,
  "sumerian": sumerianArticle,
  "taoism": taoismArticle,
  "tengrism": tengrismArticle,
  "vodou": vodouArticle,
  "wicca": wiccaArticle,
  "yazidi": yazidiArticle,
  "yoruba": yorubaArticle,
  "zoroastrian": zoroastrianArticle,
};