import characters from './fixtures/characters'
import useApi from "./useApi"

import { format } from "./useCharacter"

function useCharacters(race) {
  return useApi(characters.map(format))
}

export default useCharacters