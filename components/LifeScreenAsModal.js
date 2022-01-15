import { useState } from 'react'
import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import { actionModifyCurrentHp } from "../modules/character/useCurrentCharacter"
import Button from "./Button"
import ButtonBottomScreen from "./ButtonBottomScreen"
import IconMinus from "./icons/IconMinus"
import IconPlus from "./icons/IconPlus"

function KoView({ character, characterDispatch }) {
	// TODO: death throws + tuto
	return null
}

function LifeScreenAsModal({ character, characterDispatch, onCloseScreen }) {
	const [hpToModify, setHpToModify] = useState(0)
	const { tr } = useI18n()
	
	const willBeKo = (character.currentHp + hpToModify) <= 0
	const willStabilize = character.currentHp <= 0 && (character.currentHp + hpToModify > 0) > character.maxHp
	const isAboveMaxHp = (character.currentHp + hpToModify) > character.maxHp

	return (
		<ScreenAsModal 
			title={`Condition`} 
			onCloseScreen={onCloseScreen}
		>

			<div>
				<h2 className='mt-5 text-xl text-center text-semibold'>
					HP: {character.currentHp} / {character.maxHp}
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

				{character.isKo && (
					<KoView character={character} characterDispatch={characterDispatch}/>
				)}

				{willBeKo && (
					<p>
						Vous allez être mis KO !
						{/* TODO: open rules screen dialog */}
						<>En savoir plus</>
					</p>
				)}

				{willStabilize && (
					<p>
						{/* TODO: open rules screen dialog */}
						{/* TODO: stabilisé ou reprend les HP? */}
						{/* TODO: write on the user */}
						Vous allez être stabilisé !
					</p>
				)}

				{isAboveMaxHp && (
					<p>
						Le montant
					</p>
				)}

				{/* --- Conditions: list conditions, allow to toggle them, remove them on rest, after combat too? */}

				<ButtonBottomScreen
					hide={hpToModify === 0}
					variant="cta"
					onClick={() => {
						characterDispatch(actionModifyCurrentHp({
							hpToModify,
							willBeKo,
							willStabilize,
							isAboveMaxHp,
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
