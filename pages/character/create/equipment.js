import { useState } from "react"
import Link from "next/link";
import { filterDuplicates } from '../../../modules/utils/array'
import useI18n from "../../../modules/i18n/useI18n";
import Section from "../../../components/Section";
import Screen from "../../../components/Screen";
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import EquipmentOptionsChooser from "../../../components/EquipmentOptionsChooser";
import useCreateCharacter from '../../../components/useCreateCharacter';
import useEquipmentItemScreenAsModal from '../../../components/useEquipmentItemScreenAsModal';

function StartingEquipmentItem({ item }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	return (
		<div className="flex px-2 py-1">
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
function Form() {
	const { tr } = useI18n()
	const { background, clss, character, updateCharacter } = useCreateCharacter()
	const [chosenItems, _setChosenItems] = useState({})

	function setChosenItems(key, items) {
		_setChosenItems({
			...chosenItems,
			[key]: items
		})
	}

	console.log({ chosenItems })

	if (!background) {
		return null
	}

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
				<Section title={`Classe - ${tr(clss.name)}`}>
					<div className="">
						<StartingEquipment
							startingEquipment={clss.startingEquipment}
							character={character}
						/>
						<EquipmentOptionsChooser
							chosenItems={chosenItems}
							setChosenItems={setChosenItems}
							options={clss.startingEquipmentOptions}
							character={character}
							prefix="clss"
						/>
					</div>
				</Section>
				<Section title="Background">
					<div className="">
						<StartingEquipment
							startingEquipment={background.startingEquipment}
							character={character}
						/>
						<EquipmentOptionsChooser
							chosenItems={chosenItems}
							setChosenItems={setChosenItems}
							options={background.startingEquipmentOptions}
							character={character}
							prefix="background"
						/>
					</div>
				</Section>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					let equipment = [
						...background.startingEquipment.map(item => ({
							index: item.index,
							quantity: item.quantity
						})),
						...Object.values(chosenItems).map(list => list.map(item => ({
							index: item.index,
							quantity: 1
						}))).flat(),
					]
 
					// get quantity for each item
					let itemAndQuantity = {}
					equipment.forEach(item => {
						if (itemAndQuantity[item.index]) {
							itemAndQuantity[item.index] += 1
						} else {
							itemAndQuantity[item.index] = 1
						}
					})

					// filter duplicates
					equipment = filterDuplicates(equipment, item => item.index)

					// update quantity previously calculated
					equipment.forEach(item => {
						item.quantity = itemAndQuantity[item.index]
					})


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
	return (
		<Screen
			title={"Équipement"}
			withBottomSpace
		>
			<Form />
		</Screen>
	);
}

export default CreateCharacterEquipment;