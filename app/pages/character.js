import useI18n from "../modules/i18n/useI18n"
import StatsSmall from "../components/StatsSmall"

const char = {
	campaign: {
		name: '',
		id: 1,
	},

	name: 'Ylvir',
	age: 245,

	age: '',
	alignementIndex: 'chaotic-good',

	race: {
		index: 'high-elf',

		// TODO: add on race / subrace:
		weightSpeeds: {
			normal: {
				walk: 30,
				burrow: 0,
				climb: 0,
				fly: 0,
				swim: 0
			}
		},

		isSubRace: true,
	},

	classes: [
		{
			name: 'druid'
			// TODO: format with class data from the API
		}
	],

	stats: {
		STR: 8,
		DEX: 15,
		CON: 14,
		INT: 10,
		WIS: 16,
		CHA: 12,
	},

	statsDetail: [
		{ type: 'STR', label: { en: 'Strength', fr: 'Force' }, value: 8, modifier: -1 },
		{ type: 'DEX', label: { en: 'Dexterity', fr: 'Dextérité' }, value: 15, modifier: +2 },
		{ type: 'CON', label: { en: 'Constitution', fr: 'Constitution' }, value: 14, modifier: +2 },
		{ type: 'INT', label: { en: 'Intelligence', fr: 'Intelligence' }, value: 10, modifier: 0 },
		{ type: 'WIS', label: { en: 'Wisdom', fr: 'Sagesse' }, value: 16, modifier: 3 },
		{ type: 'CHA', label: { en: 'Charsime', fr: 'Charisme' }, value: 12, modifier: 1 },
	],

	// modifiers: {
	// 	background: [],
	// 	class: [],
	// 	feat: [],
	// 	item: [],
	// 	race: [
	// 		{
	// 			fixedValue: 60,
	// 			type: "set-base",
	// 			subType: "darkvision",
	// 			name: {
	// 				en: "Darkvision"
	// 			},
	// 			values: {
	// 				distance: 60 // darkvision of 60 feets. to replace in description
	// 			}
	// 		}
	// 	]
	// },

	spellSlots: [
		{ level: 1, used: 0, available: 0 },
		{ level: 2, used: 0, available: 0 },
		{ level: 3, used: 0, available: 0 },
		{ level: 4, used: 0, available: 0 },
		{ level: 5, used: 0, available: 0 },
		{ level: 6, used: 0, available: 0 },
		{ level: 7, used: 0, available: 0 },
		{ level: 8, used: 0, available: 0 },
		{ level: 9, used: 0, available: 0 },
	],

	deathSaves: {
		nbFailed: null,
		nbSucceeed: null,
		isStabilized: false
	},

	currencies: {
		cp: 0,
		sp: 0,
		gp: 0,
		ep: 0,
		pp: 0
	},

	spells: {
		background: [],
		class: [],
		feat: [],
		item: [],
		race: []
	},

	// actions: {
	// 	class: [
	// 		{
	// 			name: "Wild Shape",
	// 			nameLocalized: {
	// 				en: 'Wild Shape'
	// 			},
	// 			type: 'TODO',
	// 			description: {
	// 				en: ``
	// 			},
	// 			resume: {
	// 				en: `As an action, you can magically assume the shape of a beast that you have seen before twice per short rest. [2nd] Max CR 1/4 (no flying or swimming speed) [4th] Max CR 1/2 (no flying speed) [8th] Max CR 1
	// 				You can stay in beast shape for {{(classlevel/2)@rounddown}} hours before reverting back to your normal form (or as a bonus action earlier or if you fall unconscious, drop to 0 hit points, or die).`
	// 			},
	// 			range: {},
	// 		}
	// 	],
	// 	feature: [

	// 	],
	// 	race: [

	// 	],
	// 	item: [

	// 	]
	// }
}

function Character() {

	return <div>
		<h1>Name</h1>

		<StatsSmall stats={char.stats} />
	</div>
}

export default Character