function StepSpellSlots() {
	character.spellsSlots = createSpellsSlots(
		character.classes, 
		level
	)
}
StepSpellSlots.label = "Mise à jour des spells slots"

export default StepSpellSlots