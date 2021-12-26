import spells from '../../../database/data/spells.json'

function useSpell(name) {
  return { data: spells.find(spell => spell.name === name) }
}

export default useSpell