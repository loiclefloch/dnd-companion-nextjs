import { createStorage } from "../utils/storage"
import { updateObjectOnArray } from '../utils/array';

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
	const updatedCharacters = updateObjectOnArray(CharactersStorage.getItem() || [], updatedCharacter, c => c.id === updatedCharacter.id)
	CharactersStorage.setItem(updatedCharacters)
}