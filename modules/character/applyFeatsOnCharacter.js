// TODO: implement feats
// - alert
// - ...

function applyFeatsOnCharacter(character) {
  const traits = character.traits

  const map = {
  }

  traits.forEach(trait => {
    const func = map[trait.index]
    if (func) {
      func(character)
    }
  })
}

export default applyFeatsOnCharacter