import { isArray } from "lodash"
import { getLevellingDataForClassesAndLevel } from "./"

function noop() {
	return () => []
}

function applyNoop(from, to) {
	const data = {}

	for (let i = from; i <= to; i++) {
		data[i] = noop()
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

function hillDwarf() {
	return {
		every: () => {
			// Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.
			// character.maximumHp += 1

			return [
				{
					name: "increase-maximum-hp", 
					label: "Points de vie supplémentaire",
					desc: "En tant que nain des collines, vous gagnez un point de vie supplémentaire",
					hp : +1,
				}
			]
		},
		...applyNoop(1, 20),
	}
}

function dragonborn() {
	return characterNoop()
}

function lightfootHalfling() {
	return characterNoop()
}

function halfOrc() {
	return characterNoop()
}

function barbarian() {
	return {
		every: () => {
			// TODO
			return []
		},
		// TODO:
		...applyNoop(1, 20),
	}
}

function paladin() {
	return {
		every: () => {
			// TODO
			return []
		},
		...applyNoop(1, 20),
		3: () => {
			return [
				{
					name: "sacred-oath", 
					label: "Sacred Oath",
					desc: "Swear the oath that binds you as a paladin forever.",
				},
			]
		},
	}
}

function bard() {
	return {
		every: () => {
			// TODO
			return []
		},
		...applyNoop(1, 20),
		3: () => {
			return [
				{
					name: "bard-college", 
					label: "Bard college",
					desc: "Delve into the advanced techniques of a bard college.",
				},
			]
		}
	}
}

function druid() {
	return {
		every: () => {
			// TODO
			return []
		},
		...applyNoop(1, 20),
		2: () => {
			return [
				{
					name: "druid-circle", 
					label: "Druid circle",
					desc: "You choose which one of the druids circles you identiy to.",
				},
			]
		},
	}
}

function rogue() {
	return {
		every: () => {
			return []
		},
		...applyNoop(1, 20),
		3: () => {
			return [
				{
					name: "roguish-archetypes", 
					label: "Roguish Archetypes", 
					desc: "You choose an archetype that you emulate in the exercise of your rogue abilities.",
				},
			]
		},
	}
}

function fighter() {
	return {
		every: () => {
			return []
		},
		...applyNoop(1, 20),
		3: () => {
			return [
				{
					name: "martial-archetype",
					label: "Martial Archetype",
					desc: "You choose an archetype that you strive to emulate in your combat styles and techniques.",
				},
			]
		},
		// TODO: level 10 subclass champion:
		// At 10th level, you can choose a second option from the Fighting Style class feature.
	}
}


/**
 * Apply custom code for each class / race.
 */
function applyCustomMethods(character, level) {
	let steps = []
	
	function addSteps(newSteps) {
		if (!isArray(newSteps)) {
			debugger
			throw new Error(`addSteps: expecting array, received ${typeof newSteps}`)
		}
		steps = [...steps, ...newSteps]
	}

	// TODO:
	const racesMap = {
		'hill-dwarf': hillDwarf,
		dragonborn: dragonborn,
		'lightfoot-halfling': lightfootHalfling,
		'half-orc': halfOrc,
	}
	// TODO:
	const classesMap = {
		barbarian: barbarian,
		paladin: paladin,
		druid: druid,
		bard: bard,
		rogue: rogue,
		fighter: fighter,
	}

	const race = character.race?.index || character.race 
	const clss = character.classes[0]?.index || character.classes[0]

	const forRace = racesMap[race]
	const forClass = classesMap[clss]

	if (forRace) {
		const forRaceContent = forRace(character)
		addSteps(forRaceContent.every())
		if (forRaceContent[level]) {
			addSteps(forRaceContent[level]())
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${race}`)
			steps.push({
				name: "levelling-does-not-exists",
				type: 'level-does-not-exists-for-level-for-race',
				label: 'level-does-not-exists-for-level-for-race',
				level,
				race,
			})
		}
	} else {
		console.warn(`Levelling does not exists for race ${race}`)
		steps.push({
			name: "levelling-does-not-exists",
			type: 'level-does-not-exists-for-race',
			label: 'level-does-not-exists-for-race',
			race,
		})
	}
	if (forClass) {
		const forClassContent = forClass(character)
		addSteps(forClassContent.every())

		if (forClassContent[level]) {
			const stepsForClassContent = forClassContent[level]()
			addSteps(stepsForClassContent)
		} else {
			console.warn(`Levelling does not exists for level ${level} for class ${clss}`)
			steps.push({
				name: "levelling-does-not-exists",
				type: 'level-does-not-exists-for-level-for-class',
				label: 'level-does-not-exists-for-level-for-class',
				clss,
				level,
			})
		}
	} else {
		console.warn(`Levelling does not exists for level class ${clss}`)
		steps.push({
			name: "levelling-does-not-exists",
			type: 'level-does-not-exists-for-class',
			label: 'level-does-not-exists-for-class',
			clss,
			level,
		})
	}

	return steps
}

function addAbilityScoreImprovement(levellingData) {
	const hasAbilityScoreImprovement = levellingData.features.some(f => f.includes("-ability-score-improvement-"))

	if (hasAbilityScoreImprovement) {
		return [
			{
				name: "ability-score-improvement",
				label: "Augmentation des capacités", // TODO: better text
				desc: "",
			},
		]
	}

	return []
}

function getLevellingSteps(character, level = 1) {
	// const race = allRaces.find(r => r.index === character.race)
  // const clss = classes.find(clss => clss.index === character.classes[0])
  // const background = backgrounds.find(b => b.index === characterParam.background)
	const levellingData = getLevellingDataForClassesAndLevel(character.classes, level)

	const steps = [
		{ name: "introduction" },
		{ 
			name: "features", 
			label: "Ajout features",
			desc: "",
		},

		...addAbilityScoreImprovement(levellingData),

		...applyCustomMethods(character, level),

		// TODO: ignore for some classes?
		{ 
			name: "spell-slots",
			label: "Mise à jour des spells slots",
			desc: "",
		},

		{
			name: "proficiency-bonus",
			label: "Bonus de maîtrise",
			desc: "",
		},

		// at the end, we must have updated the CON before (= hit dice + CON, ex: 1d12 + CON)
		{
			name: "hit-points",
			label: "Points de vie",
			desc: "Vous gagnez des points de vie",
		},

		{
			name: "finalize",
			desc: ""
		}
	].filter(Boolean)

	return steps
}

export default getLevellingSteps