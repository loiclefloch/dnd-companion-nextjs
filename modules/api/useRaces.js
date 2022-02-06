import allRaces from '../../database/data/allRaces'
import useData from "./useData"

import { formatRace } from "./useRace"

function useRaces() {
  return useData(allRaces.map(formatRace))
}

export default useRaces