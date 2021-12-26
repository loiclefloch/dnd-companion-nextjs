export function getDebugActionApi() {
  const spellLevel = -1

  return {
    getTarget: () => "target",
    rollDamage: (dice, damageType) => {
      console.info(`roll damage ${dice} ${damageType}`);
    },
    addNextTurnAction: (character, action) => {
      console.info(`add next turn action for character : ${character}`);
      action();
    },
    askSpellLevel: async (minLevel, maxLevel) => {
      console.info(`Get spell level min ${minLevel} ${maxLevel}`)
      spellLevel = minLevel
      return {
        action: 'ask spell level'
      }
    },
    getSpellLevel: () => {
      return spellLevel
    }
  };
}
