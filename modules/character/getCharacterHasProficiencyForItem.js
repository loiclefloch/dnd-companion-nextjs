
// TODO: implement
function getCharacterHasProficiencyForItem(character, item) {
	if (!character || !item) {
		return false
	}

	return character.proficiencies.some(p => 
		item?.index === p.index 
		// equipment: rapier but proficiency in rapiers
		|| item?.index + 's' === p.index 
		)
}

export default getCharacterHasProficiencyForItem