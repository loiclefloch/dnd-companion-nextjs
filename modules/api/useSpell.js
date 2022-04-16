import spells from '../../database/data/spells.json'
import useData from "./useData"

export function formatSpell(spell) {
  if (!spell) {
    return null
  }

  spell.isCantrip = spell.level === 0
  spell.isCantripWithoutNeedToRun = spell.level === 0 && !spell.damage && !spell.heal 

  spell.isSpellWithouNeedToRun = !spell.damage && !spell.heal 

  return spell
}

function useSpell(index) {
  console.log({ index })
  return useData(formatSpell(spells.find(spell => spell.index === index)))
}

export default useSpell