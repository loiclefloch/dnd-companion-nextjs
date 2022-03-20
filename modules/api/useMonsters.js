import monsters from '../../database/data/monsters.json'
import useData from "./useData"

import { formatMonster } from "./useMonster"

function useMonsters() {
  return useData(monsters.map(formatMonster))
}

export default useMonsters