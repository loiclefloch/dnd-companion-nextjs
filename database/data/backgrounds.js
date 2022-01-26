import proficiencies from "./proficiencies.json"
import languages from "./languages.json"
import equipment from "./equipment.json"

import acolyte from "./backgrounds/acolyte"
import criminalSpy from "./backgrounds/criminal-spy"
import folkHero from "./backgrounds/folk-hero"
import sage from "./backgrounds/sage"

const api = {
  proficiencies,
  languages,
  buildProficiency: (index) => {
    const item = proficiencies.find(i => i.index === index)
    if (!item) {
      throw new Error(`Item not found ${item}`)
    }
    return {
      index: item.index,
      name: item.name,
      url: item.url
    }
  },
  getAllLanguages: () => {
    return  languages.map(l => ({
			index: l.index,
			name: l.name,
			url: l.url,
		}))
  },
  buildEquipment: (index) => {
    const item = equipment.find(i => i.index === index)
    if (!item) {
      throw new Error(`Item not found ${item}`)
    }
    return {
      index: item.index,
      name: item.name,
      url: item.url
    }
  },
  buildChooseEquipmentFromCategory: (choose, categoryIndex) => {
    return {
			"choose": 1,
			"type": "equipment",
			"from": {
				"equipment_category": { // TODO:
					"index": categoryIndex,
					"name": "Artisan's Tools",
					"url": "/api/equipment-categories/" + categoryIndex
				}
			}
		}
  },
  buildIdealAlignment: typeParam => {
    const type = typeParam.toLowerCase()
    if (type === "good") {
      return [
        {
          "index": "lawful-good",
          "name": "Lawful Good",
          "url": "/api/alignments/lawful-good"
        },
        {
          "index": "neutral-good",
          "name": "Neutral Good",
          "url": "/api/alignments/neutral-good"
        },
        {
          "index": "chaotic-good",
          "name": "Chaotic Good",
          "url": "/api/alignments/chaotic-good"
        }
      ]
    }

    if (type === 'chaotic') {
      return [
        {
          "index": "chaotic-good",
          "name": "Chaotic Good",
          "url": "/api/alignments/chaotic-good"
        },
        {
          "index": "chaotic-neutral",
          "name": "Chaotic Neutral",
          "url": "/api/alignments/chaotic-neutral"
        },
        {
          "index": "chaotic-evil",
          "name": "Chaotic Evil",
          "url": "/api/alignments/chaotic-evil"
        }
      ]
    }

    if (type === 'evil') {
      return [
        {
          "index": "lawful-evil",
          "name": "Lawful Evil",
          "url": "/api/alignments/lawful-evil"
        },
        {
          "index": "neutral-evil",
          "name": "Neutral Evil",
          "url": "/api/alignments/neutral-evil"
        },
        {
          "index": "chaotic-evil",
          "name": "Chaotic Evil",
          "url": "/api/alignments/chaotic-evil"
        }
      ]
    }

    if (type === 'neutral') {
      return [
        {
          "index": "lawful-neutral",
          "name": "Lawful Neutral",
          "url": "/api/alignments/lawful-neutral"
        },
        {
          "index": "neutral",
          "name": "Neutral",
          "url": "/api/alignments/neutral"
        },
        {
          "index": "chaotic-neutral",
          "name": "Chaotic Neutral",
          "url": "/api/alignments/chaotic-neutral"
        }
      ]
    }

    if (type === 'lawful') {
      return [
        {
          "index": "lawful-good",
          "name": "Lawful Good",
          "url": "/api/alignments/lawful-good"
        },
        {
          "index": "lawful-neutral",
          "name": "Lawful Neutral",
          "url": "/api/alignments/lawful-neutral"
        },
        {
          "index": "lawful-evil",
          "name": "Lawful Evil",
          "url": "/api/alignments/lawful-evil"
        }
      ]
    }

    if (type === 'any') {
      return [
        {
          "index": "lawful-good",
          "name": "Lawful Good",
          "url": "/api/alignments/lawful-good"
        },
        {
          "index": "neutral-good",
          "name": "Neutral Good",
          "url": "/api/alignments/neutral-good"
        },
        {
          "index": "chaotic-good",
          "name": "Chaotic Good",
          "url": "/api/alignments/chaotic-good"
        },
        {
          "index": "lawful-neutral",
          "name": "Lawful Neutral",
          "url": "/api/alignments/lawful-neutral"
        },
        {
          "index": "neutral",
          "name": "Neutral",
          "url": "/api/alignments/neutral"
        },
        {
          "index": "chaotic-neutral",
          "name": "Chaotic Neutral",
          "url": "/api/alignments/chaotic-neutral"
        },
        {
          "index": "lawful-evil",
          "name": "Lawful Evil",
          "url": "/api/alignments/lawful-evil"
        },
        {
          "index": "neutral-evil",
          "name": "Neutral Evil",
          "url": "/api/alignments/neutral-evil"
        },
        {
          "index": "chaotic-evil",
          "name": "Chaotic Evil",
          "url": "/api/alignments/chaotic-evil"
        }
      ]
    }

    throw new Error(`buildIdealAlignment ${type} not handled`)
  }
}

function build(background) {
  background.url = `/api/backgrounds/${background.index}`
  return background
}

export default [
  build(acolyte(api)),
  build(criminalSpy(api)),
  build(folkHero(api)),
  build(sage(api)),
]
