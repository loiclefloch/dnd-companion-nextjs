import { map, uniqBy, isEmpty, sortBy } from 'lodash'
import camelize from "../utils/camelize"
import levels from "../../database/data/levels.json"
import skills from "../../database/data/skills.json"
import backgrounds from "../../database/data/backgrounds"
import classes from '../../database/data/classes'
import features from '../../database/data/features'
import feats from '../../database/data/feats'
import subclasses from '../../database/data/subclasses.json'
import allRaces from '../../database/data/allRaces'
import spells from '../../database/data/spells.json'
import alignments from '../../database/data/alignments.json'
import equipmentList from '../../database/data/equipment.json'
import traits from '../../database/data/traits.json'
import { formatRace } from "../api/useRace"
import { formatClass } from "../api/useClass"
import { getLevellingDataForClassesAndLevel, getSpellsSlotsForCharacterLevel, getNextLevelExperienceStage } from "../levelling"
import { formatEquipmentItem } from "../api/useEquipmentItem"
import { formatSpell } from "../api/useSpell"
import { getProficiencyBonus } from "../levelling"
import { getSpellsForCharacterSubclass } from "../character/subclass"
import { valueToModifier, valueToModifierLabel, modifierToModifierLabel } from "../stats"
import { filterDuplicates } from '../utils/array'
import { formatProficiency } from "../api/useProficiency"
import { formatSubclass } from "../api/useSubclass"
import { formatFeature } from "../api/useFeature"
import { formatFeat } from "../api/useFeat"
import applyFeaturesOnCharacter from "./applyFeaturesOnCharacter"
import applyTraitsOnCharacter from "./applyTraitsOnCharacter"
import applyFeatsOnCharacter from "./applyFeatsOnCharacter"
import getCharacterHasProficiencyForItem from "./getCharacterHasProficiencyForItem"

function formatCurrencies(walletHistory) {
	const currencies = {
		cp: 0,
		sp: 0,
		gp: 0,
		ep: 0,
		pp: 0,
	}

	walletHistory.forEach(hist => {
		if (hist.isAdd) {
			currencies.cp += (hist.cp || 0)
			currencies.sp += (hist.sp || 0)
			currencies.gp += (hist.gp || 0)
			currencies.ep += (hist.ep || 0)
			currencies.pp += (hist.pp || 0)
		} else {
			currencies.cp -= (hist.cp || 0)
			currencies.sp -= (hist.sp || 0)
			currencies.gp -= (hist.gp || 0)
			currencies.ep -= (hist.ep || 0)
			currencies.pp -= (hist.pp || 0)
		}
	})

	return currencies
}

function formatSpellsSlots(spellsSlots, spellsUsed) {
	return spellsSlots?.map(slot => {
		const usedSpells = spellsUsed.filter(s => s.spellLevel === slot.spellLevel)

		const totalSlots = slot.totalSlots

		const totalSlotsToDisplay = totalSlots > slot.baseTotalSlots 
			? totalSlots > slot.usedSlots ? totalSlots : slot.usedSlots
			: slot.baseTotalSlots > slot.usedSlots ? slot.baseTotalSlots : slot.usedSlots

		const remainingSlots = slot.baseTotalSlots - slot.usedSlots
		return {
			...slot,
			hasNoSlotsToDisplay: totalSlotsToDisplay === 0,
			hasNoSlots: slot.baseTotalSlots === 0,
			remainingSlots,
			isAboveMaximumSlotLevel: slot.spellLevel > slot.maximumSlotLevel,
			hasData: slot.usedSlots !== 0 || slot.baseTotalSlots !== 0,
			totalSlotsToDisplay,
			usedSpells,
			isAboveMaximumTotalSlots: remainingSlots > slot.baseTotalSlots
		}
	})
}

function formatLevelling(levelling, level) {
	levelling.nextLevelXp = getNextLevelExperienceStage(level)
	levelling.percent = Math.round(levelling.xp / levelling.nextLevelXp * 100)

	levelling.shouldLevelUp = levelling.percent >= 100
}

