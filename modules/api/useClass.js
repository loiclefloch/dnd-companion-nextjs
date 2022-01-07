import classes from '../../database/data/classes.json'
import useApi from "./useApi"

export function format(clss) {
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