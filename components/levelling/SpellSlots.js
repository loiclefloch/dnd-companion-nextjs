import ButtonBottomScreen from "../ButtonBottomScreen"
import { makeI18n } from "../../modules/i18n/useI18n"
import { actionLevellingLevelSlots } from "./action"

const useI18n = makeI18n({
	'hasNoMagic': {
		// TODO: better text
		fr: `Vous n'avez pas accès à la magie`,
		en: `You do not have access to magic`,
	},
	'cantripsKnown': {
		fr: `Cantrips connus`,
		en: `Cantrips known`,
	},
	'spellsKnown': {
		fr: `Nombre total de sorts connus`,
		en: `Total spell known`,
	},
	'slots.title': {
		fr: `Slots de sorts`,
		en: `Spells slots`,
	},
	'level': {
		fr: `Niveau`,
		en: `Level`,
	},
'slots': {
	fr: `Slots`,
	en: `Slots`,
},
'learnSpell.explain': {
	fr: `Vous pourrez apprendre de nouveaux sorts depuis la liste des sorts, une fois votre montée de niveau terminée.`,
	en: `You will be able to learn new spells from the list of spells, once you have increased your level completed.`,
},
})

function Content({ spellsSlots, levellingData })  {
	const { tr } = useI18n()
	
	if (!levellingData.spellcasting.hasMagic) {
		return (
			<div className="px-4 mt-8 text-center">
				{tr`hasNoMagic`}
			</div>
		)
	}

	return (
		<div className="prose px-4 mt-4">

			<table className="mt-2">
				<tbody>
					{/* display only if exists, data gives us 0 for now, don't know why, which is confusing 
						see getLevellingDataForClasses nbTotalSlots
					*/}
					{levellingData.spellcasting.cantripsKnown > 0 && (
						<tr>
							<td className="text-sm font-semibold">{tr`cantripsKnown`}</td>
							<td>{levellingData.spellcasting.cantripsKnown}</td>
						</tr>
					)}
					{levellingData.spellcasting.spellsKnown > 0 && (
						<tr>
							<td className="text-sm font-semibold"></td>
							<td>{levellingData.spellcasting.spellsKnown}</td>
						</tr>
					)}
				</tbody>

				{/* TODO: if new spell slots: message */}
			</table>

			<h3>{tr`slots.title`}</h3>
			
			<table className="mt-2">
				<thead>
					<tr>
						<th className="text-sm font-semibold">{tr`level`}</th>
						{spellsSlots.filter(slot => slot.spellLevel !== 0).map(slot => (
							<th key={slot.spellLevel} className="w-8 font-semibold text-center">
								{slot.spellLevel}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					<tr>
						<th className="text-sm font-semibold">{tr`slots`}</th>
						{spellsSlots.filter(slot => slot.spellLevel !== 0).map(slot => (
							<td key={slot.spellLevel} className="text-center">
								{slot.totalSlots}
							</td>
						))}
					</tr>
				</tbody>

			</table>

			<p className="mt-12 prose">
				{tr`learnSpell.explain`}
			</p>

		</div>
	)
}

function StepSpellSlots({ spellsSlots, levellingData, step, levellingDispatch }) {
	const { tr } = useI18n()
	return (
		<> 
			<Content spellsSlots={spellsSlots} levellingData={levellingData} />

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					levellingDispatch(actionLevellingLevelSlots({ step, spellsSlots }))
				}}
			>
				{tr`continue.action`}
			</ButtonBottomScreen>
		</>
	)
}

export default StepSpellSlots