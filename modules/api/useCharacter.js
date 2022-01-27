import { map, uniqBy, isEmpty } from 'lodash'
import camelize from "../utils/camelize"
import useApi from './useApi'
import characters from './fixtures/characters'
import proficiencies from "../../database/data/proficiencies.json"
import skills from "../../database/data/skills.json"
import classes from '../../database/data/classes.json'
import allRaces from '../../database/data/allRaces'
import spells from '../../database/data/spells.json'
import alignments from '../../database/data/alignments.json'
import equipmentList from '../../database/data/equipment.json'
import magicItems from '../../database/data/magic-items.json'
import traits from '../../database/data/traits.json'
import { formatRace } from "./useRace"
import { formatClass } from "./useClass"
import { getSpellLevelDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "../levelling"
import { formatEquipmentItem } from "./useEquipmentItem"
import { formatMagicItem } from "./useMagicItem"
import { formatSpell } from "./useSpell"
import { getProficiencyBonus } from "../levelling"
import { valueToModifier, valueToModifierLabel, modifierToModifierLabel } from "../stats"
import { formatProficiency } from "./useProficiency"

const MAX_SPELL_LEVEL = 9 // maximum spell level

function calculateSpellsSlots(classes, characterLevel, spellsUsed) {
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, characterLevel)
	const legalSlotLevel = getSpellLevelForCharacterLevel(classes, characterLevel)

	const slots = []
	for (let spellLevel = 0; spellLevel < MAX_SPELL_LEVEL; spellLevel++) {
		const usedSlots = spellsUsed.filter(s => s.spellLevel === spellLevel).length
		const totalSlots = spellLevelData?.slots[spellLevel] || 0

		slots.push({
			level: spellLevel,
			totalSlots: spellLevel === 0 ? Infinity : totalSlots,
			usedSlots,
			remainingSlots: totalSlots - usedSlots,
			isAboveLegalSlotLevel: spellLevel > legalSlotLevel,
			legalSlotLevel,
			hasData: usedSlots !== 0 || totalSlots !== 0,
		})
	}

	return slots
}

