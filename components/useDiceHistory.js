import useModal from "./useModal"

import DiceModal from "./DiceModal"
import useDiceHistoryScreenAsModal from "./useDiceHistoryScreenAsModal";

// TODO: context
let diceHistory = [
	{
		"label": "Intimidation",
		"roll": {
			"dice": "1d20",
			"diceFormatted": "1d20-4",
			"isReroll": false,
			"value": 2,
			"modifier": -4,
			"modifierLabel": "-4",
			"isSuccess": false,
			"isFailure": true,
			"result": -3,
			"successValue": null,
			"successCheckLabel": ">= 2",
			"diceResult": 1,
			"canCalculateSuccess": false,
			"isCritic": true,
			"isCriticSuccess": false,
			"isCriticFailure": true,
			"diceRollResult": {
				"averageTotal": 10.5,
				"maxTotal": 20,
				"minTotal": 1,
				"notation": "1d20",
				"output": "1d20: [1] = 1",
				"rolls": [
					{
						"label": "[1]",
						"rolls": [
							{
								"calculationValue": 1,
								"initialValue": 1,
								"modifierFlags": "",
								"modifiers": [],
								"type": "result",
								"useInTotal": true,
								"value": 1
							}
						],
						"type": "roll-results",
						"value": 1
					}
				],
				"total": 1,
				"type": "dice-roll"
			}
		}
	},
	{
			"label": "CHA",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-4",
					"isReroll": true,
					"value": 2,
					"modifier": -4,
					"modifierLabel": "-4",
					"isSuccess": false,
					"isFailure": true,
					"result": -1,
					"successValue": null,
					"successCheckLabel": ">= 2",
					"diceResult": 3,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [3] = 3",
							"rolls": [
									{
											"label": "[3]",
											"rolls": [
													{
															"calculationValue": 3,
															"initialValue": 3,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 3
													}
											],
											"type": "roll-results",
											"value": 3
									}
							],
							"total": 3,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "CHA",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-4",
					"isReroll": false,
					"value": 2,
					"modifier": -4,
					"modifierLabel": "-4",
					"isSuccess": false,
					"isFailure": true,
					"result": 3,
					"successValue": null,
					"successCheckLabel": ">= 2",
					"diceResult": 7,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [7] = 7",
							"rolls": [
									{
											"label": "[7]",
											"rolls": [
													{
															"calculationValue": 7,
															"initialValue": 7,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 7
													}
											],
											"type": "roll-results",
											"value": 7
									}
							],
							"total": 7,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "INT",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20+0",
					"isReroll": true,
					"value": 10,
					"modifier": 0,
					"modifierLabel": "+0",
					"isSuccess": false,
					"isFailure": true,
					"result": 3,
					"successValue": null,
					"successCheckLabel": ">= 10",
					"diceResult": 3,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [3] = 3",
							"rolls": [
									{
											"label": "[3]",
											"rolls": [
													{
															"calculationValue": 3,
															"initialValue": 3,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 3
													}
											],
											"type": "roll-results",
											"value": 3
									}
							],
							"total": 3,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "INT",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20+0",
					"isReroll": false,
					"value": 10,
					"modifier": 0,
					"modifierLabel": "+0",
					"isSuccess": false,
					"isFailure": true,
					"result": 12,
					"successValue": null,
					"successCheckLabel": ">= 10",
					"diceResult": 12,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [12] = 12",
							"rolls": [
									{
											"label": "[12]",
											"rolls": [
													{
															"calculationValue": 12,
															"initialValue": 12,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 12
													}
											],
											"type": "roll-results",
											"value": 12
									}
							],
							"total": 12,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "DEX",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20+2",
					"isReroll": true,
					"value": 15,
					"modifier": 2,
					"modifierLabel": "+2",
					"isSuccess": false,
					"isFailure": true,
					"result": 22,
					"successValue": null,
					"successCheckLabel": ">= 15",
					"diceResult": 20,
					"canCalculateSuccess": false,
					"isCritic": true,
					"isCriticSuccess": true,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [20] = 20",
							"rolls": [
									{
											"label": "[20]",
											"rolls": [
													{
															"calculationValue": 20,
															"initialValue": 20,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 20
													}
											],
											"type": "roll-results",
											"value": 20
									}
							],
							"total": 20,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "DEX",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20+2",
					"isReroll": false,
					"value": 15,
					"modifier": 2,
					"modifierLabel": "+2",
					"isSuccess": false,
					"isFailure": true,
					"result": 10,
					"successValue": null,
					"successCheckLabel": ">= 15",
					"diceResult": 8,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [8] = 8",
							"rolls": [
									{
											"label": "[8]",
											"rolls": [
													{
															"calculationValue": 8,
															"initialValue": 8,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 8
													}
											],
											"type": "roll-results",
											"value": 8
									}
							],
							"total": 8,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "STR",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-1",
					"isReroll": true,
					"value": 8,
					"modifier": -1,
					"modifierLabel": "-1",
					"isSuccess": false,
					"isFailure": true,
					"result": 17,
					"successValue": null,
					"successCheckLabel": ">= 8",
					"diceResult": 18,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [18] = 18",
							"rolls": [
									{
											"label": "[18]",
											"rolls": [
													{
															"calculationValue": 18,
															"initialValue": 18,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 18
													}
											],
											"type": "roll-results",
											"value": 18
									}
							],
							"total": 18,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "STR",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-1",
					"isReroll": true,
					"value": 8,
					"modifier": -1,
					"modifierLabel": "-1",
					"isSuccess": false,
					"isFailure": true,
					"result": 19,
					"successValue": null,
					"successCheckLabel": ">= 8",
					"diceResult": 20,
					"canCalculateSuccess": false,
					"isCritic": true,
					"isCriticSuccess": true,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [20] = 20",
							"rolls": [
									{
											"label": "[20]",
											"rolls": [
													{
															"calculationValue": 20,
															"initialValue": 20,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 20
													}
											],
											"type": "roll-results",
											"value": 20
									}
							],
							"total": 20,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "STR",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-1",
					"isReroll": true,
					"value": 8,
					"modifier": -1,
					"modifierLabel": "-1",
					"isSuccess": false,
					"isFailure": true,
					"result": 17,
					"successValue": null,
					"successCheckLabel": ">= 8",
					"diceResult": 18,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [18] = 18",
							"rolls": [
									{
											"label": "[18]",
											"rolls": [
													{
															"calculationValue": 18,
															"initialValue": 18,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 18
													}
											],
											"type": "roll-results",
											"value": 18
									}
							],
							"total": 18,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "STR",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-1",
					"isReroll": true,
					"value": 8,
					"modifier": -1,
					"modifierLabel": "-1",
					"isSuccess": false,
					"isFailure": true,
					"result": 7,
					"successValue": null,
					"successCheckLabel": ">= 8",
					"diceResult": 8,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [8] = 8",
							"rolls": [
									{
											"label": "[8]",
											"rolls": [
													{
															"calculationValue": 8,
															"initialValue": 8,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 8
													}
											],
											"type": "roll-results",
											"value": 8
									}
							],
							"total": 8,
							"type": "dice-roll"
					}
			}
	},
	{
			"label": "STR",
			"roll": {
					"dice": "1d20",
					"diceFormatted": "1d20-1",
					"isReroll": false,
					"value": 8,
					"modifier": -1,
					"modifierLabel": "-1",
					"isSuccess": false,
					"isFailure": true,
					"result": 9,
					"successValue": null,
					"successCheckLabel": ">= 8",
					"diceResult": 10,
					"canCalculateSuccess": false,
					"isCritic": false,
					"isCriticSuccess": false,
					"isCriticFailure": false,
					"diceRollResult": {
							"averageTotal": 10.5,
							"maxTotal": 20,
							"minTotal": 1,
							"notation": "1d20",
							"output": "1d20: [10] = 10",
							"rolls": [
									{
											"label": "[10]",
											"rolls": [
													{
															"calculationValue": 10,
															"initialValue": 10,
															"modifierFlags": "",
															"modifiers": [],
															"type": "result",
															"useInTotal": true,
															"value": 10
													}
											],
											"type": "roll-results",
											"value": 10
									}
							],
							"total": 10,
							"type": "dice-roll"
					}
			}
	}
]

function _setDiceHistory(_diceHistory) {
	diceHistory = _diceHistory
	console.log(diceHistory)
}

function useDiceHistory() {
	const { showCustomModal } = useModal()
	// const [diceHistory, _setDiceHistory] = useState([])
	const { showDiceHistoryScreen } = useDiceHistoryScreenAsModal()

	return {
		showDiceHistoryScreen,
		addDice: ({ 
			historyLabel, // label to display on the history, fallback to label if it does not exists
			label,  // label to display on the DiceModal
			dice,
			roll, 
			context, 
			onReroll, 
			onValidate, 
		}) => {
			_setDiceHistory([ { label, historyLabel, dice, roll, context }, ...diceHistory ])
			showCustomModal(DiceModal, { 
				label, 
				historyLabel,
				dice,
				roll, 
				context,
				onReroll,
				onValidate,
				showDiceHistoryScreen,
			 })
		},
		diceHistory
	}
}

export default useDiceHistory