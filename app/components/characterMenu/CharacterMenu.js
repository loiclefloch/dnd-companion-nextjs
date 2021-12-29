import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'

import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import useI18n from "../../modules/i18n/useI18n"
import useCharacterMenu from "./useCharacterMenu"
import ButtonBottomScreen from "../ButtonBottomScreen"
import IconClass from "../icons/IconClass"
import IconUsers from "../icons/IconUsers"

function Item({ label, href, onClick }) {
	const router = useRouter()
	const selected = router.route === href

	return (
		<Link href={href}>
			<div 
				onClick={onClick} 
				className={clsx("w-full py-2 text-lg text-center text-gray-600 border-solid",
					"transition-colors duration-200 hover:text-gray-800 hover:bg-gray-100",
					{
						"bg-gradient-to-r from-white to-blue-100": selected
					}
					)}
			>
				{label}
			</div>
		</Link>
	)
}

function CharacterMenu({ open }) {
	const character = useCurrentCharacter()
	const { hideCharacterMenu } = useCharacterMenu()
	const { tr } = useI18n()

	const menuItems = [
		{
			label: 'Personnage',
			href: '/character',
		},
		{
			label: 'Grimoire',
			href: '/character/grimoire',
		},
		{
			label: 'Actions',
			href: '/character/actions',
		},
		{
			label: 'Traits',
			href: '/character/grimoire',
		},
		{
			label: 'Porte monnaie',
			href: '/character/wallet',
		},
		{
			label: 'XP',
			href: '/character/xp',
		},
		{
			label: 'Liste des sorts',
			href: '/character/spells',
		},
	]

	// TODO: add icon on top right/left to switch character (if change hard reload the page)

	return (
		<div
			className={clsx("flex flex-col fixed z-50 top-0 bottom-0 left-0 right-0 bg-white shadow-inner",
				"transform ease-in-out transition-all duration-300", {
				"-translate-y-0": open,
				"translate-y-full": !open,
			})}
		>
			<Link href="/characters">
				<div className="absolute right-0 pt-2 pr-2">
					<IconUsers className="w-6 h-6 text-gray-700" />
				</div>
			</Link>
			<div className="mt-6">
				<div className="flex justify-center">
					<div className="p-3 border border-solid border-gray-500 rounded-full">
						<IconClass clss={character.classes[0].index} className="w-12 h-12 fill-slate-600" />
					</div>
				</div>
				<h1 className="text-2xl text-center mt-4">
					{character.name}
				</h1>
				<div className="flex flex-col items-center justify-center px-10 mt-1">
					<div>
						{character.classes.map(clss => tr(clss.name)).join(" / ")}
					</div>
					<div className="mt-4">
						<div className="flex justify-center items-center w-9 h-9 rounded-full border-2 border-solid text-gray-700 border-slate-600 text-xl">
							{character.level}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-1 flex-col-reverse items-center mb-16">
				{menuItems.reverse().map((item, index) => <Item key={index} label={item.label} href={item.href} onClick={hideCharacterMenu} />)}
			</div>
			<ButtonBottomScreen
				variant="cta"
				onClick={hideCharacterMenu}
			>
				Fermer
			</ButtonBottomScreen>
		</div>
	)
}

export default CharacterMenu