import subraces from '../../../database/data/subraces.json'
import useApi from "./useApi"

import { format } from "./useRace"

function useRaces(race) {
  return useApi(subraces.filter(subrace => subrace.race.index === race).map(format))
}

export default useRaces