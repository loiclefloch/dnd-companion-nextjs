import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'
import { getAbilityScorePointCost } from "../../../../modules/stats"
import Screen from "../../../../components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import useCreateCharacter from '../../../../components/useCreateCharacter';
import Button from '../../../../components/Button';
import { isEmpty } from "lodash"
import AbilityScoreChooser from "../../../../components/AbilityScoreChooser"
import { getAbilityOptimizedExample } from "../../../../modules/character"

function getBonusFromRace(bonusFromRace) {
	const bonuses = {};

	[
		"STR",
		"DEX",
		"CON",
		"INT",
		"WIS",
		"CHA",
	].forEach(abilityScore => {
		const bonus = bonusFromRace?.find(bonus => bonus.abilityScore.name === abilityScore)?.bonus || 0
		bonuses[abilityScore] = bonus
	})

	return bonuses
}

function Form() {
	const { character, race, updateCharacter } = useCreateCharacter()
	const [abilities, setAbilities] = useState(character?.baseStats)
	const router = useRouter()

	// 2 score = 1 point
	const MAX_POINTS = 27
	const usedPoints = Object.values(abilities).reduce((total, value) => total + getAbilityScorePointCost(value), 0)
	const remainingPoints = MAX_POINTS - usedPoints

	// TODO: display for the class which abilities are important, which are not (very important, important, neutral, not important)
	return (
		<>
			<AbilityScoreChooser 
				creationMode
				clss={character.classes[0]}
				abilities={abilities}
				character={character}
				bonuses={getBonusFromRace(race?.abilityBonuses || [])}
				onChange={setAbilities}
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

						const statsBonuses = race?.abilityBonuses.map(bonus => {
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
