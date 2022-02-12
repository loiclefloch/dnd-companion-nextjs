function filter(character, feat) {

	if (feat.forRace) {
		return feat.prerequisites.some(prerequisite => {
			return prerequisite.race.index === character.race.index
		})
	}

	if (feat.forAbilityScore) {
		return feat.prerequisites.some(prerequisite => {
			const abilityScore = character.stats[prerequisite.abilityScore.name]
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

function filterFeatsForCharacter(feats, character) {
	return feats?.filter(feat => filter(character, feat))
}

export default filterFeatsForCharacter