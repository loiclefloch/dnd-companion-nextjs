import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';
import { useEquipmentItemScreenAsModal } from '../../../components/EquipmentItemScreenAsModal';
import useEquipmentItems from "../../../modules/api/useEquipmentItems";
import ListSelector from "../../../components/ListSelector";
import clsx from "clsx";

function StartingEquipmentItem({ item }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	return (
		<div className="flex px-4 py-1">
			<div className="flex flex-1">
				x{item.quantity} {item.name}
			</div>
			<div
				className="px-4 py-2 text-xs text-meta"
				onClick={() => showEquipmentItemScreenAsModal(item)}
			>
				?
			</div>
		</div>
	)
}

function StartingEquipment({ startingEquipment }) {
	return (
		<div className="mt-4">
			<h2>Votre équipement de départ</h2>
			<p className="text-meta">Votre background vous donne cet équipment par défaut</p>

			<div className="mt-2 divide-y divide">
				{startingEquipment.map((item, index) => (
					<StartingEquipmentItem key={index} item={item} />
				))}
			</div>

		</div>
	)
}

function getItemsForType(type, from, equipmentItems) {
	if (type === 'equipment') {
		const categoryName = from.equipmentCategory.name
		if (!categoryName) {
			throw new Error(`Not handled`)
		}
		// TODO: better way take from the equipment-categories.
		return equipmentItems.filter(item => item.gearCategory?.name === categoryName
			|| item.toolCategory === categoryName
			|| item.vehicleCategory === categoryName
		)
	}
	throw new Error(`Not handled`)
}

function EquipmentCategoryChoice({ chosenItems, character, setChosenItems, option, equipmentItems }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const itemsOptions = getItemsForType(option.type, option.from, equipmentItems)

	return (
		<div className="mt-8">
			<h2>{option.type} - {option.from.equipmentCategory.name}</h2>
			<div className="text-sm text-meta">Choisissez {option.choose}</div>
			<div>
				<ListSelector
					value={chosenItems}
					multiple
					nbMaxValues={option.choose}
					options={itemsOptions?.map(item => {
						// proficiency index is the same as the item
						const isProefficient = character.proficiencies.find(p => item.index === p.index)

						return ({
							label: <div className={clsx("flex", {
								"text-blue-500": isProefficient
							})}>
								{item.name}
							</div>,
							value: item,
							selected: chosenItems.includes(item),
							rightView: 	<div
								className="px-4 py-2 text-xs text-meta"
								onClick={() => showEquipmentItemScreenAsModal(item)}
							>
								?
							</div>
						})
					})}
					onChange={setChosenItems}
				/>
			</div>
		</div>
	)
}

function EquipmentOptions({ chosenItems, character, setChosenItems, options, equipmentItems }) {
	if (!options) {
		return null
	}
	return (
		<>
			{options.map((option, index) => (
				<EquipmentCategoryChoice 
					key={index} 
					option={option} 
					equipmentItems={equipmentItems} 
					chosenItems={chosenItems}
					setChosenItems={setChosenItems}
					character={character}
				/>
			))}
		</>
	)
}


function Form({ equipmentItems }) {
	const { background, character, updateCharacter } = useCreateCharacter()
	const [chosenItems, setChosenItems] = useState([])

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez votre équipement de départ"
				description={`Donnez à votre personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/create-character-equipment">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<div className="mx-4">
				<StartingEquipment
					startingEquipment={background.startingEquipment}
					equipmentItems={equipmentItems}
					character={character}
				/>
				<EquipmentOptions
					chosenItems={chosenItems}
					setChosenItems={setChosenItems}
					options={background.startingEquipmentOptions}
					equipmentItems={equipmentItems}
					character={character}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const equipment = [
						...background.startingEquipment.map(item => ({
							index: item.index,
							quantity: item.quantity
						})),
						...chosenItems.map(item => ({
							index: item.index,
							quantity: 1
						})),
					]

					console.log({ equipment })

					updateCharacter({ 
						equipment,
						step: 'equipment' 
					})
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}


function CreateCharacterEquipment() {
	const equipmentItemsResponse = useEquipmentItems()

	return (
		<Screen
			title={"Équipement"}
			withBottomSpace
			isLoading={equipmentItemsResponse.isLoading}
		>
			{equipmentItemsResponse.data && <Form equipmentItems={equipmentItemsResponse.data} />}
    </Screen>
  );
}

export default CreateCharacterEquipment;