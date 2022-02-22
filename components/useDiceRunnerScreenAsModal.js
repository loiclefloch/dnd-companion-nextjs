import { useState } from "react"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import useDice from "./useDice";
import Button from "./Button";
import IconDice20Simple from "./icons/IconDice20Simple"
import useFormModal from "./useFormModal"
import ButtonBottomScreen from "./ButtonBottomScreen";

function Form({ formData, onChange }) {
	return (
		<div className='mt-6 flex items-center justify-center'>
			<input
				type="number"
				className="placeholder:italic placeholder:text-slate-400 block bg-white
						 border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none 
						 focus:border-slate-300 focus:ring-slate-300 focus:ring-1 sm:text-sm text-center w-24 text-lg bg-transparent"
				value={formData.diceResult}
				onChange={e => onChange('diceResult', e.target.value)}
			/>
		</div>
	)
}

function DiceRunnerScreenAsModal({ dice, label, onDiceResult, onCloseScreen }) {
	const { tr } = useI18n()
	const [diceResult, setDiceResult] = useState(null)
	const { prerollDice, createManualRollData } = useDice()
	const { showFormModal } = useFormModal()

	return (
		<ScreenAsModal 
			title="Lancer le dé"
			onCloseScreen={onCloseScreen}
		>
			<div className="text-center prose">
				{/* TODO: dice icon */}
				<div className="mt-8 flex justify-center">
					<IconDice20Simple className="fill-slate-800 w-14 h-14" />
				</div>

				<h3 className="mt-8">{label}</h3>
				<div className="text-2xl mt-8">
					{dice}
				</div>

				<div className="my-12">
					<span className="text-4xl">
						{diceResult
							? diceResult.roll.diceResult
							// Take space when no diceResult
							: <span>&nbsp;</span>
						}
					</span>

					<div className="text-meta">
						{diceResult
							? diceResult.roll.diceRollResult.rolls.map(roll => roll.label).join(' ')
							// Take space when no diceResult
							: <span>&nbsp;</span>}
					</div>

				</div>

				{/* TODO: set result manually */}
				{/* TODO: run dice */}
				<div className="flex gap-4 mx-4">
					<Button
						variant="outlined"
						onClick={() => {
							showFormModal({
								label: `Entrez le résultat de votre jet de dé`,
								defaultData: 0,
								form: <Form />,
								onSubmit: (formData) => {
									setDiceResult(createManualRollData(label, dice, formData.diceResult))
								}
							})
						}}
					>
						Entrer le résultat
					</Button>

					<Button
						variant="outlined"
						onClick={() => setDiceResult(prerollDice(label, dice))}
					>
						Lancer le dé
					</Button>
				</div>

				<ButtonBottomScreen
					onClick={() => {
						onCloseScreen()
						onDiceResult(diceResult)
					}}
				>
					Valider
				</ButtonBottomScreen>
			</div>
		</ScreenAsModal>
	)
}

export default function useDiceRunnerScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showDiceRunnerScreenAsModal: ({ dice, label, onDiceResult }) => {
			showScreenAsModal(DiceRunnerScreenAsModal, {
				dice,
				label,
				onDiceResult,
			})
		}
	}
}