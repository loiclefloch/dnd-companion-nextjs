import { useState, useCallback } from "react"
import useContextCharacter from "../components/useContextCharacter"

const MAX_SPELL_LEVEL = 9 // maximum spell level

function useSpellLevelSelector(spellLevel) {
	const character = useContextCharacter()
	const [level, _setSpellLevel] = useState(spellLevel)

	// use contextual character if possible
	const maxSpellLevel = character?.maxSpellLevel || MAX_SPELL_LEVEL

	const setSpellLevel = useCallback((newLevel) => {
		if (newLevel < spellLevel) {
			_setSpellLevel(spellLevel)
		} else if (newLevel > MAX_SPELL_LEVEL) {
			// we let go above the character.maxSpellLevel, but display it in the UI (red text)
			_setSpellLevel(MAX_SPELL_LEVEL)
		} else {
			_setSpellLevel(newLevel)
		}
	}, [spellLevel])

	return {
		chosenSpellLevel: level,
		setSpellLevel,
		maxSpellLevel,
		characterInContext: !!character,
		isAboveMaximumSpellLevel: level > maxSpellLevel
	}
}

export default useSpellLevelSelector