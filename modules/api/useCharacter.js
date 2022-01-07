import characters from './fixtures/characters'
import useApi from "./useApi"

export function format(character) {
  return character
}

function useCharacter(id) {
  return useApi(format(characters.find(character => character.id === Number(id))))
}

export default useCharacter