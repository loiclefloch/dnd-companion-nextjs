import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"

function Character() {
	const router = useRouter()
	const characterResponse = useCharacter(router.query.characterId)

	const character = characterResponse.data

	return (
		<Screen
			title={character?.name}
			// titleIcon={<IconUsers className="w-6 h-6" />}
			isLoading={characterResponse.isLoading}
			rightAction={
				// TODO: edit?
				<button onClick={() => router.push("/character/create")}>
					{/* <IconPlus className={"h-6 w-6 text-slate-800"} /> */}
				</button>
			}
		>
			{character && (
				<>
					<div className="px-4 my-4">
					<StatsSmall stats={character?.stats} />
					</div>
				</>
			)}
		</Screen>
	)
}

export default Character