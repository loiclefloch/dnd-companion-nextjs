import { CharacterProvider} from "../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../components/useCurrentCharacter"
import FeatsListView from "../../components/FeatsListView"

/**
 * Feats list with the character as context
 */
function CharacterFeats() {
	const { character } = useCurrentCharacter()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character}>
			<FeatsListView character={character} />
		</CharacterProvider>
	)
}

export default CharacterFeats