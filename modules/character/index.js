

export const AbilityImportance = {
	FANTASTIC: 'FANTASTIC',
	GOOD: 'GOOD',
	OK: 'OK',
	BAD: 'BAD',
}


// TODO: multi-build handling
export function getAbilityOptimizedExample(clss) {
	const map = {
		druid: { 
			// https://rpgbot.net/dnd5/characters/classes/druid/
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 12,
			WIS: 15,
			CHA: 8,
		},
		paladin: {
			// https://rpgbot.net/dnd5/characters/classes/paladin/
			// Charisma-Based	
			STR: 15,
			DEX: 8,
			CON: 15,
			INT: 8,
			WIS: 8,
			CHA: 15,
		},
		barbarian: {
			// https://rpgbot.net/dnd5/characters/classes/barbarian/
			// Charisma-Based	
			STR: 15,
			DEX: 14,
			CON: 14,
			INT: 8,
			WIS: 10,
			CHA: 10,
		},
		bard: {
			// https://rpgbot.net/dnd5/characters/classes/bard/
			// Charisma-Based	
			STR: 8,
			DEX: 15,
			CON: 13,
			INT: 12,
			WIS: 8,
			CHA: 15,
		},
		cleric: {
			// https://rpgbot.net/dnd5/characters/classes/cleric/
			// Medium Armor	build
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 8,
			WIS: 15,
			CHA: 12,
		},
		fighter: {
			// https://rpgbot.net/dnd5/characters/classes/fighter/
			// Strength-Based Melee	
			STR: 15,
			DEX: 10,
			CON: 15,
			INT: 10,
			WIS: 12,
			CHA: 9,
		},
		monk: {
			// https://rpgbot.net/dnd5/characters/classes/monk/
			STR: 8,
			DEX: 15,
			CON: 14,
			INT: 10,
			WIS: 15,
			CHA: 8
		},
		ranger: {
			// https://rpgbot.net/dnd5/characters/classes/ranger/
			// build dex-based
			STR: 8,
			DEX: 15,
			CON: 14,
			INT: 10,
			WIS: 15,
			CHA: 8
		},
		rogue: {
			// https://rpgbot.net/dnd5/characters/classes/rogue/
			// build Most Rogues
			STR: 8,
			DEX: 15,
			CON: 14,
			INT: 11,
			WIS: 12,
			CHA: 12,
		},

		sorcerer: {
			// https://rpgbot.net/dnd5/characters/classes/sorcerer/
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 10,
			WIS: 10,
			CHA: 15,
		},
		warlock: {
			// https://rpgbot.net/dnd5/characters/classes/warlock/
			// Chain/Talisman/Tome	
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 10,
			WIS: 10,
			CHA: 15,
		},

		wizard: {
			// https://rpgbot.net/dnd5/characters/classes/warlock/
			STR: 8,
			DEX: 14,
			CON: 14,
			INT: 15,
			WIS: 12,
			CHA: 8,
		},
	}
	return map[clss]
}

