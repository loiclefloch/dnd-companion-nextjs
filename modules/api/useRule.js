import ruleSections from '../../database/data/rule-sections.json'
import useData from "./useData"

export function format(rule) {
  if (!rule) {
    return null
  }
  rule.descLocalized = {
    en: rule.desc
  }

  return rule
}

function useRule(index) {
  return useData(format(ruleSections.find(rule => rule.index === index)))
}

export default useRule