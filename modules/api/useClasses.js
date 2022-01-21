import classes from '../../database/data/classes.json'
import useApi from "./useApi"
import { formatClass } from "./useClass"

function useClasses() {
  return useApi(classes.map(formatClass))
}

export default useClasses