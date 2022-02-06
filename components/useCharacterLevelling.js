import { useReducer, useEffect } from "react"
import { useRouter } from "next/router";
import { createStorage } from "../modules/utils/storage"
import { useMemo } from "react"
import { cloneDeep } from "lodash"
import useCurrentCharacter from "./useCurrentCharacter"
import { getLevellingDataForClassesAndLevel } from "../modules/levelling"
import getLevellingSteps from "../modules/levelling/getLevellingSteps"
import classes from '../database/data/classes.json'
import allRaces from "../database/data/allRaces"
import backgrounds from "../database/data/backgrounds"
import { formatRace } from "../modules/api/useRace"
import { formatBackground } from "../modules/api/useBackground"
import { formatClass  } from "../modules/api/useClass"

const levellingStorage = createStorage("levelling")

const initialState = () => levellingStorage.getItem() || {}

function levellingReducer(state, action) {
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

function useCharacterLevelling() {
  const router = useRouter()
	const { character } = useCurrentCharacter()
  const [levelling, dispatchLevelling] = useReducer(levellingReducer, initialState())

	useEffect(() => {
    levellingStorage.setItem(levelling)
  }, [levelling])

	const data = useMemo(() => {
		if (character) {
			const newLevel = character.toLevel = character.level + 1
			const levellingData = getLevellingDataForClassesAndLevel(character.classes, newLevel)

			const race = formatRace(allRaces.find(r => r.index === character.race))
			const clss = formatClass(classes.find(r => r.index === character.classes[0]))
			const background = formatBackground(backgrounds.find(r => r.index === character.background))

			const steps = getLevellingSteps(character, newLevel)

			return {
				levellingData,
				newLevel,
				race,
				clss,
				background,
				steps,
			}
		}
	}, [character])

	const context = {
    ...data,
		character: levelling,

    updateCharacter: (newData) => {
      const currentStep = newData.step

			const steps = data.steps
			
			const currentStepIndex = steps.findIndex(s => currentStep.name === s.name)
			const nextStep = steps[currentStepIndex + 1]

      console.info({ currentStep, nextStep })

      if (nextStep) {
				router.push(`/level-up/${nextStep.name}`)
      }

      dispatchLevelling({
        type: 'update',
        data: {
          ...newData,
          currentStep: nextStep,
        }
      })

    },
    finalizeLevelUp: () => {
			// updatedCharacter
			// build character
			debugger
    },
  }

	return context
}

export default useCharacterLevelling