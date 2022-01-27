import produce, { current } from "immer"
import { isEmpty, cloneDeep } from "lodash"
import characters from "../api/fixtures/characters"
import useCharacterNotFormatted from '../api/useCharacterNotFormatted'
import { createContext, useContext, useState, useEffect } from "react"
import { updateObjectOnArray } from '../utils/array';
import { formatCharacter  } from "../api/useCharacter"
import { createStorage } from "../utils/storage";
import { v4 as uuid } from 'uuid';
import { formatEquipmentItem } from "../api/useEquipmentItem"
import equipmentList from "../../database/data/equipment.json"

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
    body: {
      age: 30, // TODO:
      gender: '',
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

		stats: { // baseStats + bonuses applied
			STR: 15,
			DEX: 14,
			CON: 12,
			INT: 12,
			WIS: 10,
			CHA: 8,
		},

		statsBonuses: [], // list of bonuses to apply on the stats. they come from the race
  

		baseStats: { // stats chosen without bonuses applied
			STR: 15,
			DEX: 14,
			CON: 12,
			INT: 12,
			WIS: 10,
			CHA: 8,
		},
  
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
  
		// list of objects
		// - index
		// - quantity
    equipment: [], 

    wallet: {
      history: []
    },

		proficiencies: [],
		// TODO: if not always 2 at level 1, set on useCreateCharacter#onFinalize
		proficiencyBonus: 2, // will be override according to class and level

		maximumHp: 0,

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
		rawCharacter: currentCharacter,
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
			character.currentHp = character.maximumHp
			character.spellsUsed = []
			// clean death saves TODO: clean after a fight?
			character.deathSaves =  defaultData.deathSaves
		}
	}
}

/**
 * 
 * @param {number} hpToModify positive or negative, the number to impact on currentHp
 */
export function actionModifyCurrentHp({
	hpToModify,
	willBeKo,
	willStabilize,
	isAboveMaximumHp,
}) { 
	return {
		type: 'actionModifyCurrentHp',
		apply: (character) => {
			character.currentHp += hpToModify

			if (willBeKo) {
				// TODO:
			}
			if (willStabilize) {
				// TODO:
			}
			if (isAboveMaximumHp) {
				// TODO:
			}
		}
	}
}

export function actionAddEquipment(list) {
	return {
		type: 'actionAddEquipment',
		apply: (character) => {
			character.equipment = character.equipment ?? []
			list.forEach(item => {
				const foundItem = character.equipment.find(i => i.index === item.index)
				if (foundItem) {
					foundItem.quantity++
				} else {
					character.equipment.push({
						index: item.index,
						quantity: 1,
					})
				}
			})
		}
	}
}

// format item to access properties, on the data we only have the index / quantity
function getFormattedEquipmentItem(equipmentItem) {
	return formatEquipmentItem({
		...equipmentItem,
		...equipmentList.find(i => i.index === equipmentItem.index),
	})	
}

export function actionEquip(item) {
	return {
		type: 'actionEquip',
		apply: (character) => {
			if (item.isArmor) {
				const equippedArmor = character.equipment.find(equipmentItem => {
					const formatted = getFormattedEquipmentItem(equipmentItem)
					return formatted.isArmor && formatted.isEquipped
				})
				if (equippedArmor) {
					equippedArmor.isEquipped = false
				}
			}
			if (item.isShield) {
				const equippedShield = character.equipment.find(i => i.isShield && i.isEquipped)
				if (equippedShield) {
					equippedShield.isEquipped = false
				}
			}
			const itemToEquip = character.equipment.find(i => i.index === item.index)
			itemToEquip.isEquipped = true
		}
	}
}

export function actionUnequip(item) {
	return {
		type: 'actionUnequip',
		apply: (character) => {
			const itemToEquip = character.equipment.find(i => i.index === item.index)
			itemToEquip.isEquipped = false
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
		// TODO: for druid
		// spellsSlots: {
		// 	1: {
		// 		from: 0,
		// 		to: 1,
		// 	}
		// },
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
			to: Math.ceil(Math.max(1, maximumHitDice / 2))
		},

	}
}

function useCurrentCharacter() {
	const context = useContext(CurrentCharacterContext)

  if (context === undefined) {
    throw new Error('useCurrentCharacter must be used within a CurrentCharacterProvider')
  }

  console.info(context?.character)
  return context
}


export default useCurrentCharacter