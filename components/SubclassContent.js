import { makeI18n } from "../modules/i18n/useI18n";
import useTipFeature from "./useTipFeature";

const useI18n = makeI18n({
	'spells.title': {
		fr: "Sorts",
		en: "Spells",
	},
})

function Spell({ spell }) {
	const { showTipFeature } = useTipFeature()

	// TODO: open spell
	return (
		<div className="flex justify-between py-1">
			<div>{spell.spell.index}</div>
			<div className="flex gap-4">
				{spell.prerequisites.map((prerequisite, index) => (
					<div key={index} className="text-right flex items-center">
						{prerequisite.isLevel && (
							<div className="text-meta text-xs">{tr('level.short', { level: prerequisite.level} )}</div>
						)}
						{prerequisite.isFeature && (
							<div className="text-meta text-xs" onClick={() => showTipFeature(prerequisite.index)}>
								{prerequisite.name}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

function Spells({ spells }) {
	return (
		<div>
			<h3 className="border-b border-solid border-slate-300">{tr`spells.title`}</h3>
			<div className="divide divide-y">
				{spells.map((spell, index) => (
					<Spell key={index} spell={spell} />
				))}
			</div>
		</div>
	)
}

function SubclassContent({ subclass }) {
	const { tr } = useI18n()

	return (
		<div className="prose">
			<p className="px-4">
				{tr(subclass.desc)}
			</p>

			<div className="px-4">
				{subclass.spells && (
					<Spells spells={subclass.spells} />
				)}
			</div>
		
			<div className="pb-12" />
		</div>
	)
}

export default SubclassContent