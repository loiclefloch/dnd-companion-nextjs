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
import { isEmpty } from "lodash"

function IconAbilityButton({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}


function Ability({ 
	ability, 
	abilities, 
	bonus,
	onChange
}) {
	const { tr } = useI18n()
	const { showTipAbilityScore } = useTipAbilityScore()
	const value = abilities[ability]

	return (
		<div className="flex flex-row items-center justify-center my-4">
			<div 
				className="w-20"
				onClick={() => showTipAbilityScore(ability)}
			>
				{ability}
				<div>{tr(ability)}</div>
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

	const bonusFromRace = race?.ability_bonuses || []

	// TODO: ability_bonus_options

	// 2 score = 1 point
	const MAX_POINTS = 27
	const usedPoints = Object.values(abilities).reduce((total, value) => total + getAbilityScorePointCost(value), 0)
	const remainingPoints = MAX_POINTS - usedPoints

	// TODO: display for the class which abilities are important, which are not (very important, important, neutral, not important)
	return (
		<>
			<Ability 
				ability="STR" 
				abilities={abilities} 
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "STR")?.bonus || 0} 
				onChange={setAbilities} 
			/>
			<Ability
				ability="DEX"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "DEX")?.bonus || 0}
				onChange={setAbilities}
			/>
			<Ability
				ability="CON"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "CON")?.bonus || 0}
				onChange={setAbilities}
			/>
			<Ability
				ability="INT"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "INT")?.bonus || 0}
				onChange={setAbilities}
			/>
			<Ability
				ability="WIS"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "WIS")?.bonus || 0}
				onChange={setAbilities}
			/>
			<Ability
				ability="CHA"
				abilities={abilities}
				bonus={bonusFromRace.find(bonus => bonus.ability_score.name === "CHA")?.bonus || 0}
				onChange={setAbilities}
			/>

			<div className="px-4 mt-8 text-center">
				Il vous reste {remainingPoints} points à répartir
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
								ability: bonus.ability_score.name,
								type: 'race',
								bonus: bonus.bonus,
							}
						})

						
						// add bonuses
						statsBonuses.forEach(bonus => {
							stats[bonus.ability] += bonus.bonus
						})

						const abilityBonusOptions = race?.ability_bonus_options || []
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
