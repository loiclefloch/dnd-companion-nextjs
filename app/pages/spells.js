import { useState } from "react";

import useTheme from "../modules/theme/useTheme";
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import SpellCard from "../components/SpellCard";
import clsx from "clsx";

function Spell({ spell, selected, onSelect }) {
  const { tr } = useI18n();
  const theme = useTheme();

  return (
    <div
      onClick={onSelect}
      className={clsx("cursor-pointer my-2 p-4 pt-1 border-b", {
        [theme.listItemSelectedBackground]: selected,
      })}
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
  // ritual
  // const [selectedSpell, setSelectedSpell] = useState(spellsResponse.data.find(spell => spell.name === 'Meld Into Stone'));
  // Two french name
  // const [selectedSpell, setSelectedSpell] = useState(
  //   spellsResponse.data.find((spell) => spell.name === "Animate Objects")
  // );
  // Dice parsing
  const [selectedSpell, setSelectedSpell] = useState(
    spellsResponse.data.find((spell) => spell.name === "Thunderwave")
  );


  return (
    <div className="flex">
      <div className="w-1/2 py-4 overflow-y-auto" style={{ maxHeight: "100vh" }}>
        <div className="" data-cy-id="spells-list">
          {spellsResponse.data.map((spell) => (
            <Spell
              key={spell.name}
              spell={spell}
              selected={spell.name === selectedSpell?.name}
              onSelect={() => setSelectedSpell(spell)}
            />
          ))}
        </div>
      </div>
      <div
        className="w-1/2 py-4 pl-6 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {selectedSpell && <SpellCard name={selectedSpell.name} />}
      </div>
    </div>
  );
}

export default Spells;
