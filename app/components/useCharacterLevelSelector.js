import { useState, useCallback } from "react"
import useContextCharacter from "../modules/context/useContextCharacter"

const MAX_CHARACTER_LEVEL = 20

function useCharacterLevelSelector() {
	const character = useContextCharacter()
	const [level, setSpellLevel] = useState(character.level)

	// use contextual character if possible
	const maxLevel = character?.level || MAX_CHARACTER_LEVEL

	const updateLevel = useCallback((newLevel) => {
		if (newLevel <= 0) {
			setSpellLevel(spellLevel)
		}
		else if (newLevel > maxLevel) {
			setSpellLevel(maxLevel)
		} else {
			setSpellLevel(newLevel)
		}
	}, [spellLevel])

	return [
		level,
		updateLevel
	]
}


export default useCharacterLevelSelector