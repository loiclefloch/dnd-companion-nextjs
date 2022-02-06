import useFeature from "../../modules/api/useFeature"
import useI18n from "../../modules/i18n/useI18n"
import ButtonBottomScreen from "../../components/ButtonBottomScreen"

function Feature({ index }) {
	const { tr } = useI18n()
	const featureResponse = useFeature(index)

	const feature = featureResponse.data

	return (
		<div className="px-4 my-4 py-4 prose">
			<h3 className="border-solid border-b border-slate-300">{feature.name}</h3>

			<p className="mt-2">
				{tr(feature.desc)}
			</p>
		</div>
	)
}

function StepFeatures({ levellingData, onNextStep }) {
	return (
		<div className="mt-2 divide divide-y">
			{levellingData.features.map(index => (
				<Feature key={index} index={index} />
			))}

			<ButtonBottomScreen 
				variant="cta" 
				onClick={() => {
					onNextStep({ step: 'features', features: levellingData.features })
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}
StepFeatures.label = "Ajout features"

export default StepFeatures