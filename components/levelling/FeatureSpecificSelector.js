import useTipFeature from "../useTipFeature"
import ListSelector from "../ListSelector"

function SubfeatureOptions({ value = [], onChange, options }) {
	const { showTipFeature } = useTipFeature()

	return (
		<ListSelector
			nbMaxValues={options.choose}
			multiple
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


function FeatureSpecificSelector({ feature, value, onChange }) {

	if (feature.featureSpecific.subfeatureOptions) {
		return (
			<SubfeatureOptions
				options={feature.featureSpecific.subfeatureOptions}
				value={value}
				onChange={onChange}
			/>
		)
	}

	throw new Error(`Not handled`)
}

export default FeatureSpecificSelector