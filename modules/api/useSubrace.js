import subraces from '../../database/data/subraces.json'
import useApi from "./useApi"

import { format } from "./useRace"

function useSubrace(index) {
  return useApi(format(subraces.find(subrace => subrace.index === index)))
}

export default useSubrace