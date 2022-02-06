import { useRouter } from 'next/router'
import Screen from "../../components/Screen"
import useCharacterLevelling from "../../components/useCharacterLevelling"
import LevellingStep from "../../components/levelling/LevellingStep"

function LevelUp() {
	const { character, } = useCharacterLevelling()

	const router = useRouter()
	const stepName = router.query.step || 'introduction'

	return (
		<Screen
			title={`${character?.name} - Montée de niveau`}
			withBottomSpace
		>
			<LevellingStep stepName={stepName} />
		</Screen>
	)
}

export default LevelUp