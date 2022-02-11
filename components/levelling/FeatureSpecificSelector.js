import useTipFeature from "../useTipFeature"
import ListSelector from "../ListSelector"

function SubfeatureOptions({ value = [], onChange, options }) {
	const { showTipFeature } = useTipFeature()

	return (
		<ListSelector
			nbMaxValues={options.choose}
			multiple
			value={value}
			onChange={onChange}
			options={options.from.map(feature => ({
				key: feature.index,
				label: feature.name,
				value: feature.index,
				selected: value?.includes(feature.index),
				rightView: <div
					className="px-4 py-2 text-xs text-meta"
					onClick={() => showTipFeature(feature.index)}
				>
					?
				</div>
			}))}
		/>
	)
}

function ExpertiseOptions({ value = [], character, onChange, options }) {
	return (
		<ListSelector
			nbMaxValues={options.choose}
			multiple
			value={value}
			onChange={onChange}
			options={options.from.map(skill => ({
				key: skill.index,
				label: skill.name,
				value: skill.index,
				selected: value?.includes(skill.index),
				disabled: character.skillsProficiencies.includes(skill.index.replaceAll("skill-", "")),
				rightView: <div
					className="px-4 py-2 text-xs text-meta"
					onClick={() => showTipFeature(skill.index)}
				>
					?
				</div>
			}))}
		/>
	)
}

function FeatureSpecificSelector({ character, feature, value, onChange }) {

	if (feature.featureSpecific.subfeatureOptions) {
		return (
			<SubfeatureOptions
				options={feature.featureSpecific.subfeatureOptions}
				value={value?.features || []}
				onChange={features => onChange({ isFeatures: true, features })}
			/>
		)
	}

	// aka skillsProficiencies
	if (feature.featureSpecific.expertiseOptions) {
		return (
			<ExpertiseOptions
				character={character}
				options={feature.featureSpecific.expertiseOptions}
				value={value?.expertises || []}
				onChange={expertises => onChange({ isExpertises: true, expertises })}
			/>
		)
	}

	debugger

	throw new Error(`Not handled`)
}

export default FeatureSpecificSelector