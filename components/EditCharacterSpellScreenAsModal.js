import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import useI18n from "../modules/i18n/useI18n";
import Button from "../components/Button";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import ScreenIntroduction from "./ScreenIntroduction"
import { 
	actionLearnSpell,
	actionPrepareSpell,
	actionRemoveSpell,
	actionUnprepareSpell,
 } from "../modules/character/useCurrentCharacter"

function LearnButton({ spell, characterDispatch, onCloseScreen }) {
	return (
		<Button
			// size="small"
			variant="outlined"
			// color="success"
			onClick={() => {
				characterDispatch(actionLearnSpell(spell))
				onCloseScreen()
			}}
		>
			Apprendre le sort
		</Button>
	)
}

function UnlearnButton({ spell, characterDispatch, onCloseScreen }) {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="error"
			onClick={() => {
				characterDispatch(actionRemoveSpell(spell))
				onCloseScreen()
			}}
		>
			Enlever des sorts connus
		</Button>
	)
}

function UnprepareButton({ spell, characterDispatch, onCloseScreen }) {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="warning"
			onClick={() => {
				characterDispatch(actionUnprepareSpell(spell))
				onCloseScreen()
			}}
		>
			Ne pas préparer
		</Button>
	)
}

function PrepareButton({ spell, characterDispatch, onCloseScreen }) {
	return (
		<Button
			// size="small"
			variant="outlined"
			color="success"
			onClick={() => {
				characterDispatch(actionPrepareSpell(spell))
				onCloseScreen()
			}}
		>
			Préparer le sort
		</Button>
	)
}

function EditCharacterSpellScreenAsModal({
	spell,
	contextCharacter,
	onCloseScreen,
	characterDispatch
}) {
	const { tr } = useI18n()

	const isContextCharacter = !!contextCharacter
	const isLearned = isContextCharacter && contextCharacter.spellsList.some(s => s.index === spell.index)
	const isPrepared = isContextCharacter && contextCharacter.spellsList.find(s => s.index === spell.index)?.isPrepared

	return (
		<ScreenAsModal title={`Sort - ${tr(spell?.nameLocalized)}`} onCloseScreen={onCloseScreen}>

			<ScreenIntroduction
				title={`Status du sort pour ${contextCharacter.name}`}
				description={
					<>
						{!isLearned && <span>Vous ne connaissez pas ce sort.</span>}
						{isLearned && !isPrepared && <span>Ce sort est connu mais n'est pas préparé.</span>}
						{isPrepared && <span>Ce sort est connu et préparé</span>}
					</>
				}
				actions={
					<div className="flex flex-col gap-2 mt-4">
						{isLearned && !isPrepared && (
							<>
								<UnlearnButton 
									spell={spell} 
									characterDispatch={characterDispatch} 
									onCloseScreen={onCloseScreen} 
								/>
								<PrepareButton 
									spell={spell} 
									characterDispatch={characterDispatch} 
									onCloseScreen={onCloseScreen} 
								/>
							</>
						)}

						{isPrepared && (
							<>
								<UnlearnButton 
									spell={spell} 
									characterDispatch={characterDispatch} 
									onCloseScreen={onCloseScreen} 
								/>
								<UnprepareButton 
									spell={spell} 
									characterDispatch={characterDispatch} 
									onCloseScreen={onCloseScreen} 
								/>
							</>
						)}

						{!isLearned && !isPrepared && (
							<LearnButton 
								spell={spell} 
								characterDispatch={characterDispatch} 
								onCloseScreen={onCloseScreen} 
							/>
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
		showEditCharacterSpellModal: (spell, contextCharacter, characterDispatch) => {
			showScreenAsModal(EditCharacterSpellScreenAsModal, { spell, contextCharacter, characterDispatch })
		}
	}
}

export default EditCharacterSpellScreenAsModal