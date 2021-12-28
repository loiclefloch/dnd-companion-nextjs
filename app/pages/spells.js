import { useEffect } from "react";
import useContextCharacter from "../modules/character/useContextCharacter"
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getSpellFiltersMatchingData, buildSpellFiltersForCharacter } from "../modules/spells/spellsFilter"
import { sortSpells } from "../modules/spells/spellsSorter"
import useTheme from "../modules/theme/useTheme";
import useI18n from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import { useSpellModal } from "../components/SpellScreenAsModal";
import { useSpellsListFilterScreenAsModal } from "../components/SpellsListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";
import Tag from "../components/Tag"

function SpellFilters({ spell, filters, onSelect }) {
  return <div className="flex mt-2">
    {getSpellFiltersMatchingData(spell, filters).map(data => (
      <Tag key={`${data.label}-${data.value}`} className="pr-2 text-xs" color="slate">
        {data.label && <span className="text-xs lowercase">{data.label}: </span>}{data.value}
      </Tag>
    ))}
  </div>
}

function Spell({ spell, filters, /*onSelect*/ }) {
  const { tr } = useI18n();
  const theme = useTheme();

  return (
    <Link href={`/spells/${spell.index}`}>
      <div
        // onClick={onSelect}
        className={clsx("cursor-pointer my-2 p-4 pt-1 border-b border-slate-100 border-solid")}
      >
        <span className="font-semibold">{tr(spell.nameLocalized)}</span>
        <div className={clsx("text-sm", theme.metaColor)}>
          <span>{spell.type}</span>
        </div>
        <p className="text-sm">{tr(spell.resume)}</p>
        {!isEmpty(filters) && <SpellFilters spell={spell} filters={filters} />}
      </div>
    </Link>
  );
}

function Spells() {
  const { lang } = useI18n()
  const contextCharacter = useContextCharacter()
  const spellsResponse = useSpells();
  // const { showSpellModal } = useSpellModal()
  const { filters, filterSpells, showSpellsListFilterScreen } = useSpellsListFilterScreenAsModal(
    buildSpellFiltersForCharacter(contextCharacter)
  )
  
  useEffect(() => {
    // ritual
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Meld Into Stone").name)

    // Two french name
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Animate Objects").name)

    // Dice action damage spell level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Thunderwave").name)

    // Dice action damages character level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Acid Splash").name)

    // showSpellsListFilterScreen()
  }, [])

  return (
    <Screen
      title="Sorts"
      root
      isLoading={spellsResponse.isLoading}
      rightAction={
        <button onClick={showSpellsListFilterScreen}>
          <IconFilter className={clsx("h-6 w-6 text-gray-500", {
            // change color when they are filters
            "text-blue-300": !isEmpty(filters),
          })} />
        </button>
      }
    >
      <div className="flex">
        <div className="" data-cy-id="spells-list">
          {sortSpells(filterSpells(spellsResponse.data), lang)?.map((spell) => (
            <Spell
              key={spell.name}
              spell={spell}
              // onSelect={() => showSpellModal(spell.index)}
              filters={filters}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}

export default Spells;
