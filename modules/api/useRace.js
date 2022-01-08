import races from '../../database/data/races.json'
import subraces from '../../database/data/subraces.json'
import isEmpty from 'lodash/isEmpty'
import useApi from "./useApi"

export function format(race) {
  if (!race) { // required so we can build while all the races are not created
    return null
  }
  race.nameLocalized = {
    en: race.name,
  }

  race.hasSubraces = !isEmpty(race.subraces)
  race.isSubrace = !!race.race

  if (race.hasSubraces) {
    race.subraces = race.subraces.map(format)
  }

  return race
}

function useRace(index) {
  return useApi(format([ ...races, ...subraces ].find(race => race.index === index)))
}

export default useRace