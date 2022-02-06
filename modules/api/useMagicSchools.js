import magicSchools from '../../database/data/magic-schools.json'
import useData from "./useData"

import { format } from './useMagicSchool'

function useMagicSchools() {
  return useData(magicSchools.map(format))
}

export default useMagicSchools