import { useState } from "react"
import { actionLevellingAddHp } from "./action"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"
import { useDiceRunnerScreenAsModal } from "../../components/DiceRunnerScreenAsModal"
import Button from "../Button"
import { valueToModifierLabel } from "../../modules/stats"

function HitPoints({ clss, getFormattedBuildedCharacter, levellingData, step, levellingDispatch, stepLevellingState }) {
	const buildedCharacter = getFormattedBuildedCharacter()
	const [diceResult, onDiceResult] = useState(stepLevellingState?.diceResult)
	const { showDiceRunnerScreenAsModal } = useDiceRunnerScreenAsModal()

	const dice = `1d${clss.hitDice}${valueToModifierLabel(buildedCharacter.stats.CON)}`

	return (
		<div className="prose text-center mt-8 mx-4">
			<h3>{step.label}</h3>

			<h4 className="mt-4">{step.desc}</h4>
			
			<div className="text-2xl mt-8">
				{dice}
			</div>

			<div className="mt-16 text-4xl">
				{diceResult && <span>+{diceResult.roll.diceResult} HP</span>}
			</div>

			<div className="mt-16">
				<Button
					variant="outlined"
					onClick={() => showDiceRunnerScreenAsModal({ 
						label: `Montée de niveau, points de vie`,
						dice, 
						onDiceResult,
					})}
				>
					Lancer le dé
				</Button>
			</div>

			<ButtonBottomScreen 
				variant="cta" 
				disabled={!diceResult}
				onClick={() => {
					levellingDispatch(actionLevellingAddHp({ step, hp: diceResult.roll.diceResult, diceResult }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default HitPoints