const tiefling = (api) => ({
	"index": "tiefling",
	"name": "Tiefling",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("int", 1),
		api.buildAbilityBonus("cha", 2),
	],
	"alignment": "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.",
	"age": "Tieflings mature at the same rate as humans but live a few years longer.",
	"size": "Medium",
	"size_description": "Tieflings are about the same size and build as humans. Your size is Medium.",
	"starting_proficiencies": [],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("infernal"),
	],
	"language_desc": "You can speak, read, and write Common and Infernal.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("hellish-resistance"),
		api.buildTrait("infernal-legacy"),
	],
	"subraces": [],
})

export default tiefling