function getCharacterSubclassFeatures(character) {
	if (!character.subclass) {
		return []
	}

	return levels.filter(
    (l) =>
      l.class.index === character.classes[0].index &&
      l.subclass?.index === character.subclass.index &&
      l.level <= character.level
  ).map(l => l.features).flat().filter(Boolean);
}

function calculateStats(baseStats, statsBonuses) {
	const stats = {
		...baseStats
	}

	statsBonuses?.forEach(statBonus => {
		stats[statBonus.ability.toUpperCase()] +- statBonus.bonus
	})

	return stats
}


function formatItem(character, item) {
	item.isCharacterContextItem = true
	// item.canBeEquipped = true

	// const isUnarmedStrike = item.index === "unarmed-strike"

	// Proficiency with a weapon allows you to add your Proficiency Bonus to the Attack roll for any 
	// Attack you make with that weapon. If you make an Attack roll using a weapon with which you 
	// lack proficiency, you do not add your Proficiency Bonus to the Attack roll.		
	const isProeficient = item.index === 'unarmed-strike' 
		|| character.proficiencies.some(proficiency => proficiency.reference.index === item.index)
	item.isProeficient = isProeficient

	if (item.rangedProperty === 'DEX') {
		item.rangedAttackRollModifier = character.rangedAttackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
		item.rangedAttackRollModifierLabel = modifierToModifierLabel(character.rangedAttackRollModifier)
	} else {
		item.rangedAttackRollModifier = character.meleeAttackRollModifier + (isProeficient ? character.proficiencyBonus : 0)
		item.rangedAttackRollModifierLabel = modifierToModifierLabel(character.meleeAttackRollModifier)
	}

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

	if (item.isHeavy) {
		// TODO: if small -> disadvantage on attack rolls
		// Small creatures have disadvantage on attack rolls with heavy weapons. 
		// A heavy weapon's size and bulk make it too large for a Small creature to use effectively.
	}

	// TODO: property special, force description to be looked at

	// TODO: other properties?

	return item
}
export function formatCharacter(character) {
	if (!character) {
		return null
	}

	if (process.env.NODE_ENV === 'development') {
		character.feats = character.feats || []
		// character.feats.push({
		// 	index: 'observant'
		// })
	}
	

	character.currentHp = character.currentHp || character.maxHp

	character.isKo = character.currentHp < 0

	character.race = {
		index: character.race,
		...formatRace(allRaces.find(r => r.index === character.race))
	}
	character.classes = character.classes
		.map(clss => classes.find(c => clss === c.index))
		.map(formatClass)

	// shortcut
	character.clss = character.classes[0]

	if (character.subclass) {
		character.subclass = {
			...formatSubclass(subclasses.find(c => c.index === character.subclass.index)),
		}
	}
	const clss = character.classes[0]

	const levellingData = getLevellingDataForClassesAndLevel(character.classes, character.level)

	character.stats = calculateStats(character.baseStats, character.statsBonuses)

	character.background = backgrounds.find(b => b.index === character.background)

	character.alignment = alignments.find(a => a.index === character.alignment)

	character.spellcasting = { ... (levellingData.spellcasting || {}), ...(clss.spellcasting || {}) }
	character.spellcastingAbility = clss.spellcasting?.spellcastingAbility?.name
	character.spellcastingAbilityValue = valueToModifier(character.stats[character.spellcastingAbility] || 0)
	character.spellcastingAbilityValueLabel = modifierToModifierLabel(character.spellcastingAbilityValue)

	formatLevelling(character.levelling, character.level)

	const maxSpellLevel = Math.max(...Object.keys(levellingData.slots))

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

	character.proficiencies = uniqBy(character.proficiencies, proficiency => proficiency.index)
		.map(formatProficiency)

  character.skillsProficiencies = character.proficiencies
    .filter(p => p.isSkill)
    .map(p => p.skillIndex)

	character.skills = skills.map(skillData => {
		const ability = skillData.ability_score.name
		const skill = skillData.index
		const isProeficient = character.skillsProficiencies.includes(skill)

		const value = character.stats[ability]
		const modifier = valueToModifier(value) + (isProeficient ? character.proficiencyBonus : 0)
		return {
			index: skillData.index,
			label: skillData.name, // TODO: i18n
			description: skillData.desc, // TODO: i18n
			ability,
			skill,
			value,
			isProeficient,
			modifierLabel: modifierToModifierLabel(modifier),
			modifier,
		}
	})


	character.initiative = valueToModifier(character.stats.DEX)


	// 10 + Wisdom Score Modifier + Proficiency Bonus if proficiency in the Wisdom (Perception) skill
	const isProefficientInPerception = character.skills.find(s => s.index === "perception").isProeficient
	character.passivePerception = 10 + valueToModifier(character.stats.WIS) + (isProefficientInPerception ? character.proficiencyBonus : 0)

	const isProefficientInInvestigation = character.skills.find(s => s.index === "investigation").isProeficient
	character.passiveInvestigation = 10 + valueToModifier(character.stats.INT) + (isProefficientInInvestigation ? character.proficiencyBonus : 0)

	character.equipment = (character.equipment || []).map(item => {
		return {
			...equipmentList.find(i => i.index === item.index),
			...item,
			isCharacterContextItem: true,
			isEquipped: item.isEquipped || false,
			hasProficiency: getCharacterHasProficiencyForItem(character, item)
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
	character.traits = sortBy(character.traits, 'name')
	
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


	character.actionsEquipment = [
		formatEquipmentItem(equipmentList.find(i => i.index === "unarmed-strike")),
		...character.equipment.filter(item => item.equipmentCategory?.index === "weapon")
	]
	.map(camelize)
	.map(item => formatItem(character, item))

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
	character.naturalAc = 10 + valueToModifier(character.stats.DEX)

	// TODO:
	const armorEquipped = character.equipment.find(item => item.isArmor && item.isEquipped)
	const shieldEquipped = character.equipment.find(item => item.isShield && item.isEquipped)


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

	// add subclass features
	character.subclassFeatures = getCharacterSubclassFeatures(character)
	character.features = filterDuplicates([...character.features, ...character.subclassFeatures], f => f.index)
	character.features = character.features.map((featureData) => {
    const feature = features.find((f) => f.index === featureData.index);
    if (!feature) {
      // TODO: complete with background features
      // throw new Error(`Feature not found ${featureData.index}`)
      return {
        ...featureData,
      };
    }
    return {
      ...formatFeature(feature),
      ...featureData,
    };
  });
	character.features = sortBy(character.features, ['name'])

	if (!character.feats) {
    character.feats = [];
  }
	character.feats = character.feats.map((feat) => ({
		...formatFeat(feats.find((f) => f.index === feat.index)),
		...feat,
	}));
	

  character.wallet.currencies = formatCurrencies(character.wallet.history)

	//
	//
	//
	applyFeaturesOnCharacter(character)
	applyTraitsOnCharacter(character)
	// must be before spellsList, since it can add some spells
	applyFeatsOnCharacter(character)
	//
	//
	//

	// We must put the following after apply* methods, because they modify the character base data to
	// be used on the following (ex: naturalAc / speed / initiative)
	// TODO: spells will be added on character level-up, so it is not mandatory to format spells here,
	//  after the apply*

	character.spellsList = [
		...(character.spellsList || []),
		...(character.subclass ? getSpellsForCharacterSubclass(character) : [])
	].map(spell => {
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

	// // TODO: remove
	// if (!character.spellsSlots) {
	// 	character.spellsSlots = getSpellsSlotsForCharacterLevel(
	// 		character.classes, 
	// 		character.level
	// 	)
	// }
	character.spellsSlots = formatSpellsSlots(
		character.spellsSlots, 
		character.spellsUsed
	)
	
	// light armor
	// Made from supple and thin materials, Light Armor favors agile Adventurers since it offers some 
	// Protection without sacrificing mobility. If you wear Light Armor, you add your Dexterity 
	// modifier to the base number from your armor type to determine your Armor Class.

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
		natural: character.naturalAc,
		armor: armorAc,
		shield: shieldAc,
		total: (hasArmorEquipped ? armorAc : character.naturalAc) + (hasShieldEquipped ? shieldAc : 0)
	}
	

	return character
}

export default formatCharacter