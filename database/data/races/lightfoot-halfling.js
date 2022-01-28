const lightfootHalfing = api => ({
	"index": "lightfoot-halfling",
	"name": "Lightfoot Halfling",
	"race": api.buildRace("halfling"),
	"desc": "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You're inclined to be affable and get along well with others. Lightfoots are more prone to wanderlust than other halflings, and often dwell alongside other races or take up a nomadic life.",
	"ability_bonuses": [
		api.buildAbilityBonus("cha", 1)
	],
	"starting_proficiencies": [],
	"languages": [],
	"traits": [
		api.buildTrait("naturally-stealthy"),
	],
})

export default lightfootHalfing