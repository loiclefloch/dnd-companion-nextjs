import { useState } from "react"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import clsx from "clsx"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n"
import Button from "./Button"

const useI18n = makeI18n({
	'modification.title': {
		fr: 'Modification',
		en: 'Modification',
	},
	'modification.explain': {
		'fr': `Vous pouver modifier vos slots`,
		'en': `You can modify your slots`,
	},
	'slots.used': {
		'fr': `Slots utilisés`,
		'en': `Slots used`,
	},
	'slots.total': {
		'fr': `Slots total`,
		'en': `Total slots`,
	},
	'slots.baseTotalSlots': {
		'fr': `Défaut: %{baseTotalSlots}`,
		'en': `Default: %{baseTotalSlots}`,
	},
	'hasNoSlotsToDisplay': {
		'fr': `0 slot disponible`,
		'en': `0 slot available`,
	},
	'isAboveMaximumSlotLevel': {
		'fr': `Vous n'avez pas accès à ce niveau`,
		'en': `You do not have access to this level`,
	},
	'remainingSlots': {
		'fr': `%{remainingSlots} restants`,
		'en': `%{remainingSlots} remaining slots`,
	},
	'moreSlotsUsedThanAvailable': {
		'fr': `Vous avez utilisé plus de slots que votre capacité. Reposez-vous !`,
		'en': `You have used more slots than your capacity. Rest!`,
	},
})

function Form({ show, spellSlot, onSubmit, onClose }) {
	const { tr } = useI18n()
	const [data, setData] = useState({
		spellLevel: spellSlot.spellLevel,
		usedSlots: spellSlot.usedSlots,
		totalSlots: spellSlot.totalSlots,
	})

	if (!show) {
		return null
	}

	return <>
		<div className="mt-6 prose">
			<h3 onClick={onClose} className="border-solid border-slate-300 border-b">{tr`modification.title`}</h3>
			<p>{tr`modification.explain`}</p>

			<div className="px-4">
				<div className="flex items-center mt-8">
					<label className="w-2/3">
						{tr`slots.used`}
					</label>
					<input
						type="number"
						className="ml-4 py-0.5 placeholder:italic placeholder:text-slate-400 block bg-white
						 border border-slate-300 rounded-md shadow-sm focus:outline-none 
						 focus:border-slate-300 focus:ring-slate-300 focus:ring-1 sm:text-sm text-center w-24 text-lg bg-transparent"
						value={data.usedSlots}
						onChange={e => setData({ ...data, usedSlots: e.target.value })}
					/>
				</div>

				<div className="flex items-center mt-2">
					<label className="w-2/3">
						{tr`slots.total`}
						<span className="text-meta text-xs pl-2">({tr('slots.baseTotalSlots', { baseTotalSlots: spellSlot.baseTotalSlots })})</span>
					</label>
					<input
						type="number"
						className="ml-4 py-0.5 placeholder:italic placeholder:text-slate-400 block bg-white
						 border border-slate-300 rounded-md shadow-sm focus:outline-none 
						 focus:border-slate-300 focus:ring-slate-300 focus:ring-1 sm:text-sm text-center w-24 text-lg bg-transparent"
						value={data.totalSlots}
						onChange={e => setData({ ...data, totalSlots: e.target.value })}
					/>
				</div>
			</div>

			<div className="mt-8">
				<Button 
					variant="cta" 
					onClick={() => onSubmit({
						spellLevel: parseInt(data.spellLevel, 10),
						usedSlots: parseInt(data.usedSlots, 10),
						totalSlots: parseInt(data.totalSlots, 10),
					})}
				>
					{tr`validate.action`}	
				</Button>
			</div>
		</div>
	</>
}

function EditSpellSlotsScreenAsModal({ spellSlot, onEdit, onCloseScreen }) {
	const { tr } = useI18n()
	const [ showForm, setShowForm ] = useState(false)

	return (
		<ScreenAsModal 
			title={'Slots'}
			onCloseScreen={onCloseScreen}
		>
			<div className="px-4">

				<div className="flex">
					{([...Array(spellSlot.totalSlotsToDisplay)]).map((_, index) => (
						<div
							key={index}
							className={clsx("w-6 h-6 mr-1", {
								"bg-red-400": index <= spellSlot.usedSlots,
								"border border-solid border-slate-400": index > spellSlot.usedSlots,
							})}
						/>
					))}
				</div>
				<div className="mt-4">
					Utilisés: {spellSlot.usedSlots} / {spellSlot.baseTotalSlots}
				</div>

				<div className="mt-4">
					{spellSlot.hasNoSlotsToDisplay && (
						// TODO: tip
						<span>{tr`hasNoSlotsToDisplay`}</span>
					)}

					{spellSlot.isAboveMaximumSlotLevel && (
						<span>{tr`isAboveMaximumSlotLevel`}</span>
					)}
			
					{spellSlot.isAboveMaximumSlotLevel ? (
						<div>
							{tr('remainingSlots', { remainingSlots: spellSlot.remainingSlots })}
						</div>
					) : (
						<p>{tr('moreSlotsUsedThanAvailable')}</p>
					)}
				</div>

				<div className="mt-4">
					{!showForm && (
						<Button
							variant="outlined"
							onClick={() => setShowForm(!showForm)}
						>
							{tr`modify.action`}
						</Button>
					)}
					<Form 
						show={showForm}
						spellSlot={spellSlot}
						onSubmit={(data) => {
							onEdit(data)
							onCloseScreen()
						}}
						onClose={() => setShowForm(false)} 
					/>
				</div>
			</div>
		</ScreenAsModal>
	)
}

export default function useEditSpellSlotsScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEditSpellSlotsScreenAsModal: ({ spellSlot, onEdit }) => {
			showScreenAsModal(EditSpellSlotsScreenAsModal, {
				spellSlot,
				onEdit,
			})
		}
	}
}
