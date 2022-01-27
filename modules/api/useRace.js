import allRaces from '../../database/data/allRaces'
import traits from '../../database/data/traits.json'
import isEmpty from 'lodash/isEmpty'
import useApi from "./useApi"
import camelize from '../utils/camelize'
import { cloneDeep } from 'lodash'

export function formatRace(raceParam) {
  if (!raceParam) { // required so we can build while all the races are not created
    return null
  }

  const race = camelize(cloneDeep(raceParam))

  race.nameLocalized = {
    en: race.name,
  }

  race.hasSubraces = !isEmpty(race.subraces)
  race.isSubrace = !!race.race

  if (race.hasSubraces) {
    race.subraces = race.subraces.map(formatRace)
  }

  race.traits = race.traits.map(t => traits.find(trait => trait.index === t.index))

  return race
}

function useRace(index) {
  return useApi(formatRace(allRaces.find(race => race.index === index)))
}

export default useRace