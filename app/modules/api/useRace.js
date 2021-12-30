import races from '../../../database/data/races.json'
import useApi from "./useApi"

export function format(race) {
  race.nameLocalized = {
    en: race.name,
  }

  return race
}

function useRace(index) {
  return useApi(format(races.find(race => race.index === index)))
}

export default useRace