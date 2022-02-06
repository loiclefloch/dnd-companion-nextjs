import features from '../../database/data/features.json'
import useData from "./useData"

import { formatRace } from "./useRace"

function useRaces(race) {
  return useData(features.filter(feature => feature.race.index === race).map(formatRace))
}

export default useRaces