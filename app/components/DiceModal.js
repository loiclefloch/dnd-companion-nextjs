import clsx from "clsx";
import IconDice20Simple from "./icons/IconDice20Simple"
import Button from "./Button"
import IconRefresh from "./icons/IconRefresh";
import IconD8 from "./icons/IconD8";

function DiceModal({
	label,
	roll,
	context,
	onReroll,
	onValidate,
	showDiceHistoryScreen, // must be given as props, since we are on a model, we cannot access the ScreenModal context
	hideModal
}) {

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/*
				Background overlay, show/hide based on modal state.

				Entering: "ease-out duration-300"
				From: "opacity-0"
				To: "opacity-100"
				Leaving: "ease-in duration-200"
				From: "opacity-100"
				To: "opacity-0"
*/}
				<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				{/*
				Modal panel, show/hide based on modal state.

				Entering: "ease-out duration-300"
				From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				To: "opacity-100 translate-y-0 sm:scale-100"
				Leaving: "ease-in duration-200"
				From: "opacity-100 translate-y-0 sm:scale-100"
				To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			*/}
				<div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full sm:mx-0 sm:h-10 sm:w-10">
								{/* TODO: dice icon */}
								<IconDice20Simple className="fill-slate-800 w-14 h-14"/>
							</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								{label && 
									<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
										{label}
									</h3>
								}

								<div 
									className={clsx("mt-2 text-4xl font-semibold",
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
									{roll.isCriticSuccess && <div className="mt-2 text-success">SUCCESS CRITIQUE !</div>}
									{roll.isCriticFailure && <div className="mt-2 text-failure">ECHEC CRITIQUE !</div>}
								</>

								<div className="mt-3 text-sm text-meta">
									<div>
										{roll.diceRollResult.rolls.map(roll => roll.label).join(', ')}
									</div>
									<div className="mt-1">
										{roll.diceFormatted} {roll.successCheckLabel}
									</div>
								</div>

								{context && <div>{context}</div>}

							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
						<Button
							className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							variant="cta"
							onClick={() => {
								hideModal()
								onReroll && onReroll()
							}}
						>
							<IconRefresh className="w-4 h-4 mr-2 text-white" /> Relancer
						</Button>
					
						<Button
							className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								hideModal()
								showDiceHistoryScreen()
							}}
						>
							<IconD8 className="w-5 h-5 mr-2 text-gray-700" /> Historique
						</Button>

						<Button className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								hideModal()
								onValidate && onValidate()
							}}
						>
							Valider
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DiceModal