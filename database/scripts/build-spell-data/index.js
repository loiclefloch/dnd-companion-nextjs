// TODO: this only handle the PHB.
const base = require("./data/5ebits__5e-database__5e-SRD-Spells.json");
// extract tags, components, type
const vorpalhex = require("./data/vorpalhex__srd_spells__spells.json");
// extract page data + transform to source
const jcquinlan = require("./data/jcquinlan__dnd-spells__spells.json");
const aiddFR = require("./data/aidd_spells_fr.json")
const aiddEN = require("./data/aidd_spells_en.json")

const {
  extractRetardUnit,
  convertRetardUnitToMetric,
  buildDuration,
  buildCastingTime,
  translateMagicSchool,
  translateCharacterClass,
  translateSubclass,
  parseSourceFromPage,
} = require("./utils");

function transformRange(range) {
  const retardUnit = extractRetardUnit(range);
  const metricUnit = convertRetardUnitToMetric(range);

  return {
    type: retardUnit.type,
    retardUnit,
    metricUnit,
  }
}

function transformNameForVorpalhexSpell(baseName) {
  switch (baseName) {
    case 'Acid Arrow':
    case 'Arcane Hand':
    case 'Arcane Sword':
      return 'NOT_FOUND'

    // TODO: rest of the not found list
      
    default:
      return ''
  }
}

function transformNameForJcquinlanSpell(baseName) {
  switch (baseName) {
    case 'Acid Arrow':
      return `Melf's Acid Arrow`

    case 'Arcane Hand':
      return `Bigby's Hand`

    case 'Arcane Sword':
      return `Mordenkainen's Faithful Hound`

    // TODO: rest of the not found list

    default:
      return ''
  }
}

function formatComponents(baseSpellComponents, baseSpellMaterials, vorpalhexSpell) {
  if (!vorpalhexSpell) {
    return {
      material: baseSpellComponents.includes("M"),
      somatic: baseSpellComponents.includes("S"),
      verbal: baseSpellComponents.includes("V"),
      materials: baseSpellMaterials,
      components: baseSpellComponents,
      raw: {
        // TODO: fr
        en: baseSpellComponents.join(',') + (!baseSpellMaterials ? '' : ` (${baseSpellMaterials})`)
      }
    }
  }
  return {
    material: vorpalhexSpell.material,
    somatic: vorpalhexSpell.somatic,
    verbal: vorpalhexSpell.verbal,
    materials: vorpalhexSpell.materials_needed,
    components: baseSpellComponents,
    text: {
      // TODO: fr
      en: vorpalhexSpell.raw,
    },

  }
}

function getAiddSpell(baseSpell) {
 const aiddSpellEN = aiddEN.find(
   (spell) =>
     spell.Spell.toLowerCase() === baseSpell.name.toLowerCase() ||
     // name does not match, convert it to the used name
     spell.Spell.toLowerCase() ===
       transformNameForJcquinlanSpell(baseSpell.name).toLowerCase()
 );
 if (!aiddSpellEN) {
  // disabled for now
  //  console.warn(`aidd not found for en ${baseSpell.name}`);
  return null
 }

 const aiddSpellFR = aiddFR.find(
   (spell) => spell.VO.toLowerCase() === aiddSpellEN.Spell.toLowerCase()
 );
 if (!aiddSpellFR) {
   // disabled for now
   // console.warn(`aidd not found for fr ${baseSpell.name}`);
 }

  return {
    nameLocalized: {
      en: aiddSpellEN.Spell,
      fr: aiddSpellFR?.Sort,
    },
    resume: {
      en: aiddSpellEN.Description,
      fr: aiddSpellFR.Description,
    },
    source: aiddSpellEN.Source,
  }
}

function transform(baseSpell) {
  const vorpalhexSpell = vorpalhex.find(
    (spell) => spell.name.toLowerCase() === baseSpell.name.toLowerCase() || spell.name.toLowerCase() === transformNameForVorpalhexSpell(baseSpell.name).toLowerCase()
  );
  const jcquinlanSpell = jcquinlan.find(
    (spell) => spell.name.toLowerCase() === baseSpell.name.toLowerCase() || spell.name.toLowerCase() === transformNameForJcquinlanSpell(baseSpell.name).toLowerCase()
  );

  if (!vorpalhexSpell) {
    console.warn(`vorpalhexSpell not found for ${baseSpell.name}`);
  }

  if (!jcquinlanSpell) {
    console.warn(`jcquinlanSpell not found for ${baseSpell.name}`);
  }

  const aiddSpell = getAiddSpell(baseSpell)

  const nameLocalized = {
    en: baseSpell.name,
    fr: aiddSpell?.nameLocalized.fr,
  };
   
  const otherNameLocalized = {
    en: (aiddSpell && nameLocalized.en !== aiddSpell.nameLocalized.en)
        ? aiddSpell.nameLocalized.en
        : null,
    fr: null, // only one source right now
  };
 
  return {
    index: baseSpell.index,
    level: baseSpell.level,
    url: baseSpell.url,
    name: baseSpell.name,
    nameLocalized,
    otherNameLocalized,
    resume: {
      en: aiddSpell?.resume.en || 'no resume',
      fr: aiddSpell?.resume.fr || 'no resume',
    },
    desc: {
      en: baseSpell.desc,
      fr: null,
    },
    higherLevel: baseSpell.higher_level && {
      en: baseSpell.higher_level,
      fr: null,
    },
    range: transformRange(baseSpell.range),

    components: formatComponents(baseSpell.components, baseSpell.materials, vorpalhexSpell?.components),

    ritual: baseSpell.ritual,
    concentration: baseSpell.concentration,
    castingTime: buildCastingTime(baseSpell.casting_time),
    duration: buildDuration(baseSpell.duration),
    healAtSlotLevel: baseSpell.heal_at_slot_level,
    school: {
      index: baseSpell.school.index,
      url: baseSpell.school.url,
      name: baseSpell.school.name,
      nameLocalized: {
        en: baseSpell.school.name,
        fr: translateMagicSchool("fr", baseSpell.school.name),
      },
    },
    classes: baseSpell.classes.map((clss) => ({
      index: clss.index,
      url: clss.url,
      name: clss.name,
      nameLocalized: { en: clss.name, fr: translateCharacterClass("fr", clss.name) },
    })),
    subclasses: baseSpell.subclasses.map((subclass) => ({
      index: subclass.index,
      url: subclass.url,
      name: subclass.name,
      nameLocalized: { en: subclass.name, fr: translateSubclass("fr", subclass.name) },
    })),

    sourcePage: jcquinlanSpell?.page || undefined, // TODO: parse
    source: aiddSpell?.source || jcquinlanSpell?.page
      ? parseSourceFromPage(jcquinlanSpell.page)
      : undefined,

    type: vorpalhexSpell?.type, // TODO: translate
    tags: vorpalhexSpell?.tags,
  };
}

function main() {
  const spells = base
    // .filter((spell) => spell.index === "aid")
    .map(transform);
  console.log(JSON.stringify(spells, null, 2));
}

main();
