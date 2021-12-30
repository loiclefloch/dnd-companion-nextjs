import clsx from "clsx";
import map from "lodash/map";

import SectionWithToggle from "./SectionWithToggle";
function SpellDetailLevelTable({ title, data }) {

	return (
		<SectionWithToggle title={title} className="mt-4">
			<div className="grid grid-cols-3 pt-4 place-items-stretch">
				{/* trick to add 21 level, to have a multiple of 3 (grid-cols-3) */}
				{map({ ...data, 21: '_'}, (value, level) => !value ? null : (
					<div 
						key={level} 
						className={clsx("flex flex-row items-center p-3 text-sm border-b border-r border-solid border-slate-200", {
							"border-t": level <= 3,
							"border-l": level % 3 === 1,
							
						})}
					>
						{level != 21 && (
							<>
								<div className="w-6 text-sm">{level}</div>
								<div className="pl-4">{value}</div>
							</>
						)}
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