import subclasses from '../../database/data/subclasses'
import useData from "./useData"

import { formatSubclass } from "./useSubclass"

function useSubclasses(clss) {
  return useData(subclasses.filter(s => s.class.index === clss).map(formatSubclass))
}

export default useSubclasses