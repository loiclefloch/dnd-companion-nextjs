import useI18n from "../modules/i18n/useI18n"

function FeatContent({ feat }) {
	const { tr } = useI18n()

	return (
		<div className="prose px-4">
			<h3>{tr(feat.nameLocalized)}</h3>

			<div>{tr(feat.resume)}</div>

			<div className="whitespace-pre-wrap">
				{tr(feat.desc)}
			</div>
		</div>
	)
}

export default FeatContent