import produce from "immer"
import { isEmpty, cloneDeep } from "lodash"
import characters from "../api/fixtures/characters"
import useCharacterNotFormatted from '../api/useCharacterNotFormatted'
import { createContext, useContext, useState, useEffect } from "react"
import { updateObjectOnArray } from '../utils/array';
import { formatCharacter  } from "../api/useCharacter"
import { createStorage } from "../utils/storage";

const CharactersStorage = createStorage("characters")
const CurrentCharacterIdStorage = createStorage("currentCharacterId")

const isBrowser = typeof window !== "undefined";

let CurrentCharacterContext;
let { Provider } = (CurrentCharacterContext = createContext());

// TODO: put somewhere to not forgot to add data on

export function getDefaultData() {
  return {
    id: uuid(),
    name: '',

    maxHp: 0, // TODO: Add on form

    body: {
      age: 0, // TODO:
      sex: '',
      height: '',
      weight: '',
      hairColor: '',
      eyeColor: '',
      skinColor: '',
      physicalCaracteristics: '',
    },
  
    level: 1,
    classes: [],
    race: null,
    bonds: '',
    flaws: '',
    ideals: '',
    traits: ['', ''],
    stats: null,
  
  
    levelling: {
      xp: 0,
      history: [],
    },
  
    // TODO:
    spellsList: [],
  
    currencies: {
      cp: 0,
      sp: 0,
      gp: 0,
      ep: 0,
      pp: 0,
    },
  
    equipment: [],

    wallet: {
      history: []
    },

    // between rest
    currentHp: 0,
    spellsUsed: [],
    deathSaves: {
      nbFailed: null,
      nbSucceeed: null,
      isStabilized: false
    },
  
  }
}
function getDefaultCharacterId() {
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
	CurrentCharacterIdStorage.setItem(defaultId)
	return defaultId 
}

export function CurrentCharacterProvider({ children }) {
	const [ currentCharacterId, setCurrentCharacterId ] = useState(getDefaultCharacterId())
	const characterResponse = useCharacterNotFormatted(currentCharacterId)
	const [ currentCharacter, setCurrentCharacter ] = useState(null)
  // const [formattedCharacter, setFormattedCharacter] = useState(null)

	// on mount, take the default character and set it
	useEffect(() => {
		if (characterResponse.data) {
			setCurrentCharacter(cloneDeep(characterResponse.data))
			// setFormattedCharacter(formatCharacter(cloneDeep(characterResponse.data)))
		}
	}, [characterResponse?.data]) // only on mount, can be changed using value.setCurrentCharacter

	const updateCharacter = (updatedCharacter) => {
		const id = currentCharacter.id
		if (!currentCharacter || !updatedCharacter || updatedCharacter.id !== currentCharacter.id) {
			throw new Error(`Invalid updateCharacter`)
		}
		const updatedCharacters = updateObjectOnArray(characters(), updatedCharacter, c => c.id === id)
		CharactersStorage.setItem(updatedCharacters)
		setCurrentCharacter(updatedCharacter)
		// setFormattedCharacter(formatCharacter(cloneDeep(updatedCharacter)))
	}
		
	const value = { 
		character: formatCharacter(cloneDeep(currentCharacter)),
		setCurrentCharacter: (newCurrentCharacterId) => {
			CurrentCharacterIdStorage.setItem(newCurrentCharacterId)
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
		type: 'actionLearnSpell',
		apply: (character) => {
			character.spellsList.push({ index: spell.index, isPrepared: false })
		}
	}
}

export function actionPrepareSpell(spellToUpdate) {
	return {
		type: 'actionPrepareSpell',
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = true
		}
	}
}

export function actionUnprepareSpell(spellToUpdate) {
	return {
		type: 'actionUnprepareSpell',
		apply: (character) => {
			const spell = character.spellsList.find(s => s.index === spellToUpdate.index)
			spell.isPrepared = false
		}
	}
}

export function actionRemoveSpell(spellToRemove) {
	return {
		type: 'actionRemoveSpell',
		apply: (character) => {
			character.spellsList = character.spellsList.filter(s => s.index !== spellToRemove.index)
		}
	}
}

export function actionCastSpell(spell, spellLevel) {
	return {
		type: 'actionCastSpell',
		apply: (character) => {
			console.info({ spell, spellLevel })
			character.spellsUsed = character.spellsUsed || []
			character.spellsUsed.push({ spell: spell.index, spellLevel })
		}
	}
}

export function actionShortRest(hpToAdd, hitDiceToReduce) {
	return {
		type: 'actionShortRest',
		apply: (character) => {
			const defaultData = getDefaultData()
			// clean death saves
			character.deathSaves =  defaultData.deathSaves
		}
	}
}

export function actionLongRest() {
	return {
		type: 'actionLongRest',
		apply: (character) => {
			const defaultData = getDefaultData()
			character.currentHp = character.maxHp
			character.spellsUsed = []
			// clean death saves TODO: clean after a fight?
			character.deathSaves =  defaultData.deathSaves
		}
	}
}

//
// utils
//

export function buildShortRest(character) {

	return {
		hp: {
			from: 0,
			to: 20,
		},
		// TODO: for druide
		// spellsSlots: {
		// 	1: {
		// 		from: 0,
		// 		to: 1,
		// 	}
		// },
		hitDice: { // TODO: better name
			from: 3,
			to: 2
		},

	}
}

export function buildLongRest(character) {
	const currentHitDice = character.currentHitDice
	const maximumHitDice = character.maximumHitDice
	if (currentHitDice < 1) {
		// TODO:
	}
	// must have 1 hit dice to gain benefits
	return {
		hp: {
			from: 0,
			to: 20,
		},
		// TODO: should empty spellsUsed
		
		// up to a number of dice equal to character's total Hit dice / 2 with a minimum of 1.
		// e.g: if 8 hit dices, can regain 4.
		hitDice: { // TODO: better name
			from: currentHitDice,
			to: Math.max(1, maximumHitDice / 2)
		},

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