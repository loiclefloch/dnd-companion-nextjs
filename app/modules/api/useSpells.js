import spells from '../../../database/data/spells.json'
import useApi from "./useApi"

import { format } from './useSpell'

function useSpells() {
  return useApi(spells.map(format))
}

export default useSpells