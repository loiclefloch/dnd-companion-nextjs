export default api => ({
	"index": "protector-aasimar",
	"name": "Protector Aasimar",
	"race": api.buildRace("aasimar"),
	"desc": "",
	"ability_bonuses": [
		api.buildAbilityBonus("wis", 1)
	],
	"starting_proficiencies": [],
	"languages": [],
	"traits": [
		api.buildTrait("radiant-soul")
	],
})