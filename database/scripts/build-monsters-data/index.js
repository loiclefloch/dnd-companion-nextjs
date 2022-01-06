const forEach = require("lodash/forEach")
const srdMonsters = require("./data/dnd-5e-srd__monsters.json")
const tkfuMonsters = require("./data/tkfu__srd_5e_monsters.json")
const manual = require("./data/manual.json")
const aidedd = require("./data/aidedd.json")
const donjondudragonfr = require("./data/donjondudragon.fr.json")

function convertToSlug(Text) {
  return Text.toLowerCase()
             .replace(/[^\w ]+/g, '')
             .replace(/ +/g, '-');
}

const keys = {}

function extractChallenge(challengeLabel) {
	const regex = /(.*) \((.*) XP\)/

	const match = challengeLabel.match(regex);
  if (!match) {
    throw new Error(`extractChallenger: ${challengeLabel} not handled`);
  }

	// [
	// 	"0",
	// 	"1",
	// 	"2",
	// 	"3",
	// 	"4",
	// 	"5",
	// 	"6",
	// 	"7",
	// 	"8",
	// 	"9",
	// 	"10",
	// 	"11",
	// 	"12",
	// 	"13",
	// 	"14",
	// 	"15",
	// 	"16",
	// 	"17",
	// 	"19",
	// 	"20",
	// 	"21",
	// 	"22",
	// 	"23",
	// 	"24",
	// 	"30",
	// 	"1/4",
	// 	"1/2",
	// 	"1/8"
	// ]
  const difficulty = match[1]
// 	[
//     10,
//     100,
//     10000,
//     1100,
//     11500,
//     13000,
//     15000,
//     155000,
//     1800,
//     18000,
//     200,
//     22000,
//     2300,
//     25,
//     25000,
//     2900,
//     33000,
//     3900,
//     41000,
//     450,
//     50,
//     5000,
//     50000,
//     5900,
//     62000,
//     700,
//     7200,
//     8400
// ]
  const xp =  Number(match[2].replaceAll(",", ""));

	// keys[xp] = true

	return {
		label: challengeLabel,
		difficulty,
		xp
	}
}
function transform(baseMonster) {
	// {
	// 	"name": true,
	// 	"meta": true,
	// 	"Armor Class": true,
	// 	"Hit Points": true,
	// 	"Speed": true,
	// 	"STR": true,
	// 	"STR_mod": true,
	// 	"DEX": true,
	// 	"DEX_mod": true,
	// 	"CON": true,
	// 	"CON_mod": true,
	// 	"INT": true,
	// 	"INT_mod": true,
	// 	"WIS": true,
	// 	"WIS_mod": true,
	// 	"CHA": true,
	// 	"CHA_mod": true,
	// 	"Saving Throws": true,
	// 	"Skills": true,
	// 	"Senses": true,
	// 	"Languages": true,
	// 	"Challenge": true,
	// 	"Traits": true,
	// 	"Actions": true,
	// 	"Legendary Actions": true,
	// 	"img_url": true,
	// 	"Damage Immunities": true,
	// 	"Condition Immunities": true,
	// 	"Damage Resistances": true,
	// 	"Damage Vulnerabilities": true,
	// 	"Reactions": true
	// }

	// forEach(baseMonster, (_, key) => {
	// 	keys[key] = true
	// })

	const defaultImages = [
		// "https://media-waterdeep.cursecdn.com/attachments/2/648/beast.jpg",
		// "https://media-waterdeep.cursecdn.com/attachments/2/656/humanoid.jpg",
		// "https://media-waterdeep.cursecdn.com/attachments/2/659/plant.jpg",
	]

	const index = convertToSlug(baseMonster.name) 
	const manualMonster = manual.find(m => m.index === index)
	const aideddMonster = aidedd.find(m => m.index === index)
	const donjondudragonfrMonster = donjondudragonfr.find(m => m.index === index) 

	// TODO: Proficiency Bonus 
	// TODO: size
	return {
		index, 
		name: baseMonster.name,
		nameLocalized: {
			en: baseMonster.name,
			fr: baseMonster.name,
		},
		resume: '', // TODO:

		type: aideddMonster?.type,
		speed: baseMonster.speed, // TODO: which priority
		speedType: aideddMonster?.speedType,
		alignment: aideddMonster?.alignment,

		environment: donjondudragonfrMonster?.ecology,
		ecology: donjondudragonfrMonster?.environment,

		// first manual, then donjondudragonfrMonster
		desc: donjondudragonfrMonster?.desc || manualMonster?.desc || {// TODO:
			en: '',
			fr: '',
		}, 
		meta: {
			en: baseMonster.meta,
			fr: baseMonster.meta, // TODO:
		},
		environments: [ "mountain" ], // TODO:
		ac: baseMonster['Armor Class'],
		hp: baseMonster['Hit Points'],
		stats: {
			STR: Number(baseMonster.STR),
			DEX: Number(baseMonster.DEX),
			CON: Number(baseMonster.CON),
			INT: Number(baseMonster.INT),
			WIS: Number(baseMonster.WIS),
			CHA: Number(baseMonster.CHA),
		},
		savingThrows: baseMonster['Saving Throws'],
		skills: baseMonster.skills,
		damageImmunities: baseMonster['Damage Immunities'],
		conditionImmunities: baseMonster['Condition Immunities'],
		damageResistances: baseMonster['Damage Resistances'],
		damageVulnerabilities: baseMonster['Damage Vulnerabilities'],
		senses: baseMonster.Senses && { en: baseMonster.Senses },
		reactions: baseMonster.Reactions && { en: baseMonster.Reactions },
		languages: baseMonster.Languages && baseMonster.Languages !== "--" && { en: baseMonster.Languages },
		challenge: extractChallenge(baseMonster.Challenge),
		actions: baseMonster.Actions && { en: baseMonster.Actions },
		legendaryActions: baseMonster['Legendary Actions'] && { en: baseMonster['Legendary Actions'] },
		traits: baseMonster.Traits && { en: baseMonster.Traits },
		imageUrl: baseMonster.img_url && defaultImages.includes(baseMonster.img_url) ? null : baseMonster.img_url,
		images: [
			...(manualMonster?.images || []),
			...(aideddMonster?.images || []),
			...(donjondudragonfrMonster?.images || []),
		],
		source: 'Basic Rules', // TODO:
		sourcePage: 119, // TODO:
		isLegendary: !!(baseMonster['Legendary Actions']), // TODO: better?
	}
}

