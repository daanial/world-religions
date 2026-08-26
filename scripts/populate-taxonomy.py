#!/usr/bin/env python3
"""
Populate taxonomy fields for all 44 traditions in religions.ts
Single file rewrite - reads entire file, populates missing fields, writes back
"""

import re

# Read the entire file
with open('src/data/religions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Complete taxonomy map for all 44 traditions
# Format: id -> (culturalRegion[], historicalLineage[], traditionType, presentStatus)
TAXONOMY = {
    'sumerian': (['Mesopotamia', 'Ancient Near East'], ['Proto-Mesopotamian'], 'historical complex', 'evidence-limited'),
    'egyptian': (['North Africa', 'Nile Valley'], ['Proto-Egyptian'], 'historical complex', 'historical'),
    'greek': (['Mediterranean', 'Ancient Greece'], ['Proto-Indo-European', 'Minoan-Mycenaean'], 'historical complex', 'historical'),
    'norse': (['Northern Europe', 'Scandinavia'], ['Proto-Germanic'], 'religion', 'revived'),
    'mayan': (['Mesoamerica', 'Central America'], ['Olmec'], 'historical complex', 'revived'),
    'inuit': (['Arctic', 'North America'], ['Paleo-Arctic'], 'spirituality', 'living'),
    'navajo': (['Southwest North America', 'Four Corners'], ['Athabaskan'], 'spirituality', 'living'),
    'aboriginal': (['Australia', 'Oceania'], ['Ancestral Australian'], 'spirituality', 'living'),
    'vodou': (['Caribbean', 'Haiti', 'West Africa'], ['Yoruba', 'Fon', 'Catholicism'], 'religion', 'living'),
    'yoruba': (['West Africa', 'Nigeria'], ['Proto-Yoruba'], 'religion', 'living'),
    'zoroastrianism': (['Iran', 'Central Asia', 'Middle East'], ['Proto-Iranian'], 'religion', 'living'),
    'hinduism': (['South Asia', 'Indian subcontinent'], ['Vedic', 'Harappan'], 'religion', 'living'),
    'buddhism': (['South Asia', 'East Asia', 'Southeast Asia'], ['Vedic', 'Śramaṇa'], 'religion', 'living'),
    'jainism': (['South Asia', 'India'], ['Śramaṇa'], 'religion', 'living'),
    'judaism': (['Middle East', 'Levant', 'Global diaspora'], ['Canaanite', 'Ancient Israelite'], 'religion', 'living'),
    'christianity': (['Middle East', 'Europe', 'Americas', 'Africa', 'Global'], ['Judaism', 'Second Temple Judaism'], 'religion', 'living'),
    'islam': (['Middle East', 'North Africa', 'South Asia', 'Southeast Asia', 'Global'], ['Judaism', 'Christianity', 'Arabian monotheism'], 'religion', 'living'),
    'sikhism': (['South Asia', 'Punjab'], ['Hinduism', 'Islam', 'Sant tradition'], 'religion', 'living'),
    'taoism': (['East Asia', 'China'], ['Chinese folk religion'], 'religion', 'living'),
    'confucianism': (['East Asia', 'China'], ['Zhou dynasty ritual'], 'philosophy', 'living'),
    'shinto': (['East Asia', 'Japan'], ['Japanese folk religion', 'Animism'], 'religion', 'living'),
    'bon': (['Tibet', 'Central Asia', 'Himalayas'], ['Tibetan shamanism', 'Buddhism'], 'religion', 'living'),
    'bahai': (['Iran', 'Middle East', 'Global'], ['Islam', 'Bábism'], 'religion', 'living'),
    'mormonism': (['Americas', 'United States'], ['Christianity', 'Restorationism'], 'religion', 'living'),
    'scientology': (['United States', 'Americas'], ['Western esotericism', 'Dianetics'], 'religion', 'living'),
    'wicca': (['Europe', 'Americas'], ['Western esotericism', 'Folk traditions'], 'religion', 'revived'),
    'satanism': (['Western world'], ['Enlightenment', 'Humanism'], 'philosophy', 'living'),
    'druze': (['Levant', 'Middle East'], ['Ismaʿilism', 'Islam'], 'religion', 'living'),
    'yazidism': (['Kurdistan', 'Middle East'], ['Zoroastrianism', 'Indigenous Mesopotamian'], 'religion', 'living'),
    'cao_dai': (['Vietnam', 'Southeast Asia'], ['Buddhism', 'Taoism', 'Confucianism', 'Christianity'], 'religion', 'living'),
    'tenrikyo': (['Japan', 'East Asia'], ['Shinto', 'Buddhism'], 'religion', 'living'),
    'rastafari': (['Jamaica', 'Caribbean', 'Africa'], ['Christianity', 'Pan-Africanism'], 'religion', 'living'),
    'unitarian': (['Europe', 'Americas'], ['Christianity', 'Liberal Protestantism'], 'religion', 'living'),
    'quaker': (['Europe', 'Americas'], ['Christianity', 'Radical Reformation'], 'religion', 'living'),
    'spiritism': (['Brazil', 'Americas'], ['Christianity', 'Spiritualism'], 'religion', 'living'),
    'stoicism': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Greek philosophy', 'Cynicism'], 'philosophy', 'revived'),
    'epicureanism': (['Mediterranean', 'Ancient Greece'], ['Greek philosophy', 'Atomism'], 'philosophy', 'historical'),
    'neoplatonism': (['Mediterranean', 'Late Antiquity'], ['Platonism', 'Mystery religions'], 'philosophy', 'revived'),
    'gnosticism': (['Mediterranean', 'Middle East'], ['Christianity', 'Judaism', 'Hellenistic philosophy'], 'historical complex', 'revived'),
    'manichaeism': (['Iran', 'Central Asia', 'China'], ['Zoroastrianism', 'Christianity', 'Buddhism'], 'religion', 'historical'),
    'mithraism': (['Roman Empire', 'Mediterranean'], ['Zoroastrianism', 'Roman military'], 'religion', 'historical'),
    'orphism': (['Ancient Greece', 'Mediterranean'], ['Greek mystery cults'], 'religion', 'historical'),
    'pythagoreanism': (['Ancient Greece', 'Mediterranean'], ['Greek philosophy', 'Orphism'], 'philosophy', 'historical'),
    'shakers': (['United States', 'Americas'], ['Christianity', 'Quaker'], 'religion', 'historical'),
    'cathar': (['Southern Europe', 'Medieval France'], ['Gnosticism', 'Christianity'], 'religion', 'historical'),
}

# Process each religion ID
for religion_id, (cultural_region, hist_lineage, trad_type, pres_status) in TAXONOMY.items():
    # Skip sumerian - already has taxonomy
    if religion_id == 'sumerian':
        continue
    
    # Find the religion block by searching for:
    # {
    #   id: "religion_id",
    #   ...
    #   region: "...",
    # and insert fields after region line
    
    pattern = rf'(\{{\s+id:\s*"{religion_id}",\s+.*?region:\s*"[^"]+",)'
    
    def insert_taxonomy(match):
        original = match.group(1)
        cultural_str = str(cultural_region).replace("'", '"')
        lineage_str = str(hist_lineage).replace("'", '"')
        return f'''{original}
    culturalRegion: {cultural_str},
    historicalLineage: {lineage_str},
    traditionType: "{trad_type}",
    presentStatus: "{pres_status}",'''
    
    # Apply replacement (DOTALL to match across lines)
    content = re.sub(pattern, insert_taxonomy, content, flags=re.DOTALL, count=1)

# Write back
with open('src/data/religions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Populated taxonomy for all 44 traditions")
