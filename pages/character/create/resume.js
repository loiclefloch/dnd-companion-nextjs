import Link from "next/link"
import Screen from "../../../components/Screen";
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import useCreateCharacter from '../../../components/useCreateCharacter';
import CharacterResume from '../../../components/CharacterResume';

function CreateCharacterResume() {
	const { getBuildedCharacter, finalizeCharacter } = useCreateCharacter()

	const character = getBuildedCharacter()

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
								<Link href="">
									En savoir plus
								</Link>
							</div>
						}
					/>

					<CharacterResume character={character} />

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