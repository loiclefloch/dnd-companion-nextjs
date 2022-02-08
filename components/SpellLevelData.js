import { getLevellingDataForClassesAndLevel } from "../modules/levelling"

function SpellLevelData({ classes, level }) {
	// TODO: how do we do with multy class?
	const levellingData = getLevellingDataForClassesAndLevel(classes, level)
	const maxSpellLevel = Math.max(...Object.keys(levellingData.slots))

	return (
		<div>
			<table className="mx-4 mt-2">
				<tbody>
					<tr>
						<td className="text-sm font-semibold w-32">Cantrips known</td>
						<td>{levellingData.spellcasting.cantripsKnown}</td>	
					</tr>
					<tr>
						<td className="text-sm font-semibold w-32">Total spell known</td>
						<td>{levellingData.spellcasting.spellsKnown}</td>	
					</tr>
				</tbody>
			</table>

			<table className="mx-4 mt-2">
				<thead>
					<tr>
						<th className="text-sm font-semibold pr-4">Level</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) => index === 0 ? null : (
							<th key={index} className="w-8 font-semibold text-center">
								{index === 0 ? "C" : index}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th  className="text-sm font-semibold pr-4">Slots</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) =>  index === 0 ? null : (
							<td key={index} className="text-center">
								{levellingData.slots[index] || 0}
							</td>
						))}
					</tr>
				</tbody>
			</table>
			
		</div>
	)
}

export default SpellLevelData