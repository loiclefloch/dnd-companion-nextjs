import { useState } from "react"
import useModal from "./useModal"

function useDiceHistory() {
	const { showInfoModal } = useModal()
	const [diceHistory, _setDiceHistory] = useState([])

	return {
		addDice: ({ label, dice, roll, context }) => {
			_setDiceHistory([ ...diceHistory, { label, dice, roll, context }])
			showInfoModal({ content: `Added dice ${label} with ${dice} : ${roll}` })
		},
		diceHistory
	}
}

export default useDiceHistory