const highElf = api => ({
	"index": "high-elf",
	"name": "High Elf",
	"race": api.buildRace("elf"),
	"desc": "As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many fantasy gaming worlds, there are two kinds of high elves. One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type is more common and more friendly, and often encountered among humans and other races.",
	"ability_bonuses": [
		api.buildAbilityBonus("int", 1),
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
	"language_options": {
		"choose": 1,
		"from": [
			api.buildLanguage("dwarvish"),
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
		],
		"type": "language"
	},
	"traits": [
		api.buildTrait("elf-weapon-training"),
		api.buildTrait("high-elf-cantrip"),
		api.buildTrait("extra-language"),
	],
	levelling: {
		...api.applyLevellingLevelNotCreatedYet(1, 20),
	},
})

export default highElf