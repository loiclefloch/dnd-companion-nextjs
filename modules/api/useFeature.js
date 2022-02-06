import features from '../../database/data/features.json'
import useData from "./useData"

export function format(feature) {
  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeature(index) {
  return useData(format(features.find(feature => feature.index === index)))
}

export default useFeature