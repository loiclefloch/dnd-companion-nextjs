import { useState, useEffect, useDebugValue } from 'react'
import monsters from '../../../database/data/monsters.json'
import useApi from "./useApi"

function useMonster(index) {
  return useApi(monsters.find(monster => monster.index === index))
}

export default useMonster