import classes from '../../../database/data/classes.json'
import races from '../../../database/data/races.json'
import subraces from '../../../database/data/subraces.json'
import spells from '../../../database/data/spells.json'
import equipmentList from '../../../database/data/equipment.json'
import magicItems from '../../../database/data/magic-items.json'
import { format as formatRace } from "../useRace"
import { format as formatClass } from "../useClass"
import { getLevelExperienceStage, getSpellLevelForCharacterLevel } from "../../levelling"
import { formatEquipmentItem } from "../useEquipmentItem"
import { formatMagicItem } from "../useMagicItem"
import { formatSpell } from "../useSpell"

const level = 2

const charactedClasses = [
	formatClass(classes.find(clss => clss.index === 'druid'))
]

export default [
	{
		id: 1,

		campaign: {
			name: '',
			id: 1,
		},

		level,
		maxSpellLevel: getSpellLevelForCharacterLevel(charactedClasses, level),
		
		levelling: {
			xp: getLevelExperienceStage(level + 1) * 0.26,
			history: [
				{
					id: 0,
					label: 'Initial XP',
					amount: 3000,
				},
				{
					id: 1,
					label: 'Killed a wolf',
					amount: 200,
				},
				{
					id: 2,
					label: 'Saved a cow',
					amount: 200,

				},
				{
					id: 3,
					label: 'Some gobelins',
					amount: 300,
				}
			].reverse()
		},

		classes: charactedClasses,

		name: 'Ylvir',
		age: 245,

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

			...formatRace(subraces.find(subrace => subrace.index === 'high-elf'))
		},


		stats: {
			STR: 8,
			DEX: 15,
			CON: 14,
			INT: 10,
			WIS: 16,
			CHA: 2,
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
			cp: 3578,
			sp: 1232,
			gp: 300,
			ep: 3,
			pp: 1
		},

		spells: {
			background: [],
			class: [],
			feat: [],
			item: [],
			race: []
		},

		spellMod: 'CHA',
		spellModValue: 3,

		spellsList: [
			{ ...spells.find(spell => spell.index === "druidcraft"), isPrepared: true },
			{ ...spells.find(spell => spell.index === "animal-friendship"), isPrepared: true },
			{ ...spells.find(spell => spell.index === "chill-touch"), isPrepared: true },
			{ ...spells.find(spell => spell.index === "thunderwave"), isPrepared: true },
			{ ...spells.find(spell => spell.index === "aid"), isPrepared: true },
			{ ...spells.find(spell => spell.index === "guidance"), isPrepared: false },
			{ ...spells.find(spell => spell.index === "purify-food-and-drink"), isPrepared: true },
		].map(formatSpell),

		equipment: [
			...magicItems.map(formatMagicItem),
			...equipmentList.map(formatEquipmentItem),
			// equipmentList.find(equipmentItem => equipmentItem.index === "club"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "dagger"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "javelin"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "crossbow-bolt"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "warship"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "clothes-costume"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "splint-armor"),
			// equipmentList.find(equipmentItem => equipmentItem.index === "alchemists-supplies"),
		],
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
]