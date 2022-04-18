import { cloneDeep, isArray } from 'lodash'
import subclasses from '../../database/data/subclasses'
import useData from "./useData"
import equipment from '../../database/data/equipment.json'
import proficiencies from '../../database/data/proficiencies.json'
import camelize from '../utils/camelize'
import { formatEquipmentItem  } from './useEquipmentItem'
import { formatProficiency } from "./useProficiency"
import formatStartingEquipmentOptions from "./formatStartingEquipmentOptions"

export function formatSubclass(subclassParam) {
  if (!subclassParam) { // required for build
    return null
  }
  const subclass = camelize(cloneDeep(subclassParam))
  subclass.nameLocalized = {
    en: subclass.name,
    fr: subclass.name,
  }
  subclass.resume = {
    en: 'subclass small description'
  }

	subclass.spells?.forEach(spell => {
		spell.prerequisites.forEach(prerequisite => {
			if (prerequisite.type === 'level') {
				prerequisite.isLevel = true
				prerequisite.level = parseInt(prerequisite.index.split('-')[1], 10)
			} else if (prerequisite.type === 'feature') {
				prerequisite.isFeature = true
			} else {
				debugger
				throw new Error(`Not handled`)
			}
		})
	})

  return subclass
}

function useSubclass(index) {
  return useData(formatSubclass(subclasses.find(subclass => subclass.index === index)))
}

export default useSubclass