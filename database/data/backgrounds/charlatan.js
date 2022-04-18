const Charlatan = (api) => ({
	"index": "charlatan",
	"name": "Charlatan",
	"good_for_classes": [
		"rogue",
		// TODO:
	],
	"starting_proficiencies": [
		api.buildProficiency("skill-deception"),
		api.buildProficiency("skill-sleight-of-hand"),
		api.buildProficiency("disguise-kit"),
		api.buildProficiency("forgery-kit"),
	],
	"language_options": null,
	"starting_currencies": {
		gp: 15,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("disguise-kit"),
			"quantity": 1
		},
	],
	"starting_equipment_options": [
		// TODO: tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke)
		// api.buildChooseEquipmentFromCategory(1, "holy-symbols")
	],
	"features": [
		api.buildFeature("favorite-schemes"),
		api.buildFeature("false-identity"),
	],
	"personality_traits": {
		"choose": 2,
		"type": "personality_traits",
		"from": [
			"I fall in and out of love easily, and am always pursuing someone.",
			"I have a joke for every occasion, especially occasions where humor is inappropriate.",
			"Flattery is my preferred trick for getting what I want.",
			"I'm a born gambler who can't resist taking a risk for a potential payoff.",
			"I lie about almost everything, even when there's no good reason to.",
			"Sarcasm and insults are my weapons of choice.",
			"I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
			"I pocket anything I see that might have some value.",
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Independence. I am a free spirit – no one tells me what to do.",
				"alignments": api.buildIdealAlignment("chaotic")
			},
			{
				"desc": "Fairness. I never target people who can't afford to lose a few coins.",
				"alignments": api.buildIdealAlignment("lawful")
			},
			{
				"desc": "Charity. I distribute the money I acquire to the people who really need it.",
				"alignments": api.buildIdealAlignment("good")
			},
			{
				"desc": "Creativity. I never run the same con twice.",
				"alignments": api.buildIdealAlignment("chaotic")
			},
			{
				"desc": "Friendship. Material goods come and go. Bonds of friendship last forever.",
				"alignments": api.buildIdealAlignment("good")
			},
			{
				"desc": "Aspiration. I'm determined to make something of myself.",
				"alignments": api.buildIdealAlignment("any")
			}
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
			"I owe everything to my mentor – a horrible person who's probably rotting in jail somewhere.",
			"Somewhere out there, I have a child who doesn't know me. I'm making the world better for him or her.",
			"I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.",
			"A powerful person killed someone I love. Some day soon, I'll have my revenge.",
"I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself.",
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"I can't resist a pretty face.",
			"I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.",
			"I'm convinced that no one could ever fool me the way I fool others.",
			"I'm too greedy for my own good. I can't resist taking a risk if there's money involved.",
			"I can't resist swindling people who are more powerful than me.",
			"I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough.",
		]
	},
	"url": "/api/backgrounds/charlatan"
})

export default Charlatan