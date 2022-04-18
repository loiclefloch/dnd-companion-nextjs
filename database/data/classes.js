import proficiencies from "./proficiencies.json"

import barbarian from "./classes/barbarian"
import bard from "./classes/bard"
import cleric from "./classes/cleric"
import druid from "./classes/druid"
import fighter from "./classes/fighter"
import monk from "./classes/monk"
import paladin from "./classes/paladin"
import ranger from "./classes/ranger"
import rogue from "./classes/rogue"
import sorcerer from "./classes/sorcerer"
import warlock from "./classes/warlock"
import wizard from "./classes/wizard"

const api = {
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
	applyLevellingLevelNoop: (from, to) => {
		const data = {}
		for (let i = from; i <= to; i++) {
			data[i] = []
		}
		return data
	},
	applyLevellingLevelNotCreatedYet: (from, to) => {
		const data = {}
		for (let i = from; i <= to; i++) {
			data[i] = null
		}
		return data
	},
}

export default [
	barbarian(api),
	bard(api),
	cleric(api),
	druid(api),
	fighter(api),
	monk(api),
	paladin(api),
	ranger(api),
	rogue(api),
	sorcerer(api),
	warlock(api),
	wizard(api),
]