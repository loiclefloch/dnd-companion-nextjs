import { isArray } from 'lodash'
import equipmentItems from '../../database/data/equipment.json'
import equipmentCategories from '../../database/data/equipment-categories.json'
import { formatEquipmentItem  } from './useEquipmentItem'

function formatSubOption(parentOption, option) {
	if (option.equipment) {
		parentOption.hasSubChoice = true

		option.isTypeEquipment = true
		option.item = formatEquipmentItem(equipmentItems.find(i => i.index === option.equipment.index))
		return option
	} else if (option.equipmentOption) {
		parentOption.hasSubChoice = true

		const equipmentOption = option.equipmentOption
		const equipmentCategory = equipmentCategories.find(e => e.index === equipmentOption.from.equipmentCategory.index)
		option.isTypeSubOption = true
		option.choose = option.equipmentOption.choose
		option.from = {
			equipmentCategory: equipmentCategory,
			items: equipmentCategory.equipment.map(item => equipmentItems.find(i => i.index === item.index))
		}
		return option
	} else if (isArray(option)) {
		parentOption.hasSubChoice = true
		const subOption = {
			choose: 1,
			isTypeSubOption: true,
		}
		subOption.from = {
			items: option.map(childOption => formatSubOption(subOption, childOption))
		}
		// debugger
		return subOption
	} else if (option.from?.equipmentCategory) {
		const equipmentCategory = equipmentCategories.find(e => e.index === option.from.equipmentCategory.index)
		option.from = {
			equipmentCategory: equipmentCategory,
			items: equipmentCategory.equipment.map(item => equipmentItems.find(i => i.index === item.index))
		}
		return option
	} else {
		return option
	}
}

function formatStartingEquipmentOptions(startingEquipmentOptions) {
	
	const u = startingEquipmentOptions.map(option => {
		if (!option.from.map) {
			return formatSubOption({}, option)
		}
		option.from = option.from.map(childOption => formatSubOption(option, childOption))

		let equipmentCategory
		if (option.equipmentCategory) {
			equipmentCategory = equipmentCategories.find(e => e.index === option.equipmentCategory.index)
		}

		if (isArray(option.from)) {
			option.from = {
				equipmentCategory,
				items: option.from
			}
		}
		return option
	})
	console.log(u)
	return u
}

export default formatStartingEquipmentOptions