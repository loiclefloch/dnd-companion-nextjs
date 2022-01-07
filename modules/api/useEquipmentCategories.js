import equipmentCategories from '../../database/data/equipment-categories.json'
import equipment from '../../database/data/equipment.json'
import magicItems from '../../database/data/magic-items.json'
import useApi from "./useApi"
import uniqBy from "lodash/uniqBy"

import { formatEquipmentItem } from './useEquipmentItem'
import { formatMagicItem } from './useMagicItem'

function formatEquipmentCategory(category) {
  category.nameLocalized = {
    en: category.name
  }

  // equipment array as items duplicates, clean it
  category.equipment = uniqBy(category.equipment, (item) => item.index)

  category.equipment = category.equipment.map(item => {
    if (item.url.startsWith("/api/equipment/")) {
      return formatEquipmentItem(equipment.find(i => i.index === item.index))
    }
    if (item.url.startsWith("/api/magic-items")) {
      return formatMagicItem(magicItems.find(i => i.index === item.index))
    }
  })

  return category
}

function useEquipmentCategories() {
  return useApi(equipmentCategories.map(formatEquipmentCategory))
}

export default useEquipmentCategories