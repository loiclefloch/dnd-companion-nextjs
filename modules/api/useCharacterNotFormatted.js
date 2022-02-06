import { useEffect } from "react"
import useApi from "./useApi"
import characters from './fixtures/characters'

function useCharacterNotFormatted(currentCharacterId) {
  const apiData = useApi(
    (currentCharacterId) => characters().find(character => character.id === currentCharacterId),
  )

	useEffect(() => {
		apiData.makeRequest(currentCharacterId)
	}, [currentCharacterId])

  return apiData
}

export default useCharacterNotFormatted