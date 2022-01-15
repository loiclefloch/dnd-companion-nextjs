import { useState } from "react"
import clsx from 'clsx'
import Link from "next/link"
import { valueToModifierLabel, getAbilityScorePointCost } from "../../../../modules/stats"
import Screen from "../../../../components/Screen";
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import useCreateCharacter from '../../../../components/useCreateCharacter';
import ListSelector from '../../../../components/ListSelector';
import {
	AbilityImportance,
	getImportanceForClass,
	getImportanceTip,
} from "../../../../modules/character/utils"
import useTip from "../../../../components/useTip"

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
	const { showTip } = useTip()

	const bonusOptions = race?.ability_bonus_options || {}

	const baseStats = getBaseStats(character.baseStats, character.statsBonuses)

	const importanceForClass = getImportanceForClass(character.classes[0])

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
						const importance = importanceForClass && importanceForClass[option.ability_score.name]
						return ({
							label: <div className="flex">
								<div className="flex items-center w-14 align-center">
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
									<div className="ml-2">
										{option.ability_score.name}
									</div>
								</div>
								<div className="flex ml-8">
									<div className="w-8">{baseStats[option.ability_score.name]}</div>
									<div className="w-8 text-meta">({valueToModifierLabel(baseStats[option.ability_score.name])})</div>
									{chosenBonuses.includes(option.ability_score.name) && ( // only when selected
										<>
											<div className="w-6"> → </div>
											{/* TODO: + 0 on score or +1 modifier? */}
											<div className="w-8">{baseStats[option.ability_score.name] + 1}</div>
											<div className="w-8 text-meta">({valueToModifierLabel(baseStats[option.ability_score.name] + 1)})</div>
										</>
									)}

								</div>
							</div>,
							value: option.ability_score.name,
							selected: chosenBonuses.includes(option.ability_score.name)
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
