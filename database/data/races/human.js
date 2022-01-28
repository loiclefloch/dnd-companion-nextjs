const human = api => ({
	"index": "human",
	"name": "Human",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("str", 1),
		api.buildAbilityBonus("dex", 1),
		api.buildAbilityBonus("con", 1),
		api.buildAbilityBonus("int", 1),
		api.buildAbilityBonus("wis", 1),
		api.buildAbilityBonus("cha", 1),
	],
	"age": "Humans reach adulthood in their late teens and live less than a century.",
	"alignment": "Humans tend toward no particular alignment. The best and the worst are found among them.",
	"size": "Medium",
	"size_description": "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
	"starting_proficiencies": [],
	"languages": [
		api.buildLanguage("common"),
	],
	"language_options": {
		"choose": 1,
		"type": "languages",
		"from": [
			api.buildLanguage("dwarvish"),
			api.buildLanguage("elvish"),
			api.buildLanguage("giant"),
			api.buildLanguage("gnomish"),
			api.buildLanguage("goblin"),
			api.buildLanguage("halfling"),
			api.buildLanguage("orc"),
			api.buildLanguage("abyssal"),
			api.buildLanguage("celestial"),
			api.buildLanguage("draconic"),
			api.buildLanguage("deep-speech"),
			api.buildLanguage("infernal"),
			api.buildLanguage("primordial"),
			api.buildLanguage("sylvan"),
			api.buildLanguage("undercommon"),
		]
	},
	"language_desc": "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
	"traits": [],
	"subraces": [],
})

export default human