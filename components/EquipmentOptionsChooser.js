import { useState } from "react";
import clsx from "clsx";
import { existsOnArray } from '../modules/utils/array'
import ListSelector from "./ListSelector";
import useEquipmentItemScreenAsModal from "./useEquipmentItemScreenAsModal"
import getCharacterHasProficiencyForItem from "../modules/character/getCharacterHasProficiencyForItem"

const isProefficientClassName = "text-blue-500"

function EquipmentCategoryChoice({ parentIndex, chosenItems, character, setChosenItems, option }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	if (!option.from.items) {
		debugger
	}
	if (option.hasSubChoice) {
		return (
			<ClassEquipmentSubOption
				parantIndex={parentIndex}
				index={"0"}
				chosenItems={chosenItems}
				character={character}
				setChosenItems={setChosenItems}
				option={option}
			// onSelect={() => setChosenItems(parentIndex, [])}
			/>
		)
	}

	return (
		<ListSelector
			value={chosenItems}
			multiple
			nbMaxValues={option.choose}
			options={option.from.items.map(item => {
				return ({
					label: <div 
					className={clsx("flex", {
						[isProefficientClassName]: getCharacterHasProficiencyForItem(character, item)
					})}
					>
						{item.name}
					</div>,
					value: item,
					selected: existsOnArray(chosenItems, i => i.index === item.index),
					rightView: <div
						className="px-4 py-2 text-xs text-meta"
						onClick={() => showEquipmentItemScreenAsModal(item)}
					>
						?
					</div>
				})
			})}
			onChange={setChosenItems}
		/>
	)
}

function ClassEquipmentSubOption({
	parentIndex,
	index,
	subOption,
	chosenItems,
	setChosenItems,
	character,
	selected,
	onSelect
}) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	if (subOption.isTypeSubOption && !subOption.from.equipmentCategory) {
		return (
			<>
				<ListSelector.Row
					label={
						<span>
							<>
								Option {index + 1} <span className="text-meta text-sm">({subOption.choose} au choix)</span>
							</>
						</span>
					}
					item={subOption.item}
					selected={selected}
					onClick={() => {
						setChosenItems(parentIndex, [])

						if (subOption.isTypeEquipment) {
							setChosenItems(parentIndex, [subOption.item])
						} else {
							setChosenItems(parentIndex, [])
						}

						onSelect()
					}}
				/>

				{selected && (
					<div className="px-2">
						<ClassEquipmentOption
							parentIndex={parentIndex}
							index={''}
							option={subOption}
							chosenItems={chosenItems}
							setChosenItems={(key, items) => {
								setChosenItems(key, items)
							}}
							character={character}
							isSubOption
						/>
					</div>
				)}
			</>
		)
	}

	return (
		<>
			<ListSelector.Row
				label={
					<span>
						<>
							{subOption.isTypeEquipment && subOption.item.name}
							{subOption.isTypeSubOption && <span>{subOption.from.equipmentCategory.name} <span className="text-meta text-sm">({subOption.choose} au choix)</span></span>}
						</>
					</span>
				}
				className={clsx({
					[isProefficientClassName]: getCharacterHasProficiencyForItem(character, subOption.item) 
				})}
				item={subOption.item}
				selected={selected}
				rightView={subOption.isTypeEquipment && (
					<div
						className="px-4 py-2 text-xs text-meta"
						onClick={() => showEquipmentItemScreenAsModal(subOption.item)}
					>
						?
					</div>
				)}
				onClick={() => {
					onSelect()

					if (subOption.isTypeEquipment) {
						setChosenItems(parentIndex, [subOption.item])
					} else {
						setChosenItems(parentIndex, [])
					}
				}}
			/>

			{subOption.isTypeSubOption && selected && (
				<>
					<div className="ml-4">
						{selected && (
							<EquipmentCategoryChoice
								key={index}
								parentIndex={parentIndex}
								option={subOption}
								baseChosenItems={chosenItems}
								chosenItems={chosenItems[parentIndex] || []}
								setChosenItems={(items) => setChosenItems(parentIndex, items)}
								character={character}
							/>
						)}
					</div>
				</>
			)}
			{/* {index !== option.from.length - 1 && (
										<div>--- OR ---</div>
									)} */}
		</>
	)
}

function ClassEquipmentOption({ parentIndex, index, option, character, chosenItems, isSubOption, setChosenItems, onSelect }) {
	const [selectedSubOption, _setSelectedSubOption] = useState(null) // index of the sub option

	const setSelectedSubOption = index => {
		_setSelectedSubOption(index)
		onSelect && onSelect()
	}

	if (!option) {
		return null
	}
	return (
		<div className="mb-4">
			{!isSubOption &&
				<h4 className="border-b border-solid border-slate-300">
					Option d'équipment {index + 1}
					{!option.hasSubChoice &&
						<span> - {option.from.equipmentCategory?.name}</span>
					}
				</h4>
			}

			{!isSubOption && <div className="text-sm text-meta">{option.choose} au choix</div>}

			{!option.hasSubChoice ? (
				<>
					<EquipmentCategoryChoice
						key={index}
						option={option}
						baseChosenItems={chosenItems}
						chosenItems={chosenItems[parentIndex] || []}
						setChosenItems={(items) => setChosenItems(parentIndex, items)}
						character={character}
					/>
				</>
			) : (
				// not a choice, defined
				<div className={"ml-0 mt-2 divide divide-y"}>
					{option.from.items.map((subOption, subIndex) => (
						<ClassEquipmentSubOption
							key={subIndex}
							parentIndex={`${parentIndex}${index ? '_' : ''}${index}`}
							index={subIndex}
							character={character}
							subOption={subOption}
							chosenItems={chosenItems}
							setChosenItems={setChosenItems}
							selected={selectedSubOption === subIndex}
							onSelect={() => setSelectedSubOption(subIndex)}
						/>
					))}
				</div>
			)}
		</div>
	)
}



function EquipmentOptionsChooser({ chosenItems, prefix, character, setChosenItems, options }) {
	if (!options) {
		return null
	}
	// TODO: setChosenItems by option
	// debugger
	return (
		<div className="prose">
			{options.map((option, index) => (
				<ClassEquipmentOption
					key={index}
					parentIndex={`${prefix}_`}
					index={index}
					option={option}
					chosenItems={chosenItems}
					setChosenItems={setChosenItems}
					character={character}
				/>
			))}
		</div>
	)
}


EquipmentOptionsChooser.Demo = ({ prefix, character, options }) => {
	const [chosenItems, _setChosenItems] = useState({})

	function setChosenItems(key, items) {
		_setChosenItems({
			...chosenItems,
			[key]: items
		})
	}

	return (
		<EquipmentOptionsChooser
			chosenItems={chosenItems}
			setChosenItems={setChosenItems}
			character={character}
			prefix={prefix}
			options={options}
		/>
	)
}


export default EquipmentOptionsChooser