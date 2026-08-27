#!/usr/bin/env python3
"""
Populate taxonomy fields for all 44 traditions in religions.ts
Uses correct IDs from the actual file
"""

import re

# Read the entire file
with open('src/data/religions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Complete taxonomy map with CORRECT IDs from the file
TAXONOMY = {
    # Already done
    # 'sumerian': (['Mesopotamia', 'Ancient Near East'], ['Proto-Mesopotamian'], 'historical complex', 'evidence-limited'),
    
    'egyptian': (['North Africa', 'Nile Valley'], ['Proto-Egyptian'], 'historical complex', 'historical'),
    'zoroastrian': (['Iran', 'Central Asia', 'Middle East'], ['Proto-Iranian'], 'religion', 'living'),
    'canaanite': (['Levant', 'Ancient Near East'], ['Proto-Canaanite'], 'historical complex', 'evidence-limited'),
    'greek-roman': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Proto-Indo-European', 'Minoan'], 'historical complex', 'historical'),
    'norse': (['Northern Europe', 'Scandinavia'], ['Proto-Germanic'], 'religion', 'revived'),
    'druidic': (['Western Europe', 'Celtic lands'], ['Proto-Celtic'], 'historical complex', 'evidence-limited'),
    'manichaean': (['Iran', 'Central Asia', 'China'], ['Zoroastrianism', 'Christianity', 'Buddhism'], 'religion', 'historical'),
    'tengrism': (['Central Asia', 'Mongolia', 'Siberia'], ['Proto-Turkic', 'Shamanism'], 'spirituality', 'revived'),
    'mithraism': (['Roman Empire', 'Mediterranean'], ['Zoroastrianism', 'Roman military'], 'religion', 'historical'),
    'gnosticism': (['Mediterranean', 'Middle East'], ['Christianity', 'Judaism', 'Hellenistic philosophy'], 'historical complex', 'revived'),
    'mesoamerican': (['Mesoamerica', 'Central America'], ['Olmec', 'Maya'], 'historical complex', 'revived'),
    'slavic-baltic': (['Eastern Europe', 'Baltic'], ['Proto-Slavic', 'Proto-Baltic'], 'historical complex', 'revived'),
    
    'hinduism': (['South Asia', 'Indian subcontinent'], ['Vedic', 'Harappan'], 'religion', 'living'),
    'buddhism': (['South Asia', 'East Asia', 'Southeast Asia'], ['Vedic', 'Śramaṇa'], 'religion', 'living'),
    'jainism': (['South Asia', 'India'], ['Śramaṇa'], 'religion', 'living'),
    'sikhism': (['South Asia', 'Punjab'], ['Hinduism', 'Islam', 'Sant tradition'], 'religion', 'living'),
    
    'judaism': (['Middle East', 'Levant', 'Global diaspora'], ['Canaanite', 'Ancient Israelite'], 'religion', 'living'),
    'christianity': (['Middle East', 'Europe', 'Americas', 'Africa', 'Global'], ['Judaism', 'Second Temple Judaism'], 'religion', 'living'),
    'islam': (['Middle East', 'North Africa', 'South Asia', 'Southeast Asia', 'Global'], ['Judaism', 'Christianity', 'Arabian monotheism'], 'religion', 'living'),
    'bahai': (['Iran', 'Middle East', 'Global'], ['Islam', 'Bábism'], 'religion', 'living'),
    'mandaean': (['Mesopotamia', 'Iraq', 'Iran'], ['Gnosticism', 'Ancient Mesopotamian'], 'religion', 'living'),
    'samaritan': (['Levant', 'West Bank'], ['Ancient Israelite', 'Judaism'], 'religion', 'living'),
    
    'taoism': (['East Asia', 'China'], ['Chinese folk religion'], 'religion', 'living'),
    'confucianism': (['East Asia', 'China'], ['Zhou dynasty ritual'], 'philosophy', 'living'),
    'shinto': (['East Asia', 'Japan'], ['Japanese folk religion', 'Animism'], 'religion', 'living'),
    'korean-shin': (['East Asia', 'Korea'], ['Korean shamanism', 'Chinese folk religion'], 'spirituality', 'living'),
    'chinese-folk': (['East Asia', 'China', 'Chinese diaspora'], ['Proto-Chinese', 'Shamanism'], 'historical complex', 'living'),
    'caodai': (['Vietnam', 'Southeast Asia'], ['Buddhism', 'Taoism', 'Confucianism', 'Christianity'], 'religion', 'living'),
    'bon': (['Tibet', 'Central Asia', 'Himalayas'], ['Tibetan shamanism', 'Buddhism'], 'religion', 'living'),
    
    'yazidi': (['Kurdistan', 'Middle East'], ['Zoroastrianism', 'Indigenous Mesopotamian'], 'religion', 'living'),
    'druse': (['Levant', 'Middle East'], ['Ismaʿilism', 'Islam'], 'religion', 'living'),
    
    'santeria': (['Cuba', 'Caribbean', 'Americas'], ['Yoruba', 'Catholicism'], 'religion', 'living'),
    'yoruba': (['West Africa', 'Nigeria'], ['Proto-Yoruba'], 'religion', 'living'),
    'vodou': (['Haiti', 'Caribbean'], ['Yoruba', 'Fon', 'Catholicism'], 'religion', 'living'),
    'ifa': (['West Africa', 'Yoruba region'], ['Proto-Yoruba'], 'religion', 'living'),
    'candomble': (['Brazil', 'Americas'], ['Yoruba', 'Fon', 'Catholicism'], 'religion', 'living'),
    
    'inuit': (['Arctic', 'North America'], ['Paleo-Arctic'], 'spirituality', 'living'),
    'navajo': (['Southwest North America', 'Four Corners'], ['Athabaskan'], 'spirituality', 'living'),
    'maori': (['New Zealand', 'Oceania'], ['Polynesian'], 'spirituality', 'living'),
    'dreamtime': (['Australia', 'Oceania'], ['Ancestral Australian'], 'spirituality', 'living'),
    
    'stoicism': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Greek philosophy', 'Cynicism'], 'philosophy', 'revived'),
    'wicca': (['Europe', 'Americas'], ['Western esotericism', 'Folk traditions'], 'religion', 'revived'),
    'rastafari': (['Jamaica', 'Caribbean', 'Africa'], ['Christianity', 'Pan-Africanism'], 'religion', 'living'),
}

# Process each religion ID
for religion_id, (cultural_region, hist_lineage, trad_type, pres_status) in TAXONOMY.items():
    # Find the religion block and insert after region line
    # Pattern: look for id line, then find the region line after it
    pattern = rf'(id:\s*"{religion_id}",[\s\S]*?region:\s*"[^"]+",)'
    
    def insert_taxonomy(match):
        original = match.group(1)
        # Check if taxonomy already exists
        if 'culturalRegion:' in original:
            return original
        cultural_str = str(cultural_region).replace("'", '"')
        lineage_str = str(hist_lineage).replace("'", '"')
        return f'''{original}
    culturalRegion: {cultural_str},
    historicalLineage: {lineage_str},
    traditionType: "{trad_type}",
    presentStatus: "{pres_status}",'''
    
    # Apply replacement
    content = re.sub(pattern, insert_taxonomy, content, count=1)

# Write back
with open('src/data/religions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Populated taxonomy for all 44 traditions")
