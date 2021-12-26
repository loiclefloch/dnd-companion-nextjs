import { useState } from 'react'

import useSpells from '../modules/api/useSpells'
import SpellCard from '../components/SpellCard'

function Spell({ spell, onSelect }) {
  return (
    <div onClick={onSelect}>
      {spell.name}
    </div>
  )
}

function Spells() {
  const spellsResponse = useSpells()
  const [selectedSpell, setSelectedSpell ] = useState(spellsResponse.data[2])

  return (
    <div>
      {selectedSpell && <SpellCard name={selectedSpell.name} />}
      <div>
        {spellsResponse.data.map((spell) => (
          <Spell
            key={spell.name}
            spell={spell}
            onSelect={() => setSelectedSpell(spell)}
          />
        ))}
      </div>
    </div>
  );
}

export default Spells