export function getImportanceForClass(clss) {
	const map = {
		druid: { 
			// from https://rpgbot.net/dnd5/characters/classes/druid/

			// If you’re in melee, you should be an animal. And if you’re an animal, you’re not using 
			// your own Strength score. If you can’t be an animal but you’re still in melee, cast Shillelagh.
			STR: AbilityImportance.BAD,
			// A bit for AC while you’re not in Wild Shape is nice, but not super important.
			DEX: AbilityImportance.GOOD,
			// A bit for hit points is nice, but even the Moon Druid will spend most of their time burning 
			// through Wild Shape hit points, which don’t rely on your Constitution at all.
			CON: AbilityImportance.GOOD,
			// Only needed for Knowledge skills. Dump unless you want Knowledge skills.
			INT: AbilityImportance.OK,
			// The Druid’s spells are powered by Wisdom.
			WIS: AbilityImportance.FANTASTIC,
			// Dump
			CHA: AbilityImportance.BAD,
		},
		paladin: { 
			// from https://rpgbot.net/dnd5/characters/classes/paladin/

			// Paladins don’t get access to any ranged combat styles, so Strength is typically a given. 
			// However, if you want to go for a Finesse build you can dump Strength. If you’re building 
			// around Charisma, you may still want the 15 Strength required to avoid a speed penalty from 
			// heavy armor.
			STR: AbilityImportance.GOOD,
			// Dump it and grab some Full Plate unless you want to go for a Finesse build.
			DEX: AbilityImportance.BAD,
			// All martial characters need Constitution, but it’s especially important for Paladins since 
			// they don’t get proficiency with Constitution saves.
			CON: AbilityImportance.OK,
			// Dump.
			INT: AbilityImportance.BAD,
			//  Dump unless you want a decent Insight score.
			WIS: AbilityImportance.BAD,
			// Charisma fuels many of the Paladin’s abilities, including their spellcasting, 
			// Aura of Protection, and several Paladin skills. If you choose Fighting Style (Blessed Warrior), 
			// you may also use it as your primary offensive ability.
			CHA: AbilityImportance.FANTASTIC,
		},
		barbarian: { 
			// from https://rpgbot.net/dnd5/characters/classes/barbarian/

			// Barbarians are all about lots of Strength and big weapons, so Strength should almost always be your best ability.
			STR: AbilityImportance.FANTASTIC,
			// 14 Dexterity is great to boost your AC with half plate. If you prefer to go armor-less, 
			// look for an item to boost your Dexterity so that you can spend your ability increases on Strength and Constitution.
			DEX: AbilityImportance.OK,
			// Second only to Strength. Barbarians take a lot of damage, so you need all the hit points you 
			// can get. Constituion also powers Unarmored Defense.
			CON: AbilityImportance.FANTASTIC,
			// Dump stat. Intelligence saves are very rare, and Barbarians don’t get any Intelligence-based skills.
			INT: AbilityImportance.BAD,
			// Wisdom saves are common, so don’t dump it, but don’t put a ton of effort into improving it.
			WIS: AbilityImportance.OK,
			// Charisma only matters for a couple of the Barbarian’s skills, and for the Berserker’s Intimidating Presence. 
			// If you went for Totem Warrior and didn’t pick up Intimidation, you can dump Charisma and use the points to boost your Wisdom.
			CHA: AbilityImportance.OK,
		},
		bard: { 
			// from https://rpgbot.net/dnd5/characters/classes/bard/

			// Dump stat. Even in melee, the Bard can rely solely on Dexterity
			STR: AbilityImportance.BAD,
			// In light armor and with no shields, the Bard needs Dexterity to boost their poor AC. 
			// It also helps when you must occasionally resort to using weapons.
			DEX: AbilityImportance.OK,
			// Everyone needs hit points, and things which target Constitution saves tend to be nasty.
			CON: AbilityImportance.OK,
			//  Several interesting skills rely on Intelligence, but if you don’t take any of those then its worthless..
			INT: AbilityImportance.OK,
			// Good for important saves and a handful of skills.
			WIS: AbilityImportance.OK,
			// The Bard runs on Charisma. Get as much as you can, as early as you can. Even if you’re splitting 
			// your time between using weapons and relying on your other bard abilities, too many of the Bard’s 
			// abilities are tied to your Charisma modifier to let it fall behind.
			CHA: AbilityImportance.FANTASTIC,
		},

		cleric: { 
			// from https://rpgbot.net/dnd5/characters/classes/cleric/

			//  Lightly-armored and medium-armored Clerics can dump Strength. Heavily-armored Clerics can 
			// afford more Strength since they can dump Dexterity, but it’s only strictly necessary if you 
			// want to avoid the speed penalty from heavy armor. Weapon attacks are mathematically a poor 
			// choice compared to cantrips, so there is very little reason to invest heavily in Strength 
			// and Strength-based weaponry.
			STR: AbilityImportance.OK,
			// Lightly-armored Clerics need Dexterity for AC and for their weapons. 
			// Medium-armored Clerics should try to have 14 to boost their AC. Heavily-armored Clerics can 
			// dump Dexterity.
			DEX: AbilityImportance.OK,
			// Hit points are always important, and if the Cleric goes down the rest of the party typically 
			// follows.
			CON: AbilityImportance.GOOD,
			// Dump stat. Keep a bit if you’re a Knowledge Cleric, or if you need to use Knowledge skills.
			INT: AbilityImportance.BAD,
			// The Cleric’s spells depend on Wisdom.
			WIS: AbilityImportance.FANTASTIC,
			// Persuasion is the Cleric’s only Face skill, so you can probably dump Charisma unless you 
			// need to serve as a Face. If you decide to be a Face, be sure to pick up a Background which 
			// gets you other Face skills like Deception and Intimidation.
			CHA: AbilityImportance.OK,
		},
		fighter: { 
			// from https://rpgbot.net/dnd5/characters/classes/fighter/

			// Strength-based Fighters need Strength above anything else. Everyone else can dump it.
			STR: AbilityImportance.FANTASTIC,
			// Strength-based Fighters will be wearing heavy armor, so they can dump Dexterity. 
			// Archers and Finesse builds rely almost exclusively on Dexterity, so they need as much as 
			// they can get.
			DEX: AbilityImportance.BAD,
			// Every fighter needs hit points.
			CON: AbilityImportance.GOOD,
			// Eldritch Knights need a bit for their spells, but if you avoid spells which call for saving 
			// throws you can get away with very little. 14 is typically sufficient.
			INT: AbilityImportance.OK,
			//  Helpful for Perception and Survival. If you don’t need Intelligence or Charisma for your 
			// subclass, investing in Wisdom is a good choice.
			WIS: AbilityImportance.OK,
			// Only useful for saves and Face skils for most subclasses, but the Purple Dragon Knight 
			// needs it for some of their subclass features
			CHA: AbilityImportance.OK,
		},
		monk: { 
			// from https://rpgbot.net/dnd5/characters/classes/monk/

			// Monks get good Strength saves, which reduces the need for Strength, but a little bit of 
			// Strength will help stretch the effectiveness of that proficiency. Athletics is also a nice 
			// option if you want to Shove enemies prone, but several monk subclasses already offer options 
			// to knock foes prone without resorting to Athletics.
			STR: AbilityImportance.OK,
			//  Dexterity rules the Monk. Almost all monks rely on Dexterity for attacks, so it sets your 
			// attacks, damage, and AC, and having good Dexterity will help avoid AOE damage which can quickly 
			// cut into your d8 hit points. Evasion helps, but it’s more effective you succeed on the save.
			DEX: AbilityImportance.FANTASTIC,
			// With only d8 hit dice, Constitution is very important for the Monk.
			CON: AbilityImportance.GOOD,
			// Generally dump, unless you really need to use knowledge skills.
			INT: AbilityImportance.BAD,
			// Wisdom fuels Monk’s AC and many of their special abilities. It notably sets the save DC for 
			// class features which allow targets to make saving throws, so it’s especially important for 
			// subclasses which rely heavily on offensive special abilities.
			WIS: AbilityImportance.GOOD,
			// Dump. Take a vow of silence if necessary.
			CHA: AbilityImportance.BAD,
		},

		ranger: { 
			// from https://rpgbot.net/dnd5/characters/classes/ranger/

			// With light/medium armor you need Dexterity for AC. Since you have Dexterity for AC, you may 
			// as well use it for weapons. Since you’re using Dexterity for weapons, you can dump Strength. 
			// The only exception is if you decide to use a polearm for some reason.
			STR: AbilityImportance.BAD,
			// Dexterity fuels the majority of what the Ranger does. Even for builds that aren’t 
			// Dexterity-based, you need at least 14 to fill out the Dexterity cap on Half Plate.
			DEX: AbilityImportance.FANTASTIC,
			// As a martial character rangers should expect to draw a lot of fire, so you need the hit 
			// points to handle it.
			CON: AbilityImportance.GOOD,
			// A bit for Investigation and Nature might be nice, but you don’t really need it.
			INT: AbilityImportance.OK,
			// Adds to spells and eventually to Foe Slayer.
			WIS: AbilityImportance.GOOD,
			// Dump.
			CHA: AbilityImportance.BAD,
		},

		rogue: { 
			// from https://rpgbot.net/dnd5/characters/classes/rogue/

			// Typically your dump stat. Nothing that a typical Rogue does uses Strength. However, you’re 
			// not forced to use Dexterity to make Sneak Attacks so long as you use a suitable weapon, so 
			// Strength-based rogues are technically possible. It’s usually a bad idea, but it is absolutely possible.
			STR: AbilityImportance.BAD,
			// Rogues run on Dexterity. They add to you skills, your tools, your attacks, your damage, your AC, and your best save.
			DEX: AbilityImportance.FANTASTIC,
			// Hit points are always important, especially for melee Rogues.
			CON: AbilityImportance.GOOD,
			// Arcane Tricksters need Intelligence for their spells, but other Rogues only need it for Investigation.
			INT: AbilityImportance.OK,
			// Helpful for Insight and Perception, but otherwise useless. Inquisitives will want a bit more 
			// to power Unerring Eye, but Expertise will outweight your ability modifier anyway so you don’t need much.
			WIS: AbilityImportance.OK,
			// Rogues make a great Face, and you can’t be a Face without Charisma.
			CHA: AbilityImportance.OK,
		},

		sorcerer: { 
			// from https://rpgbot.net/dnd5/characters/classes/sorcerer/

			// Dump
			STR: AbilityImportance.BAD,
			// Take a bit for AC.
			DEX: AbilityImportance.GOOD,
			//  Take some to compensate for your d6 hit points and to support Concentration.
			CON: AbilityImportance.GOOD,
			// A bit for knowledge skills might be nice.
			INT: AbilityImportance.OK,
			// Wisdom saves are common, and Insight is helpful for a Face.
			WIS: AbilityImportance.OK,
			// Commands almost everything you do.
			CHA: AbilityImportance.FANTASTIC,
		},

		warlock: { 
			// from https://rpgbot.net/dnd5/characters/classes/warlock/

			// Dump. Melee Warlocks might want a bit to resist grapples and similar issues. If you take a 
			// class dip to pick up heavy armor, melee Warlocks can emphasize Strength, but with Hexblade it’s 
			// still easier to focus on Charisma.
			STR: AbilityImportance.BAD,
			// Melee Warlocks need 14 Dexterity to pad their AC, but Hexblades use Charisma for attack and 
			// damage. Other Warlocks still need some for AC.
			DEX: AbilityImportance.GOOD,
			// Everyone needs hit points. You don’t need a ton because you can depend on Fiendish Vigor for 
			// an easy hp boost, but you still don’t want to skimp on Constitution.
			CON: AbilityImportance.GOOD,
			// A bit for Knowledge skills is nice, but if you don’t have any you can dump it.
			INT: AbilityImportance.OK,
			// Only needed for saves, and you’re Proficienct so your proficiency will mitigate a poor Wisdom score.
			WIS: AbilityImportance.BAD,
			// Spells.
			CHA: AbilityImportance.FANTASTIC,
		},

		warlock: { 
			// from https://rpgbot.net/dnd5/characters/classes/warlock/

			// Dump stat. A Wizard should know better.
			STR: AbilityImportance.BAD,
			// A bit for AC is nice and Dexterity saves are common, but that’s all you get unless you go 
			// for Bladesinging, in which case you will want a bunch for the weapon that you’re going to use. 
			// You can limp along at low levels using a crossbow in place of offensive cantrips, but you don’t 
			// need to strain yourself to get 16 Dexterity. 14 will do fine.
			DEX: AbilityImportance.GOOD,
			// Hit points and Constitution saves are problems for Wizards. A wizard with less than 14 
			// Constitution is a choice to gamble with your life.
			CON: AbilityImportance.GOOD,
			// A Wizard’s first priority should be to get 20 Intelligence. Their second priority should be 
			// to find a way to exceed 20 Intelligence, but there are very few ways to do that.
			INT: AbilityImportance.FANTASTIC,
			// Good for Wisdom saves. You want a bit to protect yourself, but fortunately wizards are also 
			// proficient in Wisdom saves.
			WIS: AbilityImportance.OK,
			// Dump stat.
			CHA: AbilityImportance.BAD,
		},
	}
	return map[clss]
}

export function getImportanceTip(importance) {
	// TODO: better tips
	// TODO: move on an useImportanceTip instead of using generic useTip?
	if (importance === AbilityImportance.FANTASTIC) { return 'A prendre absolument' }
	if (importance === AbilityImportance.GOOD) { return 'A prendre' }
	if (importance === AbilityImportance.OK) { return 'A éviter' }
	if (importance === AbilityImportance.BAD) { return 'Au minimum' }
}
