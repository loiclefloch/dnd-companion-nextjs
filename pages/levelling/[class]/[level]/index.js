
import { useRouter } from "next/router"
import LevelDetailView from "../../../../components/LevelDetailView"
import useClass from "../../../../modules/api/useClass"
import Screen from "../../../../components/Screen"
import useI18n from "../../../../modules/i18n/useI18n"
import IconBookOpen from "../../../../components/icons/IconBookOpen";
import BottomScreen from '../../../../components/BottomScreen';
import Button from '../../../../components/Button';
import IconChevronRight from "../../../../components/icons/IconChevronRight"
import IconChevronLeft from "../../../../components/icons/IconChevronLeft"

function LevellingClassLevel() {
	const router = useRouter()
	const { tr } = useI18n()

	const classIndex = router.query.class || 'druid'

	const classResponse = useClass(classIndex) // TODO:
	const level = parseInt(router.query.level) || 3 // TODO:

	const clss = classResponse.data

	return (
		<Screen
			title={clss && `${tr(clss.nameLocalized)} - Niveau ${level}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={classResponse.isLoading}
		>
			{clss && (
				<LevelDetailView clss={clss} level={level} />
			)}

			<BottomScreen>
				<Button 
					disabled={level === 1}
					variant='cta'
					size="small"
					className="flex items-center justify-between pr-6 text-xs border-b-0 border-l-0 border-r-0 border-l-white"
					onClick={() => router.replace(`/levelling/${classIndex}/${level - 1}`)}
				>
					{level !== 1 && (
						<>
							<span>
								<IconChevronLeft />
							</span>
							<span>
								Level {level - 1}
							</span>
						</>
					)}
				</Button>
				<Button
					disabled={level === 20}
					variant='cta'
					size="small"
					className="flex items-center justify-between pl-6 text-xs border-b-0 border-r-0 border-l-white"
					onClick={() => router.replace(`/levelling/${classIndex}/${level + 1}`)}
				>
					{level !== 20 && (
						<>
							<span>
								Level {level + 1}
							</span>
							<span>
								<IconChevronRight />
							</span>
						</>
					)}
				</Button>
			</BottomScreen>
		</Screen>
	)
}

export default LevellingClassLevel