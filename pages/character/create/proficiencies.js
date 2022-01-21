import { useState } from "react"
import { groupBy, map, uniqBy } from "lodash";
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import ListSelector from "../../../components/ListSelector";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';
import useTipProficiency from "../../../components/useTipProficiency"
import { formatProficiency } from "../../../modules/api/useProficiency"

function Proficiency({ proficiency }) {
	const { tr } = useI18n()
	const { showTipProficiency } = useTipProficiency()

	return (
		<div
			key={proficiency.name}
			className="flex px-4 py-1"
		>
			<div className="flex items-center flex-1">
				{proficiency.name} <span className="ml-2 text-sm text-meta">({proficiency.sourceType})</span>
			</div>
			{proficiency.isSkill && (
				<div
					onClick={() => showTipProficiency(proficiency)}
				>
					?
				</div>
			)}
		</div>
	)
}

function ChooseRaceProficiency({ 
	selectedRaceProficiencies,
	setSelectedRaceProficiencies,
	race
}) {
	const { showTipProficiency } = useTipProficiency()

	const options = race.starting_proficiency_options
	if (!options) {
		return null
	}

	return (
		<div>
			<h3>Choisissez</h3>
			<div>
				<ListSelector
					multiple
					nbMaxValues={options.choose}
					value={selectedRaceProficiencies}
					onChange={setSelectedRaceProficiencies}
					options={options?.from.map(proficiency => ({
						label: proficiency.name,
						value: proficiency,
						selected: selectedRaceProficiencies.includes(proficiency),
						// disabled: raceSelectedLanguages.includes(proficiency.index),
						rightView: (
							<div
								className="px-4 py-2 text-xs text-meta"
								onClick={() => showTipProficiency(proficiency)}
							>
								?
							</div>
						)
					}))}
				/>
			</div>
		</div>
	)
}

function Form({ race, background, clss, updateCharacter }) {
	const { tr } = useI18n()
	const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState([])

	const allProficiencies = uniqBy([
		...race.starting_proficiencies.map(p => ({
			...p,
			sourceType: 'race',
		})),
		...background.startingProficiencies.map(p => ({
			...p,
			sourceType: 'background',
		})),
		...clss.proficiencies.map(p => ({
			...p,
			sourceType: 'class',
		}))
	], p => p.index).map(formatProficiency)

	const grouped = groupBy(allProficiencies, item => item.typeLabel)

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les maîtrises"
				description={`Votre personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/proficiencies">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<div className="px-4 prose">
				<div>
					<ChooseRaceProficiency 
						selectedRaceProficiencies={selectedRaceProficiencies}
						setSelectedRaceProficiencies={setSelectedRaceProficiencies}
						race={race} 
					/>
				</div>

				<div>
					{map(grouped, (list, groupName) => (
						<div 
							key={groupName}
						>
							<h4>{groupName}</h4>
							<div className="divide-y divide">
								{list.map(proficiency => (
									<Proficiency
										key={proficiency.index}
										proficiency={proficiency}
									/>
								))}
							</div>
						</div>
					))}
				
				</div>
			
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const proficiencies = [
						...allProficiencies,
						...selectedRaceProficiencies,
					].map(proficiency => ({
						index: proficiency.index,
						sourceType: proficiency.sourceType
					}))
					updateCharacter({ proficiencies, step: 'proficiencies' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterProficiencies() {
	const { background, race, clss, character, updateCharacter } = useCreateCharacter()

	return (
		<Screen
			title={"Maîtrises"}
			withBottomSpace
		>
			{race && background && clss && (
				<Form
					race={race}
					clss={clss}
					character={character}
					background={background}
					updateCharacter={updateCharacter}
					backgroundLanguagesOptions={background.languageOptions}
				/>
			)}
		</Screen>
	);
}

export default CreateCharacterProficiencies;
