import { cloneDeep } from "lodash";
import fixtures from "../../../database/fixtures/characters"

const isBrowser = typeof window !== "undefined";

function getCharacters() {
	const characters = !isBrowser ? [] : JSON.parse(localStorage.getItem("characters")) || []

	return [
		...characters, 
		...cloneDeep(fixtures),
	]
}

export default getCharacters