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

function Form({ race, updateCharacter }) {
	const { tr } = useI18n()
	const [raceSelectedLanguages, setRaceSelectedLanguages] = useState([])
	const [backgroundSelectedLanguages, setBackgroundSelectedLanguages] = useState([])
	const { showTipLanguage } = useTipLanguage()
	const router = useRouter()

	const knownLanguages = race.languages?.map(l => l.index)

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

				{race && (
					<div className="relative w-full px-4 mt-12">
						<div>
							<h3>Languages parlés</h3>
							<p>{race.language_desc}</p>
							{race.languages.map(language => (
								<div>{tr(language.name)}</div>
							))}
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
										disabled: false,
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

						<div>
							<h3>Background</h3>

							<p>TODO: explain</p>

							<ListSelector
								multiple
								nbMaxValues={4} // TODO: how many?
								value={backgroundSelectedLanguages}
								options={languages.filter(language => !knownLanguages.includes(language.index)).map(language => ({
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
					</div>
				)}

				<ButtonBottomScreen 
					variant="cta"
					onClick={() => {

						const languages = [
							...(raceSelectedLanguages || []),
							...(backgroundSelectedLanguages || []),
							...(knownLanguages || []),
						]
						updateCharacter({ languages: languages, step: 'languages' })
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
  );
}

function CreateCharacterLanguages() {
	const { character, updateCharacter } = useCreateCharacter()

	const raceResponse = useRace(character?.race)
	const race = raceResponse?.data

	return (
		<Screen
			title={"Languages parlés"}
			isLoading={raceResponse.isLoading}
			withBottomSpace
		>
			{race && (
				<Form race={race} character={character} updateCharacter={updateCharacter} />
			)}
    </Screen>
  );
}

export default CreateCharacterLanguages;
