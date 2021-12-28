import {createContext} from "react";

let ContextCharacter;
let { Provider } = (ContextCharacter = createContext());

ContextCharacter.displayName = 'ContextCharacter'

let CharacterProvider = ({ character, children }) => {
	return (
		<Provider value={{ character }}>
			{children}
		</Provider>
	);
};

export { ContextCharacter, CharacterProvider };