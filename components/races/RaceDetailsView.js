import { createElement } from "react"

import LineInfo from "../LineInfo"
import Section from "../Section"
import useI18n from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import useTipLanguage from "../useTipLanguage"
import useTipAbilityScore from "../useTipAbilityScore"
import useTipTrait from "../useTipTrait"

import dwarf from "./dwarf.mdx"
import HighElf from "./high-elf.mdx"

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
					<LineInfo label="size" value={race.size} />

					<LineInfo.Paragraph label="size_description" value={race.sizeDescription} />
					<LineInfo.Paragraph label="alignment" value={race.alignment} />
					<LineInfo.Paragraph label="age" value={race.age} />
					<LineInfo.Paragraph label="age" value={race.languageDesc} />

				</LineInfo.Parent>
			</Section>

			<Section title="Ability bonuses">
				<LineInfo.Parent>
					{race.abilityBonuses.map(abilityScore => (
						<LineInfo 
							key={abilityScore.abilityScore.index} 
							label={abilityScore.abilityScore.name}
							value={abilityScore.bonus}
							onClick={() => showTipAbilityScore(abilityScore.abilityScore.name)}
						/>
					))}
				</LineInfo.Parent>
			</Section>
			
			<Section title="starting_proficiencies">
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
				<Section title="starting_proficiencies options">
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
	const view = {
		dwarf: dwarf,
		'high-elf': HighElf
	}

	if (!view[race]) {
		return <p>Content not yet created</p>
		// throw new Error(`Race not handled: ${race}`)
	}
	return createElement(view[race])
}

function RaceDetailsView({ race }) {
	return <>
		<Text race={race} />
		<Content race={race} />
	</>
}

export default RaceDetailsView