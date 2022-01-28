const Rabittfolk = (api) => ({
	"index": "rabbitfolk",
	"name": "Rabbitfolk",
	"speed": 30,
	"ability_bonus_options": {},
	"alignment": "",
	"age": "",
	"size": "Medium or small",
	"size_description": "You are Medium or Small. You choose the size when you gain this race.",
	"starting_proficiencies": [
		api.buildProficiency("skill-perception"),
	],
	// "starting_proficiency_options": {
	// 	"choose": 1,
	// 	"type": "proficiencies",
	// 	"from": [
	// 		// api.buildProficiency("smiths-tools"),
	// 	]
	// },
	"languages": [
		api.buildLanguage("common"),
	],
	"language_options": {
		"choose": 1,
		"type": "languages",
		"from": api.getAllLanguages()
	},
	"language_desc": "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for the character.",
	"traits": [
		api.buildTrait("hare-trigger"),
		api.buildTrait("leporine-senses"),
		api.buildTrait("lucky-footwork"),
		api.buildTrait("rabbit-hop"),
	],
	"subraces": []
})

export default Rabittfolk