import produce from "immer"
import { isEmpty, cloneDeep } from "lodash"
import characters from "../api/fixtures/characters"
import useCharacterNotFormatted from '../api/useCharacterNotFormatted'
import { createContext, useContext, useState, useEffect } from "react"
import { updateObjectOnArray } from '../utils/array';
import { formatCharacter  } from "../api/useCharacter"

const isBrowser = typeof window !== "undefined";

let CurrentCharacterContext;
let { Provider } = (CurrentCharacterContext = createContext());

// TODO: put somewhere to not forgot to add data on

function getDefaultCharacterId() {
	if (!isBrowser) {
		return null
	}

	const id = localStorage.getItem("currentCharacterId")
	if (id) {
		return id
	}

	// const characters = JSON.parse(localStorage.getItem("characters")) || []
	if (isEmpty(characters)) {
		return null
	}

	const defaultId = characters[0].id
	localStorage.setItem("currentCharacterId", defaultId)
	return defaultId 
}

export function CurrentCharacterProvider({ children }) {
	const [ currentCharacterId, setCurrentCharacterId ] = useState(getDefaultCharacterId())
	const characterResponse = useCharacterNotFormatted(currentCharacterId)
	const [ currentCharacter, setCurrentCharacter ] = useState(null)

	// on mount, take the default character and set it
	useEffect(() => {
		if (characterResponse.data) {
			setCurrentCharacter(characterResponse.data) 
		}
	}, [characterResponse]) // only on mount, can be changed using value.setCurrentCharacter

	const updateCharacter = (updatedCharacter) => {
		const id = currentCharacter.id
		if (!currentCharacter || !updatedCharacter || updatedCharacter.id !== currentCharacter.id) {
			throw new Error(`Invalid updateCharacter`)
		}
		const updatedCharacters = updateObjectOnArray(characters(), updatedCharacter, c => c.id === id)
		localStorage.setItem('characters', JSON.stringify(updatedCharacters))
		setCurrentCharacter(updatedCharacter)
	}
		
	const value = { 
		character: formatCharacter(cloneDeep(currentCharacter)),
		setCurrentCharacter: (newCurrentCharacterId) => {
			localStorage.setItem('currentCharacterId', newCurrentCharacterId)
			// TODO: load and set new character -> useState of the id
			// setCurrentCharacter(newCurrentCharacter)
			setCurrentCharacterId(newCurrentCharacterId)
		},
		characterDispatch: (action) => {
			console.log(`dispatch ${action.type}`)
			const nextState = produce(currentCharacter, draftState => {
				// TODO: on character creation
				if (!draftState.spellsList) {
					draftState.spellsList = []
				}
				action.apply(draftState)
			})
			updateCharacter(nextState)
		}
	}

	return (
		<Provider value={value}>
			{children}
		</Provider>
  )
}

//
// Actions
//

export function actionLearnSpell(spell) {
	return {
		apply: (character) => {
			character.spellsList.push({ index: spell.index, isPrepared: false })
		}
	}
}

export function actionPrepareSpell(spellToUpdate) {
	return {
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = true
		}
	}
}

export function actionUnprepareSpell(spellToUpdate) {
	return {
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = false
		}
	}
}

export function actionRemoveSpell(spellToRemove) {
	return {
		apply: (character) => {
			character.spellsList = character.spellsList.filter(s => s.index !== spellToRemove.index)
		}
	}
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