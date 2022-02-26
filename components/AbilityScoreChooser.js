
import clsx from "clsx"
import useTipAbilityScore from "./useTipAbilityScore";
import useTip from "./useTip"
import IconPlusMd from "./icons/IconPlusMd"
import IconMinusMd from "./icons/IconMinusMd"
import { valueToModifierLabel } from "../modules/stats"
import {
	AbilityImportance,
	getImportanceForClass,
	getImportanceTip,
} from "../modules/character"
import { makeI18n } from '../modules/i18n/useI18n';

const useI18n = makeI18n({

})

function IconAbilityButton({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}

function Ability({
	creationMode,
	ability,
	abilities,
	bonus,
	importance,
	diffAmount,
	onChange
}) {
	const { tr } = useI18n()
	const { showTipAbilityScore } = useTipAbilityScore()
	const { showTip } = useTip()
	const value = abilities[ability]

	return (
		<div className="flex flex-row items-center justify-center my-4 select-none">
			<div
				className="w-20"
			>
				<div className="flex items-center align-center">
					<div
						className={clsx("w-2 h-2", {
							"bg-blue-400": importance === AbilityImportance.FANTASTIC,
							"bg-green-400": importance === AbilityImportance.GOOD,
							"bg-yellow-400": importance === AbilityImportance.OK,
							"bg-red-400": importance === AbilityImportance.BAD,
						})}
						onClick={() => {
							showTip(getImportanceTip(importance))
						}}
					/>
					<div
						className="ml-2"
						onClick={() => showTipAbilityScore(ability)}
					>
						{ability}
					</div>
				</div>
				<div
					onClick={() => showTipAbilityScore(ability)}
				>
					{tr(ability)}
				</div>
				<div>

				</div>
			</div>
			<div className="flex flex-row ml-4">
				<IconAbilityButton
					size="big"
					label={<IconMinusMd className="w-8 h-8" />}
					onClick={() => onChange({
						...abilities,
						[ability]: Math.max(value - 1, 8)
					})}
				/>
				<div className={clsx("text-xl px-4 w-24 text-right")}>
					<span>{value + bonus}</span>
					<span> </span>
					<span className="w-10">({valueToModifierLabel(value)})</span>

					<div className="text-sm text-center text-meta">
						{diffAmount !== 0 && (
							<span>
								{diffAmount >= 0 ? '+' : '-'}{diffAmount}
							</span>
						)}
						{bonus > 0 && (
							<span
							>
								+{bonus}
							</span>
						)}
						{/* To avoid weird affect when one of the condition pass from false to true */}
						&nbsp; 
					</div>
				</div>
				<IconAbilityButton
					size="big"
					label={<IconPlusMd className="w-8 h-8" />}
					onClick={() => onChange({
						...abilities,
						[ability]: Math.min(value + 1, creationMode ? 15 : value + 1)
					})}
				/>
			</div>
		</div>
	)
}

function AbilityScoreChooser({
	clss,
	abilities,
	bonuses,
	scoreDiff = {},
	creationMode,
	onChange,
}) {
	const importanceForClass = getImportanceForClass(clss)

	return (
		<>
		{[
				"STR",
				"DEX",
				"CON",
				"INT",
				"WIS",
				"CHA",
			].map(ability => (
				<Ability
					key={ability}
					ability={ability}
					abilities={abilities}
					bonus={bonuses && bonuses[ability] || 0}
					onChange={onChange}
					importance={importanceForClass ? importanceForClass[ability] : null}
					creationMode={creationMode}
					diffAmount={scoreDiff[ability] || 0}
				/>
			))}
		</>
	)
}

export default AbilityScoreChooser