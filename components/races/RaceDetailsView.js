import { createElement } from "react"

import LineInfo from "../LineInfo"
import Section from "../Section"
import useI18n from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import useTipLanguage from "../useTipLanguage"
import useTipAbilityScore from "../useTipAbilityScore"
import useTipTrait from "../useTipTrait"

import dragonborn from "./dragonborn.mdx"
import halfElf from "./half-elf.mdx"
import halfOrc from "./half-orc.mdx"
import highElf from "./high-elf.mdx"
import hillDwarf from "./hill-dwarf.mdx"
import human from "./human.mdx"
import lightfootHalfing from "./lightfoot-halfling.mdx"
import protectorAasimar from "./protector-aasimar.mdx"
import rabittfolk from "./rabbitfolk.mdx"
import rockGnome from "./rock-gnome.mdx"
import tiefling from "./tiefling.mdx"
import woodElf from "./wood-elf.mdx"

// - traits

function Content({ race }) {
	const { showTipProficiency } = useTipProficiency()
	const { showTipLanguage } = useTipLanguage()
	const { showTipTrait } = useTipTrait()
	const { showTipAbilityScore } = useTipAbilityScore()

	return (
		<>
			

			<Section title="">
				<LineInfo.Parent>
					<LineInfo label="Speed" value={race.speed} />
					<LineInfo label="Size" value={race.size} />

					<LineInfo.Paragraph label="size_description" value={race.sizeDescription} />
					<LineInfo.Paragraph label="alignment" value={race.alignment} />
					<LineInfo.Paragraph label="age" value={race.age} />
					<LineInfo.Paragraph label="language desc" value={race.languageDesc} />
				</LineInfo.Parent>
			</Section>

			{race.abilityBonuses && (
				<Section title="Ability bonuses">
					{race.abilityBonuses.length === 0 && (
						<p>
							Aucun
						</p>
					)}
					<LineInfo.Parent>
						{race.abilityBonuses.map(abilityScore => (
							<LineInfo
								key={abilityScore.abilityScore.index}
								label={abilityScore.abilityScore.name}
								value={<span>+{abilityScore.bonus}</span>}
								onClick={() => showTipAbilityScore(abilityScore.abilityScore.name)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}
			
			<Section title="starting proficiencies">
				{race.startingProficiencies.length === 0 && (
					<p>
						Aucune
					</p>
				)}
				<LineInfo.Parent>

					{race.startingProficiencies.map(proficiency => (
						<LineInfo 
							key={proficiency.index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			{race.startingProficiencyOptions && (
				<Section title="starting_proficiencies options" withToggle>
					<h4>Choisir {race.startingProficiencyOptions.choose}</h4>
					<LineInfo.Parent>
						{race.startingProficiencyOptions.from.map((proficiency) => (
							<LineInfo 
								key={proficiency.index} 
								label={<span>{proficiency.name}</span>} 
								onClick={() => showTipProficiency(proficiency)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			<Section title="Languages">
				<LineInfo.Parent>
					{race.languages.length === 0 && (
						<p>
							Aucun /!\ Missing common language on data?
						</p>
					)}
					{race.languages.map((language) => (
						<LineInfo
							key={language.index}
							label={<span>{language.name}</span>}
							value={<span>?</span>}
							onClick={() => showTipLanguage(language.index)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="Traits">
				<LineInfo.Parent>
					{race.traits.length === 0 && (
						<p>
							Aucun /!\ Missing traits on data?
						</p>
					)}
					{race.traits.map((trait) => (
						<LineInfo
							key={trait.index}
							label={<span>{trait.name}</span>}
							value={<span>?</span>}
							onClick={() => showTipTrait(trait)}
						/>
					))}
				</LineInfo.Parent>
			</Section>
		</>
	)
}

function Text({ race }) {
	const views = {
		"dragonborn": dragonborn,
		"half-elf": halfElf,
		"half-orc": halfOrc,
		"high-elf": highElf,
		"hill-dwarf": hillDwarf,
		"human": human,
		"lightfoot-halfling": lightfootHalfing,
		"protector-aasimar": protectorAasimar,
		"rabbitfolk": rabittfolk,
		"rock-gnome": rockGnome,
		"tiefling": tiefling,
		"wood-elf": woodElf,
	}

	const view = views[race?.index || race]

	if (!view) {
		return <p>Content not yet created</p>
		// throw new Error(`Race not handled: ${race}`)
	}
	return <div className="prose">{createElement(view)}</div>
}

function RaceDetailsView({ race }) {
	return <>
		<Section title="Description" withToggle sticky>
			<Text race={race} />
		</Section>
		<Section title="Résumé" withToggle sticky>
			<Content race={race} />
		</Section>
	</>
}

export default RaceDetailsView