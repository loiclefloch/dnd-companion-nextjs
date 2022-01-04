import { getSpellLevelDataForClassesAndLevel } from "../modules/levelling"

function SpellLevelData({ classes, level }) {
	// TODO: how do we do with multy class?
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, level)
	const maxSpellLevel = Math.max(...Object.keys(spellLevelData.slots))

	return (
		<div>
			<table className="mx-4 mt-2">
				<thead>
					<tr>
						<th className="text-sm font-semibold">Level</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) => (
							<th key={index} className="w-8 font-semibold text-center">
								{index === 0 ? "C" : index }
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th  className="text-sm font-semibold">Slots</th>
						{[...Array(maxSpellLevel + 1)].map((_, index) => (
							<td key={index} className="text-center">
								{spellLevelData.slots[index]}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default SpellLevelData