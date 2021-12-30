import classes from '../../../database/data/classes.json'
import useCharacter from '../api/useCharacter'

function useCurrentCharacter() {
	const characterResponse = useCharacter(1)
	return characterResponse.data
}

export default useCurrentCharacter