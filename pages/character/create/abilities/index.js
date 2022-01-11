import { useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'
import { valueToModifierLabel, getAbilityScorePointCost } from "../../../../modules/stats"
import Screen from "../../../../components/Screen";
import useSubraces from '../../../../modules/api/useSubraces';
import useRace from '../../../../modules/api/useRace';
import useI18n from '../../../../modules/i18n/useI18n';
import ScreenIntroduction from '../../../../components/ScreenIntroduction';
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import useTipAbilityScore from "../../../../components/useTipAbilityScore";
import IconPlusMd from "../../../../components/icons/IconPlusMd"
import IconMinusMd from "../../../../components/icons/IconMinusMd"
import useCreateCharacter from '../../../../components/useCreateCharacter';

function IconAbilityButton({ label, onClick }) {
	return <div className="px-2 text-lg cursor-pointer" onClick={onClick}>{label}</div>
}


function Ability({ 
	ability, 
	abilities, 
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
					<span>{value}</span>
					<span> </span>
					<span className="w-10">({valueToModifierLabel(value)})</span>
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
	const [abilities, setAbilities] = useState({
		STR: 15,
		DEX: 14,
		CON: 12,
		INT: 12,
		WIS: 10,
		CHA: 8,
	})
	const { updateCharacter } = useCreateCharacter()
	const router = useRouter()

	// 2 score = 1 point
	const MAX_POINTS = 27
	const usedPoints = Object.values(abilities).reduce((total, value) => total + getAbilityScorePointCost(value), 0)
	const remainingPoints = MAX_POINTS - usedPoints

	// TODO: display for the class which abilities are important, which are not (very important, important, neutral, not important)
	return (
		<>
			<Ability ability="STR" abilities={abilities} onChange={setAbilities} />
			<Ability ability="DEX" abilities={abilities} onChange={setAbilities} />
			<Ability ability="CON" abilities={abilities} onChange={setAbilities} />
			<Ability ability="INT" abilities={abilities} onChange={setAbilities} />
			<Ability ability="WIS" abilities={abilities} onChange={setAbilities} />
			<Ability ability="CHA" abilities={abilities} onChange={setAbilities} />

			<div className="px-4 mt-8 text-center">
				Il vous reste {remainingPoints} points à répartir
			</div>

			<>
				<ButtonBottomScreen
					variant="cta"
					onClick={() => {
						const url = '/character/create/choose-creation-mode'
						router.push(url)
						// TODO: rename abilities to stats or the inverse?
						updateCharacter({ stats: abilities, step: 'choose-creation-mode', url })
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
	const router = useRouter()

	// TODO: get from state
	// const character = {
	// 	race: {
	// 		index: 'elf'
	// 	},
	// 	subrace: {
	// 		index: 'high-elf'
	// 	},
	// }

	// const subracesResponse = useSubraces(character.subrace.index)
	// const raceResponse = useRace(character.race.index)

	// const race = raceResponse.data
	// const subraces = subracesResponse.data

	// TODO: display race ability_bonuses

	return (
		<Screen	
			title={tr('Capacités')}
			// isLoading={raceResponse.isLoading || subracesResponse.isLoading}
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
