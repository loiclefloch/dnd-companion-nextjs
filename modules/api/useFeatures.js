import features from '../../database/data/features'
import useData from "./useData"

import { formatFeature } from "./useFeature"

function useFeatures() {
  return useData(features.map(formatFeature))
}

export default useFeatures