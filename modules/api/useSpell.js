import spells from '../../database/data/spells.json'
import useApi from "./useApi"

export function format(spell) {
  return spell
}

function useSpell(index) {
  return useApi(format(spells.find(spell => spell.index === index)))
}

export default useSpell