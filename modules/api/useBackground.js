import backgrounds from '../../database/data/backgrounds.json'
import useApi from "./useApi"

export function formatBackground(background) {
  if (!background) {
    return null
  }
  background.nameLocalized = {
    en: background.name
  }
  return background
}

function useBackground(index) {
  return useApi(formatBackground(backgrounds.find(background => background.index === index)))
}

export default useBackground