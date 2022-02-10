import features from '../../database/data/features'
import camelize from '../utils/camelize'
import useData from "./useData"

export function formatFeature(featureParam) {
  if (!featureParam) {
    return null
  }

  const feature = camelize(featureParam)

  feature.forBackground = !!feature.background
  feature.forClass = !!feature.class

  feature.nameLocalized = {
    en: feature.name,
  }

  return feature
}

function useFeature(index) {
  return useData(formatFeature(features.find(feature => feature.index === index)))
}

export default useFeature