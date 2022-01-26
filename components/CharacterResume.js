import { map, groupBy } from "lodash"
import useI18n from "../modules/i18n/useI18n";
import StatsSmall from "./StatsSmall";
import useTipTrait from "./useTipTrait"
import useTipProficiency from "./useTipProficiency"
import { useEquipmentItemScreenAsModal } from "./EquipmentItemScreenAsModal"
import LineInfo from "./LineInfo"

function Section({ title, children }) {
	return (
		<div className="pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">{title}</h3>
			<div>{children}</div>
		</div>
	)
}

function Proficiency({ proficiency }) {
	const { tr } = useI18n()
	const { showTipProficiency } = useTipProficiency()

	return (
		<LineInfo
			key={proficiency.name}
			label={
				<span>
					{proficiency.name} <span className="ml-1 text-sm text-meta">({proficiency.sourceType})</span>
				</span>
			}
			value={proficiency.isSkill && (
				<div
					onClick={() => showTipProficiency(proficiency)}
					className="text-meta"
				>
					?
				</div>
			)}
		/>
	)
}

export function ProficienciesSection({ character }) {
	const grouped = groupBy(character.proficiencies, item => item.typeLabel)

	return (
		<Section title="Maîtrises">
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

export function TraitsSection({ character }) {
	const { showTipTrait } = useTipTrait()

	return (
		<Section title="Traits">
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

	return (
		<Section title="Équipement">
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
							className="text-meta"
						>
							?
						</div>
					</div>
				))}
			</div>
		</Section>
	)
}

function PhysicSection({ character }) {
	const { body } = character

	return (
		<Section title="Physique">
			<LineInfo.Parent>
				<LineInfo label="age" value={body.age} />
				<LineInfo label="gender" value={body.gender} />
				<LineInfo label="height" value={body.height} />
				<LineInfo label="weight" value={body.weight} />
				<LineInfo label="hairColor" value={body.hairColor} />
				<LineInfo label="eyeColor" value={body.eyeColor} />
				<LineInfo label="skinColor" value={body.skinColor} />
				<LineInfo label={<span>physical<br />caracteristics</span>} value={body.physicalCaracteristics} />
			</LineInfo.Parent>
		</Section>
	)
}

function StatsSection({ character }) {
	return (
		<Section title="Stats">
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
	return (
		<Section title="Languages">
			<div className="mx-4 divide-y divide">
				{character.languages?.map((language, index) => (
					<div key={index} className="py-1">{language}</div>
				))}
			</div>
		</Section>
	)
}

function PersonnalityTraitsSection({ character }) {
	return (
		<Section title="Personnality traits">
			<div className="divide-y divide">
				{character.personnalityTraits.map((trait, index) => (
					<div key={index} className="py-1">{trait}</div>
				))}
			</div>
		</Section>
	)
}

function BondsSection({ character }) {
	return (
		<Section title="Bonds">
			<div>{character.bonds}</div>
		</Section>
	)
}

function FlawsSection({ character }) {
	return (
		<Section title="Imperfections">
			<div>{character.flaws}</div>
		</Section>
	)
}

function IdealsSection({ character }) {
	return (
		<Section title="Idéaux">
			<div>{character.ideals}</div>
		</Section>
	)
}

function GlobalSection({ character }) {
	return (
		<Section title="Caractéristiques">
			<LineInfo.Parent>

				<LineInfo label="Niveau" value={character.level} />
				<LineInfo label="HP" value={character.maximumHp} />
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
				<LineInfo label="Spell DC" value={<span>{character.spellSaveDC}</span>} />
				<LineInfo label="Spellcasing ability" value={<span><span className="text-xs text-meta">{character.spellcastingAbility}</span> {character.spellcastingAbilityValueLabel}</span>} />
				<LineInfo label="Spell Attack bonus" value={<span>{character.spellAttackBonus >= 0 ? '+' : ''}{character.spellAttackBonus}</span>} />
			</LineInfo.Parent>

		</Section>
	)
}

function CharacterResume({ character }) {
	return (
		<div className="px-4 mt-4">
			<h3>{character.name}</h3>
			<div>
				<div>{character.race.name}</div>
				<div>{character.classes.map(clss => clss.name).join(', ')}</div>

				<div className="mt-4" />

				<GlobalSection character={character} />
				<PhysicSection character={character} />
				<IdealsSection character={character} />
				<FlawsSection character={character} />
				<BondsSection character={character} />
				<PersonnalityTraitsSection character={character} />
				<LanguagesSection character={character} />
				<StatsSection character={character} />
				<EquipmentSection character={character} />
				<TraitsSection character={character} />
				<ProficienciesSection character={character} />

				// TODO: background + background feature + add on character page
			</div>

			<div>
				// TODO: if need to choose spells add a tip to how choose them
			</div>
		</div>
	)
}

export default CharacterResume