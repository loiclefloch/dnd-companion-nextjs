import { useEffect, useState, useCallback } from 'react'
import Fuse from "fuse.js"
import { debounce } from "lodash";

function fuzzySearch({ fuse, data, term }) {
  const result = fuse.search(`${term}`);
  return term ? result : data;
}

/**
 *
 * @param {*} param0
 *
 * A custom React Hook to do a in-memory fuzzy text search
 * using Fuse.js.
 */
function useLocalSearch({ data = [], options }) {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState(data)

	const calculateResults = useCallback(debounce((term, data, options) => {
		const fuseOptions = {
      threshold: options.thresold || 0.2,
      ...options,
    }

    const fuse = new Fuse(data || [], fuseOptions)

    const results = fuzzySearch({ data: data || [], term, fuse })
    setResults(results.filter(Boolean))
		console.log({ term, results, data, options })
	}, 1000), [])

  useEffect(() => {
		calculateResults(term, data, options)
  }, [term, data, options])

  const reset = () => setTerm('')

  return { searchResults: results, search: setTerm, term, reset }
}

export default useLocalSearch;
