export default (api) => ({
	"index": "dwarf",
	"name": "Dwarf",
	"speed": 25,
	"ability_bonuses": [
		api.buildAbilityBonus("con", 2),
	],
	"alignment": "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
	"age": "Dwarves mature at the same rate as humans, but they're considered young until they reach the age of 50. On average, they live about 350 years.",
	"size": "Medium",
	"size_description": "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
	"starting_proficiencies": [
		api.buildProficiency("battleaxes"),
		api.buildProficiency("handaxes"),
		api.buildProficiency("light-hammers"),
		api.buildProficiency("warhammers"),
	],
	"starting_proficiency_options": {
		"choose": 1,
		"type": "proficiencies",
		"from": [
			api.buildProficiency("smiths-tools"),
			api.buildProficiency("brewers-supplies"),
			api.buildProficiency("masons-tools"),
		]
	},
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("dwarvish"),
	],
	"language_desc": "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("dwarven-resilience"),
		api.buildTrait("stonecunning"),
		api.buildTrait("dwarven-combat-training"),
		api.buildTrait("tool-proficiency"),
	],
	"subraces": [
		api.buildRace("hill-dwarf")
	],
})