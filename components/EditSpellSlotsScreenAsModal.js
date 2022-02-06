import { useState } from "react"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import clsx from "clsx"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n"
import Button from "./Button"

function Form({ show, spellSlot, onSubmit, onClose }) {
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
			<h3 onClick={onClose} className="border-solid border-slate-300 border-b">Modification</h3>
			<p>Vous pouver modifier vos slots</p>

			<div className="px-4">
				<div className="flex items-center mt-8">
					<label className="w-2/3">
						Slots utilisés
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
						Slots total
						<span className="text-meta text-xs pl-2">(Défaut: {spellSlot.baseTotalSlots})</span>
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
					Valider le changement
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
						<span>0 slot disponible</span>
					)}

					{spellSlot.isAboveMaximumSlotLevel && (
						<span>Vous n'avez pas accès à ce niveau</span>
					)}
			
					{spellSlot.isAboveMaximumSlotLevel ? (
						<div>
							remainingSlots: {spellSlot.remainingSlots}
						</div>
					) : (
						<p>Vous avez utilisé plus de slots que votre capacité. Reposez-vous !</p>
					)}

					
				</div>

				<div className="mt-4">
					{!showForm && (
						<Button
							variant="outlined"
							onClick={() => setShowForm(!showForm)}
						>
							Modifier
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

export function useEditSpellSlotsScreenAsModal() {
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
