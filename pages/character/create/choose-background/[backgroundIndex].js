import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import { ListSelectRowAsCard, ListRowSelectContainer } from "../../../../components/ListSelectRow";
import ScreenIntroduction from "../../../../components/ScreenIntroduction";
import Screen from "../../../../components/Screen";
import useBackground from "../../../../modules/api/useBackground"
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
	const backgroundResponse = useBackground(router.query.backgroundIndex)

	return (
		<Screen
			title={"Background"}
			withBottomSpace
			isPending={backgroundResponse.isPending}
		>
			<div className="flex flex-col">
				{/* TODO: */}
			</div>
    </Screen>
  );
}

export default CreateCharacterBackground;