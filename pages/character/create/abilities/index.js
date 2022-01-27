import { useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'
import { valueToModifierLabel, getAbilityScorePointCost } from "../../../../modules/stats"
import Screen from "../../../../components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import useTipAbilityScore from "../../../../components/useTipAbilityScore";
import IconPlusMd from "../../../../components/icons/IconPlusMd"
import IconMinusMd from "../../../../components/icons/IconMinusMd"
import useCreateCharacter from '../../../../components/useCreateCharacter';
import Button from '../../../../components/Button';
import { isEmpty } from "lodash"
import useTip from "../../../../components/useTip"
import {
	AbilityImportance,
	getAbilityOptimizedExample,
	getImportanceForClass,
	getImportanceTip,
} from "../../../../modules/character"


function IconAbilityButton({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}

function Ability({
	ability,
	abilities,
	bonus,
	importance,
	onChange
}) {
	const { tr } = useI18n()
	const { showTipAbilityScore } = useTipAbilityScore()
	const { showTip } = useTip()
	const value = abilities[ability]

	return (
		<div className="flex flex-row items-center justify-center my-4">
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
					{bonus > 0 && (
						<div
							className="text-sm text-center text-meta"
						// TODO: tip
						>
							+{bonus}
						</div>
					)}
				</div>
				<IconAbilityButton
					size="big"
					label={<IconPlusMd className="w-8 h-8" />}
					onClick={() => onChange({
						...abilities,
						[ability]: Math.min(value + 1, 15)
					})}
				/>
			</div>
		</div>
	)
}

function Form() {
	const { character, race, updateCharacter } = useCreateCharacter()
	const [abilities, setAbilities] = useState(character?.baseStats)
	const router = useRouter()

	const bonusFromRace = race?.abilityBonuses || []

	// 2 score = 1 point
	const MAX_POINTS = 27
	const usedPoints = Object.values(abilities).reduce((total, value) => total + getAbilityScorePointCost(value), 0)
	const remainingPoints = MAX_POINTS - usedPoints


	const importanceForClass = getImportanceForClass(character.classes[0])

	// TODO: display for the class which abilities are important, which are not (very important, important, neutral, not important)
	return (
		<>
			<Ability
				ability="STR"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "STR")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.STR}
			/>
			<Ability
				ability="DEX"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "DEX")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.DEX}
			/>
			<Ability
				ability="CON"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "CON")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.CON}
			/>
			<Ability
				ability="INT"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "INT")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.INT}
			/>
			<Ability
				ability="WIS"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "WIS")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.WIS}
			/>
			<Ability
				ability="CHA"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.abilityScore.name === "CHA")?.bonus || 0}
				onChange={setAbilities}
				importance={importanceForClass?.CHA}
			/>

			<div className="px-4 mt-8 text-center">
				Il vous reste {remainingPoints} points à répartir
			</div>

			<div className="px-4">
				<Button
					className="mt-2"
					size="small"
					variant="outlined"
					onClick={() => {
						const abilityOptimized = getAbilityOptimizedExample(character.classes[0])
						if (abilityOptimized) {
							setAbilities(abilityOptimized)
						} else {
							alert('Not created yet for class ' + character.classes[0])
						}
					}}
				>
					{/* TODO: TIP -> valeurs optimisées mais le RP dans tout ca ? */}
					Utiliser les valeurs recommandées
				</Button>
			</div>

			<>
				<ButtonBottomScreen
					variant="cta"
					onClick={() => {
						// TODO: rename abilities to stats or the inverse?
						const stats = {
							...abilities
						}

						const statsBonuses = bonusFromRace.map(bonus => {
							return {
								ability: bonus.abilityScore.name,
								type: 'race',
								bonus: bonus.bonus,
							}
						})

						
						// add bonuses
						statsBonuses.forEach(bonus => {
							stats[bonus.ability] += bonus.bonus
						})

						const abilityBonusOptions = race?.abilityBonusOptions || []
						if (!isEmpty(abilityBonusOptions)) {
							// half-elf race
							// do not update step yet
							updateCharacter({ stats: stats, baseStats: abilities, statsBonuses })
							router.push("/character/create/abilities/choose-options")
						} else {
							updateCharacter({ stats: stats, baseStats: abilities, statsBonuses, step: 'abilities' })
						}
					}}
				>
					Valider
				</ButtonBottomScreen>
			</>
		</>
	)
}

function AbilitiesScreen() {
	const { tr } = useI18n()

	return (
		<Screen	
			title={tr('Capacités - bonus')}
		>
			<>
				<ScreenIntroduction 
					title="Définition des Capacités"
					description="Votre personnage compte sur six abilités. Vous avez 27 points à répartir, todo..."
					actions={
						<div className="mt-2">
							<Link href="/rules/using-ability-scores">
								En savoir plus
							</Link>
						</div>
					}
				/>
			</>

			<Form />

		</Screen>
  );
}

export default AbilitiesScreen;
