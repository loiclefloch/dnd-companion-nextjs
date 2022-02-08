const Soldier = (api) => ({
	"index": "soldier",
	"name": "Soldier",
	"starting_proficiencies": [
		api.buildProficiency("skill-athletics"),
		api.buildProficiency("skill-intimidation"),
		api.buildProficiency("land-vehicles"),
	],
	"language_options": null,
	"starting_currencies": {
		gp: 10,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("clothes-common"),
			"quantity": 1
		},
	],
	"starting_proficiency_options": api.buildProficiencyOption(1, "Gaming Sets"),
	"features": [
		{
			"index": "specialty",
			"name": "Specialty",
			"desc": [
				"During your time as a soldier, you had a specific role to play in your unit or army. Roll a d8 or choose from the options in the table below to determine your role:",
				"1	Officer",
				"2	Scout",
				"3	Infantry",
				"4	Cavalry",
				"5	Healer",
				"6	Quartermaster",
				"7	Standard bearer",
				"8	Support staff (cook, blacksmith, or the like)",
			],
		},
		{
			"index": "military-rank",
			"name": "Military Rank",
			desc: ["You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized."]
		}
	],
	"personality_traits": {
		"choose": 2,
		"type": "personality_traits",
		"from": [
			"I'm always polite and respectful.",
			"I'm haunted by memories of war. I can't get the images of violence out of my mind.",
			"I've lost too many friends, and I'm slow to make new ones.",
			"I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.",
			"I can stare down a hell hound without flinching.",
			"I enjoy being strong and like breaking things.",
			"I have a crude sense of humor.",
			"I face problems head-on. A simple, direct solution is the best path to success.",
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Greater Good. Our lot is to lay down our lives in defense of others.",
				"alignments": api.buildIdealAlignment("Good")
			},
			{
				"desc": "Responsibility. I do what I must and obey just authority.",
				"alignments": api.buildIdealAlignment("Lawful")
			},
			{
				"desc": "Independence. When people follow orders blindly, they embrace a kind of tyranny.",
				"alignments": api.buildIdealAlignment("Chaotic")
			},
			{
				"desc": "Might. In life as in war, the stronger force wins.",
				"alignments": api.buildIdealAlignment("Evil")
			},
			{
				"desc": "Live and Let Live. Ideals aren't worth killing over or going to war for.",
				"alignments": api.buildIdealAlignment("Neutral")
			},
			{
				"desc": "Nation. My city, nation, or people are all that matter.",
				"alignments": api.buildIdealAlignment("Any")
			},
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"I would still lay down my life for the people I served with.",
			"Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
			"My honor is my life.",
			"I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
			"Those who fight beside me are those worth dying for.",
			"I fight for those who cannot fight for themselves.",
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"The monstrous enemy we faced in battle still leaves me quivering with fear.",
			"I have little respect for anyone who is not a proven warrior.",
			"I made a terrible mistake in battle that cost many lives – and I would do anything to keep that mistake secret.",
			"My hatred of my enemies is blind and unreasoning.",
			"I obey the law, even if the law causes misery.",
			"I'd rather eat my armor than admit when I'm wrong.",
		]
	},
})

export default Soldier