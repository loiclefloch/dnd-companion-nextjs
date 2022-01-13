import { uuid } from 'uuidv4';
import { useRouter } from "next/router";
import { createContext, useContext, useReducer, useEffect } from "react"
import { createStorage } from "../modules/utils/storage"

const CreateCharacterStorage = createStorage("createCharacter")

const CreateCharacterContext = createContext()

function createCharacterReducer(state, action) {
  switch (action.type) {
    case 'update': {
      const updated = { ...state, ...action.data }
      console.info(updated)
      return updated
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function getDefaultData() {
  return {
    id: uuid(),
    name: '',
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
    spellsUsed: [],
    deathSaves: {
      nbFailed: null,
      nbSucceeed: null,
      isStabilized: false
    },
  
  }
}

const initialState = CreateCharacterStorage.getItem() || getDefaultData()

function getNextStep(step) {
  const map = {
    'initial': 'choose-race',
    'choose-race': 'choose-class',
    'choose-class': 'abilities',
    'abilities': 'choose-creation-mode',
    'choose-creation-mode': ['choose-background', 'character-details'], // multiple possibility,
    'character-details': 'alignment',
    'alignment': 'languages',
    'languages': 'personnality-traits',
    'personnality-traits': 'ideals',
    'ideals': 'bonds',
    'bonds': 'flaws',
    'flaws': 'equipment',
    'equipment': 'resume',
    'resume': '',
  }

  return map[step]
}

function getStepUrl(step) {
  const map = {
    'initial': '/',
    'choose-race': '/choose-race',
    'choose-class': '/choose-class',
    'abilities': '/abilities',
    'choose-creation-mode': '/choose-creation-mode',
    'choose-background': '/choose-background',
    'character-details': '/character-details',
    'alignment': '/alignment',
    'languages': '/languages',
    'personnality-traits': '/personnality-traits',
    'ideals': '/ideals',
    'bonds': '/bonds',
    'flaws': '/flaws',
    'equipment': '/equipment',
    'resume': '/resume',
  }

  const root = `/character/create`

  return `${root}${map[step]}`
}

export function CreateCharacterProvider({ children }) {
  const router = useRouter()
  const [character, dispatchCharacter] = useReducer(createCharacterReducer, initialState)

  useEffect(() => {
    localStorage.setItem('createCharacter', JSON.stringify(character))
  }, [character])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    startCreateCharacter: () => {
      dispatchCharacter({
        type: 'update',
        data: getDefaultData()
      })
    },
    character,
    updateCharacter: (data) => {
      const currentStep = data.step
      const nextStep = getNextStep(currentStep)
      const url = getStepUrl(nextStep)

      console.info({ currentStep, nextStep, url })

      router.push(url)

      dispatchCharacter({
        type: 'update',
        data: {
          ...data,
          currentStep: nextStep,
          url
        }
      })
    },
    finalizeCharacter: () => {
      const currentCaracters = JSON.parse(localStorage.getItem("characters")) || []
      const characters = [...currentCaracters, character]
      localStorage.setItem('characters', JSON.stringify(characters))
      router.push("/characters")
    },
    dispatchCharacter
  }

  return (
    <CreateCharacterContext.Provider value={value}>
      {children}
    </CreateCharacterContext.Provider>
  )
}

function useCreateCharacter() {
  const context = useContext(CreateCharacterContext)

  console.info(context.character)

  if (context === undefined) {
    throw new Error('useCreateCharacter must be used within a CreateCharacterProvider')
  }
  return context
}

export default useCreateCharacter