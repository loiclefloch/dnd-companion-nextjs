import { useState } from "react"
import Link from "next/link"
import { valueToModifierLabel } from "../../../../modules/stats"
import Screen from "../../../../components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import useCreateCharacter from '../../../../components/useCreateCharacter';
import ListSelector from '../../../../components/ListSelector';
import AbilityImportanceForClass from "../../../../components/AbilityImportanceForClass";

function getBaseStats(baseStats, statsBonuses) {
	const stats = { ...baseStats }
	// add bonuses from the race, chosen previous screen
	statsBonuses.filter(bonus => bonus.type === 'race').forEach(bonus => {
		// TODO: += points or not? 
		// TODO: If not, not += since it is not points. We should calculate points to add from the bonus
		stats[bonus.ability] += bonus.bonus
	})
	return stats
}

function Form() {
	const { character, race, updateCharacter } = useCreateCharacter()
	const [chosenBonuses, setChosenBonuses] = useState((character.statsBonuses || []).filter(bonus => bonus.type === 'race-options').map(stat => stat.ability))

	const bonusOptions = race?.abilityBonusOptions || {}

	const baseStats = getBaseStats(character.baseStats, character.statsBonuses)

	return (
		<>
			<div className="px-4 mt-4">
				<p>Choisissez {bonusOptions.choose} bonus </p>


				{/* TODO: we should be able to chose multiple times the same option */}
				<ListSelector
					value={chosenBonuses}
					multiple
					nbMaxValues={bonusOptions.choose}
					options={bonusOptions.from?.map(option => {
						return ({
							label: <div className="flex">
								<div className="flex items-center w-14 align-center">
									<AbilityImportanceForClass 
										clss={character.clss} 
										ability={option.abilityScore.name} 
										className="w-2 h-2"
									/>
									<div className="ml-2">
										{option.abilityScore.name}
									</div>
								</div>
								<div className="flex ml-8">
									<div className="w-8">{baseStats[option.abilityScore.name]}</div>
									<div className="w-8 text-meta">({valueToModifierLabel(baseStats[option.abilityScore.name])})</div>
									{chosenBonuses.includes(option.abilityScore.name) && ( // only when selected
										<>
											<div className="w-6"> → </div>
											{/* TODO: + 0 on score or +1 modifier? */}
											<div className="w-8">{baseStats[option.abilityScore.name] + 1}</div>
											<div className="w-8 text-meta">({valueToModifierLabel(baseStats[option.abilityScore.name] + 1)})</div>
										</>
									)}

								</div>
							</div>,
							value: option.abilityScore.name,
							selected: chosenBonuses.includes(option.abilityScore.name)
						})
					})}
					onChange={setChosenBonuses}
				/>
			</div>

			<>
				<ButtonBottomScreen
					variant="cta"
					onClick={() => {
						// TODO: rename abilities to stats or the inverse?
						const stats = {
							...character.baseStats
						}

						const statsBonuses = [
							// filter to remove previously selected bonuses
							...character.statsBonuses.filter(bonus => bonus.type !== 'race-options'),
							...chosenBonuses.map(ability => {
								return {
									ability,
									type: 'race-options',
									bonus: 1,
								}
							})
						]
						
						// add bonuses
						statsBonuses.forEach(bonus => {
							stats[bonus.ability] += bonus.bonus
						})

						updateCharacter({ stats, statsBonuses, step: 'abilities' })
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
			title={tr('Capacités')}
		>
			<>
				<ScreenIntroduction 
					title="Vous pouvez choisir des bonus"
					description=""
					actions={
						<div className="mt-2">
							<Link href="/rules/using-ability-scores">
								{/* TODO: example: if half-elf */}
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
