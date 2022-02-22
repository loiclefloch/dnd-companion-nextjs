import isEmpty from "lodash/isEmpty"
import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../components/useCurrentCharacter"
import IconBriefcase from "../../components/icons/IconBriefcase"
import IconPlus from "../../components/icons/IconPlus"
import useEquipmentItemScreenAsModal from "../../components/useEquipmentItemScreenAsModal"
import useMagicItemScreenAsModal from "../../components/useMagicItemScreenAsModal"
import useChooseEquipmentScreenAsModal from "../../components/useChooseEquipmentScreenAsModal"
import Button from "../../components/Button"
import { actionAddEquipment } from "../../modules/character/action"
import CharacterEquipmentItemRow from "../../components/CharacterEquipmentItemRow"

function Group({ title, items }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showMagicItemScreenAsModal } = useMagicItemScreenAsModal()

	if (!items) {
		return null
	}

	return (
		<div className="mx-4 mt-2 mb-4 select-none">
			<div className="font-semibold text-md">{title}</div>
			<div className="py-2">
				{items?.map((item, index) => (
					<CharacterEquipmentItemRow
						key={index} // index since we could have multiple times the same item for a character?
						item={item}
						onClick={() => {
							if (item.isMagicItem) {
								showMagicItemScreenAsModal(item)
							} else {
								showEquipmentItemScreenAsModal(item)
							}
						}}
					/>
				))}
			</div>
		</div>
	)
}

function Character() {
	const { character, characterDispatch } = useCurrentCharacter()
	const { showChooseEquipmentModal } = useChooseEquipmentScreenAsModal()
	const grouped = groupBy(character?.equipment, item => item.itemCategory)
	
	// X adventuring-gear
	// X ammunition
	// X armor
	// X mounts-and-vehicles
	// X potion
	// X ring
	// X rod
	// scroll
	// staff
	// tools
	// wand
	// weapon
	// wondrous-items

	function onShowChooseEquipmentModal() {
		showChooseEquipmentModal(
			function onChooseEquipment(list) {
				characterDispatch(actionAddEquipment(list))
			}
		)
	}

	return (
		<Screen
			title={`${character?.name} - Matériel`}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			root
			withCharacterMenu
			rightAction={
				<button 
					onClick={onShowChooseEquipmentModal}
				>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			{character && character.hasNoEquipment && (
				<div className="px-4">
					<p className="mt-12 text-center">
						Vous n'avez pas d'équipment.
					</p>
					<Button 
						variant="outlined"
						className="mt-12"
						onClick={onShowChooseEquipmentModal}
					>
						Ajouter de l'équipment
					</Button>
				</div>
			)}
			{character && (
				<>
					<Group 
						title="Armes" 
						items={grouped.weapon} 
						character={character}
					/>
					<Group 
						title="Armure" 
						items={grouped.armor} 
						character={character}
					/>
					<Group 
						title="Ring" 
						items={grouped.ring} 
						character={character}
					/>
					<Group 
						title="Ammunition" 
						items={grouped.ammunition} 
						character={character}
					/>
					<Group 
						title="adventuring-gear" 
						items={grouped['adventuring-gear']} 
						character={character}
					/>
					<Group 
						title="Potions" 
						items={grouped.potion} 
						character={character}
					/>
					<Group 
						title="Outils" 
						items={grouped.tools} 
						character={character}
					/>
					<Group 
						title="Montures et véhicules" 
						items={grouped['mounts-and-vehicles']} 
						character={character}
					/>
					<Group 
						title="wondrous-items" 
						items={grouped['wondrous-items']} 
						character={character}
					/>
					<Group 
						title="Rod" 
						items={grouped.rod} 
						character={character}
					/>
					<Group 
						title="Scroll" 
						items={grouped.scroll} 
						character={character}
					/>
					<Group 
						title="Staff" 
						items={grouped.staff} 
						character={character}
					/>
					<Group 
						title="Wand" 
						items={grouped.wand} 
						character={character}
					/>
				</>
			)}
		</Screen>
	)
}

export default Character