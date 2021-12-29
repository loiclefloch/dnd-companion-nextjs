import { isEmpty } from "lodash"

export const FilterType = {
	SIZE: 'SIZE',
}

const filtersMethods = {
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

  const classFilter = filters.find(filter => filter.type === FilterType.CLASS)
  if (classFilter) {
    data.push({
      filter: classFilter,
      label: '', // no label, we understand with the class label
      value: monster.classes.find(clss => classFilter.value.includes(clss.index))?.name,
    })
  }

  const levelFilter = filters.find(filter => filter.type === FilterType.MONSTER_LEVEL)
  if (levelFilter) {
    data.push({
      filter: levelFilter,
      label: '',
      value: monster.level
    })
  }

	return data
}

/**
 * Creates default filters that match the character
 */
export function buildMonsterFiltersForCharacter(character) {
	if (!character) {
		return []
	}

	return [
		{
			type: FilterType.CLASS,
			value: character.classes.map(clss => clss.index)
		},
		{
			type: FilterType.MONSTER_LEVEL,
			value: [...Array(character.maxMonsterLevel + 1)].map((_, index) => index)
		},
	]
}