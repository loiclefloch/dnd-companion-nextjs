import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";

function CreateCharacterPersonnalityTraits() {
	const { tr } = useI18n()
	const [selectedTraits, setSelectedTraits] = useState([])
	const router = useRouter()

	return (
		<Screen
			title={"Traits de personnalités"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez les traits de personnalités de votre personnage"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/personnality-traits">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<h3>Trait 1</h3>
				<textarea>
					
				</textarea>

				<h3>Trait 2</h3>
				<textarea>
					
				</textarea>

				<ButtonBottomScreen 
					variant="cta"
					onClick={() => {
						router.push('/character/create/ideals')
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterPersonnalityTraits;