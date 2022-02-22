
function bonusCantrip(character) {
  // add 1 cantrip known
  character.spellcasting.cantripsKnown += 1
}

function applyFeaturesOnCharacter(character) {
  const features = character.features

  // TODO: implement features
  // - barbarian-unarmored-defense
  // - barbarian-extra-attack and all -extra-attack -> format nb attacks on character (default: 1)
  // - fast-movement
  // - feral-instinct -> advantage on initiative -> format initiative advantage on character hasAdvantageOnInitiative
  // - bardic-inspiration -> add in character possible actions?

  // look list -> step at bard-expertise-1

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