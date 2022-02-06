export function buildShortRest(character) {

	return {
		hp: {
			from: 0,
			to: 20,
		},
		// TODO: for druid
		// spellsSlots: {
		// 	1: {
		// 		from: 0,
		// 		to: 1,
		// 	}
		// },
	}
}

export function buildLongRest(character) {
	const currentHitDice = character.currentHitDice
	const maximumHitDice = character.maximumHitDice
	if (currentHitDice < 1) {
		// TODO:
	}
	// must have 1 hit dice to gain benefits
	return {
		hp: {
			from: 0,
			to: 20,
		},
		// TODO: should empty spellsUsed
		
		// up to a number of dice equal to character's total Hit dice / 2 with a minimum of 1.
		// e.g: if 8 hit dices, can regain 4.
		hitDice: { // TODO: better name
			from: currentHitDice,
			to: Math.ceil(Math.max(1, maximumHitDice / 2))
		},

	}
}