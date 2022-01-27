import { isEmpty } from "lodash"
import proficiencies from "./proficiencies.json"
import languages from "./languages.json"
import equipmentItems from "./equipment.json"
import equipmentCategories from "./equipment-categories.json"

import acolyte from "./backgrounds/acolyte"
import criminalSpy from "./backgrounds/criminal-spy"
import folkHero from "./backgrounds/folk-hero"
import sage from "./backgrounds/sage"
import soldier from "./backgrounds/soldier"
import entertainer from "./backgrounds/entertainer"

const backgrounds = [
  acolyte,
  criminalSpy,
  folkHero,
  sage,
  soldier,
  entertainer,
]

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
    const item = equipmentItems.find(i => i.index === index)
    if (!item) {
      throw new Error(`Item not found ${index}`)
    }
    return {
      index: item.index,
      name: item.name,
      url: item.url
    }
  },
  buildChooseEquipmentFromCategory: (choose, categoryIndex) => {
    const equipmentCategory = equipmentCategories.find(c => c.index === categoryIndex)
    const items = equipmentCategory.equipment.map(e => equipmentItems.find(item => item.index === e.index))
    if (isEmpty(items)) {
      throw new Error(`Missing items for ${categoryIndex}`)
    }
    return {
			"choose": choose,
			"type": "equipment",
			"equipmentCategory": equipmentCategory,
			"from": items,
		}
  },
  buildProficiencyOption: (choose, type) => {
    const from = api.proficiencies.filter(f => f.type === type)
    if (isEmpty(from)) {
      throw new Error(`Missing proficiencies for ${type}`)
    }
    return {
      choose,
      "type": "proficiencies",
      from
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

export default backgrounds.map(b => build(b(api)))
