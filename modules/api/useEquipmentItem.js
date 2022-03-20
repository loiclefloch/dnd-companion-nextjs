import equipment from "../../database/data/equipment.json"
import camelize from "../utils/camelize"
import useData from "./useData"

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

	item.isShield = item.armorCategory === "Shield"
	item.isWeapon = item.equipmentCategory?.index === "weapon"
	item.isArmor = item.equipmentCategory?.index === "armor" && !item.isShield
	item.isAdventuringGear = item.equipmentCategory?.index === "adventuring-gear"
	item.isTools = item.equipmentCategory?.index === "tools"
	item.isMountAndVehicules = item.equipmentCategory?.index === "mounts-and-vehicles"
	item.canBeEquipped = item.isArmor || item.isShield

	item.itemCategory = item.equipmentCategory?.index || 'magic-item'

	if (item.isWeapon) {

		// Ability Modifier: The ability modifier used for a melee weapon Attack is Strength, and the ability 
		// modifier used for a ranged weapon Attack is Dexterity. Weapons that have the Finesse or Thrown 
		// property break this rule. 

		// When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity 
		// modifier for the attack and damage rolls.
		item.hasPropertyFinesse = item.properties.some(property => property.index === 'finesse')
		// If a weapon has the thrown property, you can throw the weapon to make a ranged attack. 
		// If the weapon is a melee weapon, you use the same ability modifier for that attack roll and 
		// damage roll that you would use for a melee attack with the weapon. For example, if you throw a 
		// handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or 
		// your Dexterity, since the dagger has the finesse property.
		item.hasPropertyThrown = item.properties.some(property => property.index === 'thrown')


		// hasPropertyThrown = can be thrown
		// hasPropertyFinesse = use DEX or STR when thrown. If has not finesse, use STR when thrown

		item.isMelee = item.weaponRange === 'Melee'
		item.isRanged = item.weaponRange === 'Ranged'

		item.rangedProperty = item.isRanged ? 'DEX' : (item.hasPropertyThrown ? 'DEX' : 'STR')

		// TODO: property versatile two_handed_damage
		// This weapon can be used with one or two hands. A damage value in parentheses appears with the 
		// property--the damage when the weapon is used with two hands to make a melee attack.
		item.hasPropertyTwoHandedDamages = item.properties.some(property => property.index === 'two-handed' || property.index === 'versatile')
		item.isTwoHandedOnly = item.properties.some(property => property.index === 'two-handed')
		// Small creatures have disadvantage on attack rolls with heavy weapons. 
		// A heavy weapon's size and bulk make it too large for a Small creature to use effectively.
		item.isHeavy = item.properties.some(property => property.index === 'heavy')

		if (item.hasPropertyTwoHandedDamages && !item.twoHandedDamage) {
			item.twoHandedDamage = { ...item.damage }
		}
	}

	return item
}

function useEquipmentItem(index) {
	return useData(formatEquipmentItem(equipment.find(item => item.index === index)))
}

export default useEquipmentItem