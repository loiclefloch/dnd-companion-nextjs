import useConfiguration from '../configuration/useConfiguration'
import { get, isEmpty, isNil, isString, isArray, isFunction } from 'lodash'

const defaultLang = 'en'

const globalTranslations = {
  'stealthDisadvantage': {
    fr: 'Désavantage discrétion',
    en: 'Stealth disadvantage',
  },
	'proficiencies': {
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
}

function formatTemplate(str, templateParams) {
  if (Array.isArray(str)) {
    return str.map(str => formatTemplate(str, templateParams))
  }
  return str?.replace(
    /%{([^{}]+)}/g, // or /{(\w*)}/g for "{this} instead of %this%"
    function (m, key) {
      return templateParams.hasOwnProperty(key) ? templateParams[key] : "";
    }
  )
}

function buildUseI18n(translationsParam) {
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

        return formatTemplate(obj.join('\n\n'), templateParams)
      }

      // translation object, containing the translations
      const translated = !obj ? null : obj[lang] ?? obj[defaultLang] ?? null
      if (isEmpty(translated)) {
        return ""
      }
      if (isNil(translated)) {
        console.log("Missing tr for ", obj)
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
  return buildUseI18n()
}

export default useI18n


export const makeI18n = (getTranslations) => {
  const translationsParam = isFunction(getTranslations) ? getTranslations() : getTranslations
  return () => {
    return buildUseI18n(translationsParam)
  }
}