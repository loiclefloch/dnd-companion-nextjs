import useI18n from "../modules/i18n/useI18n";


function Spell({ spell }) {
	// TODO: open spell
	return (
		<div className="flex justify-between py-1">
			<div>{spell.spell.index}</div>
			{spell.prerequisites.map((prerequisite, index) => (
				<div key={index}>
					<div>
						{prerequisite.isLevel && (
							<div>lvl {prerequisite.level}</div>
						)}
						{prerequisite.isFeature && (
							<div>TODO</div>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

function Spells({ spells }) {
	return (
		<div>
			<h3 className="border-b border-solid border-slate-300">Sorts</h3>
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
				<Spells spells={subclass.spells} />
			</div>
		
			<div className="pb-12" />
		</div>
	)
}

export default SubclassContent