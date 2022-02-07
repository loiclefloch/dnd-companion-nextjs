import feats from '../../database/data/feats'
import useData from "./useData"
import { formatFeat } from "./useFeat"

function useFeats() {
  return useData(feats.map(formatFeat))
}

export default useFeats