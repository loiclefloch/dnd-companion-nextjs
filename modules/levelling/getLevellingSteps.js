import { getLevellingDataForClassesAndLevel } from "./"

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
		}
	} else {
		console.warn(`Levelling does not exists for level race ${race}`)
	}
	if (forClass) {
		const forClassContent = forClass(character)
		addSteps(forClassContent.every())

		if (forClassContent[level]) {
			addSteps(forClassContent[level]())
		} else {
			console.warn(`Levelling does not exists for level ${level} for class ${clss}`)
		}
	} else {
		console.warn(`Levelling does not exists for level class ${clss}`)
	}

	return steps
}

function addAbilityScoreImprovement(levellingData) {
	const hasAbilityScoreImprovement = levellingData.features.some(f => f.includes("-ability-score-improvement-"))

	if (hasAbilityScoreImprovement) {
		return {
			name: "ability-score-improvement",
			label: "Augmentation des capacités", // TODO: better text
			desc: "",
		}
	}

	return null
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

		addAbilityScoreImprovement(levellingData),

		// TODO: ignore for some classes?
		{ 
			name: "spell-slots",
			label: "Mise à jour des spells slots",
			desc: "",
		},
	]

	return [
		...steps, 
		...applyCustomMethods(character, level),
		{
			name: "finalize",
			desc: ""
		}
	].filter(Boolean)
}

export default getLevellingSteps