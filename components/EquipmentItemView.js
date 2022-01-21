import { useRouter } from "next/router";
import useI18n from "../modules/i18n/useI18n";
import { useEquipmentItemScreenAsModal } from "../components/EquipmentItemScreenAsModal"
import useTipDamageType from "./useTipDamageType"
import useDice from "./useDice";
import Button from "./Button"

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
	const { rollDamage } = useDice()
	const { tr } = useI18n()

	return (
		<div className="flex flex-col p-4" data-cy-id="equipment-item">
			<div>
				Type: {item.equipmentCategory.name}
			</div>

			<p>{tr(item.description)}</p>

			{item.isCharacterContextItem && (
				<div>
					<div>isProeficient: {item.isProeficient ? "oui" : "non"}</div>

					<div>
						{item.isMelee && "Mélée"}
						{item.isRanged && "Ranged"}
						{item.hasPropertyThrown && "Peut être lancée"}
					</div>

					{item.isMelee && <>
						<div>meleeAttackRollModifier: {item.meleeAttackRollModifier}</div>
						<div>meleeAttackRollModifierLabel: {item.meleeAttackRollModifierLabel}</div>
					</>}
					{item.isRanged && <>
						<div>rangedAttackRollModifier: {item.rangedAttackRollModifier}</div>
						<div>rangedAttackRollModifierLabel: {item.rangedAttackRollModifierLabel}</div>
					</>}

					<div>quantity: x{item.quantity}</div>
				</div>
			)}

			{item.isWeapon && (
				<>
					{item.damage && (
						<div>
							<>
								<div>{item.categoryRange}</div>
								<div>
									<span>{item.damage.damageDice}{item.attackRollModifierLabel}</span>
									<span> </span>
									<span onClick={() => showTipDamageType(item.damage.damageType.index)}>{item.damage.damageType.name}</span>
								</div>

								{item.hasPropertyTwoHandedDamages && (
									<div>
										<span>Deux mains : {item.twoHandedDamage.damageDice}{item.attackRollModifierLabel}</span>
										<span> </span>
										<span onClick={() => showTipDamageType(item.twoHandedDamage.damageType.index)}>{item.twoHandedDamage.damageType.name}</span>
									</div>
									)}
							</>
							<>
								{/* 
									- If Melee -> can attack
									- If hasPropertyThrown
										- can throw
										-> throw is using DEX if finesse, STR otherwise. For now we force to use the higher one
									- Ranged 
										- ranged attack is using DEX
								*/}
								{item.isCharacterContextItem && (
									<>
										{item.isMelee && (
											<Button
												variant="outlined"
											>
												Attaquer (mélée)
											</Button>
										)}

										{item.isRanged && (
											<Button
												variant="outlined"
											>
												Attaquer (à distance)
											</Button>
										)}

										{item.hasPropertyThrown && (
											<Button
												variant="outlined"
											>
												Lancer
											</Button>
										)}
									</>
								)}

								<>
									<Button
										variant="outlined"
										onClick={(e) => {
											rollDamage(
												`${tr(item.nameLocalized)}`,
												item.damage.damageDice,
												0,
												item.damage.damageType
											)
											e.preventDefault()
										}}
									>
										Dégats (une main) <span>{item.damage.damageDice}{item.attackRollModifierLabel}</span>
									</Button>

									{item.hasPropertyTwoHandedDamages && (
										<Button
											variant="outlined"
											onClick={(e) => {
												rollDamage(
													`${tr(item.nameLocalized)}`,
													item.twoHandedDamage.damageDice,
													0,
													item.twoHandedDamage.damageType
												)
												e.preventDefault()
											}}
										>
											Dégats (deux mains) <span>{item.twoHandedDamage.damageDice}{item.twoHandedDamage.damageType.name}</span>
										</Button>
									)}
								</>

							</>
						</div>
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
						AC {item.armorClass.base} {item.stealthDisadvantage && <span>Stealth disadvantage</span>}
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
								onClick={() => showEquipmentItemScreenAsModal(subItem.item)}
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