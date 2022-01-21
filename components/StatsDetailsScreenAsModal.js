import clsx from "clsx"
import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
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
				clsx("flex flex-row justify-between py-2", {
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
				<div className="ml-2">
					{tr(skill.label)}
				</div>
			</div>
			<div
				className="flex flex-row items-center mt-1 text-2xs text-meta"
				onClick={() => showTipAbilityScore(skill.ability)}
			>
				{skill.ability}
			</div>
			<div
				className="px-6"
				onClick={() => rollStat(tr(skill.label), skill.value)}
			>
				{skill.modifierLabel}
			</div>
		</div>
	)
}

function StatsDetailsScreenAsModal({ skills, character, onCloseScreen }) {
	return (
		<ScreenAsModal 
			title={`Compétences`} 
			onCloseScreen={onCloseScreen}
		>
			{/* <div>Proficiency +{proficiencyBonus}</div> */}
			<div className="px-4 divide-y divide">
				{skills.map(skill => (
					<Skill key={skill.label} skill={skill} character={character} />
				))}
			</div>
		</ScreenAsModal>
	)
}

export function useStatsDetailsScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showStatsDetailsScreenModal: (skills, character) => {
			showScreenAsModal(StatsDetailsScreenAsModal, { skills, character })
		}
	}
}

export default StatsDetailsScreenAsModal