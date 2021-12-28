import { sortBy } from "lodash"


export function sortSpells(spells, lang) {
	return sortBy(spells, [ 'level', `nameLocalized.${lang}`])
}