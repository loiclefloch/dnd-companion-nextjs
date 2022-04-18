const clss = (api) => ({
  "index": "ranger",
  "name": "Ranger",
  "hit_dice": 10,
  "proficiency_choices": [
    {
      "choose": 3,
      "type": "proficiencies",
      "from": [
        {
          "index": "skill-animal-handling",
          "name": "Skill: Animal Handling",
          "url": "/api/proficiencies/skill-animal-handling"
        },
        {
          "index": "skill-athletics",
          "name": "Skill: Athletics",
          "url": "/api/proficiencies/skill-athletics"
        },
        {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/proficiencies/skill-insight"
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
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/proficiencies/skill-perception"
        },
        {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/proficiencies/skill-stealth"
        },
        {
          "index": "skill-survival",
          "name": "Skill: Survival",
          "url": "/api/proficiencies/skill-survival"
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
      "index": "medium-armor",
      "name": "Medium Armor",
      "url": "/api/proficiencies/medium-armor"
    },
    {
      "index": "shields",
      "name": "Shields",
      "url": "/api/proficiencies/shields"
    },
    {
      "index": "simple-weapons",
      "name": "Simple Weapons",
      "url": "/api/proficiencies/simple-weapons"
    },
    {
      "index": "martial-weapons",
      "name": "Martial Weapons",
      "url": "/api/proficiencies/martial-weapons"
    }
  ],
  "saving_throws": [
    {
      "index": "str",
      "name": "STR",
      "url": "/api/ability-scores/str"
    },
    {
      "index": "dex",
      "name": "DEX",
      "url": "/api/ability-scores/dex"
    }
  ],
  "starting_equipment": [
    {
      "equipment": {
        "index": "longbow",
        "name": "Longbow",
        "url": "/api/equipment/longbow"
      },
      "quantity": 1
    },
    {
      "equipment": {
        "index": "arrow",
        "name": "Arrow",
        "url": "/api/equipment/arrow"
      },
      "quantity": 20
    }
  ],
  "starting_equipment_options": [
    {
      "choose": 1,
      "type": "equipment",
      "from": [
        {
          "equipment": {
            "index": "scale-mail",
            "name": "Scale Mail",
            "url": "/api/equipment/scale-mail"
          },
          "quantity": 1
        },
        {
          "equipment": {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/equipment/leather-armor"
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
            "index": "shortsword",
            "name": "Shortsword",
            "url": "/api/equipment/shortsword"
          },
          "quantity": 2
        },
        {
          "equipment_option": {
            "choose": 2,
            "type": "equipment",
            "from": {
              "equipment_category": {
                "index": "simple-melee-weapons",
                "name": "Simple Melee Weapons",
                "url": "/api/equipment-categories/simple-melee-weapons"
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
            "index": "dungeoneers-pack",
            "name": "Dungeoneer's Pack",
            "url": "/api/equipment/dungeoneers-pack"
          },
          "quantity": 1
        },
        {
          "equipment": {
            "index": "explorers-pack",
            "name": "Explorer's Pack",
            "url": "/api/equipment/explorers-pack"
          },
          "quantity": 1
        }
      ]
    }
  ],
  "class_levels": "/api/classes/ranger/levels",
  "multi_classing": {
    "prerequisites": [
      {
        "ability_score": {
          "index": "dex",
          "name": "DEX",
          "url": "/api/ability-scores/dex"
        },
        "minimum_score": 13
      },
      {
        "ability_score": {
          "index": "wis",
          "name": "WIS",
          "url": "/api/ability-scores/wis"
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
        "index": "medium-armor",
        "name": "Medium Armor",
        "url": "/api/proficiencies/medium-armor"
      },
      {
        "index": "shields",
        "name": "Shields",
        "url": "/api/proficiencies/shields"
      },
      {
        "index": "simple-weapons",
        "name": "Simple Weapons",
        "url": "/api/proficiencies/simple-weapons"
      },
      {
        "index": "martial-weapons",
        "name": "Martial Weapons",
        "url": "/api/proficiencies/martial-weapons"
      }
    ],
    "proficiency_choices": [
      {
        "choose": 1,
        "type": "proficiencies",
        "from": [
          {
            "index": "skill-animal-handling",
            "name": "Skill: Animal Handling",
            "url": "/api/proficiencies/skill-animal-handling"
          },
          {
            "index": "skill-athletics",
            "name": "Skill: Athletics",
            "url": "/api/proficiencies/skill-athletics"
          },
          {
            "index": "skill-insight",
            "name": "Skill: Insight",
            "url": "/api/proficiencies/skill-insight"
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
            "index": "skill-perception",
            "name": "Skill: Perception",
            "url": "/api/proficiencies/skill-perception"
          },
          {
            "index": "skill-stealth",
            "name": "Skill: Stealth",
            "url": "/api/proficiencies/skill-stealth"
          },
          {
            "index": "skill-survival",
            "name": "Skill: Survival",
            "url": "/api/proficiencies/skill-survival"
          }
        ]
      }
    ]
  },
  "subclasses": [
    {
      "index": "hunter",
      "name": "Hunter",
      "url": "/api/subclasses/hunter"
    }
  ],
  "spellcasting": {
    "level": 2,
    "spellcasting_ability": {
      "index": "wis",
      "name": "WIS",
      "url": "/api/ability-scores/wis"
    },
    "info": [
      {
        "name": "Spell Slots",
        "desc": [
          "The Ranger table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
          "For example, if you know the 1st-level spell animal friendship and have a 1st-level and a 2nd-level spell slot available, you can cast animal friendship using either slot."
        ]
      },
      {
        "name": "Spells Known of 1st Level and Higher",
        "desc": [
          "You know two 1st-level spells of your choice from the ranger spell list.",
          "The Spells Known column of the Ranger table shows when you learn more ranger spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 5th level in this class, you can learn one new spell of 1st or 2nd level.",
          "Additionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots."
        ]
      },
      {
        "name": "Spellcasting Ability",
        "desc": [
          "Wisdom is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a ranger spell you cast and when making an attack roll with one.",
          "Spell save DC = 8 + your proficiency bonus + your Wisdom modifier.",
          "Spell attack modifier = your proficiency bonus + your Wisdom modifier."
        ]
      }
    ]
  },
  "spells": "/api/classes/ranger/spells",
  "url": "/api/classes/ranger"
})
	
export default clss