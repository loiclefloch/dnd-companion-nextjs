import Link from 'next/link';
import useI18n from '../modules/i18n/useI18n';
import Tag from './Tag';

function CharacterRaceTag({ race }) {
	const { tr } = useI18n()

	return (
		<>
			<Tag
				size="small"
				className="text-slate-600 border border-slate-600"
			>
				<Link href={`/race/${race.index}`}>
					{tr(race.nameLocalized)}
				</Link>
			</Tag>
		</>
	)
}

export default CharacterRaceTag