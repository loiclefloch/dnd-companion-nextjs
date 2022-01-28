import { cloneDeep } from 'lodash'
import classes from '../../database/data/classes.json'
import useApi from "./useApi"
import equipment from '../../database/data/equipment.json'
import equipmentCategories from '../../database/data/equipment-categories.json'
import proficiencies from '../../database/data/proficiencies.json'
import camelize from '../utils/camelize'
import { formatEquipmentItem  } from './useEquipmentItem'
import { formatProficiency } from "./useProficiency"

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
    clss.startingEquipmentOptions.forEach(option => {
      option.from.forEach(o => {
        if (o.equipment) {
          option.hasSubChoice = true

          o.isTypeEquipment = true
          o.item = formatEquipmentItem(equipment.find(i => i.index === o.equipment.index))
        } else if (o.equipmentOption) {
          option.hasSubChoice = true

          const equipmentOption = o.equipmentOption
          const equipmentCategory = equipmentCategories.find(e => e.index === equipmentOption.from.equipmentCategory.index)
          o.isTypeSubOption = true
          o.choose = o.equipmentOption.choose
          o.from = {
            equipmentCategory: equipmentCategory,
            items: equipmentCategory.equipment.map(item => equipment.find(i => i.index === item.index))
          }
        } else {
          debugger
        }
      })
    })
    console.log(clss.startingEquipmentOptions)
  }

  return clss
}

function useClass(index) {
  return useApi(formatClass(classes.find(clss => clss.index === index)))
}

export default useClass