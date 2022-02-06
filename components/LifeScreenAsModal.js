import { useState, useEffect } from 'react'
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import { actionModifyCurrentHp } from "../modules/character/action"
import Button from "./Button"
import ButtonBottomScreen from "./ButtonBottomScreen"
import IconMinus from "./icons/IconMinus"
import IconPlus from "./icons/IconPlus"

function KoView({ character, characterDispatch }) {
	// TODO: death throws + tuto
	return null
}

function LifeScreenAsModal({ character, characterDispatch, onCloseScreen }) {
	const { tr } = useI18n()
	const [hpToModify, _setHpToModify] = useState(0)
	const [hpToModifyInput, setHpToModifyInput] = useState(0)

	const isKo = character.currentHp <= 0
	const willBeKo = (character.currentHp + hpToModify) <= 0
	const willStabilize = character.currentHp <= 0 && (character.currentHp + hpToModify > 0) > character.maximumHp
	const isAboveMaximumHp = (character.currentHp + hpToModify) > character.maximumHp

	function  setHpToModify(hpToModify) {
		_setHpToModify(hpToModify)
		setHpToModifyInput(`${hpToModify}`)
	}

	useEffect(() => {
		_setHpToModify(parseInt(hpToModifyInput, 10))
	}, [hpToModifyInput])

	return (
		<ScreenAsModal
			title={`Condition`}
			onCloseScreen={onCloseScreen}
		>

			<div>
				<h2 className='mt-5 text-xl text-center text-semibold'>
					HP: {character.currentHp} / {character.maximumHp}
				</h2>

				<div className="flex flex-row items-center justify-center gap-2 mt-12 mr-4">
					<Button
						variant="outlined"
						size="small"
						color="error"
						className="items-center w-10 h-10 rounded-full"
						onClick={() => setHpToModify(hpToModify - 1)}
					>
						<IconMinus className="w-4 h-4" />
					</Button>
					<Button
						variant="outlined"
						size="small"
						color="success"
						className="items-center w-10 h-10 ml-6 rounded-full"
						onClick={() => setHpToModify(hpToModify + 1)}
					>
						<IconPlus className="w-4 h-4" />
					</Button>
				</div>

				<div className='mt-6 flex items-center justify-center'>
					<input
						type="number"
						className="placeholder:italic placeholder:text-slate-400 block bg-white
						 border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none 
						 focus:border-slate-300 focus:ring-slate-300 focus:ring-1 sm:text-sm text-center w-24 text-lg bg-transparent"
						value={hpToModifyInput}
						onChange={e => setHpToModifyInput(e.target.value)}
					/>
				</div>

				{character.isKo && (
					<KoView character={character} characterDispatch={characterDispatch} />
				)}

				<div className='px-4 text-center'>
					{willBeKo && !isKo && (
						<p className='mt-4'>
							Vous allez être mis KO !
							{/* TODO: open rules screen dialog */}
							<span className='ml-2'>En savoir plus</span>
						</p>
					)}

					{willStabilize && (
						<p className='mt-4 text-center'>
							{/* TODO: open rules screen dialog */}
							{/* TODO: stabilisé ou reprend les HP? */}
							{/* TODO: write on the user */}
							Vous allez être stabilisé !
						</p>
					)}

					{isAboveMaximumHp && (
						<p className='mt-4'>
							Attention, vous aurez plus de HP que le maximum
						</p>
					)}
				</div>

				{/* --- Conditions: list conditions, allow to toggle them, remove them on rest, after combat too? */}

				<ButtonBottomScreen
					hide={hpToModify === 0}
					variant="cta"
					onClick={() => {
						characterDispatch(actionModifyCurrentHp({
							hpToModify,
							willBeKo,
							willStabilize,
							isAboveMaximumHp,
						}))
						onCloseScreen()
					}}
				>
					{hpToModify < 0 && `Enlever ${Math.abs(hpToModify)} points de vie`}
					{hpToModify > 0 && `Ajouter ${hpToModify} points de vie`}
				</ButtonBottomScreen>
			</div>
		</ScreenAsModal>
	)
}

export function useLifeScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showLifeScreenAsModal: (character, characterDispatch) => {
			showScreenAsModal(LifeScreenAsModal, {
				character,
				characterDispatch,
			})
		}
	}
}
