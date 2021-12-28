import map from "lodash/map";

import SectionWithToggle from "./SectionWithToggle";
function SpellDetailLevelTable({ title, data }) {

	return (
		<SectionWithToggle title={title} className="mt-4">
			<div className="flex flex-col pt-4">
				{map(data, (value, level) => !value ? null : (
					<div key={level} className="flex items-center border-b border-solid border-slate-200 px-4 py-1 last:border-0">
						<div className="text-sm w-6">{level}</div>
						<div className="pl-4">{value}</div>
					</div>
				))}
			</div>
		</SectionWithToggle>
	)
}

function SpellDetailLevel({ spell }) {
	if (spell.heal) {
		return <SpellDetailLevelTable title="Soins" data={spell.heal.healAtSlotLevel} />
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return <SpellDetailLevelTable title="Dégats par niveau de sort" data={spell.damage.damageAtSlotLevel} />
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return <SpellDetailLevelTable title="Dégats par niveau de personnage" data={spell.damage.damageAtCharacterLevel} />
	}

	return null
}


function SpellDetail({ spell }) {
	return (
		<div className="pb-20">
			<SpellDetailLevel spell={spell} />
		</div>
	)
}

export default SpellDetail