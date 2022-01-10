import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";

function CreateCharacterIdeals() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Idéaux"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez les idéaux votre personnage"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/ideals">
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
						router.push('/character/create/bonds')
					}}
				>
					Suivant
				</ButtonBottomScreen>
			</div>
    </Screen>
  );
}

export default CreateCharacterIdeals;