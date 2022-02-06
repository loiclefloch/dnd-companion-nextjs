import { CharacterProvider} from "../../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../../components/useCurrentCharacter"
import SpellsView from "../../../components/SpellsView"

/**
 * Spell list with the character as context
 */
function CharacterSpells() {
	const { character } = useCurrentCharacter()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character}>
			<SpellsView contextCharacter={character} />
		</CharacterProvider>
	)
}

export default CharacterSpells