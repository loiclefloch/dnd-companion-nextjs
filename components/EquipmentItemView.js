import { useRouter } from "next/router";
import useI18n from "../modules/i18n/useI18n";
import { useEquipmentItemScreenAsModal } from "../components/EquipmentItemScreenAsModal"
import useTipDamageType from "../components/useTipDamageType"

function Section({ title, children }) {
	return (
		<div className="mt-12">
			<h4 className="text-lg font-semibold">{title}</h4>
			<div className="mt-2">{children}</div>
		</div>
	)
}

function EquipmentItemView({ item }) {
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { showTipDamageType } = useTipDamageType()
	const { tr } = useI18n()

	return (
		<div className="flex flex-col p-4" data-cy-id="equipment-item">
			<div>
				Type: {item.equipmentCategory.name}
			</div>

			<p>{tr(item.description)}</p>

			{item.isWeapon && (
				<>
					{item.damage && (
						<>
							<span>{item.categoryRange}</span>
							<span> </span>
							<span>
								<span>{item.damage.damageDice}</span>
								<span> </span>
								<span onClick={() => showTipDamageType(item.damage.damageType.index)}>{item.damage.damageType.name}</span>
							</span>
						</>
					)}
					{!item.damage && (
						<span>No damages defined, look at the description</span>
					)}
				</>
			)}

			{/* 
						http://localhost:3000/equipment/chain-shirt
					 */}
			{item.isArmor && (
				<>
					<span>{item.armorCategory}</span>
					<span>
						AC {item.armorClass.base} {item.stealthDisadvantage && <span>Stealth disavantage</span>}
					</span>
					{item.armorClass.dexBonus === true && <span>DEX bonus (max: {item.armorClass.maxBonus})</span>}
					<span>STR min: {item.strMinimum}</span>
				</>
			)}

			{/* http://localhost:3000/equipment/abacus */}
			{item.isAdventuringGear && (
				<>
					<span>{item.gearCategory.name}</span>
				</>
			)}

			{item.isTools && (
				<>
					<span>{item.toolCategory}</span>
				</>
			)}

			{item.isMountAndVehicules && (
				<>
					<span>{item.vehicleCategory} </span>
					{item.speed && (
						<span> - {item.speed.quantity} {item.speed.unit}</span>
					)}
				</>
			)}

			{item.weight && (
				<span>Weight: {item.weight}</span>
			)}

			{item.cost && (
				<span>
					{item.cost.quantity} {item.cost.unit.toUpperCase()}
				</span>
			)}

			{/* http://localhost:3000/equipment/explorers-pack */}
			{item.contents && (
				<Section title="Contenu">
					<ul className="ml-6 list-disc">
						{item.contents.map(subItem => (
							<li
								key={subItem.item.index}
								onClick={() => showEquipmentItemScreenAsModal(subItem.item.index)}
							>
								{subItem.item.name} {subItem.quantity}
							</li>
						))}
					</ul>
				</Section>

			)}

		</div>
	)
}

export default EquipmentItemView