import isEmpty from "lodash/isEmpty"
import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../components/useCurrentCharacter"
import IconBriefcase from "../../components/icons/IconBriefcase"
import IconPlus from "../../components/icons/IconPlus"
import { useEquipmentItemScreenAsModal } from "../../components/EquipmentItemScreenAsModal"
import { useMagicItemScreenAsModal } from "../../components/MagicItemScreenAsModal"
import { useChooseEquipmentScreenAsModal } from "../../components/ChooseEquipmentScreenAsModal"
import Button from "../../components/Button"
import CharacterEquipmentItemRow from "../../components/CharacterEquipmentItemRow"
import { actionAddEquipment } from "../modules/character/action"


function Group({ title, character, items }) {
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
						character={character}
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
	const { tr } = useI18n()
	const { character, characterDispatch } = useCurrentCharacter()
	const { showChooseEquipmentModal } = useChooseEquipmentScreenAsModal()
	const grouped = groupBy(character?.actionsEquipment, item => item.equipmentCategory.index)

	return (
		<Screen
			title={`${character?.name} - Actions`}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			withCharacterMenu
		>
			{character && (
				<>
					<Group title="Armes" items={grouped.weapon} character={character} />
				</>
			)}
		</Screen>
	)
}

export default Character