import { useEffect, useState, useCallback } from 'react'
import Fuse from "fuse.js"
import { debounce } from "lodash";
import useStorageState from "./useStorageState"
import { findIndexOnArray } from "../modules/utils/array"

function fuzzySearch({ fuse, data, term }) {
  const result = fuse.search(`${term}`);
  return term ? result : data;
}

function toSearchResult(item, index) {
  return {
    refIndex: index,
    item
  }
}

function updateHistory(query, searchHistory) {
  const index = findIndexOnArray(searchHistory, (q) => q?.startsWith(query))
  if (index === -1) {
    return [query, ...(searchHistory || [])].slice(0, 25) // keep 25 last search
  }
  return searchHistory.filter(Boolean)
}

/**
 *
 * @param {*} param0
 *
 * A custom React Hook to do a in-memory fuzzy text search
 * using Fuse.js.
 */
function useLocalSearch(searchType, { data = [], options }) {
  const [term, setTerm] = useState('')
  const [searchHistory, setSearchHistory] = useStorageState(`search_history_${searchType}`, [])
  const [results, setResults] = useState(data?.map(toSearchResult))

	const calculateResults = useCallback(debounce((term, data, options) => {
		const fuseOptions = {
      threshold: options.thresold || 0.2,
      ...options,
    }

    const fuse = new Fuse(data || [], fuseOptions)

    const results = fuzzySearch({ data: data || [], term, fuse })

    if (results.length > 0) {
      setSearchHistory(updateHistory(term, searchHistory))
    }
    
    if (results.length > 0 && !results[0].item) {
      // sometimes, why? we do not have [ { item, refIndex }] but an array of items
      setResults(results.filter(Boolean).map(toSearchResult))
    } else {
      setResults(results.filter(Boolean))
    }
	}, 1000), [])

  useEffect(() => {
		calculateResults(term, data, options)
  }, [term, data, options])

  const reset = () => setTerm('')

  return { searchHistory, searchResults: results, search: setTerm, term, reset }
}

useLocalSearch.searchOptions = {
  equipment: {
    keys: [ // TODO:
      'index',
      'name',
      'equipmentCategory.name',
      'nameLocalized.en',
      'nameLocalized.fr',

      'weaponCategory',
      'weaponRange',
      'damage.damageType.name'
    ]
  },
  monsters: {
    keys: [ // TODO:
      'index',
      'name',
      'nameLocalized.en',
      'nameLocalized.fr',
    ]
  },
  spells: {
    keys: [ // TODO:
      'index',
      'name',
      'nameLocalized.en',
      'nameLocalized.fr',
    ]
  }
}

export default useLocalSearch;
