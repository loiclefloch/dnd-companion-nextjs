import classes from '../../../database/data/classes.json'
import useApi from "./useApi"

function format(clss) {
  clss.nameLocalized = {
    en: clss.name
  }

  return clss
}

function useClasses() {
  return useApi(classes.map(format))
}

export default useClasses