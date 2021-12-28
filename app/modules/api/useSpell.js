import { useState, useEffect, useDebugValue } from 'react'
import spells from '../../../database/data/spells.json'
import useApi from "./useApi"

function useSpell(index) {
  return useApi(spells.find(spell => spell.index === index))
}

export default useSpell