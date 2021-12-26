
const RangeUnit = {
  METERS: 'METERS',
  RETARD: 'RETARD',
}

function useConfiguration() {
  return {
    lang: 'fr',
    rangeUnit: RangeUnit.METERS,
    RangeUnit,
  }
}

export default useConfiguration