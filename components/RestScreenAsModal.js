import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import useCurrentCharacter, {
	buildShortRest,
	buildLongRest,
	actionShortRest,
	actionLongRest,
} from "../modules/character/useCurrentCharacter"
import { useRuleScreenAsModal } from "./RuleScreenAsModal"

function buildRest(character) {
	return {
		shortRest: buildShortRest(character),
		longRest: buildLongRest(character),
	}
}

function RestScreenAsModal({ onCloseScreen }) {
	const { tr } = useI18n()
	const { character } = useCurrentCharacter()
	const { showRuleScreenAsModal } = useRuleScreenAsModal()

	const rest = buildRest(character)

	return (
		<ScreenAsModal 
			title={'Repos'}
			onCloseScreen={onCloseScreen}
		>
			<>
				<div onClick={() => {
					showRuleScreenAsModal('resting')
				}}>
					Learn more
				</div>
			</>
			<>
				<div className="flex flex-col flex-1 mt-4 mb-12">
					<h3 className="w-full pb-1 mx-4 text-lg font-semibold border-b border-solid border-slate-300">Repos court</h3>
					<div className="px-4 mt-2">
						Ce repos vous apportera :
						<ul>
							<li>hitDice * * * * -> with color for used (like spells slots)</li>
							<li>Slots de sorts : </li>
						</ul>
						{/* TODO: roll hitDice after selecting short rest. HP += hit dice + CON. Can roll another one after each roll */}
					</div>
				</div>

				<div className="flex items-center w-full px-4 my-2">
					<span className="w-full border-b border-solid border-slate-400" />
					<span className="w-1/4 text-center"> OU </span>
					<span className="w-full border-b border-solid border-slate-400" />
				</div>

				<div className="flex flex-col flex-1 mt-4 mb-12">
					<h3 className="w-full pb-1 mx-4 text-lg font-semibold border-b border-solid border-slate-300">Repos long</h3>
					<div className="px-4 mt-2">
						Ce repos vous apportera :
						<ul>
							<li>Pv 4 -> 12 (max 12)</li>
							<li>Slots de sorts : </li>
						</ul>
					</div>
				</div>
			</>
		</ScreenAsModal>
	)
}

export function useRestScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showRestModalAsScreen: () => {
			showScreenAsModal(RestScreenAsModal, {
			})
		}
	}
}
