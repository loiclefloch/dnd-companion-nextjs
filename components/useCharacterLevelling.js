import { useState } from "react"
import { useRouter } from "next/router";
import { LevellingStorage, BackupStorage } from "../modules/db"
import { useMemo } from "react"
import useCurrentCharacter from "./useCurrentCharacter"
import { getLevellingDataForClassesAndLevel, getSpellsSlotsForCharacterLevel } from "../modules/levelling"
import getLevellingSteps from "../modules/levelling/getLevellingSteps"
import { formatCharacter  } from "../modules/api/useCharacter"
import { updateObjectOrCreateOnArray } from "../modules/utils/array";
import { cloneDeep } from "lodash";

import * as actions from "./levelling/action"

const initialState = () => LevellingStorage.getItem() || []

function useCharacterLevelling() {
  const router = useRouter()
	const { character, rawCharacter, updateCharacter } = useCurrentCharacter()

	const [ levellingState, setLevellingState] = useState(initialState())

  const updateLevellingState = (levellingState) => {
    LevellingStorage.setItem(levellingState)
    setLevellingState(levellingState)
	}

  //
  //
  //

	const levellingContextData = useMemo(() => {
		if (character) {
			const newLevel = character.toLevel = character.level + 1
			const levellingData = getLevellingDataForClassesAndLevel(character.classes, newLevel)

			const race = character.race
			const clss = character.classes[0]

			const background = character.background

			const steps = getLevellingSteps(character, newLevel)

      const spellsSlots = getSpellsSlotsForCharacterLevel(
        character.classes,
        newLevel
      )

			return {
				levellingData,
				newLevel,
				race,
				clss,
				background,
				steps,
        spellsSlots,
			}
		}
	}, [character, rawCharacter])

  function levellingDispatch (action) {
    const currentStep = router.query.step

    const steps = levellingContextData.steps
    
    const currentStepIndex = steps.findIndex(s => currentStep === s.name)
    const nextStep = steps[currentStepIndex + 1]

    console.info({ currentStep, nextStep })
    console.log(`dispatch ${action.type}`)

    const stepLevellingState = action.apply({
      levellingState,
      character,
      rawCharacter,
      newLevel: levellingContextData.newLevel,
    })

    stepLevellingState.actionType = action.type

    const nextLevellingState = updateObjectOrCreateOnArray(
      levellingState, 
      stepLevellingState, 
      s => s.step.name === stepLevellingState.step.name
    )

    updateLevellingState(nextLevellingState)

    if (!nextStep) {
      throw new Error(`Next step not found`)
    }

    if (nextStep.name === currentStep) {
      throw new Error(`nextStep is same as currentStep`)
    }
    
    if (nextStep) {
      router.push(`/level-up/${nextStep.name}`)
    }
  }

  function getBuildedCharacter() {
    const character = cloneDeep(rawCharacter)

    levellingState.forEach(stepData => {
      const fnc = actions[stepData.actionType]
      if (!fnc) {
        throw new Error(`Action not found for type ${stepData.actionType}`)
      }
      const action = fnc(stepData)
      action.build({
        character,
        newLevel: levellingContextData.newLevel,
      })
    })

    return character
  }

	const context = {
    ...levellingContextData,

    levellingState,
    character,
		rawCharacter,

    levellingDispatch,
    getBuildedCharacter,
    getFormattedBuildedCharacter: () => {
      return formatCharacter(getBuildedCharacter())
    },
    finalizeLevelling: () => {
      const updatedCharacter = getBuildedCharacter()

      // 1- backup
      // rawCharacter
      BackupStorage.add('character', updatedCharacter.id, updatedCharacter)
        
      // 2- update
      updateCharacter(updatedCharacter)

      // 3- redirect
      router.push("/character/levelling")
    }
  }

	return context
}

export default useCharacterLevelling