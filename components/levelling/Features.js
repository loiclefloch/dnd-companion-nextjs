import { actionLevellingAddFeatures } from "./action"
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

function Features({ levellingData, step, levellingDispatch }) {
	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<div className="mt-2 divide divide-y">
				{levellingData.features.map(index => (
					<Feature key={index} index={index} />
				))}
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					levellingDispatch(actionLevellingAddFeatures({ step, features: levellingData.features }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default Features