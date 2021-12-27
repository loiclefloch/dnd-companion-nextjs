import { useState } from "react"


function useDiceHistory() {
	const [diceHistory, _setDiceHistory] = useState([])

	return {
		addDice: ({ label, dice, roll, context }) => {
			_setDiceHistory([ ...diceHistory, { label, dice, roll, context }])
			alert(`Added dice ${label} with ${dice} : ${roll}`)
		},
		diceHistory
	}
}

export default useDiceHistory