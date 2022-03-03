import { createElement } from "react"
import LineInfo from "../LineInfo"
import Section from "../Section"
import useI18n from "../../modules/i18n/useI18n"
import useTipProficiency from "../useTipProficiency"
import useTipAbilityScore from "../useTipAbilityScore"
import useEquipmentItemScreenAsModal from "../useEquipmentItemScreenAsModal"
import EquipmentOptionsChooser from "../EquipmentOptionsChooser"

import Druid from "./Druid.mdx"

// TODO:
function Content({ clss, hideStartingEquipmentOptions }) {
	const { tr } = useI18n()
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

			<Section title={tr`proficiencies.title`}>
				{clss.proficiencies.length === 0 && (
					<p>
						{tr`none.feminine`}
					</p>
				)}
				<LineInfo.Parent>

					{clss.proficiencies.map((proficiency, index) => (
						<LineInfo 
							key={index}
							label={proficiency.name}
							value={<span>?</span>}
							onClick={() => showTipProficiency(proficiency)}
						/>
					))}
				</LineInfo.Parent>
			</Section>

			<Section title={tr`startingEquipment.title`} withToggle>
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

			{!hideStartingEquipmentOptions && clss.startingEquipmentOptions && (
				<Section title={tr`startingEquipmentOptions.title`} withToggle>
					<EquipmentOptionsChooser.Demo
						options={clss.startingEquipmentOptions}
						prefix="class_"
					/>
				</Section>
			)}


			{/* // TODO: spellcasting */}
			{clss.spellcasting && (
				<Section title={tr`spellcasting.title`} withToggle>
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
			)}

			<Section title={tr`subclasses.title`} withToggle>
				{clss.subclasses.length === 0 && (
					<p>
						{tr`none.feminine`}
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

			<Section title={tr`multiClassing.prerequisites`} withToggle>
				{clss.multiClassing?.prerequisites?.length === 0 && (
					<p>
						{tr`none.feminine`}
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

			<Section title={tr`multiClassing.proficiencies`} withToggle>
				{clss.multiClassing?.proficiencies?.length === 0 && (
					<p>
						{tr`none.feminine`}
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


function ClassDetailsView({ clss, hideStartingEquipmentOptions }) {
	return <>
		<Text clss={clss} />
		<Content clss={clss} hideStartingEquipmentOptions={hideStartingEquipmentOptions} />
	</>
}

export default ClassDetailsView