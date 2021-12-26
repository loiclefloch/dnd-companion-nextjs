import useConfiguration from '../configuration/useConfiguration'

const defaultLang = 'en'

function useI18n() {
  const { rangeUnit, RangeUnit, lang } = useConfiguration()
  
  return {
    tr: obj => !obj ? '' : obj[lang] || obj[defaultLang],
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