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
      className={clsx("cursor-pointer my-2 p-2", {
        [theme.listItemSelectedBackground]: selected,
      })}
    >
      {tr(spell.nameLocalized)}
      <div className="text-sm italic">
        <span>{spell.type}</span>
      </div>
      <p className="text-sm">{tr(spell.resume)}</p>
    </div>
  );
}

function Spells() {
  const spellsResponse = useSpells();
  const [selectedSpell, setSelectedSpell] = useState(spellsResponse.data.find(spell => spell.name === 'Meld Into Stone'));

  return (
    <div className="flex">
      <div className="w-1/2 ">
        <div className="p-2 px-4">
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
      <div className="w-1/2 ">
        {selectedSpell && <SpellCard name={selectedSpell.name} />}
      </div>
    </div>
  );
}

export default Spells;
