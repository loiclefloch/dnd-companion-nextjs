import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Link from "next/link"
import useCreateCharacter from '../../../components/useCreateCharacter';
import useEquipmentItems from "../../../modules/api/useEquipmentItems";
import ListSelector from "../../../components/ListSelector";

function StartingEquipmentItem({ item }) {
	return (
		<div className="flex px-4 py-1">
			<div className="flex flex-1">x{item.quantity} {item.equipment.name}</div>
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
		return equipmentItems.filter(item => item.gearCategory?.name === categoryName)
	}
	throw new Error(`Not handled`)
}

function EquipmentCategoryChoice({ chosenItems, setChosenItems, option, equipmentItems }) {

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
						return ({
							label: <div className="flex">
								{item.name}
							</div>,
							value: item,
							selected: chosenItems.includes(item)
						})
					})}
					onChange={setChosenItems}
				/>
			</div>
		</div>
	)
}

function EquipmentOptions({ chosenItems, setChosenItems, options, equipmentItems }) {
	return (
		<>
			{options.map((option, index) => (
				<EquipmentCategoryChoice 
					key={index} 
					option={option} 
					equipmentItems={equipmentItems} 
					chosenItems={chosenItems}
					setChosenItems={setChosenItems}
				/>
			))}
		</>
	)
}


function Form({ equipmentItems }) {
	const { background, updateCharacter } = useCreateCharacter()
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
				/>
				<EquipmentOptions
					chosenItems={chosenItems}
					setChosenItems={setChosenItems}
					options={background.startingEquipmentOptions}
					equipmentItems={equipmentItems}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const equipment = [
						...background.startingEquipment.map(item => ({
							index: item.equipment.index,
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