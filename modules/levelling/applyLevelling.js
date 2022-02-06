// import classes from '../../database/data/classes.json'
// import allRaces from "../../database/data/allRaces"
import { getSpellLevelDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "./"

const MAX_SPELL_LEVEL = 9 // maximum spell level

function noop() {}

function characterNoop() {
	return {
		every: () => {
		},
		1: noop(),
		2: noop(),
		3: noop(),
		4: noop(),
		5: noop(),
		6: noop(),
		7: noop(),
		8: noop(),
		9: noop(),
		10: noop(),
		11: noop(),
		12: noop(),
		13: noop(),
		14: noop(),
		15: noop(),
		16: noop(),
		17: noop(),
		18: noop(),
		19: noop(),
		20: noop(),
	}
}

function hillDwarf(character) {
	return {
		every: () => {
			// Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.
			character.maximumHp += 1
		},
		1: noop(),
		2: noop(),
		3: noop(),
		4: noop(),
		5: noop(),
		6: noop(),
		7: noop(),
		8: noop(),
		9: noop(),
		10: noop(),
		11: noop(),
		12: noop(),
		13: noop(),
		14: noop(),
		15: noop(),
		16: noop(),
		17: noop(),
		18: noop(),
		19: noop(),
		20: noop(),
	}
}

function dragonborn(character) {
	return characterNoop()
}

function barbarian(character) {
	return {
		every: () => {
			// Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.
			character.maximumHp += 1
		},
		// TODO:
	}
}

export function createSpellsSlots(classes, characterLevel) {
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, characterLevel)
	const maximumSlotLevel = getSpellLevelForCharacterLevel(classes, characterLevel)

	const slots = []
	for (let spellLevel = 0; spellLevel < MAX_SPELL_LEVEL; spellLevel++) {
		const baseTotalSlots = spellLevel === 0 ? Infinity : spellLevelData?.slots[spellLevel] || 0
		const spellsSlotsOverride = spellsSlotsOverride && spellsSlotsOverride[spellLevel]
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


function applyLevelling(character, level = 1) {
	// const race = allRaces.find(r => r.index === character.race)
  // const clss = classes.find(clss => clss.index === character.classes[0])
  // const background = backgrounds.find(b => b.index === characterParam.background)

	// TODO:
	const racesMap = {
		'hill-dwarf': hillDwarf,
	}
	// TODO:
	const classesMap = {
		barbarian: barbarian,
		dragonborn: dragonborn,
	}

	const forRace = racesMap[character.race]
	const forClass = classesMap[character.classes[0]]

	if (forRace) {
		const forRaceContent = forRace(character)
		forRaceContent.every()
		if (forRaceContent[level]) {
			forRaceContent[level]()
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${character.race}`)
		}
	} else {
		console.warn(`Levelling does not exists for level race ${character.race}`)
	}
	if (forClass) {
		const forClassContent = forClass(character)
		forClassContent.every()

		if (forClassContent[level]) {
			forClassContent[level]()
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${character.race}`)
		}
	} else {
		console.warn(`Levelling does not exists for level class ${character.classes[0]}`)
	}

	// TODO: it will clean slots on level up, do we want this?
	// spellsSlots generation
	character.spellsSlots = createSpellsSlots(
		character.classes, 
		character.level
	)
}

export default applyLevelling