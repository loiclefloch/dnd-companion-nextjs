import LineInfo from "./LineInfo"

function StartingEquipmentSubOption({ subOption }) {
	const item = subOption

	if (item.name) {
		return (
			<LineInfo
				key={item.index}
				label={item.name}
				value={<span>?</span>}
				onClick={() => showEquipmentItemScreenAsModal(item)}
			/>
		)
	}

	debugger
	return null
}

function StartingEquipmentOption({ option }) {
	return (
		<div>
			<h4>Choisir {option.choose} {option.equipmentCategory.name}</h4>
			<LineInfo.Parent>
				{option.from.items.map((subOption, index) => (
					<StartingEquipmentSubOption key={index} subOption={subOption} />
				))}
			</LineInfo.Parent>
		</div>
	)
}

function StartingEquipmentOptionsDetail({ startingEquipmentOptions }) {

	return (
		<>
			{startingEquipmentOptions.map((option, index) => (
				<StartingEquipmentOption key={index} option={option} />
			))}
		</>
	)
}

export default StartingEquipmentOptionsDetail