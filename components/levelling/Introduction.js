import { isEmpty } from "lodash"
import { actionLevellingStart } from "./action"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"

function Introduction({ newLevel, step, steps, levellingDispatch  }) {
	return (
		<div className="prose flex flex-col mt-8">
			<h3 className="text-center">Félicitations, vous avez gagner un niveau</h3>

			<div className="flex justify-center">
				<div
					className="mt-4 flex items-center justify-center text-2xl text-gray-700 border-2 border-solid 
				rounded-full w-12 h-12 border-slate-600"
				>
					{newLevel}
				</div>
			</div>

			<div className="px-4">
				<p className="text-center">
					Nous allons vous guider, pas à pas, pour réussir votre montée de niveau.
				</p>
				<p>
					{/* TODO: better text */}
					Vos aventures vous ont permis de progresser, reposez vous un intstant, puis cherchez un
					mentor, un maître, qui pourra vous aider à apprendre encore plus.
				</p>
			</div>

			<div className="px-4">
				<h4>Voici les différentes étapes de votre montée de niveau</h4>

				<ul>
					{/* TODO: add tip with step.desc */}
					{Object.values(steps)
					.slice(1) // remove introduction
					.filter(step => !isEmpty(step.label))
					.map(step => <li key={step.label}>{step.label}</li>)}
				</ul>

			</div>

			<ButtonBottomScreen 
				variant="cta" 
				onClick={() => levellingDispatch(actionLevellingStart({ step }))}
			>
				Commencer la montée de niveau
			</ButtonBottomScreen>
		</div>
	)
}

export default Introduction