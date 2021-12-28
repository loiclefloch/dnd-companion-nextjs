import spells from '../../../database/data/spells.json'
import useApi from "./useApi"

function useSpells() {
  return useApi(spells)
}

export default useSpells