import equipment from "../../database/data/equipment.json"
import useApi from "./useApi"

import { formatEquipmentItem } from "./useEquipmentItem"


function useEquipmentItems() {
	return useApi(equipment.map(formatEquipmentItem))
}

export default useEquipmentItems