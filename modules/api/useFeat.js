import { isEmpty } from 'lodash'
import feats from '../../database/data/feats'
import camelize from '../utils/camelize'
import useData from "./useData"

export function formatFeat(featParam) {
  if (!featParam) {
    return null
  }

  const feat = camelize(featParam)
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
  feat.forOther = !isEmpty(feat.prerequisitesLabel)

  feat.hasPrerequisites = feat.forRace || feat.forAbilityScore || feat.forProficiency || feat.forOther

  feat.hasAbilityOption = !!feat.abilityOption

  feat.hasOption = feat.hasAbilityOption

  return feat
}

function useFeat(index) {
  return useData(formatFeat(feats.find(feature => feature.index === index)))
}

export default useFeat