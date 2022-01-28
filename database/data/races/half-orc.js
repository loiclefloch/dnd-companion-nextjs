const halfOrc = api => ({
	"index": "half-orc",
	"name": "Half-Orc",
	"speed": 30,
	"ability_bonuses": [
		api.buildAbilityBonus("str", 2),
		api.buildAbilityBonus("con", 1),
	],
	"alignment": "Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.",
	"age": "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
	"size": "Medium",
	"size_description": "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
	"starting_proficiencies": [
		api.buildProficiency("skill-intimidation"),
	],
	"languages": [
		api.buildLanguage("common"),
		api.buildLanguage("orc"),
	],
	"language_desc": "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.",
	"traits": [
		api.buildTrait("darkvision"),
		api.buildTrait("savage-attacks"),
		api.buildTrait("relentless-endurance"),
	],
	"subraces": [],
})

export default halfOrc