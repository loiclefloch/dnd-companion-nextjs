import { useEffect } from "react";

import useTheme from "../modules/theme/useTheme";
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import useSpellDialog from "../components/useSpellDialog";
import Screen from "../components/Screen";
import clsx from "clsx";

function Spell({ spell, onSelect }) {
  const { tr } = useI18n();
  const theme = useTheme();

  return (
    <div
      onClick={onSelect}
      className={clsx("cursor-pointer my-2 p-4 pt-1 border-b")}
    >
      <span className="font-semibold">{tr(spell.nameLocalized)}</span>
      <div className={clsx("text-sm", theme.metaColor)}>
        <span>{spell.type}</span>
      </div>
      <p className="text-sm">{tr(spell.resume)}</p>
    </div>
  );
}

function Spells() {
  const spellsResponse = useSpells();
  const { showSpellDialog } = useSpellDialog()

  useEffect(() => {
    // ritual
    // showSpellDialog(spellsResponse.data.find((spell) => spell.name === "Meld Into Stone").name)

    // Two french name
    // showSpellDialog(spellsResponse.data.find((spell) => spell.name === "Animate Objects").name)

    // Dice action damage spell level
    // showSpellDialog(spellsResponse.data.find((spell) => spell.name === "Thunderwave").name)

    // Dice action damages character level
    // showSpellDialog(spellsResponse.data.find((spell) => spell.name === "Acid Splash").name)
  }, [])

  return (
    <Screen
      isLoading={spellsResponse.isLoading}
    >
      <div className="flex">
        <div className="" data-cy-id="spells-list">
          {spellsResponse.data?.map((spell) => (
            <Spell
              key={spell.name}
              spell={spell}
              onSelect={() => showSpellDialog(spell.name)}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}

export default Spells;
