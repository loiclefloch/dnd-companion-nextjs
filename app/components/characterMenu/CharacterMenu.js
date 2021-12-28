import Link from "next/link"
import useCharacterMenu from "./useCharacterMenu"
import ButtonBottomScreen from "../ButtonBottomScreen"

function Item({ label, href }) {
	return (
		<Link href={href}>
			<div className="w-full py-2 font-semibold text-lg text-slate-800 text-center">
				{label}
			</div>
		</Link>
	)
}

function CharacterMenu() {
	const { hideCharacterMenu } = useCharacterMenu()

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

	return (
		<div className="flex fixed z-50 top-0 bottom-0 left-0 right-0 bg-white shadow-inner">
			<div className="flex flex-1 flex-col-reverse items-center mb-12">
				{menuItems.reverse().map((item, index) => <Item key={index} label={item.label} href={item.href} />)}
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