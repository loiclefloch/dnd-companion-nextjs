// TODO: add more backgrounds
import backgrounds from '../../database/data/backgrounds'
import useApi from "./useApi"

import { formatBackground } from "./useBackground"

function useBackgrounds() {
  return useApi(backgrounds.map(formatBackground))
}

export default useBackgrounds