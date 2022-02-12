const clss = (api) => (
	{
    "index": "warlock",
    "name": "Warlock",
    "hit_dice": 8,
    "proficiency_choices": [
      {
        "choose": 2,
        "type": "proficiencies",
        "from": [
          {
            "index": "skill-arcana",
            "name": "Skill: Arcana",
            "url": "/api/proficiencies/skill-arcana"
          },
          {
            "index": "skill-deception",
            "name": "Skill: Deception",
            "url": "/api/proficiencies/skill-deception"
          },
          {
            "index": "skill-history",
            "name": "Skill: History",
            "url": "/api/proficiencies/skill-history"
          },
          {
            "index": "skill-intimidation",
            "name": "Skill: Intimidation",
            "url": "/api/proficiencies/skill-intimidation"
          },
          {
            "index": "skill-investigation",
            "name": "Skill: Investigation",
            "url": "/api/proficiencies/skill-investigation"
          },
          {
            "index": "skill-nature",
            "name": "Skill: Nature",
            "url": "/api/proficiencies/skill-nature"
          },
          {
            "index": "skill-religion",
            "name": "Skill: Religion",
            "url": "/api/proficiencies/skill-religion"
          }
        ]
      }
    ],
    "proficiencies": [
      {
        "index": "light-armor",
        "name": "Light Armor",
        "url": "/api/proficiencies/light-armor"
      },
      {
        "index": "simple-weapons",
        "name": "Simple Weapons",
        "url": "/api/proficiencies/simple-weapons"
      }
    ],
    "saving_throws": [
      {
        "index": "wis",
        "name": "WIS",
        "url": "/api/ability-scores/wis"
      },
      {
        "index": "cha",
        "name": "CHA",
        "url": "/api/ability-scores/cha"
      }
    ],
    "starting_equipment": [
      {
        "equipment": {
          "index": "dagger",
          "name": "Dagger",
          "url": "/api/equipment/dagger"
        },
        "quantity": 2
      },
      {
        "equipment": {
          "index": "leather-armor",
          "name": "Leather Armor",
          "url": "/api/equipment/leather-armor"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          [
            {
              "equipment": {
                "index": "crossbow-light",
                "name": "Crossbow, light",
                "url": "/api/equipment/crossbow-light"
              },
              "quantity": 1
            },
            {
              "equipment": {
                "index": "crossbow-bolt",
                "name": "Crossbow bolt",
                "url": "/api/equipment/crossbow-bolt"
              },
              "quantity": 20
            }
          ],
          {
            "equipment_option": {
              "choose": 1,
              "type": "equipment",
              "from": {
                "equipment_category": {
                  "index": "simple-weapons",
                  "name": "Simple Weapons",
                  "url": "/api/equipment-categories/simple-weapons"
                }
              }
            }
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "component-pouch",
              "name": "Component pouch",
              "url": "/api/equipment/component-pouch"
            },
            "quantity": 1
          },
          {
            "equipment_option": {
              "choose": 1,
              "type": "equipment",
              "from": {
                "equipment_category": {
                  "index": "arcane-foci",
                  "name": "Arcane Foci",
                  "url": "/api/equipment-categories/arcane-foci"
                }
              }
            }
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "scholars-pack",
              "name": "Scholar's Pack",
              "url": "/api/equipment/scholars-pack"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "dungeoneers-pack",
              "name": "Dungeoneer's Pack",
              "url": "/api/equipment/dungeoneers-pack"
            },
            "quantity": 1
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": {
          "equipment_category": {
            "index": "simple-weapons",
            "name": "Simple Weapons",
            "url": "/api/equipment-categories/simple-weapons"
          }
        }
      }
    ],
    "class_levels": "/api/classes/warlock/levels",
    "multi_classing": {
      "prerequisites": [
        {
          "ability_score": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/ability-scores/cha"
          },
          "minimum_score": 13
        }
      ],
      "proficiencies": [
        {
          "index": "light-armor",
          "name": "Light Armor",
          "url": "/api/proficiencies/light-armor"
        },
        {
          "index": "simple-weapons",
          "name": "Simple Weapons",
          "url": "/api/proficiencies/simple-weapons"
        }
      ]
    },
    "subclasses": [
      {
        "index": "fiend",
        "name": "Fiend",
        "url": "/api/subclasses/fiend"
      }
    ],
    "spellcasting": {
      "level": 1,
      "spellcasting_ability": {
        "index": "cha",
        "name": "CHA",
        "url": "/api/ability-scores/cha"
      },
      "info": [
        {
          "name": "Cantrips",
          "desc": [
            "You know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table."
          ]
        },
        {
          "name": "Spell Slots",
          "desc": [
            "The Warlock table shows how many spell slots you have. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest.",
            "For example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell thunderwave, you must spend one of those slots, and you cast it as a 3rd-level spell."
          ]
        },
        {
          "name": "Spells Known of 1st Level and Higher",
          "desc": [
            "At 1st level, you know two 1st-level spells of your choice from the warlock spell list.",
            "The Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level and higher. ",
            "A spell you choose must be of a level no higher than what's shown in the table's Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level.",
            "Additionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots."
          ]
        },
        {
          "name": "Spellcasting Ability",
          "desc": [
            "Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one.",
            "Spell save DC = 8 + your proficiency bonus + your Charisma modifier.",
            "Spell attack modifier = your proficiency bonus + your Charisma modifier."
          ]
        },
        {
          "name": "Spellcasting Focus",
          "desc": [
            "You can use an arcane focus as a spellcasting focus for your warlock spells."
          ]
        }
      ]
    },
    "spells": "/api/classes/warlock/spells",
    "url": "/api/classes/warlock"
  }
	)
	
	export default clss