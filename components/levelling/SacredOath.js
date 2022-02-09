import { useState } from "react"
import { actionLevellingSacredOath } from "./action"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"
import useTipFeature from "../useTipFeature"
import SubclassListSelector from "./SubclassListSelector"

function SacredOath({ clss, getBuildedCharacter, levellingData, step, levellingDispatch, stepLevellingState }) {
	const { showTipFeature } = useTipFeature()
	const [selectedSubclass, setSelectedSubclass] = useState(null)

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4 text-center">{step.desc}</h4>
			
			<p className="mt-6">
				You swear the oath that binds you as a paladin forever. 
				Up to this time you have been in a preparatory stage, committed to the path but not yet sworn to it. 
			</p>
			<p>
     		Your choice grants you features at 3rd level and again at 7th, 15th, and 20th level. 
				Those features include <span onClick={() => showTipFeature('oath-spells')} className="text-link">oath spells</span>
				<span> </span>
				and the <span onClick={() => showTipFeature('channel-divinity')} className="text-link">Channel Divinity feature</span>.
			</p>
			
			<div>
				<SubclassListSelector 
					clss="paladin"
					selectedSubclass={selectedSubclass}
					onSelect={(selectedSubclass) => setSelectedSubclass(selectedSubclass)}
				/>
			</div>

			<ButtonBottomScreen 
				variant="cta" 
				hide={!selectedSubclass}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(actionLevellingSacredOath({ step, selectedSubclass }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default SacredOath