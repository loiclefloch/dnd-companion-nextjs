import { useState, useDebugValue, useCallback } from 'react';

import { getFromStorage, saveToStorage } from '../modules/storage'

function useStorageState(key, defaultValue) {
  const [value, _setValue] = useState(getFromStorage(key, defaultValue));
  
  useDebugValue(key)

  const setValue = useCallback(newValue => {
    saveToStorage(key, newValue)
    _setValue(newValue)
  }, [key])

  return [value, setValue];
}

export default useStorageState