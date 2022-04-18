const Aasimar = (api) => ({
	"index": "aasimar",
	"name": "Aasimar",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("cha", 2),
	],
	"alignment": "Imbued with celestial power, most aasimar are good. Outcast aasimar are most often neutral or even evil.",
	"age": "Aasimar mature at the same rate as humans, but they can live up to 160 years.",
	"size": "Medium",
	"size_description": "Aasimar have the same range of height and weight as humans. Your size is Medium.",
	// TODO:
	// "starting_proficiencies": [
	// ],
	// "starting_proficiency_options": {
	// 	"choose": 1,
	// 	"type": "proficiencies",
	// 	"from": [
	// 		// api.buildProficiency("smiths-tools"),
	// 	]
	// },
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("celestial"),
	],
	"language_desc": "You can speak, read, and write Common and Celestial.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("celestial-resistance"),
		api.buildTrait("healing-hands"),
		api.buildTrait("light-bearer"),
	],
	"subraces": [
		api.buildRace("protector-aasimar")
	],
	levelling: {
		...api.applyLevellingLevelNotCreatedYet(1, 20),
	},
})

export default Aasimar