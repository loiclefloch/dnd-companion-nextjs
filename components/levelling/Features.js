import { useState } from "react"
import { isEmpty } from "lodash"
import { actionLevellingAddFeatures } from "./action"
import map from "lodash/map"
import useFeature from "../../modules/api/useFeature"
import { makeI18n } from "../../modules/i18n/useI18n"
import ButtonBottomScreen from "../ButtonBottomScreen"
import Section from "../Section"
import FeatureSpecificSelector from "./FeatureSpecificSelector"

const useI18n = makeI18n({
	'noNewFeatureForLevel': {
		fr: `Pas de nouvelle capacité pour ce niveau.`,
		en: `No new features for this level.`,
	},
})

function Feature({ character, value = { type: '', }, onChange, index }) {
	const { tr } = useI18n()
	const featureResponse = useFeature(index)

	const feature = featureResponse.data

	return (
    <Section 
			className="prose my-4 px-4 py-4"
			title={feature.name}
			withToggle
		>

      <p className="mt-2">{tr(feature.desc)}</p>

      {feature.featureSpecific && (
        <FeatureSpecificSelector
          feature={feature}
					character={character}
          value={value}
          onChange={onChange}
        />
      )}
    </Section>
  );
}

function formIsValid(features, featuresOptions) {
	if (!features) {
		return true
	}

	return features.every((feature, index) => {
		const option = featuresOptions[index]

		if (feature.featureSpecific) {
			debugger
			return !!option
		}

		return true
	})

}


// TODO: handle feature_specific: expertise_options or subfeature_options
function Features({ getBuildedCharacter, levellingData, step, levellingDispatch }) {
	const { tr } = useI18n()
	const [featuresOptions, setFeaturesOptions] = useState({})
	const character = getBuildedCharacter()

	const isValid = formIsValid(levellingData.features, featuresOptions)

	return (
		<div className="prose mt-8 mx-4">
			<h3 className="text-center">{step.label}</h3>

			<div className="mt-2">
				{levellingData.features.map(index => (
					<Feature 
						key={index} 
						index={index} 
						value={featuresOptions[index]}
						onChange={(featureSpecificData) => setFeaturesOptions({
							...featuresOptions,
							[index]: featureSpecificData
						})}
						character={character}
					/>
				))}
			</div>

			{isEmpty(levellingData.features) && (
				<p className="text-center">{tr`noNewFeatureForLevel`}</p>
			)}

			<ButtonBottomScreen
				variant="cta"
				disabled={!isValid}
				hide={!isValid}
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