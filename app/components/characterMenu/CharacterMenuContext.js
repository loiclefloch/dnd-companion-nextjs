import {createContext} from "react";
import useCharacterMenuCreator from "./useCharacterMenuCreator";
import CharacterMenu from "./CharacterMenu";

let CharacterMenuContext;
let { Provider } = (CharacterMenuContext = createContext());

let CharacterMenuProvider = ({ children }) => {
	let { show, showCharacterMenu, hideCharacterMenu } = useCharacterMenuCreator();

	return (
		<Provider value={{ show, showCharacterMenu, hideCharacterMenu }}>
			{show && (
				<CharacterMenu />
			)}
			{children}
		</Provider>
	);
};

export { CharacterMenuContext, CharacterMenuProvider };
