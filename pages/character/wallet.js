import clsx from "clsx"
import { CharacterProvider} from "../../modules/character/ContextCharacter"
import useCurrentCharacter from "../../components/useCurrentCharacter"
import IconCoins from "../../components/icons/IconCoins"
import Screen from "../../components/Screen"
import useI18n from "../../modules/i18n/useI18n"
import Button from "../../components/Button"
import IconMinus from "../../components/icons/IconMinus"
import IconPlus from "../../components/icons/IconPlus"
import useEditWallet from "../../components/useEditWallet"
import {
	actionWalletAddIncome,
	actionWalletAddExpense,
} from "../../modules/character/action"

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

function Currency({ label, name, value }) {
	return (
		<div className="flex flex-row px-4">
			<div className="w-24 text-meta">
				{label}
				<span className="text-xs text-meta pl-1">({name})</span>
			</div>
			<div className="w-12 text-right">{value}</div>
		</div>
	)
}

function Currencies({ currencies }) {
	const { tr } = useI18n()
	return (
		<div>
			<Currency name="pp" label={tr("Platinium")} value={currencies.pp} />
			<Currency name="ep" label={tr("Electrum")} value={currencies.ep} />
			<Currency name="gp" label={tr("Gold")}	value={currencies.gp} />
			<Currency name="sp" label={tr("Silver")} value={currencies.sp} />
			<Currency name="cp" label={tr("Copper")} value={currencies.cp} />
		</div>
	)
}


function HistoryLabel({ history }) {
	const currenciesNames = [
		"cp",
		"sp",
		"gp",
		"ep",
		"pp",
	].reverse()

	return (
		<span>
			{currenciesNames.map(name => {
				if (!history[name] || history[name] === 0) {
					return null
				}
				return <span key={name} className="pl-1">{history[name]} {name.toUpperCase()}</span>
			})}
		</span>
	)
	
}

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
					<HistoryLabel history={history} />
				</div>
			</div>
		</div>
	)
}

function CharacterWallet() {
	const { character, characterDispatch } = useCurrentCharacter()
	const {
		showAddWalletIncome,
		showAddWalletExpense,
	} = useEditWallet()

	// define character on context
	// automatic filtering for the character
	return (
		<CharacterProvider character={character}>
			<Screen
				title="Porte monnaie"
				titleIcon={<IconCoins className="w-7 h-7 text-amber-700" />}
				isLoading={!character}
				root
				withCharacterMenu
			>
				{character && <>
					<div className="flex justify-between mt-2">
						<Currencies currencies={character.wallet.currencies} />

						<div className="flex flex-col gap-2 mt-2 mr-4">
							<Button 
								variant="outlined" 
								size="small" 
								color="success" 
								className="items-center w-10 h-10 rounded-full"
								onClick={() => showAddWalletIncome({
									onSubmit: (data) => {
										characterDispatch(actionWalletAddIncome(data))
									}
								})}
								>
								<IconPlus  className="w-4 h-4" />
							</Button>
							<Button 
								variant="outlined" 
								size="small" 
								color="warning" 
								className="items-center w-10 h-10 rounded-full"
								onClick={() => showAddWalletExpense({
									onSubmit: (data) => {
										characterDispatch(actionWalletAddExpense(data))
									}
								})}
								>
								<IconMinus className="w-4 h-4" />
							</Button>
						</div>
					</div>
					<div className="mt-8">
						<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Historique</h3>
						<div className="mt-2 divide-y divide">
							{character.wallet?.history?.map(history => (
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