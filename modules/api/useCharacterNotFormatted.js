import useApi from "./useApi"
import characters from './fixtures/characters'

function useCharacterNotFormatted(id) {
  return useApi(characters().find(character => character.id === id))
}

export default useCharacterNotFormatted