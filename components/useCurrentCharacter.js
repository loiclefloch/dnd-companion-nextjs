import { createContext, useContext, useState, useEffect, useMemo } from "react"
import produce from "immer"
import { isEmpty, cloneDeep } from "lodash"
import characters from "../modules/api/fixtures/characters"
import useCharacterNotFormatted from '../modules/api/useCharacterNotFormatted'
import formatCharacter from "../modules/character/formatCharacter"
import { CharactersStorage,	CurrentCharacterIdStorage } from "../modules/db";
import useStorage from "./useStorage"
 
let CurrentCharacterContext;
let { Provider } = (CurrentCharacterContext = createContext());

function getDefaultCharacterId() {
	const isBrowser = typeof window !== "undefined";
	if (!isBrowser) {
		return null
	}

	const id = CurrentCharacterIdStorage.getItem()
	if (id) {
		return id
	}

	// const characters = JSON.parse(localStorage.getItem("characters")) || []
	if (isEmpty(characters)) {
		return null
	}

	const defaultId = characters[0].id
	return defaultId 
}

export function CurrentCharacterProvider({ children }) {
	const [ currentCharacterId, setCurrentCharacterId ] = useStorage(CurrentCharacterIdStorage, getDefaultCharacterId())
	const [ currentCharacter, setCurrentCharacter ] = useState(null)
	const characterResponse = useCharacterNotFormatted(currentCharacterId)

	// on mount, take the default character and set it
	useEffect(() => {
		if (characterResponse.data) {
			setCurrentCharacter(cloneDeep(characterResponse.data))
		}
	}, [characterResponse?.data]) // only on mount, can be changed using value.setCurrentCharacter

	// memo format and cloneDeep
	// we do not want to mutate the character data
	const formattedCharacter = useMemo(() => {
		return formatCharacter(cloneDeep(currentCharacter))
	}, [currentCharacter])

	const updateCharacter = (updatedCharacter) => {
		const id = currentCharacter.id
		if (!currentCharacter || !updatedCharacter || updatedCharacter.id !== currentCharacter.id) {
			throw new Error(`Invalid updateCharacter`)
		}

		CharactersStorage.update(updatedCharacter)

		setCurrentCharacter(updatedCharacter)
	}
	

	const value = { 
		character: formattedCharacter,
		rawCharacter: currentCharacter,
		setCurrentCharacter: (newCurrentCharacterId) => {
			setCurrentCharacterId(newCurrentCharacterId)
			// TODO: this does not trigger an update of the context
			// call setCurrentCharacter ?
		},
		characterDispatch: (action) => {
			console.log(`dispatch ${action.type}`)
			const nextState = produce(currentCharacter, draftState => {
				// TODO: on character creation
				if (!draftState.spellsList) {
					draftState.spellsList = []
				}
				action.apply(draftState, formattedCharacter)
			})
			updateCharacter(nextState)
		},
		updateCharacter,
	}

	return (
		<Provider value={value}>
			{children}
		</Provider>
  )
}


function useCurrentCharacter() {
	const context = useContext(CurrentCharacterContext)

  if (context === undefined) {
    throw new Error('useCurrentCharacter must be used within a CurrentCharacterProvider')
  }

  // console.info(context?.character)
  return context
}


export default useCurrentCharacter