import { useState } from "react"
import useModal from "./useModal"

import DiceModal from "./DiceModal"

function useDiceHistory() {
	const { showCustomModal } = useModal()
	const [diceHistory, _setDiceHistory] = useState([])

	return {
		addDice: ({ label, dice, roll, context, onReroll, onValidate, }) => {
			_setDiceHistory([ ...diceHistory, { label, dice, roll, context }])
			showCustomModal(DiceModal, { label, dice, roll, context, onReroll, onValidate })
		},
		diceHistory
	}
}

export default useDiceHistory