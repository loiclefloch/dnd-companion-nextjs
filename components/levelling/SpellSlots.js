import ButtonBottomScreen from "../ButtonBottomScreen"
import { actionLevellingLevelSlots } from "./action"

function Content({ spellsSlots, levellingData })  {
	
	if (!levellingData.spellcasting.hasMagic) {
		// TODO: better text
		return (
			<div className="px-4 mt-8 text-center">
				Vous n'avez pas accès à la magie
			</div>
		)
	}

	return (
		<div className="prose px-4 mt-4">

			<table className="mt-2">
				<tbody>
					<tr>
						<td className="text-sm font-semibold">Cantrips known</td>
						<td>{levellingData.spellcasting.cantripsKnown}</td>	
					</tr>
					<tr>
						<td className="text-sm font-semibold">Total spell known</td>
						<td>{levellingData.spellcasting.spellsKnown}</td>	
					</tr>
				</tbody>
			</table>

			<h3>Slots de sorts</h3>
			
			<table className="mt-2">
				<thead>
					<tr>
						<th className="text-sm font-semibold">Level</th>
						{spellsSlots.filter(slot => slot.spellLevel !== 0).map(slot => (
							<th key={slot.spellLevel} className="w-8 font-semibold text-center">
								{slot.spellLevel}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr>
						<th className="text-sm font-semibold">Slots</th>
						{spellsSlots.filter(slot => slot.spellLevel !== 0).map(slot => (
							<td key={slot.spellLevel} className="text-center">
								{slot.totalSlots}
							</td>
						))}
					</tr>
				</tbody>

			</table>

		</div>
	)
}

function StepSpellSlots({ spellsSlots, levellingData, step, levellingDispatch }) {
	return (
		<> 
			<Content spellsSlots={spellsSlots} levellingData={levellingData} />

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					levellingDispatch(actionLevellingLevelSlots({ step, spellsSlots }))
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</>
	)
}

export default StepSpellSlots