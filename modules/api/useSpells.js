import spells from '../../database/data/spells.json'
import useData from "./useData"

import { formatSpell } from './useSpell'

function useSpells() {
  return useData(() => spells.map(formatSpell))
}

export default useSpells