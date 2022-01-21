import { cloneDeep } from 'lodash'
import backgrounds from '../../database/data/backgrounds.json'
import camelize from "../utils/camelize"
import useApi from "./useApi"

export function formatBackground(backgroundParam) {
  if (!backgroundParam) {
    return null
  }
  const background = camelize(cloneDeep(backgroundParam))
  background.nameLocalized = {
    en: background.name
  }

  background.ideals.from = background.ideals.from.map((ideal, index) => {
    // transform "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld."
    // to title / desc
    const fullDesc = ideal.desc
    const match = ideal.desc.match(/^(.*?)[.?!]\s(.*)/)
    const title = match[1]
    const desc = match[2]

    return {
      index, // add index 
      ...ideal,
      title,
      desc,
      fullDesc,
  }
  })

  return background
}

function useBackground(index) {
  return useApi(formatBackground(backgrounds.find(background => background.index === index)))
}

export default useBackground