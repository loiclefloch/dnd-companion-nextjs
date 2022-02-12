import feats from '../../database/data/feats'
import useData from "./useData"

export function formatFeat(feat) {
  if (!feat) {
    return null
  }
  feat.nameLocalized = {
    en: feat.name,
  }

  const prerequisites = feat.prerequisites || []

  // TODO: format prerequistes
  // - forRace
  // - forAbilityScore
  // - forProficiency
  // - forOther
  feat.forRace = prerequisites.some(p => p.type === 'race')
  feat.forAbilityScore = prerequisites.some(p => p.type === 'abilityScore')
  feat.forProficiency = prerequisites.some(p => p.type === 'proficiency')
  feat.forOther = !!feat.prerequisitesLabel

  return feat
}

function useFeat(index) {
  return useData(formatFeat(feats.find(feature => feature.index === index)))
}

export default useFeat