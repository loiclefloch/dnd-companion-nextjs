import classes from '../../database/data/classes.json'
import useApi from "./useApi"

export function format(clss) {
  if (!clss) { // required for build
    return null
  }
  clss.nameLocalized = {
    en: clss.name,
    fr: clss.name,
  }
  clss.resume = {
    en: 'class small description'
  }
  return clss
}

function useClass(index) {
  return useApi(format(classes.find(clss => clss.index === index)))
}

export default useClass