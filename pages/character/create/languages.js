import { useState } from "react"
import clsx from "clsx"
import { useRouter } from 'next/router'
// TODO: add exotic languages?
import languages from "../../../database/data/languages.json"
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import ListSelector from "../../../components/ListSelector";
import Screen from "../../../components/Screen";
import useRace from '../../../modules/api/useRace';
import Link from "next/link"
import useTipLanguage from "../../../components/useTipLanguage";
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';
import { arrayHasDuplicates } from "../../../modules/utils/array"

function Form({ race, backgroundLanguagesOptions, updateCharacter }) {
	const { tr } = useI18n()
	const [raceSelectedLanguages, setRaceSelectedLanguages] = useState([])
	const [backgroundSelectedLanguages, setBackgroundSelectedLanguages] = useState([])
	const { showTipLanguage } = useTipLanguage()

	const knownLanguages = race.languages?.map(l => l.index)

	const languages = [
		...(raceSelectedLanguages || []),
		...(backgroundSelectedLanguages || []),
		...(knownLanguages || []),
	]

	const hasDupliacatesLanguages = arrayHasDuplicates(languages, l => l)
	const isValid = !hasDupliacatesLanguages

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les langues parlées"
				description={`Votre personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/languages">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<div className="px-4 prose">
				{race && (
					<div className="relative w-full mt-12">
						<div>
							<h3>Languages parlés</h3>
							{race.language_desc && <p>{race.language_desc}</p>}
							
							<ul className="list-disc">
								{race.languages.map(language => (
									<li onClick={() => showTipLanguage(language.index)}>{tr(language.name)}</li>
								))}
							</ul>
						</div>

						{race.language_options && (
							<div>
								<h3>Options supplémentaires ({race.language_options.choose ?? 1} choix)</h3>

								<ListSelector
									multiple
									nbMaxValues={race.language_options.choose ?? 1}
									value={raceSelectedLanguages}
									options={race.language_options.from.filter(language => !knownLanguages.includes(language.index)).map(language => ({
										label: language.name,
										value: language.index,
										selected: raceSelectedLanguages.includes(language.index),
										disabled: backgroundSelectedLanguages.includes(language.index),
										rightView: (
											<div
												className="px-4 py-2 text-xs text-meta"
												onClick={() => showTipLanguage(language.index)}
											>
												?
											</div>
										)
									}))}
									onChange={setRaceSelectedLanguages}
								/>
							</div>
						)}
					</div>
				)}

				{backgroundLanguagesOptions && (
					<div>
						<h3>Background</h3>

						<p>Votre background vous donne accès à {backgroundLanguagesOptions.choose} languages supplémentaires</p>

						<ListSelector
							multiple
							nbMaxValues={backgroundLanguagesOptions.choose}
							value={backgroundSelectedLanguages}
							options={backgroundLanguagesOptions.from.filter(language => !knownLanguages.includes(language.index)).map(language => ({
								label: language.name,
								value: language.index,
								selected: backgroundSelectedLanguages.includes(language.index),
								disabled: raceSelectedLanguages.includes(language.index),
								rightView: (
									<div
										className="px-4 py-2 text-xs text-meta"
										onClick={() => showTipLanguage(language.index)}
									>
										?
									</div>
								)
							}))}
							onChange={setBackgroundSelectedLanguages}
						/>
					</div>
				)}
			</div>

				<ButtonBottomScreen 
					variant="cta"
					hide={!isValid}
					onClick={() => {
						updateCharacter({ languages: languages, step: 'languages' })
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
  );
}

function CreateCharacterLanguages() {
	const { background, race, character, updateCharacter } = useCreateCharacter()

	return (
		<Screen
			title={"Languages parlés"}
			withBottomSpace
		>
			{race && (
				<Form 
					race={race}
					character={character} 
					updateCharacter={updateCharacter} 
					backgroundLanguagesOptions={background.languageOptions}
				/>
			)}
    </Screen>
  );
}

export default CreateCharacterLanguages;
