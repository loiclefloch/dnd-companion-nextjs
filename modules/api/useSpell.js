import spells from '../../database/data/spells.json'
import useApi from "./useApi"

export function formatSpell(spell) {
  if (!spell) {
    return null
  }

  spell.isCantrip = spell.level === 0
  spell.isCantripWithoutNeedToRun = spell.level === 0 && !spell.damage && !spell.heal 

  return spell
}

function useSpell(index) {
  return useApi(formatSpell(spells.find(spell => spell.index === index)))
}

export default useSpell