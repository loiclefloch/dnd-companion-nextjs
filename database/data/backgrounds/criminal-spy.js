const CriminalSpy = (api) => ({
	"index": "criminal-spy",
	"name": "Criminal / Spy",
	"starting_proficiencies": [
		api.buildProficiency("skill-deception"),
		api.buildProficiency("skill-stealth"),
		api.buildProficiency("thieves-tools"),
	],
	"starting_proficiency_options": api.buildProficiencyOption(1, 'Gaming Sets'),
	"language_options": null,
	"starting_currencies": {
		gp: 15,
	},
	"starting_equipment": [
		{
			"equipment": api.buildEquipment("crowbar"),
			"quantity": 1
		},
		{
			"equipment": api.buildEquipment("clothes-common"),
			"quantity": 1
		}
	],
	"starting_equipment_options": null,
	"features": [{
		"index": "criminal-contact",
		"name": "Criminal Contact",
		"desc": [
			"You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
			"You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you."
		]
	}],
	"personality_traits": {
		"choose": 2,
		"type": "personality_traits",
		"from": [
			"I always have a plan for what to do when things go wrong.",
			"I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
			"The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
			"I would rather make a new friend than a new enemy.",
			"I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
			"I don’t pay attention to the risks in a situation. Never tell me the odds.",
			"The best way to get me to do something is to tell me I can’t do it.",
			"I blow up at the slightest insult."
		]
	},
	"ideals": {
		"choose": 1,
		"type": "ideals",
		"from": [
			{
				"desc": "Honor. I don’t steal from others in the trade.",
				"alignments": api.buildIdealAlignment("lawful")
			},
			{
				"desc": "Freedom. Chains are meant to be broken, as are those who would forge them",
				"alignments": api.buildIdealAlignment("chaotic")
			},
			{
				"desc": "Charity. I steal from the wealthy so that I can help people in need.",
				"alignments": api.buildIdealAlignment("good")
			},
			{
				"desc": "Greed. I will do whatever it takes to become wealthy.",
				"alignments": api.buildIdealAlignment("evil")
			},
			{
				"desc": "People. I’m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.",
				"alignments": api.buildIdealAlignment("neutral")
			},
			{
				"desc": "Redemption. There’s a spark of good in everyone.",
				"alignments": api.buildIdealAlignment("good")
			}
		]
	},
	"bonds": {
		"choose": 1,
		"type": "bonds",
		"from": [
			"I’m trying to pay off an old debt I owe to a generous benefactor.",
			"My ill-gotten gains go to support my family.",
			"Something important was taken from me, and I aim to steal it back.",
			"I will become the greatest thief that ever lived.",
			"I’m guilty of a terrible crime. I hope I can redeem myself for it.",
			"Someone I loved died because of a mistake I made. That will never happen again."
		]
	},
	"flaws": {
		"choose": 1,
		"type": "flaws",
		"from": [
			"When I see something valuable, I can’t think about anything but how to steal it.",
			"When faced with a choice between money and my friends, I usually choose the money.",
			"If there’s a plan, I’ll forget it. If I don’t forget it, I’ll ignore it.",
			"I have a “tell” that reveals when I’m lying.",
			"I turn tail and run when things look bad.",
			"An innocent person is in prison for a crime that I committed. I’m okay with that."
		]
	},
})

export default CriminalSpy