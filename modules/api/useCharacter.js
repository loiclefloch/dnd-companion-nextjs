import useApi from './useApi'
import characters from './fixtures/characters'
import classes from '../../database/data/classes.json'
import races from '../../database/data/races.json'
import subraces from '../../database/data/subraces.json'
import spells from '../../database/data/spells.json'
import alignments from '../../database/data/alignments.json'
import equipmentList from '../../database/data/equipment.json'
import magicItems from '../../database/data/magic-items.json'
import { format as formatRace } from "./useRace"
import { format as formatClass } from "./useClass"
import { getSpellLevelDataForClassesAndLevel, getSpellLevelForCharacterLevel } from "../levelling"
import { formatEquipmentItem } from "./useEquipmentItem"
import { formatMagicItem } from "./useMagicItem"
import { formatSpell } from "./useSpell"

const allRaces = [...races, ...subraces]
const MAX_SPELL_LEVEL = 9 // maximum spell level

function calculateSpellsSlots(classes, characterLevel,  spellsUsed) {
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, characterLevel)
	const legalSlotLevel = getSpellLevelForCharacterLevel(classes, characterLevel)

	const slots = []
	for (let spellLevel = 0; spellLevel < MAX_SPELL_LEVEL; spellLevel++) {
		const usedSlots = spellsUsed.filter(s => s.spellLevel === spellLevel).length
		const totalSlots = spellLevelData.slots[spellLevel] || 0

		slots.push({
			level: spellLevel,
			totalSlots: spellLevel === 0 ? Infinity : totalSlots,
			usedSlots,
			remainingSlots: totalSlots - usedSlots,
			isAboveLegalSlotLevel: spellLevel > legalSlotLevel,
			legalSlotLevel,
			hasData: usedSlots !== 0 || totalSlots !== 0,
		})
	}

	return slots
}

export function formatCharacter(character) {
  if (!character) {
    return null
  }
	if (!character.maximumHp) { // TODO: remove fixture
		character.maximumHp = 10
	}
	character.currentHp = character.currentHp || character.maximumHp

	character.isKo = character.currentHp < 0

	character.race = {
		index: character.race,
		...formatRace(allRaces.find(r => r.index === character.race))
	}
	character.classes = character.classes
    .map(clss => classes.find(c => clss === c.index))
    .map(formatClass)

	// TODO:
	character.statsDetail = []
	character.alignment = alignments.find(a => a.index === character.alignmentIndex)

	character.spellMode = 'CHA' // TODO: from class
	character.spellModValue = 3

	character.spellsList = (character.spellsList || []).map(spell => {
    return {
      ...formatSpell(spells.find(s => s.index === spell.index)),
      ...spell
    }
  })

	character.spellsUsed = (character.spellsUsed || []).map(spellUsed => {
		return {
			...formatSpell(spells.find(s => s.index === spellUsed.index)),
			...spellUsed, // spellLevel
		}
	})

	character.spellsSlots = calculateSpellsSlots(character.classes, character.level, character.spellsUsed)

	character.maxSpellLevel = 1 // TODO: from class and level

	character.maximumHitDice = 0 // TODO:
	character.currentHitDice = character.currentHitDice || character.maximumHitDice

	if (!character.wallet) {
		character.wallet = {
			history: []
		}
	}

	return character
}


function useCharacter(id) {
  // TODO: not formated since already formatted on fixtures
  return useApi(formatCharacter(characters().find(character => character.id === id)))
}

export default useCharacter