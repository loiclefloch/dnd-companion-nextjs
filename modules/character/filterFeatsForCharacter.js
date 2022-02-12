function filter(character, feat) {

	if (feat.forRace) {
		return feat.prerequisites.some(prerequisite => {
			return prerequisite.class.index === character.classes[0].index
		})
	}

	if (feat.forAbilityScore) {
		return feat.prerequisites.some(prerequisite => {
			const abilityScore = character.abilities[prerequisite.abilityScore.name]
			return abilityScore >= prerequisite.minimumScore
		})
	}

	if (feat.forProficiency) {
		return feat.prerequisites.some(prerequisite => {
			return character.proficiencies.some(p => p.index === prerequisite.proficiency.index)
		})
	}

	return true
}

function filterFeatsForCharacter(character, feats) {
	return feats?.filter(feat => filter(character, feat))
}

export default filterFeatsForCharacter