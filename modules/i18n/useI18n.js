import useConfiguration from '../configuration/useConfiguration'
import { isEmpty, isNil, isString, isArray } from 'lodash'

const defaultLang = 'en'

function useI18n() {
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
        // TODO: handle
        return obj
      }

      // TODO: this is a trick for strings not translated yet, and being an array:
      // [ "first sentance", "second sentance" ]
      if (isArray(obj) && !isEmpty(obj) && isString(obj[0])) {
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

export default useI18n