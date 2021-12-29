const forEach = require("lodash/forEach")
const srdMonsters = require("./data/dnd-5e-srd__monsters.json")
const tkfuMonsters = require("./data/tkfu__srd_5e_monsters.json")
const monsters = require("./data/monsters.json")

function convertToSlug(Text) {
  return Text.toLowerCase()
             .replace(/[^\w ]+/g, '')
             .replace(/ +/g, '-');
}

const keys = {}

function transform(baseMonster) {
	forEach(baseMonster, (_, key) => {
		keys[key] = true
	})

	const defaultImages = [
		// "https://media-waterdeep.cursecdn.com/attachments/2/648/beast.jpg",
		// "https://media-waterdeep.cursecdn.com/attachments/2/656/humanoid.jpg",
		// "https://media-waterdeep.cursecdn.com/attachments/2/659/plant.jpg",
	]

	const index = convertToSlug(baseMonster.name) 
	const monster = monsters.find(m => m.index === index)

	// TODO: Proficiency Bonus 
	return {
		index, 
		name: baseMonster.name,
		nameLocalized: {
			en: baseMonster.name,
			fr: baseMonster.name,
		},
		resume: '', // TODO:
		desc: monster?.desc || {// TODO:
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
		speed: baseMonster.speed,
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
		languages: baseMonster.Languages && { en: baseMonster.Languages },
		challenge: baseMonster.Challenge,
		actions: baseMonster.Actions && { en: baseMonster.Actions },
		legendaryActions: baseMonster['Legendary Actions'] && { en: baseMonster['Legendary Actions'] },
		traits: baseMonster.Traits && { en: baseMonster.Traits },
		imageUrl: baseMonster.img_url && defaultImages.includes(baseMonster.img_url) ? null : baseMonster.img_url,
		source: 'Basic Rules', // TODO:
		sourcePage: 119, // TODO:
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
  // console.warn(JSON.stringify(keys, null, 2));
}

main();
