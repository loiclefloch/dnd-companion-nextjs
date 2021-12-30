import classes from '../../../database/data/classes.json'
import useApi from "./useApi"
import { format } from "./useClass"

function useClasses() {
  return useApi(classes.map(format))
}

export default useClasses