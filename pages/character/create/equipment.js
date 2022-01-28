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
import Section from "../../../components/Section";

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

function EquipmentCategoryChoice({ chosenItems, character, setChosenItems, option }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	return (
		<ListSelector
			value={chosenItems}
			multiple
			nbMaxValues={option.choose}
			options={option.from.items.map(item => {
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
function EquipmentCategoryChoiceContainer({ chosenItems, character, setChosenItems, option }) {

	return (
		<div className="mt-8">
			<h2>{option.type} - {option.from.equipmentCategory.name}</h2>
			<div className="text-sm text-meta">Choisissez {option.choose}</div>
			<div>
				<EquipmentCategoryChoice
					chosenItems={chosenItems}
					character={character}
					setChosenItems={setChosenItems}
					option={option}
				/>
			</div>
		</div>
	)
}

function EquipmentOptions({ chosenItems, character, setChosenItems, options }) {
	if (!options) {
		return null
	}
	return (
		<>
			{options.map((option, index) => (
				<EquipmentCategoryChoiceContainer 
					key={index} 
					option={option} 
					chosenItems={chosenItems['EquipmentOptions'] || []}
					setChosenItems={(items) => setChosenItems('EquipmentOptions', items)}
					character={character}
				/>
			))}
		</>
	)
}


function ClassEquipmentOption({ index, option, character, chosenItems, setChosenItems }) {
	const [selectedSubOption, setSelectedSubOption] = useState(null) // index of the sub option
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()

	return (
		<div className="mb-4">
			<h4 className="border-b border-solid border-slate-300">Option d'équipment {index + 1}</h4>
			{!option.hasSubChoice ? (
				<EquipmentCategoryChoice
					key={index}
					option={option}
					chosenItems={chosenItems[`classEquipmentOption_${index}`] || []}
					setChosenItems={(items) => setChosenItems(`classEquipmentOption_${index}`, items)}
					character={character}
				/>
			) : (
				// not a choice, defined
				<div className="ml-2 divide divide-y">
					{option.from.map((subOption, index) => (
						<div key={index}>
							<ListSelector.Row
								label={<span>
									<>
										{subOption.isTypeEquipment && subOption.item.name}
										{subOption.isTypeSubOption && <span>{subOption.choose} dans le pack : {subOption.from.equipmentCategory.name}</span>}
									</>
								</span>
								}
								selected={selectedSubOption === index}
								rightView={subOption.isTypeEquipment && <div
									className="px-4 py-2 text-xs text-meta"
									onClick={() => showEquipmentItemScreenAsModal(subOption.item)}
								>
									?
								</div>}
								onClick={() => {
									setSelectedSubOption(index)
									if (subOption.isTypeEquipment) {
										setChosenItems(`classEquipmentOption_${index}`, [subOption.item])
									}
								}}
							/>

							<div className="ml-4">
								{subOption.isTypeSubOption && selectedSubOption === index && (
									<>
										{selectedSubOption === index && (
											<EquipmentCategoryChoice
												key={index}
												option={subOption}
												chosenItems={chosenItems[`classEquipmentOption_${index}`] || []}
												setChosenItems={(items) => setChosenItems(`classEquipmentOption_${index}`, items)}
												character={character}
											/>
										)}
									</>
								)}
							</div>
							{/* {index !== option.from.length - 1 && (
										<div>--- OR ---</div>
									)} */}
						</div>
					))}
				</div>
			)}
		</div>
	)
}


function ClassEquipmentOptions({ chosenItems, character, setChosenItems, options }) {
	if (!options) {
		return null
	}
	// TODO: setChosenItems by option
	// debugger
	return (
		<div className="divide divide-y prose">
			{options.map((option, index) => (
				<ClassEquipmentOption 
					key={index} 
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



function Form() {
	const { background, clss, character, updateCharacter } = useCreateCharacter()
	const [chosenItems, _setChosenItems] = useState({})

	function setChosenItems(key, items) {
		_setChosenItems({
			...chosenItems,
			[key]: items
		})
	}

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

			<Section title="Class">
				<div className="mx-4">
					<StartingEquipment
						startingEquipment={clss.startingEquipment}
						character={character}
					/>
					<ClassEquipmentOptions
						chosenItems={chosenItems}
						setChosenItems={setChosenItems}
						options={clss.startingEquipmentOptions}
						character={character}
					/>
				</div>
			</Section>
			<Section title="Background">
				<div className="mx-4">
					<StartingEquipment
						startingEquipment={background.startingEquipment}
						character={character}
					/>
					<EquipmentOptions
						chosenItems={chosenItems}
						setChosenItems={setChosenItems}
						options={background.startingEquipmentOptions}
						character={character}
					/>
				</div>
			</Section>
			

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					const equipment = [
						...background.startingEquipment.map(item => ({
							index: item.index,
							quantity: item.quantity
						})),
						...Object.values(chosenItems).map(list => list.map(item => ({
							index: item.index,
							quantity: 1
						}))).flat(),
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