// TODO: add more backgrounds
import backgrounds from '../../database/data/backgrounds'
import useData from "./useData"

import { formatBackground } from "./useBackground"

function useBackgrounds() {
  return useData(backgrounds.map(formatBackground))
}

export default useBackgrounds