import { useState } from "react"
import { actionLevellingRoguishArchetypes } from "./action"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"
import useTipFeature from "../useTipFeature"
import SubclassListSelector from "./SubclassListSelector"

function RoguishArchetypes({ clss, getBuildedCharacter, levellingData, step, levellingDispatch, stepLevellingState }) {
	const { showTipFeature } = useTipFeature()
	const [selectedSubclass, setSelectedSubclass] = useState(null)

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4 text-center">{step.desc}</h4>
			
			<p className="mt-6">
				Rogues have many features in common, including their emphasis on perfecting their skills, their precise and deadly approach to combat, and their increasingly quick reflexes. But different rogues steer those talents in varying directions, embodied by the rogue archetypes. Your choice of archetype is a reflection of your focus—not necessarily an indication of your chosen profession, but a description of your preferred techniques.
			</p>
			<p>
				At 3rd level, you choose an archetype that you emulate in the exercise of your rogue abilities. The Thief archetype is detailed at the bottom of this page. Additional archetypes are available in the original source material. Your archetype choice grants you features at 3rd level and then again at 9th, 13th, and 17th level.
			</p>
			
			<div>
				<SubclassListSelector 
					clss="rogue"
					selectedSubclass={selectedSubclass}
					onSelect={(selectedSubclass) => setSelectedSubclass(selectedSubclass)}
				/>
			</div>

			<ButtonBottomScreen 
				variant="cta" 
				hide={!selectedSubclass}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(actionLevellingRoguishArchetypes({ step, selectedSubclass }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default RoguishArchetypes