import useI18n from '../modules/i18n/useI18n';
import Tag from './Tag';

function CharacterLevelTag({ level }) {
	const { tr } = useI18n()

	return (
		<>
			<Tag
				size="small"
				className="text-slate-600 border border-slate-600"
			>
				Niveau {level}
			</Tag>
		</>
	)
}

export default CharacterLevelTag