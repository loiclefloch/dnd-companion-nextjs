const highElf = api => ({
	"index": "wood-elf",
	"name": "Wood Elf",
	"race": api.buildRace("elf"),
	"desc": [
		"As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests. This category includes the wild elves (grugach) of Greyhawk and the Kagonesti of Dragonlance, as well as the races called wood elves in Greyhawk and the Forgotten Realms. In Faerûn, wood elves (also called wild elves, green elves, or forest elves) are reclusive and distrusting of non-elves.",
		"Wood elves’ skin tends to be copperish in hue, sometimes with traces of green. Their hair tends toward browns and blacks, but it is occasionally blond or copper-colored. Their eyes are green, brown, or hazel."
	],
	"ability_bonuses": [
		api.buildAbilityBonus("wis", 1),
	],
	"starting_proficiencies": [
		api.buildProficiency("longswords"),
		api.buildProficiency("shortswords"),
		api.buildProficiency("shortbows"),
		api.buildProficiency("longbows"),
	],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("elvish"),
	],
	"language_options": null,
	"traits": [
		api.buildTrait("elf-weapon-training"),
		api.buildTrait("fleet-of-foot"),
		api.buildTrait("mask-of-the-wild"),
	],
})

export default highElf