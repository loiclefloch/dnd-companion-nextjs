// implement feat that will update the character on format.

// TODO: implement feats
// - actor -> advantage on Deception and Performance checks,
// - chef ->  proficiency with cook's utensils 
// - dragon-hide ->  your character.naturalAc becomes 13+Dex (+3). modifier + atk your retractable claws deal 1d4+Str. modifier slashing damage.
// - dungeon-delver -> Advantage to Perception and Investigation checks
// - durable -> TODO: on hit dices run
// - fey-teleportation -> spell:  misty step
// - fey-touched -> spell: misty step
// - inspiring-leader -> create spell?
// - poisoner -> Proficiency with poisoner's kit, apply as a bonus action and your attacks ignore resistance to poison damage.
// - resilient -> you gain proficiency in saving throws using this ability chosen

// - alert -> +5 to initiative
function alert(character) {
  character.initiative += 5
}

// - mobile -> Your speed increase by 10 ft, you can Dash on difficult terrain without malus, and don't provoke opportunity attacks in melee.
function mobile(character) {
  character.baseSpeed += 10
  character.currentSpeed += 10
}

// - observant -> +5 bonus in passive Perception and passive Investigation.
function observant(character) {
  character.passivePerception += 5
  character.passiveInvestigation += 5
}

function shadowTouched() {
  // spell: invisibility
  // TODO: how to prepare them? We cannot put prepared to true here..
  // We should learn the spell when choosing the feat on levelup
  // mark them as always prepared?
  // character.spellsList.push(
  //   {
  //     index: "invisibility",
  //   }
  // )
}

function telekinetic() {
  // spell: telekinesis
}

function telepathic() {
  // spell: detect-thoughts
}

function tough(character) {
  // Your hit point maximum increases by an amount equal to twice your level then by +2 at each level
  character.maximumHp += Math.floor(character.level * 2)
}

function applyFeatsOnCharacter(character) {
  const feats = character.feats

  const map = {
    alert,
    mobile,
    observant,
    'shadow-touched': shadowTouched,
    telekinetic,
    telepathic,
    tough,
  }

  feats.forEach(feat => {
    const func = map[feat.index]
    if (func) {
      func(character)
    }
  })
}

export default applyFeatsOnCharacter