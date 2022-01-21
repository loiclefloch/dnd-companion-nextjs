import allRaces from '../../database/data/allRaces'
import useApi from "./useApi"

import { formatRace } from "./useRace"

function useRaces() {
  return useApi(allRaces.map(formatRace))
}

export default useRaces