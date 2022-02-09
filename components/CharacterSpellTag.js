import Tag from './Tag';
import useTip from "./useTip"

function CharacterSpellTag({ character, spell }) {
	const { showTipSubclassSpell, showTipPreparedSpell } = useTip()

	const characterSpell = character && character.spellsList.find(s => s.index === spell.index)

  const isLearned = character && !!characterSpell
  const isPrepared = character && characterSpell.isPrepared
	const isSubclassSpell = character && characterSpell.isSubclassSpell

	return (
	<>
		{isPrepared && (
			<Tag
				size="small"
				className="text-green-600 border border-green-600"
				onClick={() => isSubclassSpell ? showTipSubclassSpell(character.subclass) : showTipPreparedSpell()}
			>
				<span>Préparé</span>
			</Tag>
		)}
		{isLearned && !isPrepared && (
			<Tag
				size="small"
				className="text-blue-600 border border-blue-600"
			>
				Appris
			</Tag>
		)}
	</>
	)
}

export default CharacterSpellTag