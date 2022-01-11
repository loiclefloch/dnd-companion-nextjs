import { createContext, useContext, useReducer, useEffect } from "react"

const isBrowser = typeof window !== "undefined";

const CreateCharacterContext = createContext()

function createCharacterReducer(state, action) {
  switch (action.type) {
    case 'update': {
      const updated = { ...state, ...action.data }
      console.info(updated)
      return updated
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = !isBrowser ? null : JSON.parse(localStorage.getItem("createCharacter")) || {
		name: '',
		class: null,
		race: null,
	}

export function CreateCharacterProvider({children}) {
  const [character, dispatchCharacter] = useReducer(createCharacterReducer, initialState)

  useEffect(() => {
    localStorage.setItem('createCharacter', JSON.stringify(character))
  }, [character])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { 
    character, 
    updateCharacter: (data) => {
      dispatchCharacter({ type:'update', data })
    }, 
    dispatchCharacter
  }

  return (
		<CreateCharacterContext.Provider value={value}>
			{children}
		</CreateCharacterContext.Provider>
	)
}

function useCreateCharacter() {
	const context = useContext(CreateCharacterContext)

	if (context === undefined) {
    throw new Error('useCreateCharacter must be used within a CreateCharacterProvider')
  }
  return context
}

export default useCreateCharacter