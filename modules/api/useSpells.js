import spells from '../../database/data/spells.json'
import useApi from "./useApi"

import { formatSpell } from './useSpell'

function useSpells() {
  return useApi(spells.map(formatSpell))
}

export default useSpells