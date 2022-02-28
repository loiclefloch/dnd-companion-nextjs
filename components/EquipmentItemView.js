import { isEmpty } from "lodash"
import { makeI18n } from "../modules/i18n/useI18n";
import useEquipmentItemScreenAsModal from "../components/useEquipmentItemScreenAsModal"
import useCurrentCharacter from "./useCurrentCharacter";
import { 
	actionEquip,
	actionUnequip,
} from "../modules/character/action"
import useTipDamageType from "./useTipDamageType"
import useDice from "./useDice";
import Button from "./Button"
import ItemTagIsEquipped from "./ItemTagIsEquipped"
import LineInfo from "./LineInfo";
import Section from "./Section";
import useTipWeaponProperty from "./useTipWeaponProperty"
import Tag from "./Tag"

const useI18n = makeI18n({
	'action.unequip': {
		fr: 'Déséquiper',
		en: 'Unequip'
	},
	'action.equip': {
		fr: 'Équiper',
		en: 'Equip',
	},
	'armorClassDexBonusMaxBonus': {
		fr: `DEX max bonus`,
		en: `DEX bonus max`,
	},
	'armorClssStrMin': {
		fr: 'Min STR',
		en: 'STR min',
	},
	weight: {
		fr: 'Poids',
		en: 'Weight',
	},
	cost: {
		fr: 'Coût',
		en: 'Cost',
	},
	isProeficient: {
		fr: 'À la maîtrise',
		en: 'Is proeficient',
	},
	melee: {
		fr: 'Mélée',
		en: 'Melee',
	},
	ranged: {
		fr: 'À distance',
		en: 'Ranged',
	},
	meleeAttackRollModifier: {
		fr: 'Modifieur attaque de mélée',
		en: 'Melee attack roll modifier',
	},
	rangedAttackRollModifier: {
		fr: 'Modifieur attaque à distance',
		en: 'Ranged attack roll modifier',
	},
	quantity: {
		fr: 'quantité',
		en: 'quantity',
	},
	damages: {
		fr: 'dommages',
		en: 'damages',
	},
	categoryRangeType: {
		fr: 'Type',
		en: 'Type',
	},
	twoHanded: {
		fr: "À deux mains",
		en: "Two handed",
	},
	"warn.no damages defined": {
		fr: "No damages defined, look at the description",
		en: "No damages defined, look at the description",
	},
	"attack.isMelee": {
		fr: "Attaquer (mélée)",
		en: "Attack (melee)",
	},
	"attack.isRanged": {
		fr: "Attaquer (à distance)",
		en: "Attack (ranged)",
	},
	"attack.throw": {
		fr: "Lancer",
		en: "Throw",
	},
	'damages.oneHanded': {
		fr: "Dégats (une main)",
		en: "Damages (one handed)",
	},
	'damages.twoHanded': {
		fr: "Dégats (Deux mains)",
		en: "Damages (two handed)",
	},
	"content.title": {
		fr: "Contenu",
		en: "Content",
	},
	"properties.title": {
		fr: "Propriétés",
		en: "Properties",
	},
})

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
										{tr`action.unequip`}
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
										{tr`action.equip`}
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
									AC {item.stealthDisadvantage && <span>{tr`stealthDisadvantage`}</span>}
								</span>
							}
							value={item.armorClass.base}
						/>

						{item.armorClass.dexBonus === true && <LineInfo label={tr`armorClassDexBonusMaxBonus`} value={item.armorClass.maxBonus} />}

						<LineInfo label={tr`armorClssStrMin`} value={item.strMinimum} />
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
					<LineInfo label={tr`weight`} value={item.weight} />
				)}

				{item.cost && (
					<LineInfo label={tr`cost`} value={<span>{item.cost.quantity} {item.cost.unit.toUpperCase()}</span>} />
				)}

				{item.isCharacterContextItem && (
					<>
						<LineInfo label={tr`isProeficient`} value={item.isProeficient ? "oui" : "non"} />

						{item.isMelee && <LineInfo label={tr`melee`} />}
						{item.isRanged && <LineInfo label={tr`ranged`} />}
						{item.hasPropertyThrown && <LineInfo label="Peut être lancée" />}

						{item.isMelee &&
							<>
								<LineInfo label={tr`meleeAttackRollModifier`} value={item.meleeAttackRollModifierLabel} />
							</>
						}
						
						{item.isRanged &&
							<>
								<LineInfo label={tr`rangedAttackRollModifier`} value={item.rangedAttackRollModifierLabel} />
							</>
						}

						{/* no quantity for unarmed-strike */}
						{item.quantity && <LineInfo label={tr`quantity`} value={<>x{item.quantity}</>} />}
					</>
				)}

				{item.isWeapon && item.damage && (
					<>
						<LineInfo label={tr`categoryRangeType`} value={item.categoryRange} />
						<LineInfo 
							label={<>{tr`damages`}</>}
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
								label={tr`twoHanded`}
								value={
									<>
										<span>{item.twoHandedDamage.damageDice}{item.attackRollModifierLabel}</span>
										<span> </span>
										<span onClick={() => showTipDamageType(item.twoHandedDamage.damageType.index)}>
											{item.twoHandedDamage.damageType.name}
										</span>
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
						<span>{tr`warn.no damages defined`}</span>
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
											{tr`attack.isMelee`}
											</Button>
										)}

										{item.isRanged && (
											<Button
												variant="outlined"
												onClick={() => {
													// TODO: run 1d20 + isProeficient ?
												}}
											>
												{tr`attack.isRanged`}
											</Button>
										)}

										{item.hasPropertyThrown && (
											<Button
												variant="outlined"
												onClick={() => {
													// TODO: run 1d20 + isProeficient ? 
												}}
											>
												{tr`attack.throw`}
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
										{tr('damages.oneHanded')} <span>{item.damage.damageDice}{item.attackRollModifierLabel}</span>
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
											{tr('damages.twoHanded')} <span>{item.twoHandedDamage.damageDice}{item.twoHandedDamage.damageType.name}</span>
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
				<Section title={tr`content.title`}>
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
				<Section title={tr`properties.title`}>
					<LineInfo.Parent>
						{item.properties.map(property => (
							<LineInfo 
								key={property.index} 
								label={property.name}
								value={
									<span className="text-meta px-2" onClick={() => showTipWeaponProperty(property.index)}>
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