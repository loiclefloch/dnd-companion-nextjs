import { useRouter } from "next/router"

const RangeUnit = {
  METERS: 'METERS',
  RETARD: 'RETARD',
}

function useConfiguration() {
  const router = useRouter()
  return {
    lang: router.query.l || 'fr', // we can use the query param 'l' to force a lang
    rangeUnit: RangeUnit.METERS,
    RangeUnit,
  }
}

export default useConfiguration