//
// Range
//

const Range = {
  SELF: "self",
  TOUCH: "touch",
  SPECIAL: "special",
  SIGHT: "sight",
  UNLIMITED: "unlimited",
  DISTANT: "distant",
};

function isRangeSelf(str) {
  return str.toLowerCase() === Range.SELF;
}

function isRangeTouch(str) {
  return str.toLowerCase() === Range.TOUCH;
}

function isRangeSpecial(str) {
  return str.toLowerCase() === Range.SPECIAL;
}

function isRangeSight(str) {
  return str.toLowerCase() === Range.SIGHT;
}

function isRangeUnlimited(str) {
  return str.toLowerCase() === Range.UNLIMITED;
}

function extractRetardUnit(str) {
  if (isRangeSelf(str)) {
    return { amount: -1, type: Range.SELF, en: `self`, fr: "soi-même" };
  }
  if (isRangeTouch(str)) {
    return { amount: 0, type: Range.TOUCH, en: "touch", fr: "touché" };
  }
  if (isRangeSpecial(str)) {
    return { amount: -1, type: Range.SPECIAL, en: "special", fr: "spécial" };
  }
  if (isRangeSight(str)) {
    return { amount: -1, type: Range.SIGHT, en: "sight", fr: "en vue" };
  }
  if (isRangeUnlimited(str)) {
    return {
      amount: -1,
      type: Range.UNLIMITED,
      en: "unlimited",
      fr: "illimité",
    };
  }
  const regex = /(\d*) (feet|mile)/;
  const match = str.match(regex);
  if (!match) {
    throw new Error(`extractRetardUnit: ${str} not handled`);
  }
  const amount = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "feet":
      return {
        amount,
        type: Range.DISTANT,
        unit: "feet",
        en: `${amount} ${unit}`,
        fr: null,
      };

    case "mile":
      return {
        amount,
        type: Range.DISTANT,
        unit: "mile",
        en: `${amount} ${unit}`,
        fr: null,
      };

    default:
      throw new Error(`extractRetardUnit unit ${unit} not handled`);
  }
}

// 1 lbs = 1/2 kg, or 1 kg = 2 lbs.
// 1 inch = 2.5 cm
// 1 foot = 30 cm
// 1 yard = 1 meter
// 1 mile = 1.5 km.

function feetToMeters(feet) {
  // 5 feet = 1.5 meters
  return (feet / 5) * 1.5;
}

function mileToKilometers(mile) {
  // 1 mile = 1.6 kilometer, we use 1.5
  return mile * 1.5;
}

function convertRetardUnitToMetric(str) {
  const extract = extractRetardUnit(str);
  const { unit, type, amount } = extract;
  switch (type) {
    case "self":
    case "touch":
    case "special":
    case "sight":
    case "unlimited":
      return { ...extract };

    case "distant":
      switch (unit) {
        case "feet":
          return {
            amount: feetToMeters(amount),
            type,
            unit: "meter",
            en: `${amount} ${amount === 1 ? 'meter' : 'meters'}`,
            fr: `${amount} ${amount === 1 ? 'metre' : 'metres'}`,
          };

        case "mile":
          return {
            amount: mileToKilometers(amount),
            type,
            unit: "kilometer",
            en: `${amount} ${amount === 1 ? 'kilometer' : 'kilometers'}`,
            fr: `${amount} ${amount === 1 ? 'kilomètre' : 'kilomètres'}`,
          };
        default:
          throw new Error(`convertRetardUnitToMetric unit ${unit} not handled`);
      }

    default:
      throw new Error(`convertRetardUnitToMetric type ${type} not handled`);
  }
}

//
// Duration
//

const Duration = {
  INSTANTANEOUS: "instantaneous",
  DURATION: "duration",
  UNTIL_DISPELLED: "untilDispelled",
  SPECIAL: "special",
  HOUR: "hour",
  MINUTE: "minute",
  DAY: "day",
  ROUND: "round",
};

function isInstantaneous(str) {
  return str.toLowerCase() === Duration.INSTANTANEOUS;
}

function isUntilDispelled(str) {
  return str.toLowerCase() === "until dispelled";
}

function isSpecial(str) {
  return str.toLowerCase() === Duration.SPECIAL;
}

function getDurationTypeFromUnit(unit) {
  switch (unit) {
    case "hours":
    case "hour":
      return Duration.HOUR;
    case "minutes":
    case "minute":
      return Duration.MINUTE;
    case "days":
    case "day":
      return Duration.DAY;
    case "round":
      return Duration.ROUND;
    default:
      throw new Error(`getDurationTypeFromUnit: unit ${unit} not handled`);
  }
}

function buildDuration(str) {
  if (isInstantaneous(str)) {
    return {
      type: Duration.INSTANTANEOUS,
      [Duration.INSTANTANEOUS]: true,
      amount: 0,
      en: "Instantaneous",
      fr: "Instantané",
    };
  }
  if (isUntilDispelled(str)) {
    return {
      type: Duration.UNTIL_DISPELLED,
      [Duration.UNTIL_DISPELLED]: true,
      amount: -1,
      en: "Until dispelled",
      fr: `Jusqu'à désactivation`,
    };
  }
  if (isSpecial(str)) {
    return {
      type: Duration.SPECIAL,
      amount: -1,
      en: "Special",
      fr: "Spécial",
    };
  }
  const regex = /(Up to )?(\d*) (hours|hour|minutes|minute|days|day|round)/;
  const match = str.match(regex);
  if (!match) {
    throw new Error(`buildDuration: ${str} not handled`);
  }

  const isUpTo = !!match[1];
  const amount = match[2];
  const unit = match[3];

  const type = getDurationTypeFromUnit(unit);

  return {
    isUpTo,
    amount,
    [type]: true,
    type,
    en: str,
    fr: translateDurationUnit("fr", isUpTo, amount, unit),
  };
}

