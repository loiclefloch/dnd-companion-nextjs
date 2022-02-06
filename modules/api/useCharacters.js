import characters from './fixtures/characters'
import useData from "./useData"

import { formatCharacter } from "./useCharacter"

function useCharacters() {
  // TODO: not formated since already formatted on fixtures
  return useData(characters().map(formatCharacter))
}

export default useCharacters