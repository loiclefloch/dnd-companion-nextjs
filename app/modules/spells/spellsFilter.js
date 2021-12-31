import { isEmpty } from "lodash"

export const FilterType = {
	CLASS: 'CLASS',
	SUBCLASS: 'SUBCLASS',
	SPELL_LEVEL: 'SPELL_LEVEL',
	MAGIC_SCHOOL: 'MAGIC_SCHOOL',
	DAMAGE_TYPE: 'DAMAGE_TYPE',
	ACTION_TYPE: 'ACTION_TYPE',
	RANGE: 'RANGE',
	CONCENTRATION: 'CONCENTRATION', // boolean
	RITUAL: 'RITUAL', // boolean
	SOURCE: 'SOURCE',
}

const filtersMethods = {
	[FilterType.CLASS]: (value, spell) => spell.classes.find(clss => value.includes(clss.index)),
	[FilterType.SPELL_LEVEL]: (value, spell) => value.includes(spell.level),
	[FilterType.MAGIC_SCHOOL]: (value, spell) => value.includes(spell.school.index),
	// TODO:
	// [FilterType.SUBCLASS]: (value, spell) => false
}

function applyFilter(filter, spell) {
	const filterMethod = filtersMethods[filter.type]
	if (!filterMethod) {
		throw new Error(`Filter type ${filter.type} not handled`)
	}
	return filterMethod(filter.value, spell)
}

export function filterSpells(spells, filters) {
	if (isEmpty(filters)) {
		return spells
	}
	return spells?.filter(spell => filters.every(filter => applyFilter(filter, spell)))
}

/**
 * Build data, for each filter, which data of the spell match
 */
export function getSpellFiltersMatchingData(spell, filters) {
	const data = []

  const classFilter = filters.find(filter => filter.type === FilterType.CLASS)
  if (classFilter) {
    data.push({
      filter: classFilter,
      label: '', // no label, we understand with the class label
      value: spell.classes.find(clss => classFilter.value.includes(clss.index))?.name,
    })
  }

  const levelFilter = filters.find(filter => filter.type === FilterType.SPELL_LEVEL)
  if (levelFilter) {
    data.push({
      filter: levelFilter,
      label: '',
      value: spell.level === 0 ? 'Cantrip' : `lvl ${spell.level}`
    })
  }

	const magicSchoolFilter = filters.find(filter => filter.type === FilterType.MAGIC_SCHOOL)
  if (magicSchoolFilter) {
    data.push({
      filter: magicSchoolFilter,
      label: '',
      value: spell.school.name
    })
  }


	return data
}

/**
 * Creates default filters that match the character
 */
export function buildSpellFiltersForCharacter(character) {
	if (!character) {
		return []
	}

	return [
		{
			type: FilterType.CLASS,
			value: character.classes.map(clss => clss.index)
		},
		{
			type: FilterType.SPELL_LEVEL,
			value: [...Array(character.maxSpellLevel + 1)].map((_, index) => index)
		},
	]
}