import { actionLevellingAddHp } from "./action"

import ButtonBottomScreen from "../../components/ButtonBottomScreen"


function IncreaseMaximumHp({ levellingData, step, levellingDispatch }) {
	return (
		<div className="prose text-center mt-8 mx-4">
			<h3>{step.label}</h3>

			<h4 className="mt-4">{step.desc}</h4>

			<p className="text-2xl mt-4">HP +{step.hp}</p>

			<ButtonBottomScreen 
				variant="cta" 
				onClick={() => {
					levellingDispatch(actionLevellingAddHp({ step, hp: step.hp }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default IncreaseMaximumHp