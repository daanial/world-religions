#!/usr/bin/env python3
import re

with open('src/data/religions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Correct IDs with taxonomy
TAXONOMY = {
    'egyptian': (['North Africa', 'Nile Valley'], ['Proto-Egyptian'], 'historical complex', 'historical'),
    'zoroastrian': (['Iran', 'Central Asia', 'Middle East'], ['Proto-Iranian'], 'religion', 'living'),
    'canaanite': (['Levant', 'Ancient Near East'], ['Proto-Canaanite'], 'historical complex', 'evidence-limited'),
    'greek-roman': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Proto-Indo-European'], 'historical complex', 'historical'),
    'norse': (['Northern Europe', 'Scandinavia'], ['Proto-Germanic'], 'religion', 'revived'),
    'druidic': (['Western Europe', 'Celtic lands'], ['Proto-Celtic'], 'historical complex', 'evidence-limited'),
    'manichaean': (['Iran', 'Central Asia'], ['Zoroastrianism', 'Christianity', 'Buddhism'], 'religion', 'historical'),
    'tengrism': (['Central Asia', 'Mongolia'], ['Proto-Turkic', 'Shamanism'], 'spirituality', 'revived'),
    'mithraism': (['Roman Empire', 'Mediterranean'], ['Zoroastrianism'], 'religion', 'historical'),
    'gnosticism': (['Mediterranean', 'Middle East'], ['Christianity', 'Judaism'], 'historical complex', 'revived'),
    'mesoamerican': (['Mesoamerica', 'Central America'], ['Olmec', 'Maya'], 'historical complex', 'revived'),
    'slavic-baltic': (['Eastern Europe', 'Baltic'], ['Proto-Slavic'], 'historical complex', 'evidence-limited'),
    'hinduism': (['South Asia', 'Indian subcontinent'], ['Vedic', 'Harappan'], 'religion', 'living'),
    'buddhism': (['South Asia', 'East Asia', 'Southeast Asia'], ['Vedic', 'Śramaṇa'], 'religion', 'living'),
    'jainism': (['South Asia', 'India'], ['Śramaṇa'], 'religion', 'living'),
    'sikhism': (['South Asia', 'Punjab'], ['Hinduism', 'Islam', 'Sant tradition'], 'religion', 'living'),
    'judaism': (['Middle East', 'Levant', 'Global diaspora'], ['Canaanite', 'Ancient Israelite'], 'religion', 'living'),
    'christianity': (['Middle East', 'Europe', 'Americas', 'Africa', 'Global'], ['Judaism'], 'religion', 'living'),
    'islam': (['Middle East', 'North Africa', 'South Asia', 'Southeast Asia', 'Global'], ['Judaism', 'Christianity'], 'religion', 'living'),
    'bahai': (['Iran', 'Middle East', 'Global'], ['Islam', 'Bábism'], 'religion', 'living'),
    'mandaean': (['Mesopotamia', 'Iraq'], ['Gnosticism'], 'religion', 'living'),
    'samaritan': (['Levant', 'West Bank'], ['Ancient Israelite'], 'religion', 'living'),
    'taoism': (['East Asia', 'China'], ['Chinese folk religion'], 'religion', 'living'),
    'confucianism': (['East Asia', 'China'], ['Zhou dynasty'], 'philosophy', 'living'),
    'shinto': (['East Asia', 'Japan'], ['Japanese folk religion'], 'religion', 'living'),
    'korean-shin': (['East Asia', 'Korea'], ['Korean shamanism'], 'spirituality', 'living'),
    'chinese-folk': (['East Asia', 'China'], ['Proto-Chinese', 'Shamanism'], 'historical complex', 'living'),
    'caodai': (['Vietnam', 'Southeast Asia'], ['Buddhism', 'Taoism', 'Confucianism', 'Christianity'], 'religion', 'living'),
    'bon': (['Tibet', 'Central Asia'], ['Tibetan shamanism', 'Buddhism'], 'religion', 'living'),
    'yazidi': (['Kurdistan', 'Middle East'], ['Zoroastrianism'], 'religion', 'living'),
    'druse': (['Levant', 'Middle East'], ['Islam', 'Ismaʿilism'], 'religion', 'living'),
    'santeria': (['Cuba', 'Caribbean'], ['Yoruba', 'Catholicism'], 'religion', 'living'),
    'yoruba': (['West Africa', 'Nigeria'], ['Proto-Yoruba'], 'religion', 'living'),
    'vodou': (['Haiti', 'Caribbean'], ['Yoruba', 'Fon', 'Catholicism'], 'religion', 'living'),
    'ifa': (['West Africa', 'Yoruba region'], ['Proto-Yoruba'], 'religion', 'living'),
    'candomble': (['Brazil', 'Americas'], ['Yoruba', 'Catholicism'], 'religion', 'living'),
    'inuit': (['Arctic', 'North America'], ['Paleo-Arctic'], 'spirituality', 'living'),
    'navajo': (['Southwest North America'], ['Athabaskan'], 'spirituality', 'living'),
    'maori': (['New Zealand', 'Oceania'], ['Polynesian'], 'spirituality', 'living'),
    'dreamtime': (['Australia', 'Oceania'], ['Ancestral Australian'], 'spirituality', 'living'),
    'stoicism': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Greek philosophy'], 'philosophy', 'revived'),
    'wicca': (['Europe', 'Americas'], ['Western esotericism'], 'religion', 'revived'),
    'rastafari': (['Jamaica', 'Caribbean'], ['Christianity', 'Pan-Africanism'], 'religion', 'living'),
}

for rid, (cr, hl, tt, ps) in TAXONOMY.items():
    pattern = rf'(id:\s*"{rid}",[\s\S]*?region:\s*"[^"]+",)'
    def rep(m):
        o = m.group(1)
        if 'culturalRegion:' in o: return o
        return f'''{o}
    culturalRegion: {str(cr).replace("'",'"')},
    historicalLineage: {str(hl).replace("'",'"')},
    traditionType: "{tt}",
    presentStatus: "{ps}",'''
    content = re.sub(pattern, rep, content, count=1)

with open('src/data/religions.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
