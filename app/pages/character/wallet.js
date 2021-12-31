import clsx from "clsx"
import { CharacterProvider} from "../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../modules/character/useCurrentCharacter"
import IconCoins from "../../components/icons/IconCoins"
import Screen from "../../components/Screen"
import useI18n from "../../modules/i18n/useI18n"
import Button from "../../components/Button"
import IconMinus from "../../components/icons/IconMinus"
import IconPlus from "../../components/icons/IconPlus"

// TODO: put this on an help screen

// https://drive.google.com/file/d/1ZSR5wA7Pfqhm-w-7U0pPKqmy6Ic2bYlc/view

// Coin				Cp			Sp			Ep			Gp			Pp
// Copper			1				1/10		1/50		1/100		1/1000
// Silver			10			1				1/5			1/10		1/100
// ElecTrum 	50			5				1				1/2			1/20
// Gold				100			10			2				1				1/10
// Platinum		1,000		100			50			10			1

// Gems
// 10 GP
// agate
// azurite
// quartz
// hematite
// lapis lazuli
// malachite
// obsidian
// rhodochrosite
// Tigers Eye
// turquoise
// Freashwater pearl

// 50 Gp
// bloodstone
// carnelian
// chalcedony
// chrysoprase
// citrine
// iolite
// jasper
// moonstone
// onyx
// peridot
// rock crystal
// sard
// sardonyx
// quartz
// zircon

// 100 Gp
// Amber
// amethyst
// Chrysoberyl
// coral
// red garnet
// jade
// pearl
// red spinel
// tourmaline

// 500 gp
// Alexandrite
// violet garnet
// black pearl
// deep blue spinel
// golden yellow topaz

// 1000 Gp
// emerald
// opal
// blue sapphire
// corundum
// black star sapphire
// star ruby

// 5000 Gp
// bright green emerald
// blue-white diamond
// jacinth

function Currency({ label, value }) {
	return (
		<div className="flex flex-row px-4">
			<div className="w-24 text-meta">{label}</div>
			<div className="w-12 text-right">{value}</div>
		</div>
	)
}

function Currencies({ currencies }) {
	const { tr } = useI18n()
	return (
		<div>
			<Currency label={tr("Platinium")} value={currencies.pp} />
			<Currency label={tr("Electrum")} value={currencies.ep} />
			<Currency label={tr("Gold")}	value={currencies.gp} />
			<Currency label={tr("Silver")} value={currencies.sp} />
			<Currency label={tr("Copper")} value={currencies.cp} />
		</div>
	)
}

const history = [
	{
		id: 1,
		label: 'Loot from gobelins',
		isAdd: true,
		amount: {
			gp: 2,
			sp: 100
		},
		amountLabel: `2G 100S`,
	},
	{
		id: 2,
		label: 'Buy a cow',
		isAdd: false,
		amount: {
			gp: 2,
			sp: 100
		},
		amountLabel: `2G 100S`,
	},
	{
		id: 2,
		label: 'Buy a book',
		isAdd: false,
		amount: {
			sp: 123
		},
		amountLabel: `123S`,
	}
]

function HistoryLine({ history }) {
	return (
		<div className="flex py-1 mx-4 my-1">
			<h3 className="leading-6 text-gray-900 text-md">
				{history.label || 'Inconnu'}
			</h3>
			<div className="flex flex-col items-end flex-1">
				<div
					className={clsx("text-sm mt-1",
						{
							"text-green-500": history.isAdd,
							"text-orange-500": !history.isAdd,
						}
					)}
				>
					{history.amountLabel}
				</div>
			</div>
		</div>
	)
}

function CharacterWallet() {
	const character = useCurrentCharacter()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character} withCharacterMenu>
			<Screen
				title="Porte monnaie"
				titleIcon={<IconCoins className="w-7 h-7 text-amber-700" />}
				isLoading={!character}
				withCharacterMenu
			>
				{character && <>
					<div className="flex justify-between mt-2">
						<Currencies currencies={character.currencies} />

						<div className="flex flex-col gap-2 mt-2 mr-4">
							<Button variant="outlined" size="small" color="success" className="items-center w-10 h-10 rounded-full"><IconPlus  className="w-4 h-4" /></Button>
							<Button variant="outlined" size="small" color="warning" className="items-center w-10 h-10 rounded-full"><IconMinus className="w-4 h-4" /></Button>
						</div>
					</div>
					<div className="mt-4">
						<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Historique</h3>
						<div className="mt-2 divide-y divide">
							{history.map(history => (
								<HistoryLine key={history.id} history={history} />
							))}
						</div>
					</div>
				</>}
			</Screen>
		</CharacterProvider>
	)
}

export default CharacterWallet