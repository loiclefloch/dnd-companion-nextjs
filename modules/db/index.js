import { createStorage } from "../utils/storage"
import { updateObjectOrCreateOnArray } from '../utils/array';

export const CharacterStorage = createStorage("createCharacter")
export const LevellingStorage = createStorage("levellingState")
export const CharactersStorage = createStorage("characters")

export const CurrentCharacterIdStorage = createStorage("currentCharacterId")

export const BackupStorage = createStorage("backup")

BackupStorage.add = (type, id, data) => {
  BackupStorage.setItem(
    [
      ...(BackupStorage.getItem() || []),
      {
        type, 
        date: new Date(),
        id, 
        data, 
      }
    ]
  )
}

CharactersStorage.update = (updatedCharacter) => {
  // OrCreate when we use a fixture character, to add it on local storage
	const updatedCharacters = updateObjectOrCreateOnArray(CharactersStorage.getItem() || [], updatedCharacter, c => c.id === updatedCharacter.id)
	CharactersStorage.setItem(updatedCharacters)
}