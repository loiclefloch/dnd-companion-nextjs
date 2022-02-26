import Link from "next/link"
import { map, groupBy, isEmpty } from "lodash"
import { makeI18n } from "../modules/i18n/useI18n";
import StatsSmall from "./StatsSmall";
import useTipTrait from "./useTipTrait"
import useTipProficiency from "./useTipProficiency"
import useEquipmentItemScreenAsModal from "./useEquipmentItemScreenAsModal"
import LineInfo from "./LineInfo"
import useTipFeature  from "./useTipFeature"
import CharacterClassTag from "./CharacterClassTag"
import useFeatScreenAsModal from "./useFeatScreenAsModal"
import Section from "./Section"

const useI18n = makeI18n({
	'link to background': {
		fr: 'Voir le background',
		en: 'Open background',
	},
	'background.title': {
		en: `Background - %{backgroundName}`,
		fr: `Background - %{backgroundName}`,
	},
	'features.title': {
		en: `Features`,
		fr: ``
	},
	'traits.title': {
		en: 'traits',
		fr: 'traits',
	},
	'equipment.title': {
		fr: 'Équipement',
		en: 'Equipment',
	},
	'body.title': {
		fr: 'Physique',
		en: 'Body',
	},

	'stats.title': {
		en: 'Stats',
		fr: 'Stats',
	},

	'languages.title': {
		en: 'Languages',
		fr: 'Languages',
	},
	'personnalityTraits.title': {
		en: 'Personnality traits',
		fr: 'Traits de personnalité'
	},
	'bonds.title': {
		en: 'Bonds',
		fr: 'Liens',
	},
	'imperfections.title': {
		en: 'Flaws',
		fr: 'Imperfections',
	},
	'ideals.title': {
		en: 'Ideals',
		fr: 'Idéaux',
	},

})

function Proficiency({ proficiency }) {
	const { showTipProficiency } = useTipProficiency()

	return (
		<LineInfo
			key={proficiency.name}
			label={
				<span>
					{proficiency.name} <span className="ml-1 text-sm text-meta">({proficiency.sourceType})</span>
				</span>
			}
			value={
				<div
					onClick={() => showTipProficiency(proficiency)}
					className="text-meta px-2"
				>
					?
				</div>
			}
		/>
	)
}

export function ProficienciesSection({ character }) {
	const { tr } = useI18n()
	const grouped = groupBy(character.proficiencies, item => item.typeLabel)

	return (
		<Section title={tr`proficiencies`}>
			{map(grouped, (list, groupName) => (
				<div
					key={groupName}
					className="mt-4"
				>
					<h4 className="mx-2 mb-2 border-b border-gray-300 border-solid text-semibold">{groupName}</h4>
					<LineInfo.Parent>
						{list.map(proficiency => (
							<Proficiency
								key={proficiency.index}
								proficiency={proficiency}
							/>
						))}
					</LineInfo.Parent>
				</div>
			))}
		</Section>
	)
}

export function BackgroundSection({ character }) {
	const { tr } = useI18n()
	const background = character.background
	return (
		<Section title={tr(`background.title`, { backgroundName: background.name })}>
			<div className="px-4">
				<Link href={`/background/${background.index}`}>
					<span className="text-link">{tr`link to background`}</span>
				</Link>
			</div>
		</Section>
	)
}


export function FeaturesSection({ character }) {
	const { tr } = useI18n()
	const { showTipFeature } = useTipFeature()

	if (isEmpty(character.features)) {
		return null
	}

	return (
		<Section title={tr`features.title`}>
			<LineInfo.Parent>
				{character.features.map((feature, index) => (
					<LineInfo
						key={feature.index}
						label={
							<span>
								{feature.name}
							</span>
						}
						value={
							<div
								onClick={() => showTipFeature(feature.index)}
								className="text-meta px-2"
							>
								?
							</div>
						}
					/>
				))}
			</LineInfo.Parent>

		</Section>
	)
}

export function TraitsSection({ character }) {
	const { showTipTrait } = useTipTrait()
	const { tr } = useI18n()

	return (
		<Section title={tr`traits.title`}>
			<LineInfo.Parent>
				{character.traits.map(trait => (
					<LineInfo
						key={trait.index}
						// onClick={() => showTipTrait(trait)}
						label={trait.name}
						value={
							<div
								onClick={() => showTipTrait(trait)}
								className="text-meta"
							>
								?
						</div>
						}
					/>
				))}
			</LineInfo.Parent>
		</Section>
	)
}

function EquipmentSection({ character }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { tr } = useI18n()
	return (
		<Section title={tr`equipment.title`}>
			<div className="mx-4 divide-y divide">
				{character.equipment.map(item => (
					<div
						key={item.name}
						className="flex items-center py-1"
					>
						<div className="flex flex-1">
							<span className="text-meta">x{item.quantity}</span>
							<span className="ml-2">{item.name}</span>
						</div>
						<div 
							onClick={() => showEquipmentItemScreenAsModal(item)}
							className="text-meta px-2"
						>
							?
						</div>
					</div>
				))}
			</div>
		</Section>
	)
}

