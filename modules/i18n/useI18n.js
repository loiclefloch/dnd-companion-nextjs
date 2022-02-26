import useConfiguration from '../configuration/useConfiguration'
import { get, isEmpty, isNil, isString, isArray } from 'lodash'

const defaultLang = 'en'

const globalTranslations = {
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
    tr: obj => {
      if (typeof obj === 'number') {
        return `${obj}`
      }
      if (typeof obj === 'string' || obj instanceof String) {
        // translation key
        // || better have object key than empty/null value (not yet translated)
        return get(translations, [obj, lang]) || obj
      }

      // TODO: this is a trick for strings not translated yet, and being an array:
      // [ "first sentance", "second sentance" ]
      if (isArray(obj) && !isEmpty(obj) && isString(obj[0])) {
        if (obj.length === 1) { // maybe a template string (tr`key`)
          const translated = get(translations, [obj, lang])
          if (translated) {
            return translated
          }
        }

        return obj.join('\n\n') 
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
        return translated.join('\n\n') 
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
  const translationsParam = getTranslations()
  return () => {
    return buildUseI18n(translationsParam)
  }
}