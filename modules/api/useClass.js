import { cloneDeep, isArray } from 'lodash'
import classes from '../../database/data/classes.json'
import useApi from "./useApi"
import equipment from '../../database/data/equipment.json'
import proficiencies from '../../database/data/proficiencies.json'
import camelize from '../utils/camelize'
import { formatEquipmentItem  } from './useEquipmentItem'
import { formatProficiency } from "./useProficiency"
import formatStartingEquipmentOptions from "./formatStartingEquipmentOptions"

export function formatClass(clssParam) {
  if (!clssParam) { // required for build
    return null
  }
  const clss = camelize(cloneDeep(clssParam))
  clss.nameLocalized = {
    en: clss.name,
    fr: clss.name,
  }
  clss.resume = {
    en: 'class small description'
  }

  if (clss.startingEquipment) {
    clss.startingEquipment = clss.startingEquipment.map(item => {
      return {
        ...formatEquipmentItem(equipment.find(i => i.index === item.equipment.index)),
        ...item,
        equipment: undefined
      }
    })
  }

  if (clss.proficiencies) {
    clss.proficiencies = clss.proficiencies.map(proficiency => {
      return formatProficiency(proficiencies.find(i => i.index === proficiency.index))
    })
  }

  if (clss.startingEquipmentOptions) {
    clss.startingEquipmentOptions = formatStartingEquipmentOptions(clss.startingEquipmentOptions)
  }


  return clss
}

function useClass(index) {
  return useApi(formatClass(classes.find(clss => clss.index === index)))
}

export default useClass