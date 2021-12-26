// TODO: this only handle the PHB.
const base = require("./data/5ebits__5e-database__5e-SRD-Spells.json");
// extract tags, components, type
const vorpalhex = require("./data/vorpalhex__srd_spells__spells.json");
// extract page data + transform to source
const jcquinlan = require("./data/jcquinlan__dnd-spells__spells.json");

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
  const data = extractRetardUnit(range);
  const metric = convertRetardUnitToMetric(range);

  return {
    type: data.type,
    retardUnit: {
      amount: data.amount, 
      unit: data.unit
    },
    metricUnit: {
      amount: metric.amount, 
      unit: metric.unit
    }
  }
}

function transform(baseSpell) {
  const vorpalhexSpell = vorpalhex.find(
    (spell) => spell.name.toLowerCase() === baseSpell.name.toLowerCase()
  );
  const jcquinlanSpell = jcquinlan.find(
    (spell) => spell.name.toLowerCase() === baseSpell.name.toLowerCase()
  );

  if (!vorpalhexSpell) {
    console.warn(`vorpalhexSpell not found for ${baseSpell.name}`);
  }

  if (!jcquinlanSpell) {
    console.warn(`jcquinlanSpell not found for ${baseSpell.name}`);
  }

  return {
    index: baseSpell.index,
    level: baseSpell.level,
    url: baseSpell.url,
    name: {
      en: baseSpell.name,
      fr: null,
    },
    desc: {
      en: baseSpell.desc,
      fr: null,
    },
    higherLevel: {
      en: baseSpell.higher_level,
      fr: null,
    },
    range: transformRange(baseSpell.range),

    // components: ,

    ritual: baseSpell.ritual,
    concentration: baseSpell.concentration,
    castingTime: buildCastingTime(baseSpell.casting_time),
    duration: buildDuration(baseSpell.duration),
    healAtSlotLevel: baseSpell.heal_at_slot_level,
    school: {
      index: baseSpell.school.index,
      url: baseSpell.school.url,
      name: {
        en: baseSpell.school.name,
        fr: translateMagicSchool("fr", baseSpell.school.name),
      },
    },
    classes: baseSpell.classes.map((clss) => ({
      index: clss.index,
      url: clss.url,
      name: { en: clss.name, fr: translateCharacterClass("fr", clss.name) },
    })),
    subclasses: baseSpell.subclasses.map((subclass) => ({
      index: subclass.index,
      url: subclass.url,
      name: { en: subclass.name, fr: translateSubclass("fr", subclass.name) },
    })),

    page: jcquinlanSpell?.page || undefined,
    source: jcquinlanSpell?.page
      ? parseSourceFromPage(jcquinlanSpell.page)
      : undefined,

    type: vorpalhexSpell?.type,
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
