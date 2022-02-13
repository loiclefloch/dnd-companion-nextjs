import { v4 as uuid } from "uuid";

function createCharacterDefaultData() {
  return {
    id: uuid(),
    name: '',
    body: {
      age: 30, // TODO:
      gender: '',
      height: '',
      weight: '',
      hairColor: '',
      eyeColor: '',
      skinColor: '',
      physicalCaracteristics: '',
    },
  
    level: 1,
    classes: [],
    race: null,
    bonds: '',
    flaws: '',
    ideals: '',
    traits: ['', ''],

		stats: { // baseStats + bonuses applied
			STR: 15,
			DEX: 14,
			CON: 12,
			INT: 12,
			WIS: 10,
			CHA: 8,
		},

		statsBonuses: [], // list of bonuses to apply on the stats. they come from the race
  

		baseStats: { // stats chosen without bonuses applied
			STR: 15,
			DEX: 14,
			CON: 12,
			INT: 12,
			WIS: 10,
			CHA: 8,
		},
  
    levelling: {
      xp: 0,
      history: [],
    },
  
    spellsList: [],
  
    currencies: {
      cp: 0,
      sp: 0,
      gp: 0,
      ep: 0,
      pp: 0,
    },
  
		// list of objects
		// - index
		// - quantity
    equipment: [], 

    wallet: {
      history: []
    },

		proficiencies: [],
		// TODO: if not always 2 at level 1, set on useCreateCharacter#onFinalize
		proficiencyBonus: 2, // will be override according to class and level

		maximumHp: 0,

    // between rest
    currentHp: 0,
    spellsUsed: [],
    deathSaves: {
      nbFailed: null,
      nbSucceeed: null,
      isStabilized: false
    },
  
  }
}

export default createCharacterDefaultData