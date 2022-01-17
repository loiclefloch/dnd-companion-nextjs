import { cloneDeep } from 'lodash'
import monsters from '../../database/data/monsters.json'
import useApi from "./useApi"

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

  return monster
}

function useMonster(index) {
  return useApi(formatMonster(cloneDeep(monsters.find(monster => monster.index === index))))
}

export default useMonster