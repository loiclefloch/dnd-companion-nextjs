const Sage = (api) => ({
	"index": "sage",
	"name": "Sage",
	"good_for_classes": [
		"druid",
		"warlock",
		"wizard",
		// TODO:
	],
	"starting_proficiencies": [
		api.buildProficiency("skill-history"),
		api.buildProficiency("skill-arcana"),
	],
	"starting_proficiency_options": null,
	"language_options": {
		"choose": 2,
		"type": "languages",
		"from": api.getAllLanguages()
	},
	"starting_currencies": {
		gp: 15,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("ink-1-ounce-bottle"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("clothes-common"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("small-knife"),
			"quantity": 1
		}
		// TODO: a letter from a dead colleague posing a question you have not yet been able to answer
	],
	"starting_equipment_options": [
		api.buildChooseEquipmentFromCategory(1, "artisans-tools")
	],
	"features": [
		api.buildFeature("researcher"),
	],
	"personality_traits": {
		"choose": 2,
		"type": "personality_traits",
		"from": [
			"I use polysyllabic words that convey the impression of great erudition.",
			"I've read every book in the world's greatest libraries – or I like to boast that I have.",
			"I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others.",
			"There's nothing I like more than a good mystery.",
			"I'm willing to listen to every side of an argument before I make my own judgment.",
			"I… speak… slowly… when talking… to idiots,… which… almost… everyone… is… compared… to me.",
			"I am horribly, horribly awkward in social situations.",
			"I'm convinced that people are always trying to steal my secrets.",
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Knowledge. The path to power and self-improvement is through knowledge.",
				"alignments": api.buildIdealAlignment("Neutral")
			},
			{
				"desc": "Beauty. What is beautiful points us beyond itself toward what is true.",
				"alignments": api.buildIdealAlignment("Good")
			},
			{
				"desc": "Logic. Emotions must not cloud our logical thinking.",
				"alignments": api.buildIdealAlignment("Lawful")
			},
			{
				"desc": "No Limits. Nothing should fetter the infinite possibility inherent in all existence.",
				"alignments": api.buildIdealAlignment("Chaotic")
			},
			{
				"desc": "Power. Knowledge is the path to power and domination.",
				"alignments": api.buildIdealAlignment("Evil")
			},
			{
				"desc": "Self-Improvement. The goal of a life of study is the betterment of oneself.",
				"alignments": api.buildIdealAlignment("Any")
			},
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"It is my duty to protect my students.",
			"I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
			"I work to preserve a library, university, scriptorium, or monastery.",
			"My life's work is a series of tomes related to a specific field of lore.",
			"I've been searching my whole life for the answer to a certain question.",
			"I sold my soul for knowledge. I hope to do great deeds and win it back.",
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"I am easily distracted by the promise of information",
			"Most people scream and run when they see a demon. I stop and take notes on its anatomy",
			"Unlocking an ancient mystery is worth the price of a civilization",
			"I overlook obvious solutions in favor of complicated ones",
			"I speak without really thinking through my words, invariably insulting others",
			"I can't keep a secret to save my life, or anyone else's",
		]
	},
})

export default Sage