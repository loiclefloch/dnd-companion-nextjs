import features from '../../../database/data/features.json'
import useApi from "./useApi"

export function format(feature) {
  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeature(index) {
  return useApi(format(features.find(feature => feature.index === index)))
}

export default useFeature