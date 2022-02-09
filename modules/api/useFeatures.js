import features from '../../database/data/features.json'
import useData from "./useData"

import { formatFeature } from "./useFeature"

function useFeatures(race) {
  return useData(features.filter(feature => feature.race.index === race).map(formatFeature))
}

export default useFeatures