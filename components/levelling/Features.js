import { useState } from "react"
import { actionLevellingAddFeatures } from "./action"
import map from "lodash/map"
import useFeature from "../../modules/api/useFeature"
import useI18n from "../../modules/i18n/useI18n"
import ButtonBottomScreen from "../ButtonBottomScreen"
import FeatureSpecificSelector from "./FeatureSpecificSelector"
import { isEmpty } from "lodash"

function Feature({ value = { type: '', }, onChange, index }) {
	const { tr } = useI18n()
	const featureResponse = useFeature(index)

	const feature = featureResponse.data

	return (
    <div className="prose my-4 px-4 py-4">
      <h3 className="border-b border-solid border-slate-300">{feature.name}</h3>

      <p className="mt-2">{tr(feature.desc)}</p>

      {feature.featureSpecific && (
        <FeatureSpecificSelector
          feature={feature}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}


// TODO: handle feature_specific: expertise_options or subfeature_options
function Features({ levellingData, step, levellingDispatch }) {
	const [featuresOptions, setFeaturesOptions] = useState({})

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<div className="mt-2 divide divide-y">
				{levellingData.features.map(index => (
					<Feature 
						key={index} 
						index={index} 
						value={featuresOptions[index]}
						onChange={(featureSpecificData) => setFeaturesOptions({
							...featuresOptions,
							[index]: featureSpecificData
						})}
					/>
				))}
			</div>

			{isEmpty(levellingData.features) && (
				<p className="text-center">Pas de nouvelle feature pour ce niveau.</p>
			)}

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					levellingDispatch(actionLevellingAddFeatures({ 
						step, 
						features: levellingData.features,
						featuresOptions: map(featuresOptions, (featureSpecificData, featureIndex) => ({
							featureIndex,
							...featureSpecificData,
						}))
					}))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

export default Features