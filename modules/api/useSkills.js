import skills from '../../database/data/skills.json'
import useApi from "./useApi"

import { formatSkill } from "./useSkill"

function useSkill() {
  return useApi(skills.map(formatSkill))
}

export default useSkill