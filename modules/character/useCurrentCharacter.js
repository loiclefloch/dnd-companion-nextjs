import { isEmpty } from "lodash/isEmpty"
import classes from '../../database/data/classes.json'
import useCharacter from '../api/useCharacter'

const isBrowser = typeof window !== "undefined";

function getCurrentCharacterId() {
	if (!isBrowser) {
		return null
	}

	const id = localStorage.getItem("currentCharacterId")
	if (id) {
		return id
	}

	const characters = JSON.parse(localStorage.getItem("characters")) || []
	if (isEmpty(characters)) {
		return null
	}

	const defaultId = characters[0].id
	localStorage.setItem("currentCharacterId", defaultId)
	return defaultId 
}

function useCurrentCharacter() {
	const characterResponse = useCharacter(getCurrentCharacterId())
	return characterResponse.data
}

export default useCurrentCharacter