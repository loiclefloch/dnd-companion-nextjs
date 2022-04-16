import { useMemo } from "react";
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getSpellFiltersMatchingData, buildSpellFiltersForCharacter } from "../modules/spells/spellsFilter"
import { sortSpells } from "../modules/spells/spellsSorter"
import { makeI18n } from "../modules/i18n/useI18n";
import useSpells from "../modules/api/useSpells";
import useSpellsListFilterScreenAsModal from "../components/useSpellsListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";
import Tag from "../components/Tag"
import IconBookOpen from "../components/icons/IconBookOpen"
import IconMagicSchool from "../components/icons/IconMagicSchool"
import CharacterSpellTag from "./CharacterSpellTag";
import useLocalSearch from "../components/useLocalSearch"
import InputSearch from "../components/InputSearch"


const useI18n = makeI18n({
  'screen.title.withCharacterName': {
    fr: `Sorts - %{character.name}`,
    en: `Spells - %{character.name}`,
  },
  'screen.title': {
    fr: `Sorts`,
    en: `Spells`,
  },
})

function SpellFilters({ spell, filters }) {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {getSpellFiltersMatchingData(spell, filters).map(data => (
        <Tag
          key={`${data.label}-${data.value}`}
          className="pt-1 pb-1 pl-1 pr-1 text-xs text-gray-600 border border-solid border-slate-400"
          color="slate"
          size="small"
        >
          {data.label && <span className="text-xs lowercase">{data.label}: </span>}<span>{data.value}</span>
        </Tag>
      ))}
    </div>
  )
}

function Spell({ spell, filters, character /*onSelect*/ }) {
  const { tr } = useI18n();

  const isContextCharacter = !!character

	// const characterSpell = character && character.spellsList.find(s => s.index === spell.index)
  // const isLearned = isContextCharacter && !!characterSpell
  // const isprepared = isContextCharacter && characterSpell.isprepared
	// const isSubclassSpell = isContextCharacter && characterSpell.isSubclassSpell
	// const isForcedprepared = isContextCharacter && characterSpell.isForcedprepared

  // TODO: if context character has the spell -> style with star / background

  return (
    <Link href={isContextCharacter ? `/character/spells/${spell.index}` : `/spells/${spell.index}`} passHref>
      <div
        // onClick={onSelect}
        className={`cursor-pointer py-1 border-b border-slate-100 dark:border-gray-50 border-solid  relative`}
        data-cy-spell-index={`spell-${spell.index}`}
      >
        <div className="pl-3">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1">
              <span className="flex flex-row items-center font-semibold">
                {/* <IconMagicSchool
              school={spell.school.name}
              className="h-6 w-7 text-slate-700"

            /> */}
                <p>{tr(spell.nameLocalized)}</p>
              </span>
              <div className="text-sm text-meta">
                <p>{spell.type}</p>
              </div>
            </div>

            <div
              className="pr-2 mt-1"
            >
              <div className="flex flex-row items-end gap-1">
                <>
                  <CharacterSpellTag character={character} spell={spell} />
                </>

                <IconMagicSchool
                  school={spell.school.name}
                  className="h-6 pt-1 w-7 text-slate-700"
                />

              </div>
            </div>

          </div>

          <p className="pr-2 text-sm">{tr(spell.resume)}</p>

          {!isEmpty(filters) && !isContextCharacter && <SpellFilters spell={spell} filters={filters} />}

        </div>
      </div>
    </Link>
  );
}

function Spells({ contextCharacter }) {
  const { tr, lang } = useI18n()
  const spellsResponse = useSpells();
  const defaultFilters  = useMemo(() => {
    if (contextCharacter) {
      return buildSpellFiltersForCharacter(contextCharacter)
    }
  }, [contextCharacter])

  // const { showSpellModal } = useSpellModal()
  const { filters, filterSpells, showSpellsListFilterScreen } = useSpellsListFilterScreenAsModal(
    defaultFilters,
    contextCharacter
  )
  const filteredSpells = useMemo(() => filterSpells(spellsResponse.data, lang), [filterSpells, spellsResponse.data, lang])

  // useEffect(() => {
    // ritual
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Meld Into Stone").name)

    // Two french name
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Animate Objects").name)

    // Dice action damage spell level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Thunderwave").name)

    // Dice action damages character level
    // showSpellModal(spellsResponse.data.find((spell) => spell.name === "Acid Splash").name)

    // showSpellsListFilterScreen()
  // }, [])


  const {
    searchHistory,
    searchResults,
    search,
    term,
    onRemoveHistoryQuery,
    // reset
  } = useLocalSearch(
    'spells',
    filteredSpells,
    useLocalSearch.searchOptions.spells
  )

  return (
    <Screen
      title={contextCharacter 
        ? tr('screen.title.withCharacterName', { 'character.name': contextCharacter.name }) 
        : tr('screen.title')
      }
      titleIcon={<IconBookOpen className="w-6 h-6" />}
      root
      withCharacterMenu
      withBottomSpace
      isLoading={spellsResponse.isLoading}
      rightAction={
        <button onClick={() => showSpellsListFilterScreen()}>
          <IconFilter
            className={clsx("h-6 w-6 text-gray-500", {
              // change color when they are filters
              "text-blue-400": !isEmpty(filters),
            })}
          />
        </button>
      }
    >
      <>
        <InputSearch
          className="px-4"
          searchHistory={searchHistory}
          term={term}
          onChange={search}
          onRemoveHistoryQuery={onRemoveHistoryQuery}
        />
        <div className="flex flex-col gap-2 mt-2" data-cy-id="spells-list">
          {searchResults && term ? (
            searchResults.map(searchResult => {
              const spell = searchResult.item
              return (
                <Spell
                  key={spell.name}
                  spell={spell}
                  // onSelect={() => showSpellModal(spell.index)}
                  filters={filters}
                  character={contextCharacter}
                />
              )
            })
          ) : (
            sortSpells(filteredSpells).map((spell) => (
              <Spell
                key={spell.name}
                spell={spell}
                // onSelect={() => showSpellModal(spell.index)}
                filters={filters}
                character={contextCharacter}
              />
            ))
          )}
        </div>
      </>
    </Screen>
  );
}

export default Spells;
