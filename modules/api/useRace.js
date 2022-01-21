import allRaces from '../../database/data/allRaces'
import isEmpty from 'lodash/isEmpty'
import useApi from "./useApi"

export function formatRace(race) {
  if (!race) { // required so we can build while all the races are not created
    return null
  }
  race.nameLocalized = {
    en: race.name,
  }

  race.hasSubraces = !isEmpty(race.subraces)
  race.isSubrace = !!race.race

  if (race.hasSubraces) {
    race.subraces = race.subraces.map(formatRace)
  }

  return race
}

function useRace(index) {
  return useApi(formatRace(allRaces.find(race => race.index === index)))
}

export default useRace