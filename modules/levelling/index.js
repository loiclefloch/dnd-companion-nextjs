import getLevellingDataForClasses from "./getLevellingDataForClasses"

const MAX_SPELL_LEVEL = 9 // maximum spell level

// Experience Points	Level	Proficiency Bonus
// 0	1	+2
// 300	2	+2
// 900	3	+2
// 2,700	4	+2
// 6,500	5	+3
// 14,000	6	+3
// 23,000	7	+3
// 34,000	8	+3
// 48,000	9	+4
// 64,000	10	+4
// 85,000	11	+4
// 100,000	12	+4
// 120,000	13	+5
// 140,000	14	+5
// 165,000	15	+5
// 195,000	16	+5
// 225,000	17	+6
// 265,000	18	+6
// 305,000	19	+6
// 355,000	20	+6

import Error from "next/error"

export function getLevellingStages() {
	return {
		1: 0,
		2: 300,
		3: 900,
		4: 2700,
		5: 6500,
		6: 14000,
		7: 23000,
		8: 34000,
		9: 48000,
		10: 64000,
		11: 85000,
		12: 100000,
		13: 120000,
		14: 140000,
		15: 165000,
		16: 195000,
		17: 225000,
		18: 265000,
		19: 305000,
		20: 355000,
	}
}

export function getNextLevelExperienceStage(level) {
	if (level === 20) {
		return 0 // no more level after 20
	}
	return getLevellingStages()[level + 1]
}

export function getLevelExperienceStage(level) {
	return getLevellingStages()[level]
}

export function getLevelProficiencyBonus(level) {
	const levellingProficiencyBonus = {
		1: +2,
		2: +2,
		3: +2,
		4: +2,
		5: +3,
		6: +3,
		7: +3,
		8: +3,
		9: +4,
		10: +4,
		11: +4,
		12: +4,
		13: +5,
		14: +5,
		15: +5,
		16: +5,
		17: +6,
		18: +6,
		19: +6,
		20: +6,
	}

	return levellingProficiencyBonus[level]
}

export function getSpellLevelForCharacterLevel(characterClasses, characterLevel) {
	const levellingDataForClasses = getLevellingDataForClasses()

	function getMaxLevel(levelSpellData) {
		if (!levelSpellData) {
			return 0
		}
		
		let maxSlotLevel = 0
		Object.values(levelSpellData.slots).forEach((slot, slotLevel) => {
			if (slot > 0) {
				maxSlotLevel = slotLevel
			}
		})
		return maxSlotLevel
	}
	
	if (!levellingDataForClasses[characterClasses[0].index]) {
		throw new Error(`Class ${characterClasses[0].index} not handled yet`)
	}	
	// TODO: how to with multiclass ? use getLevellingDataForClassesAndLevel?
	return getMaxLevel(levellingDataForClasses[characterClasses[0].index][characterLevel])

	// const levelsPerClasses = characterClasses.map(clss => {
		// return getMaxLevel(levellingDataForClasses[clss.index][characterLevel])
	// })

	// return Math.max(levelsPerClasses)
}

export function getLevellingDataForClassesAndLevel(characterClasses, characterLevel)  {
	const levellingDataForClasses = getLevellingDataForClasses()
	// TODO: how to with multiclass ?
	if (!levellingDataForClasses[characterClasses[0].index]) {
		throw new Error(`Class ${characterClasses[0].index} not handled yet`)
	}
	return levellingDataForClasses[characterClasses[0].index][characterLevel]
}

export function getProficiencyBonus(clss, characterLevel) {
	// TODO: complete
	const bonus = {
		druid: [
			{
				fromLevel: 1,
				toLevel: 4,
				value: 2
			},
			{
				fromLevel: 5,
				toLevel: 10, // TODO:
				value: 3
			}
		]
	}
	//  In D&D 5e the calculation is so complicated that the numbers are repeated at every class description 
	// (see the tables listing your class features for levels 1-20 in the PHB).
	// https://rpg.stackexchange.com/questions/31854/can-someone-explain-what-the-proficiency-bonus-is-in-dd-5e-next-exactly

	const forClass = bonus[clss]
	if (forClass) {
		const desc = forClass.find(desc => desc.fromLevel <= characterLevel && characterLevel < desc.toLevel)
		return desc?.value ?? 2
	}
	return 2
}

export function getSpellsSlotsForCharacterLevel(classes, characterLevel) {
	const levellingData = getLevellingDataForClassesAndLevel(classes, characterLevel)
	const maximumSlotLevel = getSpellLevelForCharacterLevel(classes, characterLevel)

	const slots = []
	for (let spellLevel = 0; spellLevel < MAX_SPELL_LEVEL; spellLevel++) {
		const baseTotalSlots = spellLevel === 0 ? Infinity : levellingData?.slots[spellLevel] || 0
		// const spellsSlotsOverride = spellsSlotsOverride && spellsSlotsOverride[spellLevel]
		const usedSlots = 0;

		slots.push({
			spellLevel,
			totalSlots: baseTotalSlots,
			baseTotalSlots,
			usedSlots,
			maximumSlotLevel,
		})
	}

	return slots
}
