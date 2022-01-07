import { useContext } from "react"
import { ContextCharacter } from "../../modules/character/ContextCharacter"

function useContextCharacter() {
	const contextCharacter = useContext(ContextCharacter)

	// contextCharacted undefined if not in context
	return contextCharacter ? contextCharacter.character : null
}

export default useContextCharacter