import acolyte from "./acolyte.mdx"
import criminal from "./criminal.mdx"
import folkHero from "./folk-hero.mdx"
import sage from "./sage.mdx"
import soldier from "./soldier.mdx"
import entertainer from "./entertainer.mdx"

import useBackground from "../../modules/api/useBackground"
import Section from "../Section"
import LineInfo from "../LineInfo"
import useI18n from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import { useEquipmentItemScreenAsModal } from "../EquipmentItemScreenAsModal"
import useTipLanguage from "../useTipLanguage"
import StartingEquipmentOptionsDetail from "../StartingEquipmentOptionsDetail"

function Content({ index }) {
	const { tr } = useI18n()
	const backgroundResponse = useBackground(index)
	const { showTipProficiency } = useTipProficiency()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showTipLanguage } = useTipLanguage()

	const background = backgroundResponse.data

	if (!background) {
		return null
	}

	// TODO: display data
	// - starting_currencies
	return (
		<>
			<Section title="Recommandé pour">
				<LineInfo.Parent>
					{background.goodForClasses.map(c => (
						<LineInfo key={c.index} label={c.name} />
					))}
				</LineInfo.Parent>
			</Section>

			{background.features.map((feature, index) => (
				<Section key={index} title={`Feature ${feature.name}`}>
					<p>{tr(feature.desc)}</p>
				</Section>
			))}

			<Section title="starting_proficiencies">
				<LineInfo.Parent>

					{background.startingProficiencies.map(proficiency => (
						<LineInfo 
							key={proficiency.index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>


			{background.startingProficiencyOptions && (
				<Section title="starting_proficiencies options">
					<h4>Choisir {background.startingProficiencyOptions.choose}</h4>
					<LineInfo.Parent>
						{background.startingProficiencyOptions.from.map((proficiency) => (
							<LineInfo 
								key={proficiency.index} 
								label={<span>{proficiency.name}</span>} 
								onClick={() => showTipProficiency(proficiency)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			<Section title="starting_equipment">
				<LineInfo.Parent>
					{background.startingEquipment.map(item => (
						<LineInfo 
							key={item.index} 
							label={item.name} 
							value={<span>x{item.quantity}</span>} 
							onClick={() => showEquipmentItemScreenAsModal(item)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			{background.startingEquipmentOptions && (
				<Section title="starting_equipment options">
					<StartingEquipmentOptionsDetail startingEquipmentOptions={background.startingEquipmentOptions} />
				</Section>
			)}

			{background.languageOptions && (
				<Section title="Languages options">
					<h4>Choisir {background.languageOptions.choose}</h4>
					<LineInfo.Parent>
						{background.languageOptions.from.map((language) => (
							<LineInfo 
								key={language.index} 
								label={<span>{language.name}</span>} 
								value={<span>?</span>}
								onClick={() => showTipLanguage(language.index)}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			<Section title="personality_traits">
				<LineInfo.Parent>
					{background.personalityTraits.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="ideals">
				<LineInfo.Parent>
					{background.ideals.from.map((trait, index) => (
						<LineInfo 
							key={index} 
							label={<span>{index + 1} - {trait.desc} <span className="text-meta text-sm">({trait.alignments.map(a => a.name).join(', ')})</span></span>}  
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="bonds">
				<LineInfo.Parent>
					{background.bonds.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="flaws">
				<LineInfo.Parent>
					{background.flaws.from.map((trait, index) => (
						<LineInfo key={index} label={<span>{index + 1} - {trait}</span>}  />
					))}
				</LineInfo.Parent>
			</Section>

		</>
	)
}

function BackgroundContent({ index }) {
	const map = {
		acolyte: acolyte,
		criminal: criminal,
		'folk-hero': folkHero,
		sage: sage,
		entertainer: entertainer,
		soldier: soldier,
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /> <Content index={index} /></div>
	}

	return <p>Background not created yet</p>
}

export default BackgroundContent