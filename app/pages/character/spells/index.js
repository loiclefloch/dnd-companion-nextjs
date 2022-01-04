import { CharacterProvider} from "../../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../../modules/character/useCurrentCharacter"
import SpellsView from "../../../components/SpellsView"

/**
 * Spell list with the character as context
 */
function CharacterSpells() {
	const character = useCurrentCharacter()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character} withCharacterMenu>
			<SpellsView contextCharacter={character} />
		</CharacterProvider>
	)
}

export default CharacterSpells