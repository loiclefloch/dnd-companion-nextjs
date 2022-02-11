import { useState } from "react"
import { actionLevellingSacredOath } from "./action"
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

function Lore({ value = [], onChange }) {
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
					return ({
						label: (
							<div className="flex">
								{skill.name}
							</div>
						),
						value: skill.index,
						selected: value?.includes(skill.index),
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

function BardCollege({ clss, getBuildedCharacter, levellingData, step, levellingDispatch, stepLevellingState }) {
	const [view, setView] = useState(View.SELECT_SUB_CLASS)
	const [selectedSubclass, setSelectedSubclass] = useState(null)
	const [featuresOption, setFeaturesOption] = useState(null)

	const subclassHasOptionToSelect = selectedSubclass?.index === "land"

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
						value={featuresOption}
						onChange={setFeaturesOption}
					/>
				</div>
			)}

			<ButtonBottomScreen
				variant="cta"
				hide={!selectedSubclass || (subclassHasOptionToSelect && (view !== View.LORE || !featuresOption))}
				disabled={!selectedSubclass}
				onClick={() => {
					levellingDispatch(
            actionLevellingSacredOath({
              step,
              selectedSubclass,
              featuresOptions: featuresOption && [
                {
                  ...featuresOption,
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