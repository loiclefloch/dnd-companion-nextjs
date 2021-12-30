import races from '../../../database/data/races.json'
import isEmpty from 'lodash/isEmpty'
import useApi from "./useApi"

export function format(race) {
  race.nameLocalized = {
    en: race.name,
  }

  race.hasSubraces = !isEmpty(race.subraces)

  return race
}

function useRace(index) {
  return useApi(format(races.find(race => race.index === index)))
}

export default useRace