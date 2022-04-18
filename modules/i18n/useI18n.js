import useConfiguration from '../configuration/useConfiguration'
import { get, isEmpty, isNil, isString, isArray, isFunction } from 'lodash'
import reactStringReplace from 'react-string-replace';

const defaultLang = 'en'

const globalTranslations = {
  'none.feminie': {
    fr: 'Aucune',
    en: 'None',
  },
  'choose': {
    fr: `Choisir %{choose}`,
    en: `Choose %{choose}`,
  },
  'are you sure?': {
    fr: "Êtes-vous sûr ?",
    en: "Are you sure?",
  },
  'legendary.label': {
    fr: "Legendaire",
    en: "Legendary",
  },
  'close.action': {
    fr: `Fermer`,
    en: `Close`,
  },
  'choose.action': {
    fr: `Choisir`,
    en: `Choose`,
  },
  'continue.action': {
    fr: `Continuer`,
    en: `Continue`,
  },
  'reset.action': {
    fr: "Reset",
    en: "Reset",
  },
  'add.action': {
    fr: 'Ajouter',
    en: 'Add',
  },
  'validate.action': {
    fr: 'Valider',
    en: 'Validate',
  },
  'modify.action': {
    fr: 'Modifier',
    en: 'Modify',
  },
  'detail.action': {
    fr: 'Détail',
    en: 'Detail',
  },
  'feats.title': {
    en: 'Feats',
    fr: 'Talents',
  },
  'features.title': {
    en: `Features`,
    fr: `Capacités`
  },
  'spellsSlots.title': {
		fr: 'Emplacements de sorts',
		en: 'Spells slots',
	},
  'traits.title': {
    en: 'Traits',
    fr: 'Traits',
  },
  'spellcasting.title': {
    fr: 'Spellcasting',
    en: 'Spellcasting',
  },
  'multiClassing.prerequisites': {
    fr: `Multi classing - prérequis`,
    en: `Multi classing - prerequisites`,
  },
  'multiClassing.proficiencies': {
    fr: `Multi classing - maîtrises`,
    en: `Multi classing - proficiencies`,
  },
  'subclasses.title': {
    fr: 'Sous-classes',
    en: 'Sub-classes',
  },
  'startingProficiencies.title': {
    fr: `Compétences de départ`,
    en: `Starting proficiencies`,
  },
  'startingProficienciesOptions.title': {
    fr: `Compétences de départ - options`,
    en: `Starting proficiencies - options`,
  },
  'startingEquipment.title': {
    fr: `Équipement de départ`,
    en: `Starting equipment`,
  },
  'startingEquipmentOptions.title': {
    fr: `Équipment de départ - options`,
    en: `Starting equipment - options`,
  },
  'languagesOptions.title': {
    fr: `Languages - options`,
    en: `Languages - options`,
  },
  'personalityTraits.title': {
    fr: `Traits de personnalité`,
    en: `Personnality traits`,
  },
  'ideals.title': {
    fr: `Idéaux`,
    en: `Ideals`,
  },
  'bonds.title': {
    fr: `Liens`,
    en: `Bonds`,
  },
  'flaws.title': {
    fr: `Défauts`,
    en: `Flaws`,
  },
	'equipment.title': {
		fr: 'Équipement',
		en: 'Equipment',
	},
  'stealthDisadvantage': {
    fr: 'Désavantage discrétion',
    en: 'Stealth disadvantage',
  },
  'cast': {
    fr: 'Caster',
    en: 'Cast',
  },
  'proficiencies.title': {
    fr: 'Maîtrises',
    en: 'Proficiencies',
  },
  'age': {
    en: 'age',
    fr: 'age'
  },
  'gender': {
    en: 'gender',
    fr: 'gender'
  },
  'height': {
    en: 'height',
    fr: 'height'
  },
  'weight': {
    en: 'weight',
    fr: 'weight'
  },
  'hairColor': {
    en: 'hairColor',
    fr: 'hairColor'
  },
  'eyeColor': {
    en: 'eyeColor',
    fr: 'eyeColor'
  },
  'skinColor': {
    en: 'skinColor',
    fr: 'skinColor'
  },
  'physical caracteristics': {
    en: 'physical caracteristics',
    fr: 'physical caracteristics',
  },
  level: {
    en: 'Level %{level}',
    fr: 'Niveau %{level}',
  },
  'level.short': {
    en: 'lvl %{level}',
    fr: 'Niv %{level}',
  },
  STR: {
    fr: 'Force',
    en: 'Strength'
  },
  DEX: {
    fr: 'Dextérité',
    en: 'Dexterity'
  },
  CON: {
    fr: 'Constitution',
    en: 'Constitution',
  },
  INT: {
    fr: 'Intelligence',
    en: 'Intelligence',
  },
  WIS: {
    fr: 'Sagesse',
    en: 'Wisdom',
  },
  CHA: {
    fr: 'Charisme',
    en: 'Charisma',
  },
	hasNoMagic: {
		fr: `Vous n'avez pas de pouvoirs magiques`,
		en: `You do not have magic powers`,
	},
}

