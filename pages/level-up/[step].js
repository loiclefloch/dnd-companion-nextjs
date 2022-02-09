import { useRouter } from 'next/router'
import Screen from "../../components/Screen"
import useCharacterLevelling from "../../components/useCharacterLevelling"
import LevellingStep from "../../components/levelling/LevellingStep"

function LevelUp() {
	const { character, } = useCharacterLevelling()

	const router = useRouter()
	const stepName = router.query.step

	return (
		<Screen
			title={`Montée au niveau ${character?.level + 1}`}
			withBottomSpace
		>
			<LevellingStep stepName={stepName} />
		</Screen>
	)
}

export default LevelUp