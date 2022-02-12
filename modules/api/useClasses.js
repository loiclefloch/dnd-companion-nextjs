import classes from '../../database/data/classes'
import useData from "./useData"
import { formatClass } from "./useClass"

function useClasses() {
  return useData(classes.map(formatClass))
}

export default useClasses