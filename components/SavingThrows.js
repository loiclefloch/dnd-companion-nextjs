import clsx from "clsx"
import useI18n from "../modules/i18n/useI18n"

function SavingThrow({ modifierLabel, ability, isProeficient, character }) {
	const { tr } = useI18n()

	const disadvantage = character && character?.abilityDisadvantage[ability.toLowerCase()] === true

	return (
		<div className={clsx("flex items-center", {
			"text-red-800": disadvantage
		})}>
			<div 
				className={clsx("w-2 h-2 border border-solid border-slate-600 rounded-full", {
					"bg-slate-600": isProeficient
				})} 
			/>
			<div className="ml-4 w-28">
				{tr(ability)}
			</div>
			<div className="w-8 text-right">{modifierLabel}</div>
		</div>
	)
}

function SavingThrows({ savingThrows, character }) {
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
					character={character}
				/>
			))}
		</div>
	)
}

export default SavingThrows