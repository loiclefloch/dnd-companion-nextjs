import { useState, useEffect, useDebugValue } from 'react'
import spells from '../../../database/data/spells.json'

function useSpell(name) {
  const [spell, setSpell] = useState(null)

  useDebugValue(spell?.name)

  useEffect(() => {
    const spell = spells.find(spell => spell.name === name)
    setSpell(spell)
  }, [name])

  return { data: spell, isLoading: !spell }
}

export default useSpell