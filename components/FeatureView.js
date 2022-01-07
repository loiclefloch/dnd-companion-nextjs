import useI18n from "../modules/i18n/useI18n"


function FeatureView({ feature }) {
	const { tr } = useI18n()

	return (
		<div className="p-4">
			<div>
				At level {feature.level}
			</div>
			<div>
				{/* TODO: nameLocalized */}
				Class: {tr(feature.class.name)} 
			</div>
			{feature.desc.map((desc, index) => (
				<p key={index}>{desc}</p>
			))}

			// TODO: prerequisites
		</div>
	)
}

export default FeatureView