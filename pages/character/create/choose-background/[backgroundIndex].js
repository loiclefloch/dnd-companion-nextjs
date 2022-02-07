import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../../components/ButtonBottomScreen";
import BackgroundContent from "../../../../components/background/BackgroundContent";
import Screen from "../../../../components/Screen";
import useBackground from "../../../../modules/api/useBackground"
import useI18n from "../../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../../components/useCreateCharacter';

function CreateCharacterBackgroundDetail() {
	const { tr } = useI18n()
	const router = useRouter()
	const { updateCharacter } = useCreateCharacter()
	const backgroundResponse = useBackground(router.query.backgroundIndex)

	const background = backgroundResponse.data

	return (
		<Screen
			title={background ? `Background - ${background.name}` : ''}
			withBottomSpace
			isPending={backgroundResponse.isPending}
		>
			<div className="flex flex-col px-4">
				<BackgroundContent index={router.query.backgroundIndex} />
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ 
						step: 'choose-background',
						background: background.index, 
						features: background.features.map(feature => ({
							index: feature.index,
							type: 'background',
						}))
					})
				}}
			>
				Choisir
			</ButtonBottomScreen>
    </Screen>
  );
}

export default CreateCharacterBackgroundDetail;