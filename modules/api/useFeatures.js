import features from '../../database/data/features.json'
import useApi from "./useApi"

import { format } from "./useRace"

function useRaces(race) {
  return useApi(features.filter(feature => feature.race.index === race).map(format))
}

export default useRaces