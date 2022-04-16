function DiceWithMod({ dice, contextCharacter }) {
	if (contextCharacter) {
		if (dice.includes("MOD")) {
			return <span>{dice.replaceAll("MOD", ``)} {contextCharacter.spellcastingAbilityValue} <span className='text-xs text-meta'>({contextCharacter.spellcastingAbility})</span></span>
		}
	}
	return dice
}

export default DiceWithMod