export function formatCharacter(character) {
	if (!character) {
		return null
	}

	if (!character.maximumHp) { // TODO: remove fixture
		character.maximumHp = 10
	}
	character.currentHp = character.currentHp || character.maximumHp

	character.isKo = character.currentHp < 0

	character.race = {
		index: character.race,
		...formatRace(allRaces.find(r => r.index === character.race))
	}
	character.classes = character.classes
		.map(clss => classes.find(c => clss === c.index))
		.map(formatClass)

	// TODO:
	character.statsDetail = []
	character.alignment = alignments.find(a => a.index === character.alignment)

	character.spellcastingAbility = 'CHA' // TODO: from class
	character.spellcastingAbilityValue = 3
	character.spellcastingAbilityValueLabel = `+3`

	character.spellsList = (character.spellsList || []).map(spell => {
		return {
			...formatSpell(spells.find(s => s.index === spell.index)),
			...spell
		}
	})

	character.spellsUsed = (character.spellsUsed || []).map(spellUsed => {
		return {
			...formatSpell(spells.find(s => s.index === spellUsed.index)),
			...spellUsed, // spellLevel
		}
	})

	character.spellsSlots = calculateSpellsSlots(character.classes, character.level, character.spellsUsed)

	const spellLevelData = getSpellLevelDataForClassesAndLevel(character.classes, character.level)
	const maxSpellLevel = Math.max(...Object.keys(spellLevelData.slots))

	character.maxSpellLevel = maxSpellLevel

	character.currentHitDice = character.currentHitDice || character.maximumHitDice

	if (!character.wallet) {
		character.wallet = {
			history: []
		}
	}

	character.proficiencyBonus = getProficiencyBonus(character.classes[0].index, character.level)

	// The DC to resist one of your Spells equals 8 + your Spellcasting ability modifier + your 
	// Proficiency Bonus + any Special modifiers.
	// here we do not handle special modifiers.
	// TODO: use on spell view
	character.spellSaveDC = 8 + character.proficiencyBonus + character.spellcastingAbilityValue

	character.DC = 15 // TODO:

	// Some Spells require the caster to make an Attack roll to determine whether the spell Effect hits 
	// the intended target. Your Attack bonus with a spell Attack equals your Spellcasting ability 
	// modifier + your Proficiency Bonus.
	// Most Spells that require Attack rolls involve Ranged Attacks. Remember that you have 
	// disadvantage on a ranged Attack roll if you are within 5 feet of a Hostile creature that can 
	// see you and that isn’t Incapacitated.
	// TODO: handle on spell + tip 
	character.spellAttackBonus = character.proficiencyBonus + character.spellcastingAbilityValue

	character.meleeAttackRollModifier = valueToModifier(character.stats.STR)
	character.meleeAttackRollModifierLabel = valueToModifierLabel(character.stats.STR)

	character.rangedAttackRollModifier = valueToModifier(character.stats.DEX)
	character.rangedAttackRollModifierLabel = valueToModifierLabel(character.stats.DEX)

	// saving throws
	// Each class gives proficiency in at least two Saving Throws. 
	// As with skill Proficiencies, proficiency in a saving throw lets a character add his or her 
	// Proficiency Bonus to Saving Throws made using a particular ability score. 
	// Some Monsters have saving throw Proficiencies as well.

	function buildSavingThrow(ability) {
		const isProeficient = character.classes[0].savingThrows.some(savingThrow => savingThrow.name === ability)
		const value = character.stats[ability] + (isProeficient ? character.proficiencyBonus : 0)
		return {
			value,
			modifier: valueToModifier(value),
			modifierLabel: valueToModifierLabel(value),
			isProeficient
		}
	}
	character.savingThrows = {
		STR: buildSavingThrow('STR'),
		DEX: buildSavingThrow('DEX'),
		CON: buildSavingThrow('CON'),
		INT: buildSavingThrow('INT'),
		WIS: buildSavingThrow('WIS'),
		CHA: buildSavingThrow('CHA'),
	}

	character.skills = skills.map(skillData => {
		const ability = skillData.ability_score.name
		const skill = skillData.index
		const isProeficient = character.skillsProficiencies.some(s => skill === s)

		const value = character.stats[ability] + (isProeficient ? character.proficiencyBonus : 0)
		return {
			index: skillData.index,
			label: skillData.name, // TODO: i18n
			description: skillData.desc, // TODO: i18n
			ability,
			name,
			skill,
			value,
			isProeficient,
			modifierLabel: valueToModifierLabel(value),
			modifier: valueToModifier(value),
		}
	})


	// 10 + Wisdom Score Modifier + Proficiency Bonus if proficiency in the Wisdom (Perception) skill
	const isProefficientInPerception = character.skills.find(s => s.index === "perception").isProeficient
	character.passivePerception = 10 + valueToModifier(character.stats.WIS) + (isProefficientInPerception ? character.proficiencyBonus : 0)

	character.equipment = (character.equipment || []).map(item => {
		return {
			...equipmentList.find(i => i.index === item.index),
			...item,
			isCharacterContextItem: true,
			isEquipped: item.isEquipped || false,
		}
	})
		.map(formatEquipmentItem)

	character.hasNoEquipment = isEmpty(character?.equipment)

	character.traits = character.traits.map(trait => {
		const traitData = traits.find(t => t.index === trait.index)
		return {
			...trait,
			...traitData,
		}
	})

	character.proficiencies = uniqBy(character.proficiencies, proficiency => proficiency.index)
		.map(formatProficiency)

	character.actionsEquipment = [
		formatEquipmentItem(equipmentList.find(i => i.index === "unarmed-strike")),
		...character.equipment.filter(item => item.equipmentCategory?.index === "weapon")
	]
	.map(camelize)
	.map(item => {
		item.isCharacterContextItem = true
		// item.canBeEquipped = true

		// const isUnarmedStrike = item.index === "unarmed-strike"

		// Proficiency with a weapon allows you to add your Proficiency Bonus to the Attack roll for any 
		// Attack you make with that weapon. If you make an Attack roll using a weapon with which you 
		// lack proficiency, you do not add your Proficiency Bonus to the Attack roll.		
		const isProeficient = item.index === 'unarmed-strike' 
			|| character.proficiencies.some(proficiency => proficiency.reference.index === item.index)
		item.isProeficient = isProeficient

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

		if (item.hasPropertyFinesse) {
			// For the moment we use the best attack roll possible.
			// TODO: Should we propose to choose?
			item.rangedProperty = character.meleeAttackRollModifier > character.rangedAttackRollModifier 
				? character.meleeAttackRollModifier 
				: character.rangedAttackRollModifier
		}

		// TODO: should we add proficiencyBonus for canBeThrown ?

		item.meleeAttackRollModifier = character.meleeAttackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
		item.meleeAttackRollModifierLabel = modifierToModifierLabel(character.meleeAttackRollModifier)

		if (item.rangedProperty === 'DEX') {
			item.rangedAttackRollModifier = character.rangedAttackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
			item.rangedAttackRollModifierLabel = modifierToModifierLabel(character.rangedAttackRollModifier)
		} else {
			item.rangedAttackRollModifier = character.meleeAttackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
			item.rangedAttackRollModifierLabel = modifierToModifierLabel(character.meleeAttackRollModifier)
		}

	  // TODO: property versatile two_handed_damage
	  // This weapon can be used with one or two hands. A damage value in parentheses appears with the 
	  // property--the damage when the weapon is used with two hands to make a melee attack.
		item.hasPropertyTwoHandedDamages = item.properties.some(property => property.index === 'two-handed')
		
		if (item.hasPropertyTwoHandedDamages && !item.twoHandedDamage) {
			item.twoHandedDamage = {...item.damage}
		}

		// TODO: property special, force description to be looked at

		// TODO: other properties?

		// console.log({ item })
		return item
	})

	// HACK: remove weapons from equipment and add actionsEquipment which has been formatted.
	// this allows to have the same data on the equipment and actions pages.
	character.equipment = character.equipment.filter(item => item.equipmentCategory?.index !== "weapon")
	character.equipment = [
		...character.equipment, 
		...character.actionsEquipment
	].filter(item => item.index !== 'unarmed-strike' )

	// Here are some ways to calculate your base AC:
	// Unarmored: 10 + your Dexterity modifier.
	// Armored: Use the AC entry for the armor you’re wearing (see PH, 145). 
	// For example, in leather armor, you calculate your AC as 11 + your Dexterity modifier, and in chain mail, your AC is simply 16.
	// Unarmored Defense (Barbarian): 10 + your Dexterity modifier + your Constitution modifier.
	// Unarmored Defense (Monk): 10 + your Dexterity modifier + your Wisdom modifier.
	// Draconic Resilience (Sorcerer): 13 + your Dexterity modifier.
	// Natural Armor: 10 + your Dexterity modifier + your natural armor bonus. 
	// This is a calculation method typically used only by monsters and NPCs, although it is also relevant 
	// to a druid or another character who assumes a form that has natural armor.
	const naturalAc = 10 + valueToModifier(character.stats.DEX)

	// light armor
	// Made from supple and thin materials, Light Armor favors agile Adventurers since it offers some 
	// Protection without sacrificing mobility. If you wear Light Armor, you add your Dexterity 
	// modifier to the base number from your armor type to determine your Armor Class.

	
	// TODO:
	const armorEquipped = character.equipment.find(item => item.isArmor && item.isEquipped)
	const shieldEquipped = character.equipment.find(item => item.isShield && item.isEquipped)

	let armorAc = armorEquipped?.armorClass?.base ?? 0
	if (armorEquipped?.armorClass?.dexBonus) { // == light armor
		armorAc += valueToModifier(character.stats.DEX)
	}

	let shieldAc = shieldEquipped?.armorClass?.base ?? 0
	if (shieldEquipped?.armorClass?.dexBonus) { // == light armor
		shieldAc += valueToModifier(character.stats.DEX)
	}

	const hasArmorEquipped = !!armorEquipped
	const hasShieldEquipped = !!shieldEquipped

	character.hasArmorEquipped = hasArmorEquipped
	character.hasShieldEquipped = hasShieldEquipped

	character.armorEquipped = armorEquipped
	character.shieldEquipped = shieldEquipped

	character.ac = {
		natural: naturalAc,
		armor: armorAc,
		shield: shieldAc,
		total: (hasArmorEquipped ? armorAc : naturalAc) + (hasShieldEquipped ? shieldAc : 0)
	}

	// Your class gives you proficiency with certain types of armor. If you wear armor that you lack 
	// proficiency with, you have disadvantage on any ability check, saving throw, or Attack roll that
	// involves Strength or Dexterity, and you can’t cast Spells.
	function isProeficientForArmor() {
		if (!armorEquipped) {
			return true
		}

		const allArmor = character.proficiencies.some(p => p.index === 'all-armor')
		if (allArmor) {
			return true
		}

		const armorCategory = armorEquipped.armorCategory // eg: Heavy
		const proficiencyIndex = armorCategory.toLowerCase()  + "-armor"
		return character.proficiencies.some(p => p.index === proficiencyIndex)
	}
	character.isProeficientForArmor = isProeficientForArmor()
	// character.isProeficientForArmor = false

	// Heavy Armor: Heavier armor interferes with the wearer’s ability to move quickly, stealthily, and 
	// freely. If the Armor table shows “Str 13” or “Str 15” in the Strength column for an armor type, 
	// the armor reduces the wearer’s speed by 10 feet unless the wearer has a Strength score equal to 
	// or higher than the listed score.
	// TODO: handle
	character.speedReduced = armorEquipped ? armorEquipped.strMinimum > character.stats.STR : false


	// disadvantage per ability and skill
	character.abilityDisadvantage = {}
	character.skillDisadvantage = {} 


	// Stealth: If the Armor table shows “Disadvantage” in the Stealth column, the wearer has disadvantage 
	// on Dexterity (Stealth) checks.
	if (armorEquipped?.stealthDisadvantage) {
		character.skillDisadvantage.stealth = true
	}

	if (!character.isProeficientForArmor) {
		character.abilityDisadvantage.str = true
		character.abilityDisadvantage.dex = true

		character.skillDisadvantage.stealth = true 

		// TODO: handle
		character.attackRollDisadvantage = true
	}

	// update skillDisadvantage using abilityDisadvantage
	map(character.abilityDisadvantage, (_, ability) =>  {
		const skillsForStat = skills.filter(s => s.ability_score.index === ability)
		skillsForStat.forEach(skill => {
			character.skillDisadvantage[skill.index] = true
		})
	})

	character.baseSpeed = character.race.speed
	character.currentSpeed = character.baseSpeed + (character.speedReduced ? -10 : 0)

	return character
}

function useCharacter(id) {
	// TODO: not formated since already formatted on fixtures
	return useApi(formatCharacter(characters().find(character => character.id === id)))
}

export default useCharacter