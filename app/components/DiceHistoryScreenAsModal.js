import clsx from "clsx";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import useDiceHistory from './useDiceHistory';
import IconRefresh from "./icons/IconRefresh"

function DiceHistoryRow({ diceHistory }) {
	const { label, dice, roll, context } = diceHistory

	return (
		<div className="flex px-4 pt-2 mt-3 sm:mt-0 sm:ml-4 sm:text-left">
			<div className="flex-1">
					<h3 className="font-medium leading-6 text-gray-900 text-md" id="modal-title">
						{label || 'Inconnu'}
					</h3>

				<div className="mt-0 text-sm text-meta">
					<div>
						{roll.diceRollResult.rolls.map(roll => roll.label).join(', ')}
					</div>
					<div className="mt-1">
						{roll.diceFormatted} {roll.successCheckLabel}
					</div>
				</div>
			</div>

			<div className="flex flex-col items-end">
				<div
					className={clsx("mt-2 text-xl font-semibold",
						{
							"text-slate-700": !roll.canCalculateSuccess && !roll.isCritic,
							"text-success": roll.isCriticSuccess,
							"text-failure": roll.isCriticFailure,
							"text-blue-500": roll.canCalculateSuccess && roll.isSuccess && !roll.isCritic,
							"text-orange-500": roll.canCalculateSuccess && roll.isFailure && !roll.isCritic,
						}
					)}
				>
					{roll.result}
				</div>
				<>
					{roll.isCriticSuccess && <div className="text-sm text-success">CRITIQUE</div>}
					{roll.isCriticFailure && <div className="text-sm text-failure">CRITIQUE</div>}
				</>
				<>
						{/* TODO: tooltip reroll */}
					{roll.isReroll && <IconRefresh className="w-4 h-4 mt-1 text-slate-700" />}
				</>
			</div>
		</div>
	)
}

function DiceHistoryScreenAsModal({ onCloseScreen }) {
	const { diceHistory } = useDiceHistory()

	return (
		<ScreenAsModal title="Historique des jets" onCloseScreen={onCloseScreen}>
			<div className="pb-16">
				<div className='flex flex-col flex-1 h-full divide-y divide'>
					{diceHistory.map((diceHistory, index) => (
						<DiceHistoryRow key={index} diceHistory={diceHistory} />
					))}
				</div>
			</div>
		</ScreenAsModal>
	)
}

export function useDiceHistoryScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showDiceHistoryScreen: () => {
			showScreenAsModal(DiceHistoryScreenAsModal, {})
		}
	}
}

export default DiceHistoryScreenAsModal