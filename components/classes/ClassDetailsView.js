import { createElement } from "react"
import LineInfo from "../LineInfo"
import Section from "../Section"
import useI18n from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import useTipAbilityScore from "../useTipAbilityScore"
import { useEquipmentItemScreenAsModal } from "../EquipmentItemScreenAsModal"

import Druid from "./Druid.mdx"

// TODO:
function Content({ clss }) {
	const { showTipProficiency } = useTipProficiency()
	const { showTipAbilityScore } = useTipAbilityScore()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

// proficiency_choices
// saving_throws
// starting_equipment
// multi_classing
// subclasses
	return (
		<>
			<Section title="">
				<LineInfo.Parent>
					<LineInfo label="hit_dice" value={clss.hitDice} />
					{clss.spellcasting && (
						<LineInfo label="spellcasting" value={clss.spellcasting.spellcastingAbility.name} />
					)}
				</LineInfo.Parent>
			</Section>

			<Section title="proficiencies">
				{clss.proficiencies.length === 0 && (
					<p>
						Aucune
					</p>
				)}
				<LineInfo.Parent>

					{clss.proficiencies.map(proficiency => (
						<LineInfo 
							key={proficiency.index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="starting Equipment">
				<LineInfo.Parent>
					{clss.startingEquipment.map(item => (
						<LineInfo 
							key={item.index} 
							label={item.name} 
							value={<span>x{item.quantity}</span>} 
							onClick={() => showEquipmentItemScreenAsModal(item)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

{/* TODO: */}
			{/* {clss.startingEquipmentOptions && (
				<Section title="starting_equipment options">
					{clss.startingEquipmentOptions.map((startingEquipmentOption, index) => (
						<div key={index}>
							<h4>Choisir {startingEquipmentOption.choose} {startingEquipmentOption.equipment_category?.name}</h4>
							<LineInfo.Parent>
								{startingEquipmentOption.from.map(item => (
									<LineInfo
										key={item.index}
										label={item.name}
										value={<span>?</span>}
										onClick={() => showEquipmentItemScreenAsModal(item)}
									/>
								))}
							</LineInfo.Parent>
						</div>
					))}

				</Section>
			)} */}


			{/* // TODO: spellcasting */}
			<Section title="spellcasting">
				<LineInfo.Parent>

					{clss.spellcasting?.info?.map((info, index) => (
						<LineInfo.Paragraph
							key={index}
							label={info.name}
							value={info.desc}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="subclasses">
				{clss.subclasses.length === 0 && (
					<p>
						Aucune
					</p>
				)}
				<LineInfo.Parent>

					{clss.subclasses?.map(subclass => (
						<LineInfo 
							key={subclass.index}
							label={subclass.name}
							value={<span>?</span>}
							// TODO:
							// onClick={() => showTipProficiency(subclass)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="multiClassing - prérequis">
				{clss.multiClassing?.prerequisites?.length === 0 && (
					<p>
						Aucune
					</p>
				)}
				<LineInfo.Parent>

					{clss.multiClassing?.prerequisites?.map(prerequisite => (
						<LineInfo 
							key={prerequisite.index}
							label={prerequisite.abilityScore.name}
							value={<span>= {prerequisite.minimumScore}</span>}
							onClick={() => showTipAbilityScore(prerequisite.abilityScore.name)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title="multiClassing - proficiencies">
				{clss.multiClassing?.proficiencies?.length === 0 && (
					<p>
						Aucune
					</p>
				)}
				<LineInfo.Parent>

					{clss.multiClassing?.proficiencies?.map(proficiency => (
						<LineInfo 
							key={proficiency.index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>
		</>

		// TODO: multiclassing proficiency_choices
	)
}

function Text({ clss }) {
	const view = {
		druid: Druid 
	}

	if (!view[clss.index]) {
		return <p>Content not yet created</p>
		// throw new Error(`Class not handled: ${clss}`)
	}
	return createElement(view[clss.index])
}


function ClassDetailsView({ clss }) {
	return <>
		<Text clss={clss} />
		<Content clss={clss} />
	</>
}

export default ClassDetailsView