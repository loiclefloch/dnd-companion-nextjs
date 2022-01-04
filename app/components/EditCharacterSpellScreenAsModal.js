import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import useI18n from "../modules/i18n/useI18n";
import Button from "../components/Button";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"

import ScreenIntroduction from "./ScreenIntroduction"

function LearnButton() {
	return (
		<Button 
		// size="small"
		variant="outlined"
		// color="success"
		onClick={() => {}}
	>
		Apprendre le sort
	</Button>
	)
}

function UnprepareButton() {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="warning"
			onClick={() => { }}
		>
			Ne pas préparer
		</Button>
	)
}

function UnlearnButton() {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="error"
			onClick={() => { }}
		>
			Enlever des sorts appris
		</Button>
	)
}

function PrepareButton() {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="success"
			onClick={() => { }}
		>
			Préparer le sort
		</Button>
	)

}

function EditCharacterSpellScreenAsModal({ spell, contextCharacter, onCloseScreen }) {
 const { tr } = useI18n()

	const isContextCharacter= !!contextCharacter
  const isLearned = isContextCharacter && contextCharacter.spellsList.some(s => s.index === spell.index)
  const isPrepared = isContextCharacter && contextCharacter.spellsList.find(s => s.index === spell.index)?.isPrepared

	return (
		<ScreenAsModal title={`Sort - ${tr(spell?.nameLocalized)}`} onCloseScreen={onCloseScreen}>

			<ScreenIntroduction 
				title={`Status du sort pour ${contextCharacter.name}`}
				description={
					<>
						{!isLearned && <span>Vous ne connaissez pas ce sort.</span>}
						{isLearned && !isPrepared && <span>Ce sort est appris mais n'est pas préparé.</span>}
						{isPrepared && <span>Ce sort est appris et préparé</span>}
					</>
				}
				actions={
					<div className="flex flex-col gap-2 mt-4">
						{isLearned && !isPrepared && (
							<>
								<UnlearnButton />
								<PrepareButton />
							</>
						)}

						{isPrepared && (
							<>
								<UnlearnButton />
								<UnprepareButton />
							</>
						)}

						{!isLearned && !isPrepared && (
							<LearnButton />
						)}
					</div>
				}
			/>

		</ScreenAsModal>
	)
}


export function useEditEditCharacterSpellScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEditCharacterSpellModal: (spell, contextCharacter) => {
			showScreenAsModal(EditCharacterSpellScreenAsModal, { spell, contextCharacter })
		}
	}
}

export default EditCharacterSpellScreenAsModal