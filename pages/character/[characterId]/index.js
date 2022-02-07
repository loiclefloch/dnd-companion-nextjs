import { useEffect } from "react"
import Link from "next/link"
import useI18n from "../../../modules/i18n/useI18n"
import useCharacter from "../../../modules/api/useCharacter"
import StatsSmall from "../../../components/StatsSmall"
import { useRouter } from "next/router"
import Screen from "../../../components/Screen"
import { useRestScreenAsModal } from "../../../components/RestScreenAsModal"
import { useLifeScreenAsModal } from "../../../components/LifeScreenAsModal"
import { useAcScreenAsModal } from "../../../components/AcScreenAsModal"
import useCurrentCharacter from "../../../components/useCurrentCharacter"
import IconCampFire from "../../../components/icons/IconCampFire"
import IconShield from "../../../components/icons/IconShield"
import useTip from "../../../components/useTip"
import {
	TraitsSection,
	ProficienciesSection,
	BackgroundSection,
} from "../../../components/CharacterResume"
import Section from "../../../components/Section"
import LineInfo from "../../../components/LineInfo"

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
	const { showAcScreenAsModal } = useAcScreenAsModal()

	return (
		<div
			className="relative flex items-center justify-center align-middle"
			onClick={() => showAcScreenAsModal(character)}
		>
			<IconShield className="w-14 h-14 fill-slate-700" />

			<div className="absolute text-xl font-semibold text-slate-700" style={{ marginTop: -6 }}>
				{character.ac.total}
			</div>
		</div>
	)
}

function Content({ 
	character,
	characterDispatch,
}) {
	const { tr } = useI18n()
	const { showTipPassivePerception } = useTip()
	const { showRestModalAsScreen } = useRestScreenAsModal()

	if (!character) {
		return null
	}

	return (
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
					<LineInfo.Parent>
						<LineInfo label="Maîtrise" value={<span>+{character.proficiencyBonus}</span>} />
						<LineInfo 
							label="Vitesse" 
							value={
								<>
									{character.currentSpeed != character.baseSpeed && <span>{character.currentSpeed} {character.speedReduced && 'Réduite'}</span>}
									{character.currentSpeed == character.baseSpeed && <span>{character.currentSpeed}</span>}
								</>
							} 
						/>
						<LineInfo label="Perception passive" value={<span>{character.passivePerception}</span>} onClick={() => showTipPassivePerception()} />
						<LineInfo label="Spell DC" value={<span>{character.spellSaveDC}</span>} />
						<LineInfo label="Spellcasing ability" value={<span><span className="text-xs text-meta">{character.spellcastingAbility}</span> {character.spellcastingAbilityValueLabel}</span>} />
						<LineInfo label="Spell Attack bonus" value={<span>{character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}</span>} />
					</LineInfo.Parent>

				</Section>

				<TraitsSection character={character} />
				<ProficienciesSection character={character} />
				<FeaturesSection character={character} />
				<BackgroundSection character={character} />
			</div>
		)
}

function Character() {
	const router = useRouter()
	const characterResponse = useCharacter(router.query.characterId)
	const character = characterResponse.data
	const { character: currentCharacter, setCurrentCharacter, characterDispatch } = useCurrentCharacter()

	useEffect(() => {
		if (character && (!currentCharacter || character?.id !== currentCharacter?.id)) {
			setCurrentCharacter(character.id)
		}
	}, [character])

	return (
		<Screen
			title={currentCharacter?.name}
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
			{character?.id === currentCharacter?.id && (
				<Content
					character={currentCharacter}
					characterDispatch={characterDispatch}
				/>
			)}
		</Screen>
	)
}

export default Character