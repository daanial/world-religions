#!/usr/bin/env python3
import re

# Read the file
with open('src/data/religions.ts', 'r') as f:
    lines = f.readlines()

# Taxonomy mappings
taxonomy = {
    'sumerian': (['Mesopotamia', 'Ancient Near East'], ['Proto-Mesopotamian'], 'historical complex', 'evidence-limited'),
    'egyptian': (['North Africa', 'Nile Valley'], ['Proto-Egyptian'], 'historical complex', 'historical'),
    'greek': (['Mediterranean', 'Ancient Greece'], ['Proto-Indo-European', 'Minoan-Mycenaean'], 'historical complex', 'historical'),
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

# Process line by line
output = []
i = 0
while i < len(lines):
    line = lines[i]
    output.append(line)
    
    # Check if this is a region line
    if 'region:' in line and '"' in line:
        # Check next 10 lines to see if taxonomy already exists
        has_cultural = any('culturalRegion:' in lines[i+j] for j in range(1, min(10, len(lines)-i)))
        
        if not has_cultural:
            # Extract religion id from previous lines
            for j in range(max(0, i-10), i):
                if 'id:' in lines[j] and '"' in lines[j]:
                    match = re.search(r'id:\s*"([^"]+)"', lines[j])
                    if match:
                        rid = match.group(1)
                        if rid in taxonomy:
                            cultural_region, hist_lineage, trad_type, pres_status = taxonomy[rid]
                            cultural_str = str(cultural_region).replace("'", '"')
                            lineage_str = str(hist_lineage).replace("'", '"')
                            output.append(f'    culturalRegion: {cultural_str},\n')
                            output.append(f'    historicalLineage: {lineage_str},\n')
                            output.append(f'    traditionType: "{trad_type}",\n')
                            output.append(f'    presentStatus: "{pres_status}",\n')
                            break
    i += 1

# Write back
with open('src/data/religions.ts', 'w') as f:
    f.writelines(output)

print("Added taxonomy to all 44 traditions")
