import { isEmpty } from "lodash"
import useI18n from "../modules/i18n/useI18n";
import { useEquipmentItemScreenAsModal } from "../components/EquipmentItemScreenAsModal"
import useCurrentCharacter, { 
	actionEquip,
	actionUnequip,
} from "../modules/character/useCurrentCharacter"
import useTipDamageType from "./useTipDamageType"
import useDice from "./useDice";
import Button from "./Button"
import ItemTagIsEquipped from "./ItemTagIsEquipped"
import LineInfo from "./LineInfo";
import Section from "./Section";
import useTipWeaponProperty from "./useTipWeaponProperty"
import Tag from "./Tag"

function EquipmentItemView({ item, onCloseScreen }) {
	const { showTipWeaponProperty } = useTipWeaponProperty()
	const { showEquipmentItemScreenAsModal } = useEquipmentItemScreenAsModal()
	const { characterDispatch } = useCurrentCharacter()
	const { showTipDamageType } = useTipDamageType()
	const { rollDamage } = useDice()
	const { tr } = useI18n()

	return (
		<div className="flex flex-col p-4" data-cy-id="equipment-item">
			{/* TODO: design on chip */}
			<div>
				<Tag className="border border-blue-400 text-blue-400" size="small">
					{item.equipmentCategory.name}
				</Tag>
			</div>

			{item.description && tr(item.description) && <p className="mt-4">{tr(item.description)}</p>}

			{item.isCharacterContextItem && (
				<div>
					<div className="flex justify-between items-center mt-1">
						{item.canBeEquipped && (
							<>
								<ItemTagIsEquipped item={item} />

								{item.isEquipped && (
									<Button
										size="small"
										variant="outlined"
										className="w-36"
										onClick={() => {
											characterDispatch(actionUnequip(item))
											onCloseScreen()
										}}
									>
										Déséquiper
									</Button>
								)}

								{!item.isEquipped && (
									<Button
										size="small"
										variant="outlined"
										className="w-36"
										onClick={() => {
											characterDispatch(actionEquip(item))
											onCloseScreen()
										}}
									>
										Équiper
									</Button>
								)}

							</>
						)}	
					</div>

				</div>
			)}

			<LineInfo.Parent className="my-4">
				{/* http://localhost:3000/equipment/chain-shirt */}
				{item.isArmor && (
					<>
						{item.armorCategory && <LineInfo label={item.armorCategory} />}

						<LineInfo
							label={
								<span>
									AC {item.stealthDisadvantage && <span>Stealth disadvantage</span>}
								</span>
							}
							value={item.armorClass.base}
						/>

						{item.armorClass.dexBonus === true && <LineInfo label="DEX bonus max" value={item.armorClass.maxBonus} />}

						<LineInfo label="STR min" value={item.strMinimum} />
					</>
				)}

				{/* http://localhost:3000/equipment/abacus */}
				{item.isAdventuringGear && (
					<>
						<LineInfo label={item.gearCategory.name} />
					</>
				)}

				{item.isTools && (
					<>
						<LineInfo label={item.toolCategory} />
					</>
				)}

				{item.isMountAndVehicules && (
					<>
						<LineInfo label={item.vehicleCategory} value={item.speed && (<span> - {item.speed.quantity} {item.speed.unit}</span>)} />
					</>
				)}

				{item.weight && (
					<LineInfo label="Poids" value={item.weight} />
				)}

				{item.cost && (
					<LineInfo label="Prix" value={<span>{item.cost.quantity} {item.cost.unit.toUpperCase()}</span>} />
				)}

				{item.isCharacterContextItem && (
					<>
						<LineInfo label="isProeficient" value={item.isProeficient ? "oui" : "non"} />

						{item.isMelee && <LineInfo label="Mélée" />}
						{item.isRanged && <LineInfo label="Ranged" />}
						{item.hasPropertyThrown && <LineInfo label="Peut être lancée" />}

						{item.isMelee &&
							<>
								<LineInfo label="meleeAttackRollModifier" value={item.meleeAttackRollModifierLabel} />
							</>
						}
						
						{item.isRanged &&
							<>
								<LineInfo label="rangedAttackRollModifier" value={item.rangedAttackRollModifierLabel} />
							</>
						}

						{/* no quantity for unarmed-strike */}
						{item.quantity && <LineInfo label="quantity" value={<>x{item.quantity}</>} />}
					</>
				)}

				{item.isWeapon && item.damage && (
					<>
						<LineInfo label="Type" value={item.categoryRange} />
						<LineInfo 
							label={<>Dégats</>}
							value={
								<>
									<span>{item.damage.damageDice}{item.attackRollModifierLabel}</span>
									<span> </span>
									<span onClick={() => showTipDamageType(item.damage.damageType.index)}>{item.damage.damageType.name}</span>
								</>
							}
						/>
							
						{item.hasPropertyTwoHandedDamages && (
							<LineInfo
								label="À deux mains"
								value={
									<>
										<span>{item.twoHandedDamage.damageDice}{item.attackRollModifierLabel}</span>
										<span> </span>
										<span onClick={() => showTipDamageType(item.twoHandedDamage.damageType.index)}>{item.twoHandedDamage.damageType.name}</span>
									</>
								}
							/>
						)}
					</>
				)}
			</LineInfo.Parent>


			{item.isWeapon && (
				<>
					{!item.damage && (
						<span>No damages defined, look at the description</span>
					)}
					{item.damage && (
						<div>
						
							<div className="gap-2 flex flex-col">
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
												onClick={() => {
													// TODO: run 1d20 + isProeficient ? 
												}}
											>
												Attaquer (mélée)
											</Button>
										)}

										{item.isRanged && (
											<Button
												variant="outlined"
												onClick={() => {
													// TODO: run 1d20 + isProeficient ?
												}}
											>
												Attaquer (à distance)
											</Button>
										)}

										{item.hasPropertyThrown && (
											<Button
												variant="outlined"
												onClick={() => {
													// TODO: run 1d20 + isProeficient ? 
												}}
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

							</div>
						</div>
					)}
				
				</>
			)}

			{/* http://localhost:3000/equipment/explorers-pack */}
			{item.contents && (
				<Section title="Contenu">
					<LineInfo.Parent>
						{item.contents.map(subItem => (
							<LineInfo
								key={subItem.item.index}
								onClick={() => showEquipmentItemScreenAsModal(subItem.item)}
								label={subItem.item.name}
								value={subItem.quantity}
							/>
						))}
					</LineInfo.Parent>
				</Section>
			)}

			{!isEmpty(item.properties) && (
				<Section title="Propriétés">
					<LineInfo.Parent>
						{item.properties.map(property => (
							<LineInfo 
								key={property.index} 
								label={property.name}
								value={
									<span className="text-meta" onClick={() => showTipWeaponProperty(property.index)}>
										?
									</span>
								}
							/>

						))}
					</LineInfo.Parent>
				</Section>
			)}

		</div>
	)
}

export default EquipmentItemView