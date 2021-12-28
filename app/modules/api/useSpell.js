import { useState, useEffect, useDebugValue } from 'react'
import spells from '../../../database/data/spells.json'
import useApi from "./useApi"

function useSpell(name) {
  return useApi(spells.find(spell => spell.name === name))
}

export default useSpell