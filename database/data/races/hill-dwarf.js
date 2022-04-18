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
	levelling: {
		...api.applyLevellingLevelNoop(1, 20),
		every: [
			// Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.
			// character.maximumHp += 1
			{
				index: "increase-maximum-hp",
				label: "Points de vie supplémentaire",
				desc: "En tant que nain des collines, vous gagnez un point de vie supplémentaire",
				hp: +1,
			}
		]
	}
})

export default hillDwarf