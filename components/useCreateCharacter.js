import { useRouter } from "next/router";
import { createContext, useContext, useReducer, useEffect } from "react"
import { createStorage } from "../modules/utils/storage"
import { getDefaultData } from "../modules/character/useCurrentCharacter"

import classes from '../database/data/classes.json'
import allRaces from "../database/data/allRaces"
import backgrounds from "../database/data/backgrounds"
import { formatRace } from "../modules/api/useRace"
import { formatBackground } from "../modules/api/useBackground"
import { formatCharacter } from "../modules/api/useCharacter"
import { formatClass  } from "../modules/api/useClass"
import { cloneDeep } from "lodash";

const isBrowser = typeof window !== "undefined";

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

const initialState = CreateCharacterStorage.getItem() || getDefaultData()

function getNextStep(step) {
  const map = {
    'initial': 'choose-race',
    'choose-race': 'choose-class',
    'choose-class': 'abilities',
    'abilities': 'choose-background',
    'abilities-with-bonus-options': 'choose-background',
    'choose-background': 'character-details',
    'character-details': 'personnality-traits',
    'personnality-traits': 'ideals',
    'ideals': 'alignment',
    'alignment': 'bonds',
    'bonds': 'flaws',
    'flaws': 'proficiencies',
    'proficiencies': 'languages',
    'languages': 'equipment',
    'equipment': 'resume',
    'resume': '',
  }

  return map[step]
}

function getBeforeResumeStep() {
  return 'equipment'
}

function getStepUrl(step) {
  const map = {
    'initial': '/',
    'choose-race': '/choose-race',
    'choose-class': '/choose-class',
    'proficiencies': '/proficiencies',
    'abilities': '/abilities',
    'abilities-with-bonus-options': '/abilities/choose-options',
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

  if (!map[step]) {
    return null
  }

  return `${root}${map[step]}`
}

function onFinalize(character) {
  console.log('onFinalize')

  const data = {}

  const clss = classes.find(clss => clss.index === character.classes[0])
  
  //
  // setup Hit points and hit dice
  //
  // Les points de vie de votre personnage définissent sa résistance au combat ou dans toutes autres 
  // situations dangereuses. Vos points de vie sont déterminés par votre dé de vie (raccourcis pour Dé de points de vie).
  // Au niveau 1, votre personnage possède 1 dé de vie, et le type de ce dé est défini par votre classe. 
  // Vos points de vie de départ sont égaux au maximum de votre dé de vie, comme indiqué dans la description de votre classe 
  // (vous ajouterez aussi votre modificateur de Constitution, qui sera déterminé à l'étape 3). 
  // Cette valeur finale est aussi votre maximum de points de vie.
  const hitDice = 1 + clss.hit_dice
  data.maximumHitDice = hitDice
  data.maximumHp = hitDice + character.stats.CON
  data.currentHitDice = data.maximumHitDice
  data.currentHp = data.maximumHp

  // 

  return data
}

function buildCharacter(characterParam) {
  if (!characterParam) {
    return null
  }

  const race = allRaces.find(r => r.index === characterParam.race)

  const character = cloneDeep(characterParam)
  delete character.idealsData

  character.traits = race.traits.map(trait => ({
    index: trait.index,
    sourceType: 'race',
  }))

  character.alignment = characterParam.alignment?.index || characterParam.alignment || characterParam.alignmentIndex // TODO: remove ||

  const toDelete = [
    'alignmentIndex',
    'step',
    'currentStep',
    'url'
  ]

  toDelete.forEach(d => {
    delete character[d]
  })

  // add unarmed strike
  character.proficiencies.unshift({
    index: 'unarmed-strike',
    sourceType: 'race', // TODO: or other?
  })

  character.skillsProficiencies = character.proficiencies
    .filter(p => p.index.startsWith("skill-"))
    .map(p => p.index.replaceAll("skill-", ""))

  console.log(character)
  return cloneDeep(character)
}

export function CreateCharacterProvider({ children }) {
  const router = useRouter()
  const [character, dispatchCharacter] = useReducer(createCharacterReducer, initialState)

  useEffect(() => {
    localStorage.setItem('createCharacter', JSON.stringify(character))
  }, [character])

  const race = formatRace(allRaces.find(r => r.index === character.race))
  const clss = formatClass(classes.find(r => r.index === character.classes[0]))
  const background = formatBackground(backgrounds.find(r => r.index === character.background))

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
    race,
    clss,
    background,
    updateCharacter: (newDataParam) => {
      let newData = newDataParam
      const currentStep = newData.step
      const nextStep = getNextStep(currentStep)
      const nextStepUrl = getStepUrl(nextStep)

      console.info({ currentStep, nextStep, url: nextStepUrl })

      if (nextStepUrl) {
        console.log({ nextStepUrl })
        router.push(nextStepUrl)
      }

      if (currentStep === getBeforeResumeStep()) {
        newData = {
          ...newData,
          ...onFinalize(character)
        }
      }

      dispatchCharacter({
        type: 'update',
        data: {
          ...newData,
          currentStep: nextStep,
          url: nextStepUrl ? nextStepUrl : newData.url
        }
      })

    },
    finalizeCharacter: () => {
      const currentCaracters = JSON.parse(localStorage.getItem("characters")) || []
      const createdCharacter = buildCharacter(character)
      const characters = [...currentCaracters, createdCharacter]
      localStorage.setItem('characters', JSON.stringify(characters))
      router.push("/characters")
    },
    getBuildedCharacter: () => !isBrowser ? null : formatCharacter(buildCharacter(character)),
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