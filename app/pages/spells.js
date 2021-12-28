import { useEffect } from "react";

import isEmpty from "lodash/isEmpty"
import clsx from "clsx";
import useTheme from "../modules/theme/useTheme";
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import { useSpellModal } from "../components/SpellScreenAsModal";
import { useSpellsListFilterScreenAsModal } from "../components/SpellsListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";

function Spell({ spell, onSelect }) {
  const { tr } = useI18n();
  const theme = useTheme();

  return (
    <div
      onClick={onSelect}
      className={clsx("cursor-pointer my-2 p-4 pt-1 border-b border-slate-100 border-solid")}
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
  const { showSpellModal } = useSpellModal()
  const { filters, filterSpells, showSpellsListFilterScreen } = useSpellsListFilterScreenAsModal()
  
  console.log({filters})

  useEffect(() => {
    // ritual
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Meld Into Stone").name)

    // Two french name
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Animate Objects").name)

    // Dice action damage spell level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Thunderwave").name)

    // Dice action damages character level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Acid Splash").name)
  }, [])

  return (
    <Screen
      title="Liste des sorts"
      isLoading={spellsResponse.isLoading}
      rightAction={
        <button onClick={showSpellsListFilterScreen}>
          <IconFilter className={clsx("h-6 w-6 text-gray-500", {
            // change color when they are filters
            "text-orange-300": !isEmpty(filters),
          })} />
        </button>
      }
    >
      <div className="flex">
        <div className="" data-cy-id="spells-list">
          {filterSpells(spellsResponse.data)?.map((spell) => (
            <Spell
              key={spell.name}
              spell={spell}
              onSelect={() => showSpellModal(spell.name)}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}

export default Spells;
