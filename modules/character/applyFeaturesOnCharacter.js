
function bonusCantrip(character) {
  // add 1 cantrip known
  character.spellcasting.cantripsKnown += 1
}

function applyFeaturesOnCharacter(character) {
  const features = character.features

  // TODO: implement features
  const map = {
    'bonus-cantrip': bonusCantrip,
  }

  features.forEach(feature => {
    const func = map[feature.index]
    if (func) {
      func(character)
    }
  })
}

export default applyFeaturesOnCharacter