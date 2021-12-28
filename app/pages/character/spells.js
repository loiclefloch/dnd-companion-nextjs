import { CharacterProvider} from "../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import Spells from "../spells"

/**
 * Spell list with the character as context
 */
function CharacterSpells() {
	const character = useCurrentCharacter()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character}>
			<Spells />
		</CharacterProvider>
	)
}

export default CharacterSpells