import clsx from "clsx"
import useI18n from "../modules/i18n/useI18n";
import useDice from "./useDice";
import useModal from "./useModal"
import useTipAbilityScore from "./useTipAbilityScore"

function Skill({ skill, character }) {
	const { tr } = useI18n()
	const { showInfoModal } = useModal()
	const { rollStat } = useDice()
	const { showTipAbilityScore } = useTipAbilityScore()

	return (
		<div
			className={
				clsx("flex flex-row justify-between py-2 items-center", {
					"text-red-700": character && character?.skillDisadvantage[skill.index] === true
				})
			}
		>
			<div
				className="flex items-center flex-1 pl-4"
				onClick={() => {
					showInfoModal({
						content: <p>{skill.description}</p>
					})
				}}
			>
				<div
					className={clsx("w-2 h-2 border border-solid border-slate-600 rounded-full", {
						"bg-slate-600": skill.isProeficient
					})}
				/>
				<div className="ml-3">
					{tr(skill.label)}
				</div>
			</div>
			<div
				className="mt-1 text-2xs text-meta w-8 text-right"
				onClick={() => showTipAbilityScore(skill.ability)}
			>
				{skill.ability}
			</div>
			<div
				className="pl-6 mr-3 w-12 text-right"
				onClick={() => rollStat(tr(skill.label), skill.value)}
			>
				{skill.modifierLabel}
			</div>
		</div>
	)
}

function StatsDetails({ skills, character }) {
	return (
		<div className="px-4 divide-y divide">
			{skills.map(skill => (
				<Skill key={skill.label} skill={skill} character={character} />
			))}
		</div>
	)
}

export default StatsDetails