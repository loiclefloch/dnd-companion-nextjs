import Link from "next/link"
import useCharacterMenu from "./useCharacterMenu"
import ButtonBottomScreen from "../ButtonBottomScreen"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import useI18n from "../../modules/i18n/useI18n"
import IconClass from "../icons/IconClass"

function Item({ label, href, onClick }) {
	return (
		<Link href={href}>
			<div onClick={onClick} className="w-full py-2 text-lg text-center text-gray-600 rounded-lg 
			transition-colors duration-200 hover:text-gray-800 hover:bg-gray-100 ">
				{label}
			</div>
		</Link>
	)
}

function CharacterMenu() {
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

	return (
		<div className="flex flex-col fixed z-50 top-0 bottom-0 left-0 right-0 bg-white shadow-inner">
			<div className="mt-6">
				<div className="flex justify-center">
					<div className="p-3 border border-solid border-gray-500 rounded-full">
						<IconClass clss={character.classes[0].index} className="w-12 h-12 fill-gray-600" />
					</div>
				</div>
				<h1 className="text-2xl text-center mt-4">
					{character.name}
				</h1>
				<div className="flex flex-col items-center justify-center px-10 mt-4">
					<div>
						{character.classes.map(clss => tr(clss.name)).join(" / ")}
					</div>
					<div className="mt-2">
						<div className="flex justify-center items-center w-9 h-9 rounded-full border border-solid border-gray-500 text-gray-700 text-xl">
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