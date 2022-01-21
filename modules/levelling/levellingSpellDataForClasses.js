import camelize from "../utils/camelize"
import levels from "../../database/data/levels.json"

// {
// 	"_TEMPLATE": {
//     "1": {
//       "features": [],
//       "slots": {}
//     },
//     "2": {
//       "features": [],
//       "slots": {}
//     },
//     "3": {
//       "features": [],
//       "slots": {}
//     },
//     "4": {
//       "features": [],
//       "slots": {}
//     },
//     "5": {
//       "features": [],
//       "slots": {}
//     },
//     "6": {
//       "features": [],
//       "slots": {}
//     },
//     "7": {
//       "features": [],
//       "slots": {}
//     },
//     "8": {
//       "features": [],
//       "slots": {}
//     },
//     "9": {
//       "features": [],
//       "slots": {}
//     },
//     "10": {
//       "features": [],
//       "slots": {}
//     },
//     "11": {
//       "features": [],
//       "slots": {}
//     },
//     "12": {
//       "features": [],
//       "slots": {}
//     },
//     "13": {
//       "features": [],
//       "slots": {}
//     },
//     "14": {
//       "features": [],
//       "slots": {}
//     },
//     "15": {
//       "features": [],
//       "slots": {}
//     },
//     "16": {
//       "features": [],
//       "slots": {}
//     },
//     "17": {
//       "features": [],
//       "slots": {}
//     },
//     "18": {
//       "features": [],
//       "slots": {}
//     },
//     "19": {
//       "features": [],
//       "slots": {}
//     },
//     "20": {
//       "features": [],
//       "slots": {}
//     }
//   },
//   "barbarian": {
//     "1": {
//       "features": ["rage", "barbarian-unarmored-defense"],
//       "slots": {}
//     },
//     "2": {
//       "features": ["reckless-attack", "danger-sense"],
//       "slots": {}
//     },
//     "3": {
//       "features": ["primal-path"],
//       "slots": {}
//     },
//     "4": {
//       "features": ["barbarian-ability-score-improvement-1"],
//       "slots": {}
//     },
//     "5": {
//       "features": ["barbarian-extra-attack", "fast-movement"],
//       "slots": {}
//     },
//     "6": {
//       "// TODO:": "path-feature does not exists",
//       "features": ["path-feature"],
//       "slots": {}
//     },
//     "7": {
//       "features": ["feral-instinct"],
//       "slots": {}
//     },
//     "8": {
//       "features": ["barbarian-ability-score-improvement-2"],
//       "slots": {}
//     },
//     "9": {
//       "features": ["brutal-critical-1-die"],
//       "slots": {}
//     },
//     "10": {
//       "// TODO:": "path-feature does not exists",
//       "features": ["path-feature"],
//       "slots": {}
//     },
//     "11": {
//       "features": [
// 				"relentless-rage"
// 			],
//       "slots": {}
//     },
//     "12": {
//       "features": ["barbarian-ability-score-improvement-3"],
//       "slots": {}
//     },
//     "13": {
//       "features": ["brutal-critical-2-die"],
//       "slots": {}
//     },
//     "14": {
// 			"// TODO:": "path-feature does not exists",
//       "features": ["path-feature"],
//       "slots": {}
//     },
//     "15": {
//       "features": ["persistent-rage"],
//       "slots": {}
//     },
//     "16": {
// 			"features": ["barbarian-ability-score-improvement-4"],
//       "slots": {}
//     },
//     "17": {
//       "features": ["brutal-critical-3-die"],
//       "slots": {}
//     },
//     "18": {
//       "features": ["indomitable-might"],
//       "slots": {}
//     },
//     "19": {
// 			"features": ["barbarian-ability-score-improvement-5"],
//       "slots": {}
//     },
//     "20": {
//       "features": ["primal-champion"],
//       "slots": {}
//     }
//   },
//   "druid": {
//     "1": {
//       "features": ["druidic", "spellcasting-druid"],
//       "slots": {
//         "0": 2,
//         "1": 2
//       }
//     },
//     "2": {
//       "features": ["druid-circle"],
//       "slots": {
//         "0": 2,
//         "1": 3
//       }
//     },
//     "3": {
//       "features": [],
//       "slots": {
//         "0": 2,
//         "1": 3,
//         "2": 2
//       }
//     },
//     "4": {
//       "features": ["druid-ability-score-improvement-1"],
//       "slots": {
//         "0": 3,
//         "1": 4,
//         "2": 3
//       }
//     },
//     "5": {
//       "features": [],
//       "slots": {}
//     },
//     "6": {
//       "features": [],
//       "slots": {}
//     },
//     "7": {
//       "features": [],
//       "slots": {}
//     },
//     "8": {
//       "features": [],
//       "slots": {}
//     },
//     "9": {
//       "features": [],
//       "slots": {}
//     },
//     "10": {
//       "features": [],
//       "slots": {}
//     },
//     "11": {
//       "features": [],
//       "slots": {}
//     },
//     "12": {
//       "features": [],
//       "slots": {}
//     },
//     "13": {
//       "features": [],
//       "slots": {}
//     },
//     "14": {
//       "features": [],
//       "slots": {}
//     },
//     "15": {
//       "features": [],
//       "slots": {}
//     },
//     "16": {
//       "features": [],
//       "slots": {}
//     },
//     "17": {
//       "features": [],
//       "slots": {
//         "0": 4,
//         "1": 4,
//         "2": 3,
//         "3": 3,
//         "4": 3,
//         "5": 2,
//         "6": 1,
//         "7": 1,
//         "8": 1,
//         "9": 1
//       }
//     },
//     "18": {
//       "features": [],
//       "slots": {}
//     },
//     "19": {
//       "features": [],
//       "slots": {}
//     },
//     "20": {
//       "features": [],
//       "slots": {}
//     }
//   }
// }


const classes = [
  "barbarian",
  "bard",
  "druid",
  "cleric",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
]

const data = {}

classes.forEach(className => {
  const levelling = {}

  for (let level = 1; level <= 20; level++) {
    const levelData = levels.find(l => l.level === level && l.class.index === className)

    levelling[level] = {
      features: levelData.features.map(f => f.index),
      classSpecific: levelData.class_specific,
      spellcasting: levelData.spellcasting,
      abilityScoreBonuses: levelData.ability_score_bonuses,
      profBonus: levelData.prof_bonus,
      spellcasting: {
        spellsKnown: levelData.spellcasting?.cantrips_known || 0,
        cantripsKnown: levelData.spellcasting?.cantrips_known || 0,
      },
      slots: levelData.spellcasting ? {
        0: -1, // infinite
        1: levelData.spellcasting.spell_slots_level_1,
        2: levelData.spellcasting.spell_slots_level_2,
        3: levelData.spellcasting.spell_slots_level_3,
        4: levelData.spellcasting.spell_slots_level_4,
        5: levelData.spellcasting.spell_slots_level_5,
        6: levelData.spellcasting.spell_slots_level_6,
        7: levelData.spellcasting.spell_slots_level_7,
        8: levelData.spellcasting.spell_slots_level_8,
        9: levelData.spellcasting.spell_slots_level_9,
      } :  {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
      },
    }
  }

  data[className] = levelling
})

const camelizedData = camelize(data)
export default camelizedData