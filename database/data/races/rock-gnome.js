const rockGnome = api => ({
	"index": "rock-gnome",
	"name": "Rock Gnome",
	"race": api.buildRace("gnome"),
	"desc": "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes.",
	"ability_bonuses": [
		api.buildAbilityBonus("con", 1)
	],
	"starting_proficiencies": [
		api.buildProficiency("tinkers-tools")
	],
	"languages": [],
	"traits": [
		api.buildTrait("artificers-lore"),
		api.buildTrait("tinker"),
	],
	levelling: {
		...api.applyLevellingLevelNoop(1, 20),
	},
})

export default rockGnome