import { uniqBy, isEmpty } from 'lodash'
import useApi from './useApi'
import characters from './fixtures/characters'
import proficiencies from "../../database/data/proficiencies.json"
import skills from "../../database/data/skills.json"
import classes from '../../database/data/classes.json'
import races from '../../database/data/races.json'
import subraces from '../../database/data/subraces.json'
import spells from '../../database/data/spells.json'
import alignments from '../../database/data/alignments.json'
import equipmentList from '../../database/data/equipment.json'
import magicItems from '../../database/data/magic-items.json'
import { format as formatRace } from "./useRace"
import { format as formatClass } from "./useClass"
import { getSpellLevelDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "../levelling"
import { formatEquipmentItem } from "./useEquipmentItem"
import { formatMagicItem } from "./useMagicItem"
import { formatSpell } from "./useSpell"
import { getProficiencyBonus } from "../levelling"
import { valueToModifier, valueToModifierLabel, modifierToModifierLabel } from "../stats"

const allRaces = [...races, ...subraces]
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

	character.level = 5 // fixture for tests
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
	character.alignment = alignments.find(a => a.index === character.alignmentIndex)

	character.spellcastingAbility = 'CHA' // TODO: from class
	character.spellcastingAbilityValue = 3

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

	character.maxSpellLevel = 1 // TODO: from class and level

	character.maximumHitDice = 0 // TODO:
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

	character.attackRollModifier = valueToModifier(character.stats.STR)
	character.attackRollModifierLabel = valueToModifierLabel(character.stats.STR)

	// saving throws
	// Each class gives proficiency in at least two Saving Throws. 
	// As with skill Proficiencies, proficiency in a saving throw lets a character add his or her 
	// Proficiency Bonus to Saving Throws made using a particular ability score. 
	// Some Monsters have saving throw Proficiencies as well.

	function buildSavingThrow(ability) {
		const isProeficient = character.classes[0].saving_throws.some(savingThrow => savingThrow.name === ability)
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

	// TODO: on create character
	character.skillsProficiencies = ["nature", "stealth", "survival"]

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

	character.equipment = (character.equipment || []).map(item => {
		return {
			...equipmentList.find(i => i.index === item.index),
			...item,
			isCharacterContextItem: true,
		}
	}).map(formatEquipmentItem)

	character.hasNoEquipment = isEmpty(character?.equipment)

	function formatProficiency(proficiency) {
		return {
			...proficiency,
			...proficiencies.find(p => p.index === proficiency.index),
		}
	}

	character.proficiencies = uniqBy([
		// always proeficient in unarmed-strike
		formatProficiency({
			"index": 'unarmed-strike',
			'iname': 'Unarmed Strike',
			url: '/api/proficiencies/unarmed-strike',
		}),
		...character.classes[0].proficiencies.map(formatProficiency),
		...character.race.starting_proficiencies.map(formatProficiency),
	], proficiency => proficiency.index)

	character.actionsEquipment = [
		formatEquipmentItem(equipmentList.find(i => i.index === "unarmed-strike")),
		...character.equipment.filter(item => item.equipmentCategory?.index === "weapon")
	].map(item => {
		// Proficiency Bonus. You add your proficiency bonus to your attack roll when you attack using a 
		// weapon with which you have proficiency, as well as when you attack with a spell.

		const isProeficient = item.index === 'unarmed-strike' 
			|| character.proficiencies.some(proficiency => proficiency.reference.index === item.index)

		item.isProeficient = isProeficient
		item.attackRollModifier = character.attackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
		item.attackRollModifierLabel = modifierToModifierLabel(item.attackRollModifier)
		return item
	})

	console.log({ character })
	return character
}

function useCharacter(id) {
	// TODO: not formated since already formatted on fixtures
	return useApi(formatCharacter(characters().find(character => character.id === id)))
}

export default useCharacter