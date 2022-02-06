import equipment from "../../database/data/equipment.json"
import useData from "./useData"

import { formatEquipmentItem } from "./useEquipmentItem"


function useEquipmentItems() {
	return useData(equipment.map(formatEquipmentItem))
}

export default useEquipmentItems