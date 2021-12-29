import { isEmpty } from "lodash"

export const FilterType = {
	DIFFICULTY: 'DIFFICULTY',
	SIZE: 'SIZE',
}

const filtersMethods = {
	[FilterType.DIFFICULTY]: (value, monster) => value.includes(monster.challenge.difficulty),
	// [FilterType.SIZE]: (value, monster) => monster.classes.find(clss => value.includes(clss.index)),
	// TODO:
}

function applyFilter(filter, monster) {
	const filterMethod = filtersMethods[filter.type]
	if (!filterMethod) {
		throw new Error(`Filter type ${filter.type} not handled`)
	}
	return filterMethod(filter.value, monster)
}

export function filterMonsters(monsters, filters) {
	if (isEmpty(filters)) {
		return monsters
	}
	return monsters?.filter(monster => filters.every(filter => applyFilter(filter, monster)))
}

/**
 * Build data, for each filter, which data of the monster match
 */
export function getMonsterFiltersMatchingData(monster, filters) {
	const data = []

  const difficultyFilter = filters.find(filter => filter.type === FilterType.DIFFICULTY)
  if (difficultyFilter) {
    data.push({
      filter: difficultyFilter,
      label: '', // no label, we understand with the value 
      value: monster.challenge.difficulty,
    })
  }

	return data
}
