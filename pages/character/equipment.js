import groupBy from "lodash/groupBy"
import useI18n from "../../modules/i18n/useI18n"
import { useRouter } from "next/router"
import Link from "next/link"
import Screen from "../../components/Screen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import IconBriefcase from "../../components/icons/IconBriefcase"
import IconPlus from "../../components/icons/IconPlus"
import useDice from "../../components/useDice";

// function ItemRow({ item, onClick }) {
// 	return (
// 		<li className="flex flex-row mb-2 border-gray-400" onClick={onClick}>
// 			<div className="flex items-center flex-1 p-4 bg-white border rounded-md shadow cursor-pointer select-none dark:bg-gray-800">
// 				{item.image && (
// 					<div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
// 						<img src={item.image} />
// 					</div>
// 				)}

// 				<div className="flex-1 pl-1 mr-16">
// 					<div className="font-medium dark:text-white">{item.name}</div>
// 				</div>

// 				<div className="">
// 					<IconChevronRight className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200" />
// 				</div>
// 			</div>
// 		</li>
// 	)
// }

function ItemRow({ item, onClick }) {
	const { tr } = useI18n()
	const { rollDamage } = useDice()

	const isWeapon = item.equipmentCategory.index === "weapon"

	// TODO:
	const modifier = +2

	return (
		<div
			className={`cursor-pointer py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
			data-cy-item-index={`item-${item.index}`}
		>
			<div className="pl-1">
				<div className="flex flex-row">
					<div className="flex flex-col flex-1">
						<Link href={`/items/${item.index}`}>
							<span className="flex flex-row items-center font-semibold">
								<span>{tr(item.nameLocalized)}</span>
							</span>
						</Link>
						<div className="text-sm text-meta">
							{isWeapon && (
								<>
									<span>{item.categoryRange} - </span>
									<span
										onClick={(e) => {
											rollDamage(
												`${tr(item.nameLocalized)}`, 
												item.damage.damageDice, 
												modifier,
												item.damage.damageType
											)
											e.preventDefault()
										}}
									>
										{item.damage.damageDice} {modifier >= 0 ? '+' : '-'}{modifier} {item.damage.damageType.name}
									</span>
								</>
							)}
						</div>
					</div>

					<div
						className="pr-2 mt-1"
					>
						<div className="flex flex-row items-end gap-1">

						</div>
					</div>

				</div>

				<p className="pr-2 text-sm">{tr(item.resume)}</p>

			</div>
		</div>
  );
}

function Group({ title, items }) {
return (
	<div className="mx-4 mt-2 mb-4">
		<div className="font-semibold text-md">{title}</div>
		<div className="py-2">
			{items.map((item, index) => (
				<ItemRow
					key={index}
					item={item}
				/>
			))}
		</div>
	</div>
)
}

function Character() {
	const router = useRouter()
	const { tr } = useI18n()
	const character = useCurrentCharacter()

	const grouped = groupBy(character?.equipment, item => item.equipmentCategory.index)

	return (
		<Screen
			title={character?.name}
			titleIcon={<IconBriefcase className="w-6 h-6" />}
			withCharacterMenu
			rightAction={
				<button 
					onClick={() => {

					}}
				>
					<IconPlus className={"h-6 w-6 text-slate-800"} />
				</button>
			}
		>
			{character && (
				<>
					<Group title="Armes" items={grouped.weapon} />
					<Group title="Armure" items={grouped.armor} />
					<Group title="adventuring-gear" items={grouped['adventuring-gear']} />
					<Group title="Outils" items={grouped.tools} />
					<Group title="Montures et véhicules" items={grouped['mounts-and-vehicles']} />
				</>
			)}
		</Screen>
	)
}

export default Character