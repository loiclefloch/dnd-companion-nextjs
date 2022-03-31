import clsx from "clsx"
import Link from "next/link"
import { useRouter } from 'next/router'

import useCurrentCharacter from "../../components/useCurrentCharacter"
import { makeI18n } from "../../modules/i18n/useI18n"
import useCharacterMenu from "./useCharacterMenu"
import ButtonBottomScreen from "../ButtonBottomScreen"
import IconClass from "../icons/IconClass"
import IconUsers from "../icons/IconUsers"
import IconD8 from "../icons/IconD8"
import useDiceHistory from "../useDiceHistory"

const useI18n = makeI18n({
	'menuItem.character': {
		fr: `Personnage`,
		en: `Character`,
	},
	'menuItem.grimoire': {
		fr: `Grimoire`,
		en: `Grimoire`,
	},
	'menuItem.equipment': {
		fr: `Équipement`,
		en: `Equipement`,
	},
	'menuItem.actions': {
		fr: `Actions`,
		en: `Actions`,
	},
	'menuItem.wallet': {
		fr: `Porte monnaie`,
		en: `Wallet`,
	},
	'menuItem.levelling': {
		fr: `XP`,
		en: `XP`,
	},
	'menuItem.spells': {
		fr: `Liste des sorts`,
		en: `Spells list`,
	},
	'menuItem.background': {
		fr: `Résumé`,
		en: `Resume`,
	},
})

function Item({ label, href, route, onClick }) {
	const router = useRouter()
	const selected = router.asPath === href

	return (
		<Link href={href} passHref>
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
	const router = useRouter()
	const { character } = useCurrentCharacter()
	const { hideCharacterMenu } = useCharacterMenu()
	const { showDiceHistoryScreen } = useDiceHistory()
	const { tr } = useI18n()

	if (!character) {
		return null
	}

	const menuItems = [
		{
			label: tr`menuItem.character`,
			href: `/character/${character.id}`,
		},
		{
			label: tr`menuItem.grimoire`,
			href: '/character/grimoire',
		},
		{
			label: tr`menuItem.actions`,
			href: '/character/actions',
		},
		{
			label: tr`menuItem.equipment`,
			href: '/character/equipment',
		},
		{
			label: tr`menuItem.wallet`,
			href: '/character/wallet',
		},
		{
			label: tr`menuItem.levelling`,
			href: '/character/levelling',
		},
		{
			label: tr`menuItem.spells`,
			href: '/character/spells',
		},
		{
			label: tr`menuItem.background`,
			href: '/character/background',
		},
	]

	// TODO: add icon on top right/left to switch character (if change hard reload the page)

	return (
		<div
			className={clsx("flex flex-col fixed z-50 top-0 bottom-0 left-0 right-0 bg-white shadow-inner bg-app",
				"transform ease-in-out transition-all duration-300", {
				"-translate-y-0": open,
				"translate-y-full": !open,
			})}
		>
			<button
				type="button"
				onClick={() => {
					showDiceHistoryScreen()
					hideCharacterMenu()
				}}
				className="absolute left-0 px-2 pt-2"
			>
				<IconD8 className="w-8 h-8 text-gray-700" />
			</button>
			<Link href="/characters" passHref>
				<div
					className="absolute right-0 px-2 pt-2"
					onClick={() => hideCharacterMenu()}
				>
					<IconUsers className="w-6 h-6 text-gray-700" />
				</div>
			</Link>
			<div className="mt-6">
				<div className="flex justify-center">
					<div className="p-3 border border-gray-500 border-solid rounded-full">
						<IconClass clss={character.classes[0].index} className="w-12 h-12 fill-slate-600" />
					</div>
				</div>
				<h1 className="mt-4 text-2xl text-center">
					{character.name}
				</h1>
				<div className="flex flex-col items-center justify-center px-10 mt-1">
					<div>
						{character.classes.map(clss => tr(clss.name)).join(" / ")}
					</div>
					<div className="mt-4">
						<div
							className="flex items-center justify-center text-xl text-gray-700 border-2 border-solid rounded-full w-9 h-9 border-slate-600"
							onClick={() => {
								router.replace(`/levelling/${character.classes[0].index}/${character.level}`)
								hideCharacterMenu()
							}}
						>
							{character.level}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col-reverse items-center flex-1 mb-16 overflow-y-auto">
				{menuItems.reverse().map((item, index) =>
					<Item
						key={index}
						label={item.label}
						href={item.href}
						onClick={hideCharacterMenu}
					/>
				)}
			</div>
			<ButtonBottomScreen
				variant="cta"
				onClick={hideCharacterMenu}
			>
				{tr`close.action`}
			</ButtonBottomScreen>
		</div>
	)
}

export default CharacterMenu