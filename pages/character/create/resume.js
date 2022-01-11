import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';
import StatsSmall from "../../../components/StatsSmall";

function CreateCharacterResume() {
	const { character, finalizeCharacter } = useCreateCharacter()
	const router = useRouter()

	return (
		<Screen
			title={"Votre personnage"}
			withBottomSpace
		>
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
						<div>{character.bonds}</div>
						<div>{character.flaws}</div>
						<div>{character.ideals}</div>
						{character.traits.map((trait, index) => (
							<p key={index}>{trait}</p>
						))}

						<StatsSmall stats={character.stats} />
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
    </Screen>
  );
}

export default CreateCharacterResume;