// function transformBaseMonsterArrayToObject(baseMonsterArray) {
// 	const actionsBegin = baseMonsterArray.findIndex(a => a === "**Actions**")
// 	const actions = []

// 	let i = 0;
// 	while (baseMonsterArray[actionsBegin + i]) {
// 		if (i !== 0) { // do not add **Actions**
// 			actions.push(baseMonsterArray[actionsBegin + i])
// 		}
// 		i++
// 	}

// 	return {
// 		desc: baseMonsterArray[0],
// 		ac: baseMonsterArray[1],
// 		hp: baseMonsterArray[2],
// 		speed: baseMonsterArray[3],
// 		stats: baseMonsterArray[4],
// 		savingThrows: baseMonsterArray[5],
// 		dammage: baseMonsterArray[6],
// 		conditionImmunities: baseMonsterArray[7],
// 		senses: baseMonsterArray[8],
// 		languages: actionsBegin >= 9 ? null : baseMonsterArray[9],
// 		challenge: actionsBegin >= 10 ? null :baseMonsterArray[10],
// 		todo: actionsBegin >= 11 ? null :baseMonsterArray[11],
// 		actions,
// 	}
// }

function extractSrdMonsters() {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	let baseMonstersArray = []
	forEach(alphabet, (letter) => {
		forEach(
			srdMonsters.Monsters['Monsters (' + letter + ')'],
			(monstersList) => {
				if (monstersList.content) {
					// directly a monster
					baseMonstersArray.push(monstersList.content)
					return
				}

				forEach(monstersList, (monsterCategoryList, monsterCategoryName) => {
					if (monsterCategoryList.content) {
						// directly a monster
						baseMonstersArray.push(monsterCategoryList.content)
						return
					}
				})
			})
	})

	baseMonstersArray = baseMonstersArray.map(transformBaseMonsterArrayToObject)


}

function main() {
  const monsters = tkfuMonsters.map(transform);
  console.log(JSON.stringify(monsters, null, 2));

  // console.warn(JSON.stringify(Object.keys(keys), null, 2));
}

main();
