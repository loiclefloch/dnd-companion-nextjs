

export const AbilityImportance = {
	FANTASTIC: 'FANTASTIC',
	GOOD: 'GOOD',
	OK: 'OK',
	BAD: 'BAD',
}

export function getAbilityOptimizedExample(clss) {
	const map = {
		druid: { // from https://rpgbot.net/dnd5/characters/classes/druid/
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 12,
			WIS: 15,
			CHA: 8,
		}
	}
	return map[clss]
}

export function getImportanceForClass(clss) {
	const map = {
		druid: { // from https://rpgbot.net/dnd5/characters/classes/druid/
			STR: AbilityImportance.BAD,
			DEX: AbilityImportance.GOOD,
			CON: AbilityImportance.GOOD,
			INT: AbilityImportance.OK,
			WIS: AbilityImportance.FANTASTIC,
			CHA: AbilityImportance.BAD,
		}
	}
	return map[clss]
}

export function getImportanceTip(importance) {
	// TODO: better tips
	// TODO: move on an useImportanceTip instead of using generic useTip?
	if (importance === AbilityImportance.FANTASTIC) { return 'A prendre absolument' }
	if (importance === AbilityImportance.GOOD) { return 'A prendre' }
	if (importance === AbilityImportance.OK) { return 'A éviter' }
	if (importance === AbilityImportance.BAD) { return 'Au minimum' }
}
