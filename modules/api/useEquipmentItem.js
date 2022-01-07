import camelize from "../utils/camelize"

// possible equipment_category
// - weapon
// - armor
// - adventuring-gear
// - tools
// - mounts-and-vehicles

export function formatEquipmentItem(item) {
	item.nameLocalized = {
		en: item.name
	}

	item.resume = {
		en: '',
	}

	item.description = {
		en: ''
	}
	// TODO: add resume
	// TODO: add description
	// TODO: add image

	return camelize(item)
}