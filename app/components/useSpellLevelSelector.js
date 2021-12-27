import { useState, useCallback } from "react"
import useContextCharacter from "../modules/context/useContextCharacter"

const MAX_SPELL_LEVEL = 9 // maximum spell level

function useSpellLevelSelector(spellLevel) {
	const character = useContextCharacter()
	const [level, setSpellLevel] = useState(spellLevel)

	// use contextual character if possible
	const maxLevel = character?.maxSpellLevel || MAX_SPELL_LEVEL

	const updateLevel = useCallback((newLevel) => {
		if (newLevel < spellLevel) {
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

export default useSpellLevelSelector