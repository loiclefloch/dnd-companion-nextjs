const clss = (api) => (
	{
    "index": "bard",
    "name": "Bard",
    "hit_dice": 8,
    "proficiency_choices": [
      {
        "choose": 3,
        "type": "proficiencies",
        "from": [
          api.buildProficiency("skill-acrobatics"),
          api.buildProficiency("skill-animal-handling"),
          api.buildProficiency("skill-arcana"),
          api.buildProficiency("skill-athletics"),
          api.buildProficiency("skill-deception"),
          api.buildProficiency("skill-history"),
          api.buildProficiency("skill-insight"),
          api.buildProficiency("skill-intimidation"),
          api.buildProficiency("skill-investigation"),
          api.buildProficiency("skill-medicine"),
          api.buildProficiency("skill-nature"),
          api.buildProficiency("skill-perception"),
          api.buildProficiency("skill-performance"),
          api.buildProficiency("skill-persuasion"),
          api.buildProficiency("skill-religion"),
          api.buildProficiency("skill-sleight-of-hand"),
          api.buildProficiency("skill-stealth"),
          api.buildProficiency("skill-survival"),
        ]
      },
      {
        "choose": 3,
        "type": "proficiencies",
        "from": [
          api.buildProficiency("bagpipes"),
          api.buildProficiency("drum"),
          api.buildProficiency("dulcimer"),
          api.buildProficiency("flute"),
          api.buildProficiency("lute"),
          api.buildProficiency("lyre"),
          api.buildProficiency("horn"),
          api.buildProficiency("pan-flute"),
          api.buildProficiency("shawm"),
          api.buildProficiency("viol"),
        ]
      }
    ],
    "proficiencies": [
      api.buildProficiency("light-armor"),
      api.buildProficiency("simple-weapons"),
      api.buildProficiency("longswords"),
      api.buildProficiency("rapiers"),
      api.buildProficiency("shortswords"),
      api.buildProficiency("hand-crossbows"),
    ],
    "saving_throws": [
      {
        "index": "dex",
        "name": "DEX",
        "url": "/api/ability-scores/dex"
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
          "index": "leather-armor",
          "name": "Leather Armor",
          "url": "/api/equipment/leather-armor"
        },
        "quantity": 1
      },
      {
        "equipment": {
          "index": "dagger",
          "name": "Dagger",
          "url": "/api/equipment/dagger"
        },
        "quantity": 1
      }
    ],
    "starting_equipment_options": [
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "rapier",
              "name": "Rapier",
              "url": "/api/equipment/rapier"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "longsword",
              "name": "Longsword",
              "url": "/api/equipment/longsword"
            },
            "quantity": 1
          },
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
              "index": "diplomats-pack",
              "name": "Diplomat's Pack",
              "url": "/api/equipment/diplomats-pack"
            },
            "quantity": 1
          },
          {
            "equipment": {
              "index": "entertainers-pack",
              "name": "Entertainer's Pack",
              "url": "/api/equipment/entertainers-pack"
            },
            "quantity": 1
          }
        ]
      },
      {
        "choose": 1,
        "type": "equipment",
        "from": [
          {
            "equipment": {
              "index": "lute",
              "name": "Lute",
              "url": "/api/equipment/lute"
            },
            "quantity": 1
          },
          {
            "equipment_option": {
              "choose": 1,
              "type": "equipment",
              "from": {
                "equipment_category": {
                  "index": "musical-instruments",
                  "name": "Musical Instruments",
                  "url": "/api/equipment-categories/musical-instruments"
                }
              }
            }
          }
        ]
      }
    ],
    "class_levels": "/api/classes/bard/levels",
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
        }
      ],
      "proficiency_choices": [
        {
          "choose": 1,
          "type": "proficiencies",
          "from": [
            api.buildProficiency("skill-acrobatics"),
            api.buildProficiency("skill-animal-handling"),
            api.buildProficiency("skill-arcana"),
            api.buildProficiency("skill-athletics"),
            api.buildProficiency("skill-deception"),
            api.buildProficiency("skill-history"),
            api.buildProficiency("skill-insight"),
            api.buildProficiency("skill-intimidation"),
            api.buildProficiency("skill-investigation"),
            api.buildProficiency("skill-medicine"),
            api.buildProficiency("skill-nature"),
            api.buildProficiency("skill-perception"),
            api.buildProficiency("skill-performance"),
            api.buildProficiency("skill-persuasion"),
            api.buildProficiency("skill-religion"),
            api.buildProficiency("skill-sleight-of-hand"),
            api.buildProficiency("skill-stealth"),
            api.buildProficiency("skill-survival"), 
          ]
        },
        {
          "choose": 1,
          "type": "proficiencies",
          "from": [
            api.buildProficiency("bagpipes"),
            api.buildProficiency("drum"),
            api.buildProficiency("dulcimer"),
            api.buildProficiency("flute"),
            api.buildProficiency("lute"),
            api.buildProficiency("lyre"),
            api.buildProficiency("horn"),
            api.buildProficiency("pan-flute"),
            api.buildProficiency("shawm"),
            api.buildProficiency("viol"),
          ]
        }
      ]
    },
    "subclasses": [
      {
        "index": "lore",
        "name": "Lore",
        "url": "/api/subclasses/lore"
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
            "You know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Bard table."
          ]
        },
        {
          "name": "Spell Slots",
          "desc": [
            "The Bard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
            "For example, if you know the 1st-level spell cure wounds and have a 1st-level and a 2nd-level spell slot available, you can cast cure wounds using either slot."
          ]
        },
        {
          "name": "Spells Known of 1st Level and Higher",
          "desc": [
            "You know four 1st-level spells of your choice from the bard spell list.",
            "The Spells Known column of the Bard table shows when you learn more bard spells of your choice.",
            "Each of these spells must be of a level for which you have spell slots, as shown on the table. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.",
            "Additionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots."
          ]
        },
        {
          "name": "Spellcasting Ability",
          "desc": [
            "Charisma is your spellcasting ability for your bard spells. Your magic comes from the heart and soul you pour into the performance of your music or oration. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast and when making an attack roll with one.",
            "Spell save DC = 8 + your proficiency bonus + your Charisma modifier.",
            "Spell attack modifier = your proficiency bonus + your Charisma modifier."
          ]
        },
        {
          "name": "Ritual Casting",
          "desc": [
            "You can cast any bard spell you know as a ritual if that spell has the ritual tag."
          ]
        },
        {
          "name": "Spellcasting Focus",
          "desc": [
            "You can use a musical instrument (see Equipment) as a spellcasting focus for your bard spells."
          ]
        }
      ]
    },
    "spells": "/api/classes/bard/spells",
    "url": "/api/classes/bard"
  }
)
	
	export default clss