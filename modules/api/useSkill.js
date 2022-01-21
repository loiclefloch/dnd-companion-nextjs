import skills from '../../database/data/backgrounds.json'
import useApi from "./useApi"

export function formatSkill(skill) {
  return skill
}

function useSkill(index) {
  return useApi(formatBackground(skills.find(s => s.index === index)))
}

export default useSkill