import { useEffect } from "react";
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getSpellFiltersMatchingData, buildSpellFiltersForCharacter } from "../../modules/spells/spellsFilter"
import useContextCharacter from "../../modules/character/useContextCharacter"
import { sortSpells } from "../../modules/spells/spellsSorter"
import useI18n from "../../modules/i18n/useI18n";
import useSpells from "../../modules/api/useSpells";
import { useSpellsListFilterScreenAsModal } from "../../components/SpellsListFilterScreenAsModal"
import Screen from "../../components/Screen";
import IconFilter from "../../components/icons/IconFilter";
import Tag from "../../components/Tag"
import IconBookOpen from "../../components/icons/IconBookOpen"
import IconMagicSchool from "../../components/icons/IconMagicSchool"

function SpellFilters({ spell, filters }) {
  // TODO: hide if context character

  return <div className="flex flex-wrap gap-1 mt-2">
    {getSpellFiltersMatchingData(spell, filters).map(data => (
      <Tag 
        key={`${data.label}-${data.value}`} className="pt-1 pb-1 pl-1 pr-1 text-xs text-gray-600 border border-solid border-slate-400"
        color="slate"
      >
        {data.label && <span className="text-xs lowercase">{data.label}: </span>}{data.value}
      </Tag>
    ))}
  </div>
}

function Spell({ spell, filters, /*onSelect*/ }) {
  const { tr } = useI18n();

  // TODO: if context character has the spell -> style with star / background

  return (
    <Link href={`/spells/${spell.index}`}>
      <div
        // onClick={onSelect}
        className={`cursor-pointer my-2 p-4 pt-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
      >
        {spell.school && (
          <div 
            className="absolute right-0 pr-2 mt-1"
            style={{
              marginTop: -6
            }}
          >
          {/* <Tag small className="mr-2 bg-slate-200 text-meta"> */}
            <IconMagicSchool
              school={spell.school.name}
              className="h-6 pt-1 w-7 text-slate-700"
          
            />
          {/* </Tag> */}
          </div>
        )}
        <div>
          <span className="flex items-center font-semibold">       
            {/* <IconMagicSchool
              school={spell.school.name}
              className="h-6 w-7 text-slate-700"

            /> */}
            {tr(spell.nameLocalized)}
          </span>
          <div className="text-sm text-meta">
            <span>{spell.type}</span>
          </div>
          <p className="text-sm">{tr(spell.resume)}</p>
          {!isEmpty(filters) && <SpellFilters spell={spell} filters={filters} />}
        </div>
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
      title={contextCharacter ? `Sorts - ${contextCharacter.name}` : "Sorts"}
      titleIcon={<IconBookOpen className="w-6 h-6" />}
      root
      withCharacterMenu
      withBottomSpace
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
