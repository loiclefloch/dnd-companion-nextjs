import { cloneDeep, last } from 'lodash'
import monsters from '../../database/data/monsters.json'
import useData from "./useData"

export function formatMonster(monster) {
  if (!monster) {
    return null
  }
 
  if (monster.hp) {
    if (monster.hp.includes("+") && !monster.hp.includes("(")) {
      // 18d10 + 36
      // 17d12 + 85
      // 2d8
      // console.log(monster.hp)
      monster.hpDice = monster.hp.replaceAll(' ', '')
    } else {
      // 110 (13d10 + 39)
      const groups = monster.hp.match(/\((.*)\)/)
      // console.log({ groups })
      if (groups.length >= 2) {
        if (groups[1] && groups[1].replaceAll) { // TODO: replaceAll bug on server side
          monster.hpDice = groups[1].replaceAll(' ', '')
        }
      } else {
        console.log(monster.hp)
      }
    }
  }

  // TRICK: handle monsters with no custom image, use generic one
  if (monster.imageUrl.endsWith("beast.jpg")) {
    monster.imageUrl = `/img/monsters/default_beast.jpg`
  } 
  else if (monster.imageUrl.endsWith("humanoid.jpg")) {
    monster.imageUrl = `/img/monsters/default_humanoid.jpg`
  } 
  else if (monster.imageUrl.endsWith("ooze.jpg")) {
    monster.imageUrl = `/img/monsters/default_ooze.jpg`
  } 
  else if (monster.imageUrl.endsWith("plant.jpg")) {
    monster.imageUrl = `/img/monsters/default_plant.jpg`
  } 
  else if (monster.imageUrl.endsWith("undead.jpg")) {
    monster.imageUrl = `/img/monsters/default_undead.jpg`
  } 
  else {
    const extension = last(monster.imageUrl.split("."))
    console.log({ extension })
    monster.imageUrl = `/img/monsters/${monster.index}.${extension}`
  }
  // console.log({ hpDice: monster.hpDice })

  if (monster.images) {
    monster.images.unshift({
      url: monster.imageUrl,
      label: monster.name
    })
  }

  return monster
}

function useMonster(index) {
  return useData(formatMonster(cloneDeep(monsters.find(monster => monster.index === index))))
}

export default useMonster