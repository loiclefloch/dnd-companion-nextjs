import races from '../../../database/data/races.json'
import useApi from "./useApi"

import { format } from "./useRace"

function useRaces() {
  return useApi(races.map(format))
}

export default useRaces