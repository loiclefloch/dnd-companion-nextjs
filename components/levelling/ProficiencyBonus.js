import { actionLevellingUpdateProficiencyBonus } from "./action"
import ButtonBottomScreen from "../ButtonBottomScreen"
import StatsDetails from "../StatsDetails"

function ProficiencyBonus({ getFormattedBuildedCharacter, levellingData, character, step, levellingDispatch }) {
	const buildedCharacter = getFormattedBuildedCharacter()

	return (
		<div className="prose text-center mt-8 mx-4">
			<h3>{step.label}</h3>

			{/* TODO textr */}
			<p>Le bonus de maîtrise ...</p>
			{/* TODO: learn more */}

			<div className="mt-4 text-3xl">
				+{character.proficiencyBonus} → +{buildedCharacter.proficiencyBonus}
			</div>
			
			<div className="border-b border-solid border-slate-300 my-4"></div>

			<div className="mt-4">
				<StatsDetails
					skills={buildedCharacter.skills}
					character={buildedCharacter}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					levellingDispatch(actionLevellingUpdateProficiencyBonus({ step }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default ProficiencyBonus