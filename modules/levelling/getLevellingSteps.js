import { isArray } from "lodash"
import { getLevellingDataForClassesAndLevel } from "./"
import classes from "../../database/data/classes"
import subclasses from "../../database/data/subclasses"
import allRaces from "../../database/data/allRaces"

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

	const raceIndex = character.race?.index || character.race 
	const classIndex = character.classes[0]?.index || character.classes[0]
	const subclassIndex = character.subclass?.index || character.subclass || null

	const forRace = allRaces.find(r => r.index === raceIndex).levelling
	const forClass = classes.find(c => c.index === classIndex).levelling

	if (forRace) {
		if (forRace.every) {
			addSteps(forRace.every)
		}
		if (forRace[level]) {
			addSteps(forRace[level])
		} else {
			console.warn(`Levelling does not exists for level ${level} for race ${raceIndex}`)
			steps.push({
				index: "levelling-does-not-exists",
				type: 'level-does-not-exists-for-level-for-race',
				label: `level-does-not-exists-for-level-for-race ${raceIndex}`,
				level,
				race: raceIndex,
			})
		}
	} else {
		console.warn(`Levelling does not exists for race ${raceIndex}`)
		steps.push({
			index: "levelling-does-not-exists",
			type: 'level-does-not-exists-for-race',
			label: `level-does-not-exists-for-level-for-race ${raceIndex}`,
			race: raceIndex,
		})
	}

	if (forClass) {
		if (forClass.every) {
			addSteps(forClass.every)
		}

		if (forClass[level]) {
			const stepsForClassContent = forClass[level]
			addSteps(stepsForClassContent)
		} else {
			console.warn(`Levelling does not exists for level ${level} for class ${classIndex}`)
			steps.push({
				index: "levelling-does-not-exists",
				type: 'level-does-not-exists-for-level-for-class',
				label: 'level-does-not-exists-for-level-for-class',
				clss: classIndex,
				level,
			})
		}
	} else {
		console.warn(`Levelling does not exists for level class ${classIndex}`)
		steps.push({
			index: "levelling-does-not-exists",
			type: 'level-does-not-exists-for-class',
			label: `level-does-not-exists-for-class`,
			clss: classIndex,
			level,
		})
	}

	if (subclassIndex) {
		const forSubclass = subclasses[subclassIndex]?.levelling
		if (forSubclass) {
			if (forSubclass.every) {
				addSteps(forSubclass.every)
			}

			if (forSubclass[level]) {
				const stepsForClassContent = forSubclass[level]
				addSteps(stepsForClassContent)
			} else {
				console.warn(`Levelling does not exists for level ${level} for subclass ${subclassIndex}`)
				steps.push({
					index: "levelling-does-not-exists",
					type: 'level-does-not-exists-for-level-for-subclass',
					label: `level-does-not-exists-for-level-for-subclass ${subclassIndex}`,
					clss: classIndex,
					level,
				})
			}
		} else {
			console.warn(`Levelling does not exists for level subclass ${subclassIndex}`)
			steps.push({
				index: "levelling-does-not-exists",
				type: 'level-does-not-exists-for-subclass',
				label: `level-does-not-exists-for-level-for-subclass ${subclassIndex}`,
				clss: classIndex,
				level,
			})
		}
	}

	return steps
}

function addAbilityScoreImprovement(levellingData) {
	const hasAbilityScoreImprovement = levellingData.features.some(f => f.includes("-ability-score-improvement-"))

	if (hasAbilityScoreImprovement) {
		return [
			{
				index: "ability-score-improvement",
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
		{ index: "introduction" },
		{ 
			index: "features", 
			label: "Ajout features",
			desc: "",
		},

		...addAbilityScoreImprovement(levellingData),

		...applyCustomMethods(character, level),

		// TODO: ignore for some classes?
		{ 
			index: "spell-slots",
			label: "Mise à jour des spells slots",
			desc: "",
		},

		{
			index: "proficiency-bonus",
			label: "Bonus de maîtrise",
			desc: "",
		},

		// at the end, we must have updated the CON before (= hit dice + CON, ex: 1d12 + CON)
		{
			index: "hit-points",
			label: "Points de vie",
			desc: "Vous gagnez des points de vie",
		},

		{
			index: "finalize",
			desc: ""
		}
	].filter(Boolean)

	return steps
}

export default getLevellingSteps