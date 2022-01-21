import { cloneDeep } from "lodash";

const isBrowser = typeof window !== "undefined";

//
//
//

const level = 2

const charactedClasses = [
	'druid'
]

function getCharacters() {
	const characters = !isBrowser ? [] : JSON.parse(localStorage.getItem("characters")) || []

	// if no characters created yet
	const defaultData = [
		{
			 "name":"Ylvir",
			 "race":"high-elf",
			 "step":"equipment",
			 "url":"/character/create/resume",
			 "languages":[
					"goblin",
					"orc",
					"abyssal",
					"common",
					"elvish"
			 ],
			 "classes":[
					"druid"
			 ],
			 "stats":{
					"STR":8,
					"DEX":10,
					"CON":10,
					"INT":14,
					"WIS":15,
					"CHA":14
			 },
			 "alignment":"chaotic-neutral",
			 "traits":[
					"trait 1",
					"trait 2"
			 ],
			 "bonds":"Liens",
			 "ideals":"Idéaux",
			 "flaws":"Imperfections",
			 "equipment":[
					
			 ],
			 "currentStep":"resume",
			 "id":"f4bda887-6ffb-4436-bf55-b268cca29070",
			 "body":{
					"age":0,
					"sex":"",
					"height":"",
					"weight":"",
					"hairColor":"",
					"eyeColor":"",
					"skinColor":"",
					"physicalCaracteristics":""
			 },
			 "level":1,
			 "levelling":{
					"xp":0,
					"history":[
						 
					]
			 },
			 "spellsUsed":[],
			 "deathSaves":{
					"nbFailed":null,
					"nbSucceeed":null,
					"isStabilized":false
			 },
			 "currencies":{
					"cp":0,
					"sp":0,
					"gp":0,
					"ep":0,
					"pp":0
			 },
			 "equipment":[
					
			 ],
			 "wallet":{
					"history":[
						 
					]
			 },
			 "spellsList":[
					{
						 "index":"produce-flame",
						 "isPrepared":false
					},
					{
						 "index":"guidance",
						 "isPrepared":true
					},
					{
						 "index":"druidcraft",
						 "isPrepared":false
					}
			 ]
		}
	]

	return cloneDeep(characters || defaultData)
}

export default getCharacters