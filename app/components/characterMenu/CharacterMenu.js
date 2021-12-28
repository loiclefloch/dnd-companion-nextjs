import useCharacterMenu from "./useCharacterMenu"

function Item({ label, url }) {
	return (
		<div className="p-2">
			{label}
		</div>
	)
}

function CharacterMenu() {
	const { hideCharacterMenu } = useCharacterMenu()

	const menuItems = [
		{
			label: 'Personnage',
			url: '/character',
		},
		{
			label: 'Grimoire',
			url: '/character/grimoire',
		},
		{
			label: 'Actions',
			url: '/character/actions',
		},
		{
			label: 'Traits',
			url: '/character/grimoire',
		},
		{
			label: 'Porte monnaie',
			url: '/character/wallet',
		},
		{
			label: 'XP',
			url: '/character/xp',
		},
		{
			label: 'Liste des sorts',
			url: '/character/spells',
		},
	]

	return (
		<div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-white p-4">
			<div className="flex flex-col items-center">
				{menuItems.map((item, index) => <Item key={index} label={item.label} url={item.url} />)}
			</div>
			<div className="fixed bottom-0 left-0 right-0 flex items-center">
				<button onClick={hideCharacterMenu}>Fermer</button>
			</div>
		</div>
	)
}

export default CharacterMenu