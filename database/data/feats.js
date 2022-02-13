// TODO: add feats desc
const feats = [
	{
		index: "alert",
		name: "Alert",
		resume: "+5 to initiative, you can't be surprised, and creatures you don't see don't gain advantage on attack roll against you.",
		desc: [
			"Always on the lookout for danger, you gain the following benefits:",
			"- You can’t be surprised while you are conscious.",
			"- You gain a +5 bonus to initiative.",
			"- Other creatures don’t gain advantage on attack rolls against you as a result of being unseen by you.",
		]
	},
	{
		index:  "actor",
		"name": "Actor",
		"resume": "+1 in Cha., advantage on Deception and Performance checks, mimic the speech of a person or the sounds made by a creature."
	},
	{
		index:  "artificer",
		"name": "Artificer Initiate",
		"resume": "You learn one cantrip and one 1st-level artificier spell (cast without slot), proficiency with one type of artisan's tools."
	},
	{
		index:  "athlete",
		"name": "Athlete",
		"resume": "+1 in Str. or Dex., you stand up and climb more quickly, and you can jump with only a 5-ft run.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				}
			]
		}
	},
	{

		index:  "bountiful-luck",
		"name": "Bountiful Luck",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "halfling",
					name: "Halfling"
				}
			},
		],
		"resume": "You can let an ally within 30 ft of you to reroll a 1 on a d20."
	},
	{
		index:  "charger",
		"name": "Charger",
		"resume": "As part of the Dash action you can make a melee attack with a +5 bonus if you move at least 10 ft before."
	},
	{
		index:  "chef",
		"name": "Chef",
		"resume": "+1 in Con. or Wis., proficiency with cook's utensils and cook special food to regain hp.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				}
			]
		}
	},
	{
		index:  "crossbow-expert",
		"name": "Crossbow Expert",
		"resume": "You ignore the loading property of crossbows and don't have disadvantage for being in contact with a creature when you shoot."
	},
	{
		index:  "crusher",
		"name": "Crusher",
		"resume": "+1 in Str. or Con., 5 ft extra move when you hit (bludgeoning) and attacks with advantage after a critical hit.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				}
			]
		}
	},
	{

		index:  "defensive-duelist",
		"name": "Defensive Duelist",
		prerequisites: [
			{
				type: "abilityScore",
				"abilityScore": {
					"index": "dex",
					"name": "DEX",
					"url": "/api/ability-scores/dex"
				},
				minimumScore: 13,
			},
		],

		"resume": "You can add your proficiency bonus to your AC if you are wielding a finesse weapon, in reaction to a melee attack."
	},
	{
		index:  "dragon-fear",
		"name": "Dragon Fear",
		"resume": "1 in Str., Con., or Cha. and your Breath Weapon can frighten instead of inflicting damages.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "dragonborn",
					name: "Dragonborn"
				}
			},
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				}
			]
		}
	},
	{
		index:  "dragon-hide",
		"name": "Dragon Hide",
		"resume": "1 in Str., Con., or Cha., your AC becomes 13+Dex. modifier and your retractable claws deal 1d4+Str. modifier slashing damage.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "dragonborn",
					name: "Dragonborn"
				}
			},
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				}
			]
		}
	},
	{
		index:  "drow-high-magic",
		"name": "Drow High Magic",
		"resume": "You can cast the detect magic spell (at will) and the levitate and dispel magic spells (1/long rest).",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "draw",
					name: "Draw"
				}
			},
		],
	},
	{
		index:  "dual-wielder",
		"name": "Dual Wielder",
		"resume": "+1 to CA if you're wielding a melee weapon in each hand, two-weapon fighting with non-light weapon, draw two weapons."
	},
	{
		index:  "dungeon-delver",
		"name": "Dungeon Delver",
		"resume": "Advantage to Perception and Investigation checks, to saving throws vs traps, and search for traps at normal pace."
	},
	{
		index:  "durable",
		"name": "Durable",
		"resume": "+1 in Con. and for each Hit Dice you regain a minimum of hit points equals to 2 x your Constitution modifier."
	},
	{
		index:  "dwarf-fortitude",
		"name": "Dwarf Fortitude",
		"resume": "1 in Con., and you can spend one Hit Die to heal yourself taking the Dodge action.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "dwarf",
					name: "Dwarf"
				}
			},
		],
	},
	{
		index:  "eldritch-adept",
		"name": "Eldritch Adept",
		prerequisitesLabel: "Spellcasting or Pact Magic feature",
		"resume": "Spellcasting or Pact Magic feature	You learn one Eldritch Invocation."
	},
	{
		index:  "elemental-adept",
		"name": "Elemental Adept",
		prerequisitesLabel: "The ability to cast at least one spell",
		"resume": "Your spells ignore resistance to a damage type (acid, cold, fire, lightning, or thunder) and treat any 1 in damage as a 2."
	},
	{
		index:  "elven-accuracy",
		"name": "Elven Accuracy",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "elf",
					name: "Elf"
				}
			},
			{
				type: "race",
				race: {
					index: "half-elf",
					name: "Half helf"
				}
			},
		],
		"resume": "+1 in Dex., Int., Wis., or Cha., and you can reroll one attack roll if you have advantage.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "fade-away",
		"name": "Fade away",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "gnome",
					name: "Gnome"
				}
			},
		],
		"resume": "+1 in Dex. or Int., and you can use your reaction to become invisible if you take damage.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "fey-teleportation",
		"name": "Fey Teleportation",
		"resume": "+1 in Int. or Cha., you speak Sylvan, and you can cast the misty step spell (1/short rest).",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "high-elf",
					name: "High Elf"
				}
			},
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "fey-touched",
		"name": "Fey Touched",
		"resume": "+1 in Int., Wis., or Cha., and you learn misty step and one 1st-level spell from divination or enchantment school.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "fighting-initiate",
		"name": "Fighting Initiate",
		prerequisitesLabel: "Proficiency with a martial weapon",
		"resume": "You learn one Fighting Style option from the fighter class."
	},
	{
		index:  "flames-of-phlegethos",
		"name": "Flames of Phlegethos",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "thielfling",
					name: "Thielfling"
				}
			},
		],
		"resume": "+1 in Int. or Cha., reroll any 1 on fire spell damage, and cause flames to wreathe you if you cast a fire spell.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "grappler",
		"name": "Grappler",
		"resume": "You have advantage on attack rolls when grappling, and can try to restrained a creature grappled by you.",
		prerequisites: [
			{
				type: "abilityScore",
				"abilityScore": {
					"index": "str",
					"name": "STR",
					"url": "/api/ability-scores/str"
				},
				minimumScore: 13,
			},
		],
	},
	{
		index:  "great-weapon-master",
		"name": "Great Weapon Master",
		"resume": "Extra attack after a melee critical hit and you can choose to take -5 to attack roll to add +10 to damage with an heavy weapon."
	},
	{
		index:  "gunner",
		"name": "Gunner",
		"resume": "+1 in Dex., proficiency with firearms, ignore loading property of firearms and no disadvantage to attacks within 5 ft."
	},
	{
		index:  "healer",
		"name": "Healer",
		"resume": "You can stabilize a creature and restore it to 1 hp, or restore [1d6+4+its number of Hit Dice] hp to it."
	},
	{
		index:  "heavily-armored",
		"name": "Heavily Armored",
		"resume": "+1 in Str. and you gain proficiency with heavy armor.",
		prerequisites: [
			{
				"type": "proficiency",
				proficiency: {
					"index": "medium-armor",
					"name": "Medium Armor"
				}
			}
		]
	},
	{
		index:  "heavy-armor",
		"name": "Heavy Armor",
		"resume": "+1 in Str. and bludgeoning, piercing, and slashing damage are reduced by 3 if you are wearing an heavy armor.",
		prerequisites: [
			{
				"type": "proficiency",
				proficiency: {
					"index": "heavy-armor",
					"name": "Heavy Armor"
				}
			}
		]
	},
	{
		index:  "infernal-consitution",
		"name": "Infernal Constitution",
		"resume": "+1 in Con., resistance to cold and poison damage, and you have advantage on saving throws against being poisoned.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "thielfling",
					name: "Thielfling"
				}
			},
		],
	},
	{
		index:  "inspiring-leader",
		"name": "Inspiring Leader",
		"resume": "Up to 6 creatures within 30 ft of you can gain temporary hp equal to your level + your Cha. modifier.",
		prerequisites: [
			{
				type: "abilityScore",
				"abilityScore": {
					"index": "cha",
					"name": "CHA",
					"url": "/api/ability-scores/cha"
				},
				minimumScore: 13,
			},
		],
	},
	{
		index:  "keen-mind",
		"name": "Keen Mind",
		"resume": "+1 in Int., you know which way is north, when is the next sunrise/sunset, and recall any events within the past month."
	},
	{
		index:  "lightly-armored",
		"name": "Lightly Armored",
		"resume": "+1 in Str. or Dex. and you gain profociency with light armor.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "linguist",
		"name": "Linguist",
		"resume": "+1 in Int., you learn three languages, and you can ably create ciphers."
	},
	{
		index:  "lucky",
		"name": "Lucky",
		"resume": "You can reroll one d20 or force to reroll an attack roll against you (3/long rest)."
	},
	{
		index:  "mage-slayer",
		"name": "Mage Slayer",
		"resume": "You can use a reaction to make a melee attack against a spellcaster and advantage on saving throws against spell within 5 ft."
	},
	{
		index:  "magic-initiate",
		"name": "Magic Initiate",
		"resume": "You learn two cantrips and one 1st-level spell from one class."
	},
	{
		index:  "martial-adept",
		"name": "Martial Adept",
		"resume": "You learn two maneuvers from Battle Master archetype and gain one superiority die (d6)."
	},
	{
		index:  "medium-armor-master",
		"name": "Medium Armor Master",
		"resume": "No disadvantage to Stealth checks wearing medium armor and Dexterity bonus max to +3 instead of +2.",
		prerequisites: [
			{
				"type": "proficiency",
				proficiency: {
					"index": "medium-armor",
					"name": "Medium Armor"
				}
			}
		],
	},
	{
		index:  "metamagic-adept",
		"name": "Metamagic Adept",
		prerequisitesLabel: "Spellcasting or Pact Magic feature",
		"resume": "You learn two metamagic options and gain 2 sorcery points."
	},
	{
		index:  "mobile",
		"name": "Mobile",
		"resume": "Your speed increase by 10 ft, you can Dash on difficult terrain without malus, and don't provoke opportunity attacks in melee."
	},
	{
		index:  "moderately-armored",
		"name": "Moderately Armored",
		"resume": "+1 in Str. or Dex. and you gain proficiency with medium armor and shields.",
		prerequisites: [
			{
				"type": "proficiency",
				proficiency: {
					"index": "light-armor",
					"name": "Light Armor"
				}
			}
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "mounted-combatant",
		"name": "Mounted Combatant",
		"resume": "Advantage on melee attacks against unmounted creature and force an attack to target you instead of your mount."
	},
	{
		index:  "observant",
		"name": "Observant",
		"resume": "+1 in Int. or Wis., you can read on lips, and you have a +5 bonus in passive Perception and passive Investigation.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "orcish",
		"name": "Orcish",
		"resume": "+1 in Str. or Con., add one of the weapon's damage dice, and use a reaction to attack after using Relentless Endurance.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "half-orc",
					name: "Half Orc"
				}
			},
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "piercer",
		"name": "Piercer",
		"resume": "+1 in Str. or Dex., reroll one damage dice when you hit (piercing) and one additional damage dice in case of critical hit.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "poisoner",
		"name": "Poisoner",
		"resume": "Proficiency with poisoner's kit, apply as a bonus action and your attacks ignore resistance to poison damage."
	},
	{
		index:  "polearm-master",
		"name": "Polearm Master",
		"resume": "You can make an extra attack with a polearm weapon, and make an opportunity attack if a creature enter your reach."
	},
	{
		index:  "prodigy",
		"name": "Prodigy",
		"resume": "You gain proficiency with one skill, one tool or one language, and you gain expertise with one skill.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "half-orc",
					name: "Half Orc"
				}
			},
			{
				type: "race",
				race: {
					index: "half-elf",
					name: "Half Elf"
				}
			},
			{
				type: "race",
				race: {
					index: "human",
					name: "Human"
				}
			},
		],
	},
	{
		index:  "resilient",
		"name": "Resilient",
		"resume": "+1 in one ability and you gain proficiency in saving throws using this ability.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "ritual-caster",
		"name": "Ritual caster",
		prerequisitesLabel: "Intelligence or Wisdom 13 or higher",
		"resume": "You have a ritual book with two 1-st level ritual spells from one class and you can later on add other ritual spells you found."
	},
	{
		index:  "savage-attacker",
		"name": "Savage Attacker",
		"resume": "You can reroll melee weapon attack damage once per turn."
	},
	{
		index:  "second-chance",
		"name": "Second Chance",
		"resume": "+1 in Dex., Con., or Cha., and you can force a creature to reroll its attack roll if it hits you.",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "halfling",
					name: "hallfling"
				}
			},
		],
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "sentinel",
		"name": "Sentinel",
		"resume": "A successful OA reduce creature's speed to 0 for this turn and possibility to make an OA even if the ennemy take Disengage."
	},
	{
		index:  "shadow-touched",
		"name": "Shadow Touched",
		"resume": "+1 in Int., Wis., or Cha., and you learn invisibility and one 1st-level spell from illusion or necromancy school.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "sharpshooter",
		"name": "Sharpshooter",
		"resume": "Your ranged attacks ignore some cover, no disavantage at long range, and possibility to take -5 to hit for +10 on ranged damage."
	},
	{
		index:  "shield-master",
		"name": "Shield Master",
		"resume": "Attack also allows to shove, shield bonus to Dex. saving throws againts spells, and no 1/2 damage on successful saving throw."
	},
	{
		index:  "skill-expert",
		"name": "Skill Expert",
		"resume": "+1 in one ability, proficiency in one skill and expertise in one other in which you have proficiency.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "skilled",
		"name": "Skilled",
		"resume": "You gain proficiency with three skills or tools."
	},
	{
		index:  "skulker",
		"name": "Skulker",
		"resume": "Ranged weapon attack doesn't reveal your position and possibility to hide in a lighlly obscured area.",
		prerequisites: [
			{
				type: "abilityScore",
				"abilityScore": {
					"index": "dex",
					"name": "DEX",
					"url": "/api/ability-scores/dex"
				},
				minimumScore: 13,
			},
		],
	},
	{
		index:  "slasher",
		"name": "Slasher",
		"resume": "+1 in Str. or Dex., reduce target's speed by 10 ft when you hit (slashing) and target has disadvantage on attacks rolls.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "spell-sniper",
		"name": "Spell Sniper",
		prerequisitesLabel: "The ability to cast at least one spell",
		"resume": "Offensive spell's range doubled, these spells ignore some cover, and you learn one offensive cantrip."
	},
	{
		index:  "squat-nimbleness",
		"name": "Squat Nimbleness",
		prerequisitesLabel: "Dwarf or a Small race",
		"resume": "+1 in Str. or Dex., your speed increases by 5 ft, and proficiency and advantage to escape with Acrobatics or Athletics checks.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "tavern-brawler",
		"name": "Tavern Brawler",
		"resume": "+1 in Str. or Con., proficiency with improvised weapons, d4 for unarmed strike, and grapple with a bonus action.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "con",
						name: "CON"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "telekinetic",
		"name": "Telekinetic",
		"resume": "+1 in Int., Wis., or Cha., you learn mage hand and you can try to telekinetically shove one creature (5 ft).",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "telepathic",
		"name": "Telepathic",
		"resume": "+1 in Int., Wis., or Cha., you can cast detect thoughts and you can speak telepathically to any creature within 60 ft.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "int",
						name: "INT"
					},
					bonus: 1
				},
				{
					ability: {
						index: "wis",
						name: "WIS"
					},
					bonus: 1
				},
				{
					ability: {
						index: "cha",
						name: "CHA"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "tough",
		"name": "Tough",
		"resume": "Your hit point maximum increases by an amount equal to twice your level then by +2 at each level."
	},
	{
		index:  "war-caster",
		"name": "War Caster",
		prerequisitesLabel: "The ability to cast at least one spell",
		"resume": "You have advantage on saving throws to maintain concentration and you can cast some spells as part of an OA with a reaction."
	},
	{
		index:  "weapon-master",
		"name": "Weapon Master",
		"resume": "+1 in Str. or Dex. and you gain proficiency with four weapons.",
		"ability_option": {
			choose: 1,
			from: [
				{
					ability: {
						index: "str",
						name: "STR"
					},
					bonus: 1
				},
				{
					ability: {
						index: "dex",
						name: "DEX"
					},
					bonus: 1
				},
			]
		}
	},
	{
		index:  "wood-elf-magic",
		"name": "Wood Elf Magic",
		"resume": "You learn one druid cantrip and can cast the longstrider and pass without trace spells (1/long rest).",
		prerequisites: [
			{
				type: "race",
				race: {
					index: "wood-elf",
					name: "Wood Elf"
				}
			},
		],
	},
]

export default feats