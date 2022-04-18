import berserker from "./subclasses/berserker"
import champion from "./subclasses/champion"
import devotion from "./subclasses/devotion"
import draconic from "./subclasses/draconic"
import evocation from "./subclasses/evocation"
import fiend from "./subclasses/fiend"
import hunter from "./subclasses/hunter"
import land from "./subclasses/land"
import life from "./subclasses/life"
import lore from "./subclasses/lore"
import openHand from "./subclasses/open-hand"
import thief from "./subclasses/thief"

const api = {
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
  berserker(api),
  champion(api),
  devotion(api),
  draconic(api),
  evocation(api),
  fiend(api),
  hunter(api),
  land(api),
  life(api),
  lore(api),
  openHand(api),
  thief
(api)]