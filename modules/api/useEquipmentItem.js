import equipment from "../../database/data/equipment.json"
import camelize from "../utils/camelize"
import useApi from "./useApi"

// possible equipment_category
// - weapon
// - armor
// - adventuring-gear
// - tools
// - mounts-and-vehicles

export function formatEquipmentItem(itemParam) {
	if (!itemParam) {
		return null
	}
	const item = camelize(itemParam)
	item.isEquipmentItem = true
	item.nameLocalized = {
		en: item.name
	}

	item.resume = {
		en: '',
	}

	item.description = {
		en: item.desc
	}

	delete item.desc

	// TODO: add resume
	// TODO: add description
	// TODO: add image

	item.isWeapon = item.equipmentCategory.index === "weapon"
	item.isArmor = item.equipmentCategory.index === "armor"
	item.isAdventuringGear = item.equipmentCategory.index === "adventuring-gear"
	item.isTools = item.equipmentCategory.index === "tools"
	item.isMountAndVehicules = item.equipmentCategory.index === "mounts-and-vehicles"

	return item
}

function useEquipmentItem(index) {
	return useApi(formatEquipmentItem(equipment.find(item => item.index === index)))
}

export default useEquipmentItem