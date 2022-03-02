import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import { makeI18n } from "../modules/i18n/useI18n";
import Button from "../components/Button";
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import ScreenIntroduction from "./ScreenIntroduction"
import { 
	actionLearnSpell,
	actionPrepareSpell,
	actionRemoveSpell,
	actionUnprepareSpell,
 } from "../modules/character/action"


const useI18n = makeI18n({
	'screen.title': {
		fr: `Sort - %{spell.name}`,
		en: `Spell - %{spell.name}`,
	},
	'learnSpell.action': {
		fr: `Apprendre le sort`,
		en: `Learn spell`,
	},
	'unlearSpell.action': {
		fr: `Enlever des sorts connus`,
		en: `Unlearn spell`,
	},
	'unprepareSpell.action': {
		fr: `Ne pas préparer`,
		en: `Unprepare`,
	},
	'prepareSpell.action': {
		fr: `Préparer le sort`,
		en: `Prepare spell`,
	},
	'isNotPrepared.explain': {
		fr: `Ce sort est connu mais n'est pas préparé.`,
		en: `This spell is learned but not prepared`,
	},
	'notIsLearned.explain': {
		fr: `Vous ne connaissez pas ce sort.`,
		en: `You do not know this spell`,
	},
	'isPrepared.explain': {
		fr: `Ce sort est connu et préparé`,
		en: `This spell is learned and prepared`,
	},
	'isSubclassSpell.explain.1': {
		fr: `Ce sort est un sort de sous-classe toujours préparé.`,
		en: `This spell is an always prepared sub-class spell`,
	},
	'isSubclassSpell.explain.2': {
		fr: `Il ne rentre pas en compte dans le nombre maxium de sorts préparés.`,
		en: `It does not count towards the maximum number of prepared spells.`,
	},
	'isForcedPreparedAndNotSubclassSpell.explain': {
		fr: `Ce sort est toujours préparé. Il ne rentre pas en compte dans le nombre maxium de sorts préparés`,
		en: `This spell is always prepared. It does not count towards the maximum number of prepared spells.`,
	},
})

function LearnButton({ spell, characterDispatch, onCloseScreen }) {
	const { tr } = useI18n()

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
			{tr`learnSpell.action`}
		</Button>
	)
}

function UnlearnButton({ spell, characterDispatch, isSubclassSpell, onCloseScreen }) {
	const { tr } = useI18n()

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
			{tr`unlearSpell.action`}
		</Button>
	)
}

function UnprepareButton({ spell, characterDispatch, isForcedPrepared, onCloseScreen }) {
	const { tr } = useI18n()

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
			{tr`unprepareSpell.action`}
		</Button>
	)
}

function PrepareButton({ spell, characterDispatch, onCloseScreen }) {
	const { tr } = useI18n()
	
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
			{tr`prepareSpell.action`}
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
		<ScreenAsModal title={tr('screen.title', { 'spell.name': tr(spell?.nameLocalized)})} onCloseScreen={onCloseScreen}>

			<ScreenIntroduction
				title={`Status du sort pour ${contextCharacter.name}`}
				description={
					<>
						{!isLearned && <span>{tr`notIsLearned.explain`}</span>}
						{isLearned && !isPrepared && <span>{tr`isNotPrepared.explain`}</span>}
						{isPrepared && <span>{tr`isPrepared.explain`}</span>}
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
					<p className="mt-8">
						{tr`isSubclassSpell.explain.1`}
						<br />
						{tr`isSubclassSpell.explain.2`}
					</p>
				)}

				{isForcedPrepared && !isSubclassSpell && (
					<p className="mt-8">{tr`isForcedPreparedAndNotSubclassSpell.explain`}</p>
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
