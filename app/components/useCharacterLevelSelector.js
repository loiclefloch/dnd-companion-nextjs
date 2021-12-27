import { useState, useCallback } from "react"
import useContextCharacter from "../modules/context/useContextCharacter"

const MAX_CHARACTER_LEVEL = 20 // maximum character level

function useCharacterLevelSelector() {
	const character = useContextCharacter()
	const [characterLevel, _setCharacterLevel] = useState(character?.level || 1)

	// use contextual character if possible
	const characterMaxLevel = character?.level || MAX_CHARACTER_LEVEL

	const setCharacterLevel = useCallback((newLevel) => {
		if (newLevel <= 0) {
			_setCharacterLevel(characterLevel)
		}
		else if (newLevel > MAX_CHARACTER_LEVEL) {
			// we let go above the character.level, but display it in the UI (red text)
			_setCharacterLevel(MAX_CHARACTER_LEVEL)
		} else {
			_setCharacterLevel(newLevel)
		}
	}, [characterLevel])

	return {
		characterLevel,
		setCharacterLevel,
		characterMaxLevel,
		characterInContext: !!character,
		isAboveMaximumCharacterLevel: characterLevel > characterMaxLevel
	}
}


export default useCharacterLevelSelector