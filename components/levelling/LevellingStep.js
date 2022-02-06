import { createElement  } from "react"

import useCharacterLevelling from "../useCharacterLevelling"

import Introduction from "./StepIntroduction"
import Features from "./StepFeatures"
import SpellSlots from "./StepSpellSlots"

function LevellingStep({ stepName }) {
	const { updateCharacter, character, newLevel, levellingData, ...otherProps } = useCharacterLevelling()

	if (!character) {
		// on server side, no current character
		return null
	}

	const stepsViews = {
		introduction: Introduction,
		features: Features,
		'spell-slots': SpellSlots,
		// StepHp,
	}

	const stepView = stepsViews[stepName]

	const onNextStep = (data) => {
		updateCharacter(data)
	}

	return stepView ? (
		createElement(stepView, { character, newLevel, levellingData, stepsViews, onNextStep, ...otherProps })
	) : (
		<p>level-up not yet created: {stepName}</p>
	)
}

export default LevellingStep