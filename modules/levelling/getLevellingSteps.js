import { getLevellingDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "./"

const MAX_SPELL_LEVEL = 9 // maximum spell level

function noop() {
	return []
}

function applyNoop(from, to) {
	const data = {}

	for (let i = from; i <= to; i++) {
		data[i] = noop
	}
	
	return data
}

function characterNoop() {
	return {
		every: noop(),
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
			// character.maximumHp += 1

			return [
				{
					name: "StepIncreaseMaximumHp", maximumHp : +1,
				}
			]
		},
		...applyNoop(1, 20),
	}
}

function dragonborn(character) {
	return characterNoop()
}

function barbarian(character) {
	return {
		every: () => {
			// TODO
			return []
		},
		// TODO:
		...applyNoop(1, 20),
	}
}

export function createSpellsSlots(classes, characterLevel) {
	const levellingData = getLevellingDataForClassesAndLevel(classes, characterLevel)
	const maximumSlotLevel = getSpellLevelForCharacterLevel(classes, characterLevel)

	const slots = []
	for (let spellLevel = 0; spellLevel < MAX_SPELL_LEVEL; spellLevel++) {
		const baseTotalSlots = spellLevel === 0 ? Infinity : levellingData?.slots[spellLevel] || 0
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

/**
 * Apply custom code for each class / race.
 */
function applyCustomMethods(character, level) {
	let steps = []
	
	function addSteps(newSteps) {
		steps = [...steps, ...newSteps]
	}

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
		addSteps(forRaceContent.every())
		if (forRaceContent[level]) {
			addSteps(forRaceContent[level]())
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${character.race}`)
		}
	} else {
		console.warn(`Levelling does not exists for level race ${character.race}`)
	}
	if (forClass) {
		const forClassContent = forClass(character)
		addSteps(forClassContent.every())

		if (forClassContent[level]) {
			addSteps(forClassContent[level]())
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${character.race}`)
		}
	} else {
		console.warn(`Levelling does not exists for level class ${character.classes[0]}`)
	}

	return steps
}

function getLevellingSteps(character, level = 1) {
	// const race = allRaces.find(r => r.index === character.race)
  // const clss = classes.find(clss => clss.index === character.classes[0])
  // const background = backgrounds.find(b => b.index === characterParam.background)

	const steps = [
		// { name: "introduction" }, // do not add introduction, this is the default one.
		{ name: "features" },
		{ name: "spell-slots" }, // TODO: ignore for some classes
	]

	return [...steps, ...applyCustomMethods(character, level)]
}

export default getLevellingSteps