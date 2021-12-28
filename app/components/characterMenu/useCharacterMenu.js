import { useContext } from "react"
import { CharacterMenuContext } from './CharacterMenuContext'

function useCharacterMenu() {
	let { showCharacterMenu, hideCharacterMenu } = useContext(CharacterMenuContext);

	return { showCharacterMenu, hideCharacterMenu }
};

export default useCharacterMenu