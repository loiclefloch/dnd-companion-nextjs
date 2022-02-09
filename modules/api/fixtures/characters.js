import { cloneDeep } from "lodash";
import fixtures from "../../../database/fixtures/characters"
import { filterDuplicates } from "../../utils/array"

const isBrowser = typeof window !== "undefined";

function getCharacters() {
	const characters = !isBrowser ? [] : JSON.parse(localStorage.getItem("characters")) || []

	return filterDuplicates([
		...characters, 
		...cloneDeep(fixtures),
	], c => c.id)
}

export default getCharacters