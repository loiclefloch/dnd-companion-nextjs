import skills from '../../database/data/skills.json'
import useData from "./useData"

import { formatSpell } from './useSpell'

function useSkills() {
  return useData(() => skills)
}

export default useSkills