import feats from '../../database/data/feats'
import useData from "./useData"

export function formatFeat(feat) {
  feat.nameLocalized = {
    en: feat.name,
  }

  return feat
}

function useFeat(index) {
  return useData(formatFeat(feats.find(feature => feature.index === index)))
}

export default useFeat