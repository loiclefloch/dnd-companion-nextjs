import useCharacterMenu from "./useCharacterMenu"

function Item({ label, url }) {
	return (
		<div className="w-full py-2 font-semibold text-lg text-slate-800 text-center">
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
		<div className="flex fixed z-50 top-0 bottom-0 left-0 right-0 bg-white">
			<div className="flex flex-1 flex-col-reverse items-center mb-12">
				{menuItems.reverse().map((item, index) => <Item key={index} label={item.label} url={item.url} />)}
			</div>
			<button 
				className="absolute bottom-0 left-0 right-0 flex justify-center w-full p-2 bg-white text-slate-800 uppercase border-t border-solid border-slate-300"
			 	onClick={hideCharacterMenu}
			>
				<span>
					Fermer
				</span>
			</button>
		</div>
	)
}

export default CharacterMenu