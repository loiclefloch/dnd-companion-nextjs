import { useState, useDebugValue } from 'react'
import spells from '../../../database/data/spells.json'

function useSpell(name) {
  const [spell, setSpell] = useState(spells.find(spell => spell.name === name))
  useDebugValue(spell.name)

  return { data: spell }
}

export default useSpell