import { isEmpty, cloneDeep } from "lodash"
import languages from "./languages.json"
import proficiencies from "./proficiencies.json"
import traits from "./traits.json"

import dragonborn from "./races/dragonborn"
import dwarf from "./races/dwarf"
import elf from "./races/elf"
import gnome from "./races/gnome"
import halfEelf from "./races/half-elf"
import halfling from "./races/halfling"
import halfOrc from "./races/half-orc"
import highElf from "./races/high-elf"
import hillDwarf from "./races/hill-dwarf"
import human from "./races/human"
import lightfootHalfling from "./races/lightfoot-halfling"
import rockGnome from "./races/rock-gnome"
import tiefling from "./races/tiefling"
import aasimar from "./races/aasimar"
import protectoreAasimar from "./races/protector-aasimar"

const _races = [
	dragonborn,
	dwarf,
	elf,
	gnome,
	halfEelf,
	halfling,
	halfOrc,
	highElf,
	hillDwarf,
	human,
	lightfootHalfling,
	rockGnome,
	tiefling,
	aasimar,
	protectoreAasimar,
]

const api = {
	buildAbilityBonus: (ability, bonus) => {
		return {
			ability_score: {
				index: ability.toLowerCase(),
				name: ability.toUpperCase(),
				url: `/api/ability-scores/${ability.toLowerCase()}`
			},
			bonus
		}
	},
	buildLanguage: (index) => {
		const language = languages.find(l => l.index === index)
		if (!language) {
			throw new Error(`language not found ${index}`)
		}
		return {
			index: language.index,
			name: language.name,
			url: language.url,
		}
	},
	buildTrait: (index) => {
		const trait = traits.find(l => l.index === index)
		if (!trait) {
			throw new Error(`trait not found ${index}`)
		}
		return {
			index: trait.index,
			name: trait.name,
			url: trait.url,
		}
	},
	buildProficiency: (index) => {
		const proficiency = proficiencies.find(l => l.index === index)
		if (!proficiency) {
			throw new Error(`proficiency not found ${index}`)
		}
		return {
			index: proficiency.index,
			name: proficiency.name,
			url: proficiency.url,
		}
	},
	buildRace: (index) => {
		// const race = _races.find(r => r.index === index)
		// if (!race) {
		// 	throw new Error(`Race not found ${index}`)
		// }
		return {
			index: index,
			// name: index,
			// url: race.url,
		}
	}
}

function build(race) {
	race.url = `/api/subraces/${race.index}`
	return race
}


const races = _races.map(r => build(r(api)))

function mergeArray(final, race, sub, property) {
	final[property] = [
		...(race[property] || []),
		...(sub[property] || []),
	]
}

function merge(race, sub) {
	const final = cloneDeep(race)

	// arrays to merge
	const arrayKeys = [
		'ability_bonuses',
		'starting_proficiencies',
		'languages',
		'traits'
	]

	arrayKeys.forEach(key => {
		mergeArray(final, race, sub, key)
	})

	// // race is using 'traits' while the sub has the 'racial_traits'
	// final.traits = [
	// 	...(race.traits || []),
	// 	...(sub.traits || sub.racial_traits || []),
	// ]

	// sub race has priority on this keys
	const objectKeys = [
		"index",
		"name",
		"race",
		"url",
	]
	objectKeys.forEach(key => {
		final[key] = sub[key]
	})

	final.subraces = null
	final.isSubRace = true

	const raceKeys = Object.keys(race)
	const subKeys = Object.keys(sub)

	const handledKeys = [
		...arrayKeys,
		...objectKeys,
	]

	const duplicates = raceKeys.filter(function(val) {
		return subKeys.includes(val);
	});

	const remaining = duplicates.filter(d => !handledKeys.includes(d))
	if (remaining.length) {
		console.error(`Remaining !`)
		console.table(remaining)
		throw new Error(`Remaining`)
	}
	
	if (final.starting_proficiency_options) {
		final.starting_proficiency_options.from = final.starting_proficiency_options.from.map(o => ({
			...o,
			sourceType: 'race-option'
		}))
	}
	return final
}

const allRaces = []
races.forEach(race => {
	if (race.subraces && race.subraces.length === 0) {
		allRaces.push(race)
	} else {
		const subraces = races.filter(r => r.race && r.race.index === race.index);
		// if (isEmpty(subraces)) {
		// 	throw new Error(`No subraces found for ${race.index}`)
		// }
		subraces.forEach(sub => {
			allRaces.push(merge(race, sub))
		})
	}
})

console.log(allRaces)

export default allRaces