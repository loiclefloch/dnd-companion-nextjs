import monsters from '../../database/data/monsters.json'
import useApi from "./useApi"

function useMonsters() {
  return useApi(monsters)
}

export default useMonsters