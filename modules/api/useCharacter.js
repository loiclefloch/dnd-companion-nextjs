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
import { getLevelExperienceStage, getSpellLevelForCharacterLevel } from "../levelling"
import { formatEquipmentItem } from "./useEquipmentItem"
import { formatMagicItem } from "./useMagicItem"
import { formatSpell } from "./useSpell"

const allRaces = [...races, ...subraces]

function calculateSpellsSlots(characterLevel,  classes, spellsUsed) {

}

export function formatCharacter(character) {
  if (!character) {
    return null
  }
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

	character.spellsSlots = calculateSpellsSlots(character.level,  character.classes, character.spellsUsed)

	character.maxSpellLevel = 1 // TODO: from class and level

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