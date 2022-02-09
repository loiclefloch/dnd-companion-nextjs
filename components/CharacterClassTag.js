import useI18n from '../modules/i18n/useI18n';
import Tag from './Tag';

// TODO: on click ask to open class or subclass
function CharacterClassTag({ character }) {
	const { tr } = useI18n()

	const clss = character.classes[0]
	const subclass = character.subclass
	
	return (
		<>
			<Tag
				size="small"
				className="text-slate-600 border border-slate-600"
			>
				<span>{tr(clss.nameLocalized)}</span>
				{subclass && (
					<span> - {tr(subclass.nameLocalized)}</span>
				)}
			</Tag>
		</>
	)
}

export default CharacterClassTag