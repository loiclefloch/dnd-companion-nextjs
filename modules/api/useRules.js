import rules from '../../database/data/rules.json'
import useApi from "./useApi"

function useRules() {
  return useApi(rules)
}

export default useRules