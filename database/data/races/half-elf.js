export default api => ({
	"index": "half-elf",
	"name": "Half-Elf",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("cha", 2)	
	],
	"ability_bonus_options": {
		"choose": 2,
		"type": "ability_bonuses",
		"from": [
			api.buildAbilityBonus("str", 1),
			api.buildAbilityBonus("dex", 1),
			api.buildAbilityBonus("con", 1),
			api.buildAbilityBonus("int", 1),
			api.buildAbilityBonus("wis", 1),
		]
	},
	"alignment": "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others' demands, and sometimes prove unreliable, or at least unpredictable.",
	"age": "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.",
	"size": "Medium",
	"size_description": "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
	"starting_proficiencies": [],
	"starting_proficiency_options": {
		"choose": 2,
		"type": "proficiencies",
		"from": [
			api.buildProficiency("skill-acrobatics"),
			api.buildProficiency("skill-animal-handling"),
			api.buildProficiency("skill-arcana"),
			api.buildProficiency("skill-athletics"),
			api.buildProficiency("skill-deception"),
			api.buildProficiency("skill-history"),
			api.buildProficiency("skill-insight"),
			api.buildProficiency("skill-intimidation"),
			api.buildProficiency("skill-investigation"),
			api.buildProficiency("skill-medicine"),
			api.buildProficiency("skill-nature"),
			api.buildProficiency("skill-perception"),
			api.buildProficiency("skill-performance"),
			api.buildProficiency("skill-persuasion"),
			api.buildProficiency("skill-religion"),
			api.buildProficiency("skill-sleight-of-hand"),
			api.buildProficiency("skill-stealth"),
			api.buildProficiency("skill-survival"),
		]
	},
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("elvish"),
	],
	"language_options": {
		"choose": 1,
		"type": "languages",
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
		]
	},
	"language_desc": "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("fey-ancestry"),
		api.buildTrait("skill-versatility"),
	],
	"subraces": [],
})