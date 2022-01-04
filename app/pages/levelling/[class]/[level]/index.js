
import { useRouter } from "next/router"
import LevelDetailView from "../../../../components/LevelDetailView"
import useClass from "../../../../modules/api/useClass"
import Screen from "../../../../components/Screen"
import useI18n from "../../../../modules/i18n/useI18n"
import IconBookOpen from "../../../../components/icons/IconBookOpen";
import BottomScreen from '../../../../components/BottomScreen';
import Button from '../../../../components/Button';

function LevellingClassLevel() {
	const router = useRouter()
	const { tr } = useI18n()

	const classIndex = router.query.class || 'druid'

	const classResponse = useClass(classIndex) // TODO:
	const level = parseInt(router.query.level) || 3 // TODO:

	const clss = classResponse.data

	return (
		<Screen
			title={clss && `${tr(clss.nameLocalized)} - Level ${level}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={classResponse.isLoading}
		>
			{clss && (
				<LevelDetailView clss={clss} level={level} />
			)}

			<BottomScreen>
				<Button 
					disabled={level === 1}
					variant='outlined'
					size="small"
					className="border-b-0"
					onClick={() => router.replace(`/levelling/${classIndex}/${level - 1}`)}
				>
						Level {level === 1 ? '' : level - 1}
				</Button>
				<Button
					disabled={level === 20}
					variant='outlined'
					size="small"
					className="border-b-0 border-l-0"
					onClick={() => router.replace(`/levelling/${classIndex}/${level + 1}`)}
				>
					Level {level === 20 ? '' : level + 1}
				</Button>
			</BottomScreen>
		</Screen>
	)
}

export default LevellingClassLevel