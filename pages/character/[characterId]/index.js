import { useEffect } from "react"
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"
import useTipAlignment from "../../../components/useTipAlignment"
import Button from "../../../components/Button"
import { useRestScreenAsModal } from "../../../components/RestScreenAsModal"
import { useLifeScreenAsModal } from "../../../components/LifeScreenAsModal"
import useCurrentCharacter from "../../../modules/character/useCurrentCharacter"
import SavingThrows from "../../../components/SavingThrows"

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const { currentCharacter, setCurrentCharacter, characterDispatch } = useCurrentCharacter()
	const { showTipAlignment } = useTipAlignment()
	const { showRestModalAsScreen } = useRestScreenAsModal()
	const characterResponse = useCharacter(router.query.characterId)
	const { showLifeScreenAsModal } = useLifeScreenAsModal()

	const character = characterResponse.data

	useEffect(() => {
		if (character && (!currentCharacter || character?.id !== currentCharacter?.id)) {
			setCurrentCharacter(character.id)
		}
	}, [character])

	return (
		<Screen
			title={character?.name}
			// titleIcon={<IconUsers className="w-6 h-6" />}
			isLoading={characterResponse.isLoading}
			withCharacterMenu
			rightAction={
				// TODO: edit?
				<button onClick={() => router.push("/character/create")}>
					{/* <IconPlus className={"h-6 w-6 text-slate-800"} /> */}
				</button>
			}
		>
			{character && (
				<>
					<div className="px-4">
						<Link href={`/race/${character.race.index}`}>
							{tr(character.race.nameLocalized)}
						</Link>
						<span> - </span>
						<Link href={`/class/${character.classes[0].index}`}>
							{character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
						</Link>
					</div>
					<div className="px-4 my-4">
						<StatsSmall 
							withDetail 
							stats={character.stats} 
							skills={character.skills}
						/>
					</div>
					

					<div>
						<Button onClick={() => showRestModalAsScreen()}>Se reposer</Button>
					</div>

					<div>
						{/* TODO: */}
						DC: {character.DC}
						<br />
						15 Sagess perception passive // TODO
					</div>

					<div>
						Spell DC: {character.spellSaveDC}
						<br />
						Spellcasing ability: {character.spellcastingAbilityValueLabel} <span className="text-xs text-meta">{character.spellcastingAbility}</span>
						<br />
						Spell Attack bonus: {character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}
					</div>

					<div>
						Saving throws

						<SavingThrows savingThrows={character.savingThrows} />
					</div>
					<div>

						<div 
							className="flex items-center justify-center h-full"
							onClick={() => showLifeScreenAsModal(character, characterDispatch)}
						>
							<div className="relative w-8 h-8 rotate-45 bg-pink-600">
								<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] left-[-50%]"></div>
								<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] top-[-50%]"></div>
							</div>
							<div className="absolute flex items-center -mt-3 text-2xl font-semibold text-center text-slate-900">
								{character.currentHp}
							</div>
						</div>

					</div>
				</>
			)}
		</Screen>
	)
}

export default Character