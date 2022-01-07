import magicSchools from '../../database/data/magic-schools.json'
import useApi from "./useApi"

import { format } from './useMagicSchool'

function useMagicSchools() {
  return useApi(magicSchools.map(format))
}

export default useMagicSchools