const elf = (api) => ({
	"index": "elf",
	"name": "Elf",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("dex", 2),
	],
	"age": "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
	"alignment": "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not. The drow are an exception; their exile has made them vicious and dangerous. Drow are more often evil than not.",
	"size": "Medium",
	"size_description": "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
	"starting_proficiencies": [
		api.buildProficiency("skill-perception")
	],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("elvish"),
	],
	"language_desc": "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("keen-senses"),
		api.buildTrait("fey-ancestry"),
		api.buildTrait("trance"),
	],
	"subraces": [
		api.buildRace("high-elf"),
		api.buildRace("wood-elf"),
	],
	levelling: {
		...api.applyLevellingLevelNotCreatedYet(1, 20),
	},
})

export default elf