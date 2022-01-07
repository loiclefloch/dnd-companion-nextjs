import equipments from '../../database/data/equipment.json'
import useApi from "./useApi"

import { formatEquipmentItem } from './useEquipmentItem'

function useEquipments() {
  return useApi(equipments.map(formatEquipmentItem))
}

export default useEquipments