function translateDurationUnit(lang, isUpTo, amount, durationUnit) {
  const tr = {
    fr: {
      upTo: `jusqu'à`,
      hours: "heures",
      hour: "heure",
      minutes: "minutes",
      minute: "minute",
      days: "jours",
      day: "jour",
      round: "tour",
    },
  };
  const unitTranslation = tr[lang][durationUnit];
  if (!unitTranslation) {
    throw new Error(
      `translateDurationUnit: missing for ${lang} : ${durationUnit}`
    );
  }
  if (isUpTo) {
    const isUpToTr = tr[lang]["upTo"];
    if (!isUpToTr) {
      throw new Error(`translateDurationUnit: missing for ${lang} : upTo`);
    }
    return `${isUpToTr} ${amount} ${unitTranslation}`;
  }

  return `${amount} ${unitTranslation}`;
}

//
// Casting time
//

const CastingTime = {
  ACTION: "action",
  REACTION: "reaction",
  MINUTE: "minute",
  HOUR: "hour",
};

function buildCastingTime(str) {
  // TODO: must be on CastingTime
  const regex = /(\d*) (action|minute|hour|reaction)/;
  const match = str.match(regex);
  if (!match) {
    throw new Error(`buildCastingTime: ${str} not handled`);
  }

  const amount = parseInt(match[1], 10);
  const unit = match[2];
  return {
    amount,
    [unit]: true,
    unit,
    type: unit,
    en: str,
    fr: `${amount} ${translateCastingTimeUnit("fr", unit)}`,
  };
}

function translateCastingTimeUnit(lang, castingTimeUnit) {
  const tr = {
    fr: {
      [CastingTime.ACTION]: "action",
      [CastingTime.MINUTE]: "minute",
      [CastingTime.HOUR]: "heure",
      [CastingTime.REACTION]: "reaction",
    },
  };
  const translated = tr[lang][castingTimeUnit];
  if (!translated) {
    throw new Error(
      `translateCastingTimeUnit: missing for ${lang} : ${castingTimeUnit}`
    );
  }
  return translated;
}

//
// Spells school
//

const MagicSchool = {
  EVOCATION: "evocation",
  CONJURATION: "conjuration",
  ABJURATION: "abjuration",
  TRANSMUTATION: "transmutation",
  ENCHANTMENT: "enchantment",
  NECROMANCY: "necromancy",
  DIVINATION: "divination",
  ILLUSION: "illusion",
};

function translateMagicSchool(lang, magicSchool) {
  const tr = {
    fr: {
      [MagicSchool.EVOCATION]: "Evocation",
      [MagicSchool.CONJURATION]: "Conjuration",
      [MagicSchool.ABJURATION]: "Abjuration",
      [MagicSchool.TRANSMUTATION]: "Transmutation",
      [MagicSchool.ENCHANTMENT]: "Enchantement",
      [MagicSchool.NECROMANCY]: "Necromancie",
      [MagicSchool.DIVINATION]: "Divination",
      [MagicSchool.ILLUSION]: "Illusion",
    },
  };
  const translated = tr[lang][magicSchool.toLowerCase()];
  if (!translated) {
    throw new Error(
      `translateMagicSchool: missing for ${lang} : ${magicSchool}`
    );
  }
  return translated;
}

//
// Class
//

const CharacterClass = {
  BARD: "bard",
  CLERIC: "cleric",
  DRUID: "druid",
  PALADIN: "paladin",
  RANGER: "ranger",
  SORCERER: "sorcerer",
  WARLOCK: "warlock",
  WIZARD: "wizard",
};

function translateCharacterClass(lang, clss) {
  const tr = {
    fr: {
      [CharacterClass.BARD]: "Barde",
      [CharacterClass.CLERIC]: "Clerc",
      [CharacterClass.DRUID]: "Druid",
      [CharacterClass.PALADIN]: "Paladin",
      [CharacterClass.RANGER]: "Ranger",
      [CharacterClass.SORCERER]: "Sorcier",
      [CharacterClass.WARLOCK]: "Warlock",
      [CharacterClass.WIZARD]: "Magicien",
    },
  };
  const translated = tr[lang][clss.toLowerCase()];
  if (!translated) {
    throw new Error(`translateCharacterClass: missing for ${lang} : ${clss}`);
  }
  return translated;
}

//
// Subclass
//

const Subclass = {
  LORE: "lore",
  LAND: "land",
  LIFE: "life",
  DEVOTION: "devotion",
  FIEND: "fiend",
};

function translateSubclass(lang, subclass) {
  const tr = {
    fr: {
      [Subclass.LORE]: "Lore",
      [Subclass.LAND]: "Land",
      [Subclass.LIFE]: "Life",
      [Subclass.DEVOTION]: "Devotion",
      [Subclass.FIEND]: "Fiend",
    },
  };
  const translated = tr[lang][subclass.toLowerCase()];
  if (!translated) {
    throw new Error(`translateSubclass: missing for ${lang} : ${subclass}`);
  }
  return translated;
}

function parseSourceFromPage(str) {
  if (str.startsWith("phb")) {
    return "phb";
  }
  throw new Error(`Source not handled`);
}

module.exports = {
  extractRetardUnit,
  convertRetardUnitToMetric,
  buildDuration,
  buildCastingTime,
  translateMagicSchool,
  translateCharacterClass,
  translateSubclass,
  parseSourceFromPage,
};
