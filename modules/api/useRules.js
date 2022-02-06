import rules from '../../database/data/rules.json'
import useData from "./useData"

function useRules() {
  return useData(rules)
}

export default useRules