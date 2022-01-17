import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';
import StatsSmall from "../../../components/StatsSmall";

function Section({ title, children }) {
	return (
		<div className="pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">{title}</h3>
			<div>{children}</div>
		</div>
	)
}

function CreateCharacterResume() {
	const { character, finalizeCharacter } = useCreateCharacter()
	const router = useRouter()

	return (
		<Screen
			title={"Votre personnage"}
			withBottomSpace
		>
			{character && (
				<div className="flex flex-col">
					<ScreenIntroduction
						title="Résumé de votre personnage"
						description={`Donnez à votre personnage ...`}
						actions={
							<div className="mt-2">
								<Link href="/rules/create-character-equipment">
									En savoir plus
								</Link>
							</div>
						}
					/>

					<div className="px-4 mt-4">
						<h3>{character.name}</h3>
						<div>
							<div>{character.race}</div>
							<div>{character.classes.join(', ')}</div>

							<div className="mt-4">
								<Section title="">
									<div>HP: {character.maximumHp}</div>
									<div>DC: </div>
									<div>Hit dices: {character.maximumHitDice}</div>
									<div>Proficiency {character.proficiencyBonus}</div>
									</Section>
								<Section title="Physic">
									<div>TODO: body.age</div>
									<div>TODO: body.sex</div>
									<div>TODO: body.height</div>
									<div>TODO: body.weight</div>
									<div>TODO: body.hairColor</div>
									<div>TODO: body.eyeColor</div>
									<div>TODO: body.skinColor</div>
									<div>TODO: body.physicalCaracteristics</div>
								</Section>

								<Section title="IDEALS">
									<div>{character.ideals}</div>
								</Section>
								<Section title="FLAWS">
									<div>{character.flaws}</div>
								</Section>
								<Section title="BONDS">
									<div>{character.bonds}</div>
								</Section>

								<Section title="PERSONNALITY TRAITS">
									{character.traits.map((trait, index) => (
										<p key={index}>{trait}</p>
									))}
								</Section>
								<Section title="LANGUAGES">
									{character.languages?.map((language, index) => (
										<p key={index}>{language}</p>
									))}
								</Section>
							</div>

							<StatsSmall 
								withDetail
								stats={character.stats}
								skills={character.skills}
							/>
						</div>

						<div>
				// TODO: if need to choose spells add a tip to how choose them
						</div>
					</div>

					<ButtonBottomScreen
						variant="cta"
						onClick={() => {
							finalizeCharacter()
						}}
					>
						Terminer la création
					</ButtonBottomScreen>
				</div>
			)}
    </Screen>
  );
}

export default CreateCharacterResume;