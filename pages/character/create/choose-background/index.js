import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow";
import ScreenIntroduction from "../../../../components/ScreenIntroduction";
import Screen from "../../../../components/Screen";
import useBackgrounds from "../../../../modules/api/useBackgrounds"
import Link from "next/link"
import useI18n from "../../../../modules/i18n/useI18n";
import useCreateCharacter from "../../../../components/useCreateCharacter";


function BackgroundRow({ background, clss }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-background/${background.index}`
	
	const isGoodForClass = background.goodForClasses && background.goodForClasses.some(c => c.index === clss)

	return (
		<ListSelectRowAsCard 
			onClick={() => router.push(url)}
			title={<div>
				{tr(background.nameLocalized)}
				{isGoodForClass && (<span className="text-meta text-xs ml-2 text-blue-400">Recommandé</span>)}
			</div>}
			subtitle={tr(background.resume)}
		/>
	)
}

function CreateCharacterBackground() {
	const { character } = useCreateCharacter()
	const backgroundsResponse = useBackgrounds()

	return (
		<Screen
			title={"Background"}
			withBottomSpace
			isPending={backgroundsResponse.isPending}
		>
			<div className="flex flex-col">
				<ScreenIntroduction
					title="Choisissez le background de votre personnage"
					description={`Donnez à votre personnage personnage ...`}
					actions={
						<div className="mt-2">
							<Link href="/rules/background">
								En savoir plus
							</Link>
						</div>
					}
				/>

				<ListRowSelectContainer className="px-4 mt-6">
					{backgroundsResponse.data?.map(background => (
						<BackgroundRow key={background.index} background={background} clss={character.classes[0]} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default CreateCharacterBackground;