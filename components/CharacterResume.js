import { map, groupBy } from "lodash"
import useI18n from "../modules/i18n/useI18n";
import StatsSmall from "./StatsSmall";
import useTipTrait from "./useTipTrait"
import useTipProficiency from "./useTipProficiency"
import { useEquipmentItemScreenAsModal } from "./EquipmentItemScreenAsModal"

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
		<div
			key={proficiency.name}
			className="flex py-1 mx-4"
		>
			<div className="flex items-center flex-1">
				{proficiency.name} <span className="ml-2 text-sm text-meta">({proficiency.sourceType})</span>
			</div>
			{proficiency.isSkill && (
				<div
					onClick={() => showTipProficiency(proficiency)}
					className="text-meta"
				>
					?
				</div>
			)}
		</div>
	)
}

function ProficienciesSection({ character }) {
	const grouped = groupBy(character.proficiencies, item => item.typeLabel)

	return (
		<Section title="Maîtrises">
			{map(grouped, (list, groupName) => (
				<div
					key={groupName}
					className="mt-4"
				>
					<h4 className="mx-2 mb-2 border-b border-gray-300 border-solid text-semibold">{groupName}</h4>
					<div className="divide-y divide">
						{list.map(proficiency => (
							<Proficiency
								key={proficiency.index}
								proficiency={proficiency}
							/>
						))}
					</div>
				</div>
			))}
		</Section>
	)
}

function TraitsSection({ character }) {
	const { showTipTrait } = useTipTrait()

	return (
		<Section title="Traits">
			<div className="divide-y divide">
				{character.traits.map(trait => (
					<div
						key={trait.index}
						onClick={() => showTipTrait(trait)}
						className="flex items-center py-1 mx-4"
					>
						<div className="flex flex-1">{trait.name}</div>
						<div
							onClick={() => showTipTrait(trait)}
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
			<div>age: {body.age}</div>
			<div>gender: {body.gender}</div>
			<div>height: {body.height}</div>
			<div>weight: {body.weight}</div>
			<div>hairColor: {body.hairColor}</div>
			<div>eyeColor: {body.eyeColor}</div>
			<div>skinColor: {body.skinColor}</div>
			<div>physicalCaracteristics: {body.physicalCaracteristics}</div>
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
			<div>Niveau: {character.level}</div>
			<div>HP: {character.maximumHp}</div>
			<div>Natural AC: {character.ac.natural}</div>
			<div>Armor AC: {character.ac.armor}</div>
			<div>Shield AC: {character.ac.shield}</div>
			<div>Total AC: {character.ac.total}</div>
			<div>Hit dices: {character.maximumHitDice}</div>
			<div>Proficiency: +{character.proficiencyBonus}</div>
			<div>Base Speed: {character.baseSpeed} </div>
			<div>Current speed: {character.currentSpeed} {character.speedReduced && 'Réduite'}</div>
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
			</div>

			<div>
				// TODO: if need to choose spells add a tip to how choose them
			</div>
		</div>
	)
}

export default CharacterResume