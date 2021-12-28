import useConfiguration from '../configuration/useConfiguration'

const defaultLang = 'en'

function useI18n() {
  const { rangeUnit, RangeUnit, lang } = useConfiguration()
  
  return {
    lang,
    isDefaultLang: lang === defaultLang,
    trDefaultLang: obj => !obj ? null : obj['en'] || null,
    tr: obj => {
      if (typeof obj === 'number') {
        return `${obj}`
      }
      if (typeof obj === 'string' || obj instanceof String) {
        // translation key
        // TODO: handle
        return obj
      }
      // translation object, containing the translations
      const translated = !obj ? null : obj[lang] || obj[defaultLang] || null
      if (!translated) {
        return null
      }
      if (Array.isArray(translated)) {
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