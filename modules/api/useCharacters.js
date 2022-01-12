import characters from './fixtures/characters'
import useApi from "./useApi"

import { formatCharacter } from "./useCharacter"

function useCharacters() {
  // TODO: not formated since already formatted on fixtures
  return useApi(characters().map(formatCharacter))
}

export default useCharacters