const Entertainer = (api) => ({
	"index": "entertainer",
	"name": "Entertainer",
	"good_for_classes": [
		"bard"
	],
	"starting_proficiencies": [
		api.buildProficiency("skill-acrobatics"),
		api.buildProficiency("skill-performance"),
		api.buildProficiency("disguise-kit"),
	],
	"language_options": null,
	"starting_currencies": {
		gp: 15,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("clothes-costume"),
			"quantity": 1
		},
		// TODO:  the favor of an admirer (love letter, lock of hair, or trinket),
	],
	"starting_equipment_options": [
		api.buildChooseEquipmentFromCategory(1, "musical-instruments")
	],
	"features": [
		{
			"index": "entertainer-routines",
			"name": "Entertainer Routines",
			"desc": [
				"A good entertainer is versatile, spicing up every performance with a variety of different routines. Choose one to three routines or roll on the table below to define your expertise as an entertainer.",
				"1	Actor",
				"2	Dancer",
				"3	Fire-eater",
				"4	Jester",
				"5	Juggler",
				"6	Instrumentalist",
				"7	Poet",
				"8	Singer",
				"9	Storyteller",
				"10	Tumbler",
			]
		},
		{
			"index": "by-popular-demand",
			"name": "By Popular Demand",
			"desc": [
				"You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you."
			]
		}
	],
	"personality_traits": {
		"choose": 2,
		"type": "personality_traits",
		"from": [
			"I know a story relevant to almost every situation.",
			"Whenever I come to a new place, I collect local rumors and spread gossip.",
			`I'm a hopeless romantic, always searching for that "special someone."`,
			"Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
			"I love a good insult, even one directed at me.",
			"I get bitter if I'm not the center of attention.",
			"I'll settle for nothing less than perfection.",
			"I change my mood or my mind as quickly as I change key in a song.",
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Beauty. When I perform, I make the world better than it was.",
				"alignments": api.buildIdealAlignment("Good")
			},
			{
				"desc": "Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are.",
				"alignments": api.buildIdealAlignment("Lawful")
			},
			{
				"desc": "Creativity. The world is in need of new ideas and bold action.",
				"alignments": api.buildIdealAlignment("Chaotic")
			},
			{
				"desc": "Greed. I'm only in it for the money and fame. ",
				"alignments": api.buildIdealAlignment("Evil")
			},
			{
				"desc": "People. I like seeing the smiles on people's faces when I perform. That's all that matters.",
				"alignments": api.buildIdealAlignment("Neutral")
			},
			{
				"desc": "Honesty. Art should reflect the soul; it should come from within and reveal who we really are.",
				"alignments": api.buildIdealAlignment("Any")
			},
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"My instrument is my most treasured possession, and it reminds me of someone I love.",
			"Someone stole my precious instrument, and someday I'll get it back.",
			"I want to be famous, whatever it takes.",
			"I idolize a hero of the old tales and measure my deeds against that person's.",
			"I will do anything to prove myself superior to my hated rival.",
			"I would do anything for the other members of my old troupe.",
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"I'll do anything to win fame and renown.",
			"I'm a sucker for a pretty face.",
			"A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
			"I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
			"I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
			"Despite my best efforts, I am unreliable to my friends.",
		]
	},
})

export default Entertainer