import useI18n from '../modules/i18n/useI18n';
import Tag from './Tag';
import useTip from "./useTip"

// TODO: on click ask to open class or subclass
function CharacterSpellSource({ spell, character }) {
	const { tr } = useI18n()
	const { showTipSubclassSpell } = useTip()

	const characterSpell = character && character.spellsList.find(s => s.index === spell.index)
	const isSubclassSpell = character && characterSpell?.isSubclassSpell
	// const isForcedPrepared = character && characterSpell.isForcedPrepared

	return (
		<>
			{isSubclassSpell && (
				<Tag
					size="small"
					className="text-slate-600 border border-slate-600"
					onClick={() => {
						showTipSubclassSpell(character.subclass)
					}}
				>
					<span>{tr(character.subclass.nameLocalized)}</span>
				</Tag>
			)}
		</>
	)
}

export default CharacterSpellSource