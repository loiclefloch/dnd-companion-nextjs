import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow";
import ScreenIntroduction from "../../../../components/ScreenIntroduction";
import Screen from "../../../../components/Screen";
import useBackgrounds from "../../../../modules/api/useBackgrounds"
import Link from "next/link"
import useI18n from "../../../../modules/i18n/useI18n";


function BackgroundRow({ background }) {
	const { tr } = useI18n()
	const router = useRouter()
	const url = `/character/create/choose-background/${background.index}`

	return (
		<ListSelectRowAsCard 
			onClick={() => router.push(url)}
			title={tr(background.nameLocalized)}
			subtitle={tr(background.resume)}
		/>
	)
}

function CreateCharacterBackground() {
	const { tr } = useI18n()
	const router = useRouter()
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
						<BackgroundRow key={background.index} background={background} />
					))}
				</ListRowSelectContainer>
			</div>
    </Screen>
  );
}

export default CreateCharacterBackground;