function BodySection({ character }) {
	const { tr } = useI18n()
	const { body } = character

	return (
		<Section title={tr`body.title`}>
			<LineInfo.Parent>
				<LineInfo label={tr`age`} value={body.age} />
				<LineInfo label={tr`gender`} value={body.gender} />
				<LineInfo label={tr`height`} value={body.height} />
				<LineInfo label={tr`weight`} value={body.weight} />
				<LineInfo label={tr`hairColor`} value={body.hairColor} />
				<LineInfo label={tr`eyeColor`} value={body.eyeColor} />
				<LineInfo label={tr`skinColor`} value={body.skinColor} />
				<LineInfo label={tr`physical caracteristics`} value={body.physicalCaracteristics} />
			</LineInfo.Parent>
		</Section>
	)
}

function StatsSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`stats.title`}>
			<div className="px-1 pt-2">
				<StatsSmall
					withDetail
					stats={character.stats}
					skills={character.skills}
					character={character}
				/>
			</div>
		</Section>
	)
}

function LanguagesSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`languages.title`}>
			<div className="mx-4 divide-y divide">
				{character.languages?.map((language, index) => (
					<div key={index} className="py-1">{language}</div>
				))}
			</div>
		</Section>
	)
}

function PersonnalityTraitsSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`personnalityTraits.title`}>
			<div className="divide-y divide">
				{character.personnalityTraits.map((trait, index) => (
					<div key={index} className="py-1">{trait}</div>
				))}
			</div>
		</Section>
	)
}

function BondsSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`bonds.title`}>
			<div>{character.bonds}</div>
		</Section>
	)
}

function FlawsSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`imperfections.title`}>
			<div>{character.flaws}</div>
		</Section>
	)
}

function IdealsSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title={tr`ideals.title`}>
			<div>{character.ideals}</div>
		</Section>
	)
}

function GlobalSection({ character }) {
	const { tr } = useI18n()
	return (
		<Section title="Caractéristiques">
			<LineInfo.Parent>

				<LineInfo label="Niveau" value={character.level} />
				<LineInfo label="HP" value={character.maximumHp} />
				<LineInfo label="Initiative" value={character.initiative} />
				<LineInfo label="Natural AC" value={character.ac.natural} />
				<LineInfo label="Armor AC" value={character.ac.armor} />
				<LineInfo label="Shield AC" value={character.ac.shield} />
				<LineInfo label="Total AC" value={character.ac.total} />
				<LineInfo label="Hit dices" value={character.maximumHitDice} />

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
				<LineInfo label="Investigation passive" value={<span>{character.passiveInvestigation}</span>} onClick={() => showTipPassivePerception()} />
				<LineInfo label="Spell DC" value={<span>{character.spellSaveDC}</span>} />
				<LineInfo label="Spellcasing ability" value={<span><span className="text-xs text-meta">{character.spellcastingAbility}</span> {character.spellcastingAbilityValueLabel}</span>} />
				<LineInfo label="Spell Attack bonus" value={<span>{character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}</span>} />
			</LineInfo.Parent>

		</Section>
	)
}

export function FeatsSection({ character }) {
	const { tr } = useI18n()
	const { showFeatScreenAsModal } = useFeatScreenAsModal()

	if (isEmpty(character.feats)) {
		return null
	}

	return (
		<Section title="Feats">
			<LineInfo.Parent>
				{character.feats.map(feat => (
					<LineInfo 
						key={feat.index} 
						label={tr(feat.nameLocalized)} 
						value={<div 
							onClick={() => showFeatScreenAsModal(feat.index, character)}
							className="text-meta px-2"
						>
							?
						</div>} 
					/>
				))}
			</LineInfo.Parent>
		</Section>
	)
}

function CharacterResume({ character }) {
	return (
		<div className="px-4 mt-4 prose">
			<h3>{character.name}</h3>
			<div>
				<div>{character.race.name}</div>
				<CharacterClassTag character={character} />

				<GlobalSection character={character} />
				<BodySection character={character} />
				<IdealsSection character={character} />
				<FlawsSection character={character} />
				<BondsSection character={character} />
				<PersonnalityTraitsSection character={character} />
				<LanguagesSection character={character} />
				<StatsSection character={character} />
				<EquipmentSection character={character} />
				<FeatsSection character={character} />
				<TraitsSection character={character} />
				<ProficienciesSection character={character} />
				<FeaturesSection character={character} />
				<BackgroundSection character={character} />
			</div>

			<div>
				// TODO: if need to choose spells add a tip to how choose them
			</div>
		</div>
	)
}

export default CharacterResume