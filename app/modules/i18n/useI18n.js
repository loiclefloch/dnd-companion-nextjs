import useConfiguration from '../configuration/useConfiguration'

const defaultLang = 'en'

function useI18n() {
  const { rangeUnit, RangeUnit, lang } = useConfiguration()
  
  return {
    lang,
    isDefaultLang: lang === defaultLang,
    trDefaultLang: obj => !obj ? null : obj['en'] || null,
    tr: obj => {
      if (typeof obj === 'string' || obj instanceof String) {
        // translation key
        // TODO: handle
        return obj
      }
      // translation object, containing the translations
      return !obj ? null : obj[lang] || obj[defaultLang] || null
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