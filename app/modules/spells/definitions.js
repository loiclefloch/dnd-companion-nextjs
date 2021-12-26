const acidArrow = {
  spellName: "Acid Arrow",
  action: (actionApi) => {
    return {
      context: () => [
        actionApi.askSpellLevel(2)
      ],
      toHit: () => [() => true],
      onHit: () => [
        // 4d4 acid damage right know
        actionApi.addDamage(
          actionApi.getTarget(),
          // When you cast this spell using a spell slot of 3rd level or higher, the damage 
          // (both initial and later) increases by 1d4 for each slot level above 2nd.
          actionApi.rollDamage(`${(actionApi.getSpellLevel()-2)+2}d4`, "acid damage")
        ),
        // 2d4 acid damage at the end of its next turn
        actionApi.addOnEndOfNextTurnAction(actionApi.getTarget(), () => {
          return [
            actionApi.addDamage(
              actionApi.getTarget(),
              actionApi.rollDamage(`${(actionApi.getSpellLevel()-2)+2}d4`, "acid damage")
            ),
          ];
        }),
      ],
      onMiss: () => [
        // (2d4 acid damage right know) / 2
        actionApi.addDamage(
          actionApi.getTarget(),
          actionApi.rollDamage("1d4", "acid damage")
        ),
      ],
    };
  },
};

export default [ acidArrow ];
