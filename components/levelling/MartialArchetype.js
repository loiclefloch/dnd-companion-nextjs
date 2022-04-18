import { useState } from "react"
import { actionLevellingMartialArchetypes } from "./action"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"
import SubclassListSelector from "./SubclassListSelector"

function MartialArchetype({ step, levellingDispatch }) {
	const [selectedSubclass, setSelectedSubclass] = useState(null)

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4 text-center">{step.desc}</h4>
			
			<p className="mt-6">
			
			</p>
			<p>
				At 3rd level, you choose an archetype that you strive to emulate in your combat styles and techniques. Choose Champion, Battle Master, or Eldritch Knight, all detailed at the end of the class description. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.
			</p>
			
			<div>
				<SubclassListSelector 
					clss="fighter"
					selectedSubclass={selectedSubclass}
					onSelect={(selectedSubclass) => setSelectedSubclass(selectedSubclass)}
				/>
			</div>

			<ButtonBottomScreen 
				variant="cta" 
				hide={!selectedSubclass}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(actionLevellingMartialArchetypes({ step, selectedSubclass }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default MartialArchetype