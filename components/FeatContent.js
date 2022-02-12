import useI18n from "../modules/i18n/useI18n"
import Tag from "../components/Tag"

export function FeatPrerequisites({ feat }) {
	return (
		<div className="flex gap-2">
			{feat.forRace && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.race.name}
					</Tag>
				))
			)}
			{feat.forAbilityScore && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.abilityScore.name} >= {p.minimumScore}
					</Tag>
				))
			)}
			{feat.forProficiency && (
				feat.prerequisites.map((p, index) => (
					<Tag key={index} size="small" className="border border-slate-600 text-slate-600">
						{p.proficiency.name}
					</Tag>
				))
			)}
			{feat.forOther && (
				<Tag className="text-meta text-xs border border-slate-600 text-slate-600">
					{feat.prerequisitesLabel}
				</Tag>
			)}
		</div>
	)
}

function FeatContent({ feat }) {
	const { tr } = useI18n()

	return (
		<div className="prose px-4">
			<div>{tr(feat.resume)}</div>

			<div className="whitespace-pre-wrap">
				{tr(feat.desc)}
			</div>

			<div className="mt-8">
				<FeatPrerequisites feat={feat} />
			</div>
		</div>
	)
}

export default FeatContent