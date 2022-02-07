import feats from '../../database/data/feats'
import useData from "./useData"

export function formatFeat(feature) {
  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeat(index) {
  return useData(formatFeat(feats.find(feature => feature.index === index)))
}

export default useFeat