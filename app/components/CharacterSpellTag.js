import Tag from './Tag';

function CharacterSpellTag({ character, spell }) {
  const isLearned = character && character.spellsList.some(s => s.index === spell.index)
  const isPrepared = character && character.spellsList.find(s => s.index === spell.index)?.isPrepared

	return (
	<>
		{isPrepared && (
			<Tag
				size="small"
				className="text-green-600 border border-green-600"
			>
				Préparé
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