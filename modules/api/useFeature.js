import features from '../../database/data/features.json'
import useData from "./useData"

export function formatFeature(feature) {
  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeature(index) {
  return useData(formatFeature(features.find(feature => feature.index === index)))
}

export default useFeature