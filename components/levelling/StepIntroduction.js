import ButtonBottomScreen from "../../components/ButtonBottomScreen"

function StepIntroduction({ character, newLevel, stepsViews, onNextStep }) {
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
					{Object.values(stepsViews).slice(1).map(step => <li>{step.label}</li>)}
				</ul>

			</div>

			<ButtonBottomScreen 
				variant="cta" 
				onClick={() => onNextStep({ step: 'introduction' })}
			>
				Commencer la montée de niveau
			</ButtonBottomScreen>
		</div>
	)
}

export default StepIntroduction