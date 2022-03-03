import { cloneDeep } from 'lodash'
import monsters from '../../database/data/monsters.json'
import useData from "./useData"

function formatMonster(monster) {
  if (!monster) {
    return null
  }
  if (monster.images) {
    monster.images.unshift({
      url: monster.imageUrl,
      label: monster.name
    })
  }

  monster.hpDice = monster.hp.match(/\((.*)\)/)[1].replaceAll(' ', '')
  // console.log({ hpDice: monster.hpDice })

  return monster
}

function useMonster(index) {
  return useData(formatMonster(cloneDeep(monsters.find(monster => monster.index === index))))
}

export default useMonster