function formatTemplate(str, templateParams) {
  if (Array.isArray(str)) {
    return str.map(str => formatTemplate(str, templateParams))
  }

  if (!str.includes("%")) { // no var on string
    return str
  }

  const res = reactStringReplace(
    str,
    /%{([^{}]+)}/g, // or /{(\w*)}/g for "{this} instead of %this%"
    function (key) {
      if (!templateParams) {
        throw new Error(`Missing template params`)
      }
      return templateParams.hasOwnProperty(key) ? templateParams[key] : "";
    }
  )
  //direct string
  if (res.length === 1) {
    return res[0]
  }

  if (res.some(str => !isString(str))) {
    // has a react component
    return res.map((str, i) => <span key={i}>{str}</span>)
  }

  // build a string, to avoid having react for just a string
  return res.join('')
}

function useBuildUseI18n(translationsParam) {
  const translations = {
    ...globalTranslations,
    ...translationsParam
  }

  const { rangeUnit, RangeUnit, lang } = useConfiguration()

  return {
    lang,
    isDefaultLang: lang === defaultLang,
    trDefaultLang: obj => !obj ? null : obj[defaultLang] || null,
    tr: (obj, templateParams) => {
      if (typeof obj === 'number') {
        return `${obj}`
      }
      if (typeof obj === 'string' || obj instanceof String) {
        // translation key
        // || better have object key than empty/null value (not yet translated)
        return formatTemplate(get(translations, [obj, lang]) || obj, templateParams)
      }

      // TODO: this is a trick for strings not translated yet, and being an array:
      // [ "first sentance", "second sentance" ]
      if (isArray(obj) && !isEmpty(obj) && isString(obj[0])) {
        if (obj.length === 1) { // maybe a template string (tr`key`)
          const translated = get(translations, [obj, lang])
          if (translated) {
            return formatTemplate(translated, templateParams)
          }
        }

        return formatTemplate(obj, templateParams).map(txt => <div>{txt}</div>)
      }

      // translation object, containing the translations
      const translated = !obj ? null : obj[lang] ?? obj[defaultLang] ?? null
      if (isEmpty(translated)) {
        return ""
      }
      if (isNil(translated)) {
        // console.log("Missing tr for ", obj)
        return null
      }
      if (isArray(translated)) {
        // requires className whitespace-pre-wrap to display break lines
        return formatTemplate(translated.join('\n\n'), templateParams)
      }
      return translated
    },
    getRangeUnit: range => {
      switch (rangeUnit) {
        case RangeUnit.METERS:
          return range?.metricUnit
        case RangeUnit.RETARD:
          return range?.retardUnit
      }
    }
  }
}

function useI18n() {
  return useBuildUseI18n()
}

export default useI18n


export const makeI18n = (getTranslations) => {
  const translationsParam = isFunction(getTranslations) ? getTranslations() : getTranslations
  return () => {
    return useBuildUseI18n(translationsParam)
  }
}