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
import IconCampFire from "../../../components/icons/IconCampFire"
import IconShield from "../../../components/icons/IconShield"
import useTip from "../../../components/useTip"

function Section({ title, children }) {
	return (
		<div className="pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">{title}</h3>
			<div>{children}</div>
		</div>
	)
}

function HpView({character, characterDispatch}) {
	const { showLifeScreenAsModal } = useLifeScreenAsModal()

	return (
		<div
			className="flex items-center justify-center h-full"
			onClick={() => showLifeScreenAsModal(character, characterDispatch)}
		>
			<div className="relative w-8 h-8 rotate-45 bg-pink-600">
				<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] left-[-50%]"></div>
				<div className="absolute w-8 h-8 bg-pink-600 rounded-[50%] top-[-50%]"></div>
			</div>
			<div className="absolute flex items-center -mt-3 text-xl font-semibold text-center text-slate-900">
				{character.currentHp}
			</div>
		</div>
	)
}

function AcView({ character }) {
	const { showTip } = useTip()

	return (
		<div
			className="relative flex items-center justify-center align-middle"
			onClick={() => {
				showTip(<div>
					<div>Natural AC: {character.ac.natural}</div>
					<div>Armor AC: {character.ac.armor}</div>
					<div>Shield AC: {character.ac.shield}</div>
					<div>Total AC: {character.ac.total}</div>
				</div>)
			}}
		>
			<IconShield className="w-14 h-14 fill-slate-700" />

			<div className="absolute text-xl font-semibold text-slate-700" style={{ marginTop: -6 }}>
				{character.ac.total}
			</div>
		</div>
	)
}

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const { currentCharacter, setCurrentCharacter, characterDispatch } = useCurrentCharacter()
	const { showTipPassivePerception } = useTip()
	const { showRestModalAsScreen } = useRestScreenAsModal()
	const characterResponse = useCharacter(router.query.characterId)

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
			withBottomSpace
			rightAction={
				// TODO: edit?
				<button onClick={() => router.push("/character/create")}>
					{/* <IconPlus className={"h-6 w-6 text-slate-800"} /> */}
				</button>
			}
		>
			{character && (
				<div className="px-4">
					<div>
						<Link href={`/race/${character.race.index}`}>
							{tr(character.race.nameLocalized)}
						</Link>
						<span> - </span>
						<Link href={`/class/${character.classes[0].index}`}>
							{character.classes.map(clss => tr(clss.nameLocalized)).join(', ')}
						</Link>
						<span> - </span>
						Niveau {character.level}
					</div>

					<div className="relative flex items-center mt-6">
						<div className="w-1/3" />
						<HpView character={character} characterDispatch={characterDispatch} />
						<div className="ml-12" />
						<AcView character={character} characterDispatch={characterDispatch} />
						<div className="absolute right-0">
							<IconCampFire className="w-10 h-10 fill-slate-700" onClick={() => showRestModalAsScreen()} />
						</div>
					</div>

					<div className="my-4 mt-6">
						<StatsSmall 
							withDetail 
							stats={character.stats} 
							skills={character.skills}
							character={character}
						/>
					</div>

					<Section title="Caractéristiques">
						<div>Proficiency: +{character.proficiencyBonus}</div>
						<div>Base Speed: {character.baseSpeed} </div>
						<div>Current speed: {character.currentSpeed} {character.speedReduced && 'Réduite'}</div>

						<div 
							className="mt-2"
							onClick={() => showTipPassivePerception()}
						>
							Perception passive: {character.passivePerception}
						</div>
					</Section>

					<div>
						Spell DC: {character.spellSaveDC}
						<br />
						Spellcasing ability: {character.spellcastingAbilityValueLabel} <span className="text-xs text-meta">{character.spellcastingAbility}</span>
						<br />
						Spell Attack bonus: {character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}
					</div>

					{/* TODO: on Modal? */}
					<Section title="Saving throws">
						<SavingThrows savingThrows={character.savingThrows} character={character} />
					</Section>

				</div>
			)}
		</Screen>
	)
}

export default Character