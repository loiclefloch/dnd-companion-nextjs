import { useState, useEffect } from "react"
import { actionLevellingBardCollege } from "./action"
import features from "../../database/data/features"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"
import useTipFeature from "../useTipFeature"
import SubclassListSelector from "./SubclassListSelector"
import FeatureSpecificSelector from "./FeatureSpecificSelector"
import ListSelector from "../ListSelector"
import useSkills from "../../modules/api/useSkills"

const View = {
	SELECT_SUB_CLASS: 'SELECT_SUB_CLASS',
	LORE: 'LORE',
}

function Lore({ character, value = [], onChange }) {
	const skillsResponse = useSkills() 

	if (!skillsResponse.data) {
		return null
	}

	const skills = skillsResponse.data

	return (
		<div>
			{/* TODO: choose 3 skills to have proficiency to */}
			<ListSelector
				nbMaxValues={3}
				multiple
				value={value}
				options={skills.map(skill => {
					const proficiencyKey = `skill-${skill.index}`
					return ({
						label: (
							<div className="flex">
								{skill.name}
							</div>
						),
						disabled: character.proficiencies.some(s => s.index === proficiencyKey),
						value: proficiencyKey,
						selected: value?.includes(proficiencyKey),
						rightView: (
							<div
								className="px-4 py-2 text-xs text-meta"
								// TODO:
								// onClick={() => showTipProficiency(proficiency)}
							>
								?
							</div>
						)
					})
				})}
				onChange={onChange}
			/>
		</div>
	)
}

function BardCollege({ 
	clss, 
	getBuildedCharacter, 
	levellingData, 
	step, 
	levellingDispatch, 
	clearStepLevellingState
}) {
	const character = getBuildedCharacter()
	const [view, setView] = useState(View.SELECT_SUB_CLASS)
	const [selectedSubclass, setSelectedSubclass] = useState(null)
	const [expertises, setExpertises] = useState(null)

	const subclassHasOptionToSelect = selectedSubclass?.index === "land"

	useEffect(() => clearStepLevellingState(step), [clearStepLevellingState, step])

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<h4 className="mt-4 text-center">{step.desc}</h4>
			
			<p className="mt-6">
			</p>
			<p>
			</p>
			
			{view === View.SELECT_SUB_CLASS && (
				<div>
					<SubclassListSelector
						clss="bard"
						selectedSubclass={selectedSubclass}
						onSelect={(selectedSubclass) => {
							setSelectedSubclass(selectedSubclass)
							if (selectedSubclass.index === "lore") {
								setView(View.LORE)
							}
						}}
					/>
				</div>
			)}

			{view === View.LORE && (
				<div>
					<div onClick={() => setView(View.SELECT_SUB_CLASS)}>
						Revenir
					</div>
					<Lore
						character={character}
						value={expertises}
						onChange={setExpertises}
					/>
				</div>
			)}

			<ButtonBottomScreen
				variant="cta"
				hide={!selectedSubclass || (subclassHasOptionToSelect && (view !== View.LORE || !expertises))}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(
            actionLevellingBardCollege({
              step,
              selectedSubclass,
              featuresOptions: expertises && [
                {
									isExpertises: true,
                  expertises,
                  featureIndex: selectedSubclass.index,
                },
              ],
            })
          );
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default BardCollege