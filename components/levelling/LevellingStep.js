import { createElement  } from "react"

import useCharacterLevelling from "../useCharacterLevelling"

import Introduction from "./Introduction"
import LevellingDoesNotExists from "./LevellingDoesNotExists"
import Features from "./Features"
import SpellSlots from "./SpellSlots"
import IncreaseMaximumHp from "./IncreaseMaximumHp"
import Finalize from "./Finalize"
import AbilityScoreImprovement from "./AbilityScoreImprovement"
import HitPoints from "./HitPoints"
import ProficiencyBonus from "./ProficiencyBonus"
import SacredOath from "./SacredOath"
import DruidCircle from "./DruidCircle"
import BardCollege from "./BardCollege"
import RoguishArchetypes from "./RoguishArchetypes"

const isBrowser = typeof window !== "undefined";

function LevellingStep({ stepName }) {
	const { 
		levellingDispatch, 
		character, 
		newLevel, 
		levellingData, 
		steps, 
		levellingState, 
		...otherProps
	} = useCharacterLevelling()

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
		'proficiency-bonus': ProficiencyBonus,
		'sacred-oath': SacredOath,
		'druid-circle': DruidCircle,
		'bard-college': BardCollege,
		'roguish-archetypes': RoguishArchetypes,
		'levelling-does-not-exists': LevellingDoesNotExists,
		// StepHp,
	}

	const stepView = stepsViews[stepName]
	const step = steps.find(s => s.name === stepName)
	const stepLevellingState = levellingState.find(s => s.step.name === stepName)

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
				levellingState,
				stepLevellingState,
				...otherProps 
			})
	) : (
		<p>level-up not yet created: {stepName}</p>
	)
}

export default LevellingStep