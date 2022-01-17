import clsx from "clsx"
import useI18n from "../modules/i18n/useI18n"

function SavingThrow({ modifierLabel, ability, isProeficient }) {
	const { tr } = useI18n()

	return (
		<div className="flex items-center">
			<div 
				className={clsx("w-2 h-2 border border-solid border-slate-600 rounded-full", {
					"bg-slate-600": isProeficient
				})} 
			/>
			<div className="ml-1">
				{tr(ability)}
			</div>
			<div className="ml-3">{modifierLabel}</div>
		</div>
	)
}

function SavingThrows({ savingThrows }) {

	return (
		<div>
			{[
				"STR",
				"DEX",
				"CON",
				"INT",
				"WIS",
				"CHA",
			].map(ability => (
				<SavingThrow 
					key={ability} 
					ability={ability}
					modifierLabel={savingThrows[ability].modifierLabel} 
					isProeficient={savingThrows[ability].isProeficient} 
				/>
			))}
		</div>
	)
}

export default SavingThrows