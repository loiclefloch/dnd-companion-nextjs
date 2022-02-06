import monsters from '../../database/data/monsters.json'
import useData from "./useData"

function useMonsters() {
  return useData(monsters)
}

export default useMonsters