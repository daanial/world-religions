#!/usr/bin/env python3
import re

# Read the file
with open('src/data/religions.ts', 'r') as f:
    content = f.read()

# Taxonomy mappings: id -> (culturalRegion, historicalLineage, traditionType, presentStatus)
taxonomy = {
    'egyptian': (['North Africa', 'Nile Valley'], ['Proto-Egyptian'], 'historical complex', 'historical'),
    'norse': (['Northern Europe', 'Scandinavia'], ['Proto-Germanic', 'Proto-Indo-European'], 'religion', 'revived'),
    'mayan': (['Mesoamerica', 'Central America'], ['Olmec', 'Preclassic Mesoamerican'], 'historical complex', 'revived'),
    'inuit': (['Arctic', 'North America'], ['Paleo-Arctic', 'Thule tradition'], 'spirituality', 'living'),
    'navajo': (['Southwest North America', 'Four Corners'], ['Athabaskan', 'Puebloan'], 'spirituality', 'living'),
    'aboriginal': (['Australia', 'Oceania'], ['Ancestral Australian'], 'spirituality', 'living'),
    'vodou': (['Caribbean', 'Haiti', 'West Africa'], ['Yoruba', 'Fon', 'Catholicism'], 'religion', 'living'),
    'yoruba': (['West Africa', 'Nigeria'], ['Proto-Yoruba'], 'religion', 'living'),
    'zoroastrianism': (['Iran', 'Central Asia', 'South Asia'], ['Proto-Iranian', 'Indo-Iranian'], 'religion', 'living'),
    'hinduism': (['South Asia', 'Indian subcontinent', 'Southeast Asia'], ['Vedic', 'Harappan', 'Indo-Aryan'], 'religion', 'living'),
    'buddhism': (['South Asia', 'East Asia', 'Southeast Asia'], ['Vedic', 'Śramaṇa'], 'religion', 'living'),
    'jainism': (['South Asia', 'India'], ['Śramaṇa', 'Tirthankaras'], 'religion', 'living'),
    'judaism': (['Middle East', 'Levant', 'Global diaspora'], ['Canaanite', 'Ancient Israelite', 'Second Temple'], 'religion', 'living'),
    'christianity': (['Middle East', 'Europe', 'Americas', 'Africa', 'Global'], ['Judaism', 'Second Temple', 'Hellenistic Judaism'], 'religion', 'living'),
    'islam': (['Middle East', 'North Africa', 'South Asia', 'Southeast Asia', 'Global'], ['Judaism', 'Christianity', 'Arabian monotheism'], 'religion', 'living'),
    'sikhism': (['South Asia', 'Punjab'], ['Hinduism', 'Islam', 'Sant tradition', 'Bhakti'], 'religion', 'living'),
    'taoism': (['East Asia', 'China'], ['Chinese folk religion', 'Shamanism'], 'religion', 'living'),
    'confucianism': (['East Asia', 'China'], ['Zhou dynasty ritual', 'Ancient Chinese philosophy'], 'philosophy', 'living'),
    'shinto': (['East Asia', 'Japan'], ['Japanese folk religion', 'Animism'], 'religion', 'living'),
    'bon': (['Tibet', 'Central Asia', 'Himalayas'], ['Tibetan shamanism', 'Buddhism'], 'religion', 'living'),
    'bahai': (['Iran', 'Middle East', 'Global'], ['Islam', 'Bábism', 'Shaykhism'], 'religion', 'living'),
    'mormonism': (['Americas', 'United States', 'Global'], ['Christianity', 'Restorationism'], 'religion', 'living'),
    'scientology': (['United States', 'Global'], ['Western esotericism', 'Dianetics', 'New Thought'], 'religion', 'living'),
    'wicca': (['Europe', 'Americas'], ['Western esotericism', 'Folk traditions', 'Ceremonial magic'], 'religion', 'living'),
    'satanism': (['Western world', 'Global'], ['Enlightenment', 'Humanism', 'Western esotericism'], 'philosophy', 'living'),
    'druze': (['Levant', 'Middle East'], ['Isma\'ilism', 'Islam', 'Neoplatonism'], 'religion', 'living'),
    'yazidism': (['Kurdistan', 'Middle East'], ['Zoroastrianism', 'Islam', 'Indigenous Mesopotamian'], 'religion', 'living'),
    'cao_dai': (['Vietnam', 'Southeast Asia'], ['Buddhism', 'Taoism', 'Confucianism', 'Christianity', 'Spiritism'], 'religion', 'living'),
    'tenrikyo': (['Japan', 'East Asia'], ['Shinto', 'Buddhism', 'Japanese folk religion'], 'religion', 'living'),
    'rastafari': (['Jamaica', 'Caribbean', 'Africa'], ['Christianity', 'Pan-Africanism', 'Ethiopian Orthodoxy'], 'religion', 'living'),
    'unitarian': (['Europe', 'Americas'], ['Christianity', 'Liberal Protestantism', 'Enlightenment'], 'religion', 'living'),
    'quaker': (['Europe', 'Americas'], ['Christianity', 'Radical Reformation', 'Puritanism'], 'religion', 'living'),
    'spiritism': (['Brazil', 'Americas', 'Europe'], ['Christianity', 'Spiritualism', 'Reincarnation'], 'religion', 'living'),
    'stoicism': (['Mediterranean', 'Ancient Greece', 'Roman Empire'], ['Greek philosophy', 'Cynicism', 'Heraclitus'], 'philosophy', 'revived'),
    'epicureanism': (['Mediterranean', 'Ancient Greece'], ['Greek philosophy', 'Atomism'], 'philosophy', 'historical'),
    'neoplatonism': (['Mediterranean', 'Late Antiquity'], ['Platonism', 'Mystery religions', 'Middle Platonism'], 'philosophy', 'revived'),
    'gnosticism': (['Mediterranean', 'Middle East'], ['Christianity', 'Judaism', 'Hellenistic philosophy'], 'historical complex', 'revived'),
    'manichaeism': (['Iran', 'Central Asia', 'China', 'Roman Empire'], ['Zoroastrianism', 'Christianity', 'Buddhism', 'Gnosticism'], 'religion', 'historical'),
    'mithraism': (['Roman Empire', 'Mediterranean'], ['Zoroastrianism', 'Roman military culture'], 'religion', 'historical'),
    'orphism': (['Ancient Greece', 'Mediterranean'], ['Greek mystery cults', 'Dionysian tradition'], 'religion', 'historical'),
    'pythagoreanism': (['Ancient Greece', 'Mediterranean'], ['Greek philosophy', 'Orphism'], 'philosophy', 'historical'),
    'shakers': (['United States', 'Americas'], ['Christianity', 'Quaker', 'Millennialism'], 'religion', 'historical'),
    'cathar': (['Southern Europe', 'Medieval France'], ['Gnosticism', 'Christianity', 'Bogomilism'], 'religion', 'historical'),
}

# Process each religion
for rid, (cultural_region, hist_lineage, trad_type, pres_status) in taxonomy.items():
    # Find pattern: id: "rid", ... region: "XXX",
    pattern = rf'(id:\s*"{rid}",[\s\S]*?region:\s*"[^"]+",)'
    
    def replacer(match):
        original = match.group(1)
        # Add taxonomy fields after region
        cultural_str = str(cultural_region).replace("'", '"')
        lineage_str = str(hist_lineage).replace("'", '"')
        return f'''{original}
    culturalRegion: {cultural_str},
    historicalLineage: {lineage_str},
    traditionType: "{trad_type}",
    presentStatus: "{pres_status}",'''
    
    content = re.sub(pattern, replacer, content, count=1)

# Write back
with open('src/data/religions.ts', 'w') as f:
    f.write(content)

print("Added taxonomy to 43 remaining traditions")
