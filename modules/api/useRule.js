import ruleSections from '../../database/data/rule-sections.json'
import useApi from "./useApi"

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
  return useApi(format(ruleSections.find(rule => rule.index === index)))
}

export default useRule