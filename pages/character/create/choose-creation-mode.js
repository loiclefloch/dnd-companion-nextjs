import { useState } from "react"
import { useRouter } from 'next/router'
import Button from "../../../components/Button";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n";

function CreateCharacterCreationMode() {
	const { tr } = useI18n()
	const router = useRouter()

	return (
		<Screen
			title={"Choix de la création"}
			withBottomSpace
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez le mode de création"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/ideals">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<Button
					variant="cta"
					onClick={() => {
						router.push('/character/create/choose-background')
					}}
				>
					Choisir un background
				</Button>

				<div className="my-6">--- OU ---</div>

				<Button
					variant="cta"
					onClick={() => {
						router.push('/character/create/character-details')
					}}
				>
					Personnaliser 
				</Button>
			</div>
    </Screen>
  );
}

export default CreateCharacterCreationMode;