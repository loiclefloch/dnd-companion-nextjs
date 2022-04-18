const clss = (api) => ({
  "index": "barbarian",
  "name": "Barbarian",
  "hit_dice": 12,
  "proficiency_choices": [
    {
      "choose": 2,
      "type": "proficiencies",
      "from": [
        api.buildProficiency("skill-animal-handling"),
        api.buildProficiency("skill-athletics"),
        api.buildProficiency("skill-intimidation"),
        api.buildProficiency("skill-nature"),
        api.buildProficiency("skill-perception"),
        api.buildProficiency("skill-survival"),
      ]
    }
  ],
  "proficiencies": [
    api.buildProficiency("light-armor"),
    api.buildProficiency("medium-armor"),
    api.buildProficiency("shields"),
    api.buildProficiency("simple-weapons"),
    api.buildProficiency("martial-weapons"),
  ],
  "saving_throws": [
    {
      "index": "str",
      "name": "STR",
      "url": "/api/ability-scores/str"
    },
    {
      "index": "con",
      "name": "CON",
      "url": "/api/ability-scores/con"
    }
  ],
  "starting_equipment": [
    {
      "equipment": {
        "index": "explorers-pack",
        "name": "Explorer's Pack",
        "url": "/api/equipment/explorers-pack"
      },
      "quantity": 1
    },
    {
      "equipment": {
        "index": "javelin",
        "name": "Javelin",
        "url": "/api/equipment/javelin"
      },
      "quantity": 4
    }
  ],
  "starting_equipment_options": [
    {
      "choose": 1,
      "type": "equipment",
      "from": [
        {
          "equipment": {
            "index": "greataxe",
            "name": "Greataxe",
            "url": "/api/equipment/greataxe"
          },
          "quantity": 1
        },
        {
          "equipment_option": {
            "choose": 1,
            "type": "equipment",
            "from": {
              "equipment_category": {
                "index": "martial-melee-weapons",
                "name": "Martial Melee Weapons",
                "url": "/api/equipment-categories/martial-melee-weapons"
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
            "index": "handaxe",
            "name": "Handaxe",
            "url": "/api/equipment/handaxe"
          },
          "quantity": 2
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
    }
  ],
  "class_levels": "/api/classes/barbarian/levels",
  "multi_classing": {
    "prerequisites": [
      {
        "ability_score": {
          "index": "str",
          "name": "STR",
          "url": "/api/ability-scores/str"
        },
        "minimum_score": 13
      }
    ],
    "proficiencies": [
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
    ]
  },
  "subclasses": [
    {
      "index": "berserker",
      "name": "Berserker",
      "url": "/api/subclasses/berserker"
    }
  ],
  "url": "/api/classes/barbarian",
  // TODO: levelling - barbarian
  levelling: null,
})

export default clss