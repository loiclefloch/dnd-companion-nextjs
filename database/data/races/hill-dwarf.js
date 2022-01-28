const hillDwarf = api => ({
	"index": "hill-dwarf",
	"name": "Hill Dwarf",
	"race": api.buildRace("dwarf"),
	"desc": "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
	"ability_bonuses": [
		api.buildAbilityBonus("wis", 1)
	],
	"starting_proficiencies": [],
	"languages": [],
	"traits": [
		api.buildTrait("dwarven-toughness")
	],
})

export default hillDwarf