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
 } from "../modules/character/action"

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

function UnlearnButton({ spell, characterDispatch, isSubclassSpell, onCloseScreen }) {
	if (isSubclassSpell) {
		return null
	}
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

function UnprepareButton({ spell, characterDispatch, isForcedPrepared, onCloseScreen }) {
	if (isForcedPrepared) {
		return null
	}
	return (
		<Button
			// size="small"
			variant="outlined"
			color="warning"
			disabled={isForcedPrepared}
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

	const characterSpell = contextCharacter && contextCharacter.spellsList.find(s => s.index === spell.index)

  const isLearned = isContextCharacter && !!characterSpell
  const isPrepared = isContextCharacter && characterSpell?.isPrepared
	const isSubclassSpell = isContextCharacter && characterSpell?.isSubclassSpell
	const isForcedPrepared = isContextCharacter && characterSpell?.isForcedPrepared


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
									isSubclassSpell={isSubclassSpell}
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
									isSubclassSpell={isSubclassSpell}
								/>
								<UnprepareButton 
									spell={spell} 
									characterDispatch={characterDispatch} 
									isForcedPrepared={isForcedPrepared}
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

			<div className="px-4">
				{isSubclassSpell && (
					<p className="mt-8">Ce sort est un sort de sous-classe toujours préparé.
						<br />Il ne rentre pas en compte dans le nombre maxium de sorts préparés.
					</p>
				)}

				{isForcedPrepared && !isSubclassSpell && (
					<p className="mt-8">Ce sort est toujours préparé. Il ne rentre pas en compte dans le nombre maxium de sorts préparés</p>
				)}
			</div>
		</ScreenAsModal>
	)
}


export default function useEditEditCharacterSpellScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showEditCharacterSpellModal: (spell, contextCharacter, characterDispatch) => {
			showScreenAsModal(EditCharacterSpellScreenAsModal, { spell, contextCharacter, characterDispatch })
		}
	}
}
