import characters from './fixtures/characters'
import formatCharacter from '../character/formatCharacter'
import useData from './useData'

function useCharacter(id) {
	// TODO: not formated since already formatted on fixtures
	return useData(formatCharacter(characters().find(character => character.id === id)))
}

export default useCharacter