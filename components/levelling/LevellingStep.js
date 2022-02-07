import { createElement  } from "react"

import useCharacterLevelling from "../useCharacterLevelling"

import Introduction from "./Introduction"
import Features from "./Features"
import SpellSlots from "./SpellSlots"
import IncreaseMaximumHp from "./IncreaseMaximumHp"
import Finalize from "./Finalize"
import AbilityScoreImprovement from "./AbilityScoreImprovement"
import HitPoints from "./HitPoints"

const isBrowser = typeof window !== "undefined";

function LevellingStep({ stepName }) {
	const { levellingDispatch, character, newLevel, levellingData, steps, ...otherProps } = useCharacterLevelling()

	if (!character || !isBrowser) {
		// on server side, no current character
		return null
	}

	const stepsViews = {
		introduction: Introduction,
		features: Features,
		'spell-slots': SpellSlots,
		'increase-maximum-hp': IncreaseMaximumHp,
		finalize: Finalize,
		'ability-score-improvement': AbilityScoreImprovement,
		'hit-points': HitPoints,
		// StepHp,
	}

	const stepView = stepsViews[stepName]

	const step = steps.find(s => s.name === stepName)
	console.log({ stepName, step, steps })

	return stepView ? (
		createElement(
			stepView, 
			{
				character, 
				newLevel, 
				levellingData, 
				stepsViews, 
				levellingDispatch, 
				steps,
				step,
				...otherProps 
			})
	) : (
		<p>level-up not yet created: {stepName}</p>
	)
}

export default LevellingStep