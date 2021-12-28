import map from "lodash/map";

function SpellDetailLevelTable({ data }) {

	return (
		<div>
			{map(data, (value, level) => !value ?  null : (
				<div key={level} className="flex items-center">
					<div className="text-sm w-6">{level}</div>
					<div>{value}</div>
				</div>
			))}
		</div>
	)
}

function SpellDetailLevel({ spell })  {
	if (spell.heal) {
		return <SpellDetailLevelTable data={spell.heal.healAtSlotLevel} />
	}

	if (spell.damage && spell.damage.damageAtSlotLevel) {
		return <SpellDetailLevelTable data={spell.damage.damageAtSlotLevel} />
	}

	if (spell.damage && spell.damage.damageAtCharacterLevel) {
		return <SpellDetailLevelTable data={spell.damage.damageAtCharacterLevel} />
	}

	return null
}


function SpellDetail({ spell }) {
	return  (
		<div>
			<SpellDetailLevel spell={spell} />
		</div>
	)
}

export default SpellDetail