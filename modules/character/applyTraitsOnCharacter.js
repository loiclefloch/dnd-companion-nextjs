
function fleetOfFoot(character) {
  character.baseSpeed = Math.max(character.baseSpeed, 35)
  character.currentSpeed = Math.max(character.currentSpeed, 35)
}

// TODO: implement traits
// - light-bearer
// - 

function applyTraitsOnCharacter(character) {
  const traits = character.traits

  const map = {
    'fleet-of-foot': fleetOfFoot,
  }

  traits.forEach(trait => {
    const func = map[trait.index]
    if (func) {
      func(character)
    }
  })
}

export default applyTraitsOnCharacter