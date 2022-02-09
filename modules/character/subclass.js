
function calculateHasPrerequisites(character, prerequisites) {

	return prerequisites.every(prerequisite => {
		if (prerequisite.isLevel) {
			return prerequisite.level <= character.level
		} else if (prerequisite.isFeature) {
			debugger
		} else {
			throw new Error(`Not handled`)
		}
	})
}

export function getSpellsForCharacterSubclass(character) {
	if (!character.subclass) {
		return []
	}
	const spells = character.subclass.spells.map(spellData => {
		const hasPrerequisites = calculateHasPrerequisites(character, spellData.prerequisites)
		return hasPrerequisites ? spellData.spell : null
	}).filter(Boolean)

	return spells.map(s => {
		return {
			...s,
			isSubclassSpell: true,
			isPrepared: true,
			isForcedPrepared: true
		}
	})
}