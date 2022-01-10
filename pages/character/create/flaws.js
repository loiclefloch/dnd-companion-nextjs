import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";

function CreateCharacterFlaws() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Imperfections"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez les imperfections de votre personnage"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/flaws">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<textarea>
					
				</textarea>

				<ButtonBottomScreen 
					variant="cta"
					onClick={() => {
						router.push('/character/create/equipment')
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterFlaws;