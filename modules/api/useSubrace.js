import subraces from '../../database/data/subraces.json'
import useApi from "./useApi"

export function format(subrace) {
  subrace.nameLocalized = {
    en: subrace.name,
  }

  return subrace
}

function useSubrace(index) {
  return useApi(format(subraces.find(subrace => subrace.index === index)))
}

export default useSubrace