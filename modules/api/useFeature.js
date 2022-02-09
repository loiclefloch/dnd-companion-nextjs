import features from '../../database/data/features'
import camelize from '../utils/camelize'
import useData from "./useData"

export function formatFeature(featureParam) {
  if (!featureParam) {
    // TODO: remove trick once features are added
    return {
      index: feature,
      name: feature,
      isTrick: true,
    }
  }

  const feature = camelize(featureParam)

  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeature(index) {
  return useData(formatFeature(features.find(feature => feature.index === index)))
}

export default useFeature