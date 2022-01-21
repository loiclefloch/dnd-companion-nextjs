import { cloneDeep } from "lodash"
import Error from "next/error"
import races from "./races.json"
import subraces from "./subraces.json"

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
	]

	arrayKeys.forEach(key => {
		mergeArray(final, race, sub, key)
	})

	// race is using 'traits' while the sub has the 'racial_traits'
	final.traits = [
		...(race.traits || []),
		...(sub.racial_traits || []),
	]

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
	if (race.subraces.length === 0) {
		allRaces.push(race)
	} else {
		subraces.filter(r => r.race.index === race.index).forEach(sub => {
			allRaces.push(merge(race, sub))
		})
	}
})

export default allRaces