import { sortBy } from "lodash"

export function sortMonsters(monsters, lang) {
	return sortBy(monsters, [ `nameLocalized.${lang}`])
}