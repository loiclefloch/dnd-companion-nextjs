import { useEffect } from "react";
import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { getMonsterFiltersMatchingData } from "../modules/monsters/monstersFilter"
import { sortMonsters } from "../modules/monsters/monstersSorter"
import useTheme from "../modules/theme/useTheme";
import useI18n from "../modules/i18n/useI18n";
import useMonsters from "../modules/api/useMonsters";
import { useMonstersListFilterScreenAsModal } from "../components/MonstersListFilterScreenAsModal"
import Screen from "../components/Screen";
import IconFilter from "../components/icons/IconFilter";
import Tag from "../components/Tag"
import IconBookOpen from "../components/icons/IconBookOpen"

function MonsterFilters({ monster, filters }) {
  // TODO: hide if context character

  return <div className="flex mt-2 flex-wrap gap-1">
    {getMonsterFiltersMatchingData(monster, filters).map(data => (
      <Tag key={`${data.label}-${data.value}`} className="text-xs text-gray-600 border border-solid border-slate-400 pr-1 pl-1 pt-1 pb-1" color="slate">
        {data.label && <span className="text-xs lowercase">{data.label}: </span>}{data.value}
      </Tag>
    ))}
  </div>
}

function Monster({ monster, filters, /*onSelect*/ }) {
  const { tr } = useI18n();
  const theme = useTheme();

  // TODO: if context character has the monster -> style with star / background

  return (
    <Link href={`/monsters/${monster.index}`}>
      <div
        // onClick={onSelect}
        className={clsx("cursor-pointer py-4 p-4 border-b border-slate-100 border-solid flex")}
      >
				<div className="w-14 h-14 flex items-center">
					{monster.imageUrl && (
						<img src={monster.imageUrl} />
					)}
				</div>
				<div className="ml-4">
					<span className="font-semibold">{tr(monster.nameLocalized)}</span>
					<div className={clsx("text-sm", theme.metaColor)}>
						<div>{tr(monster.meta)}</div>
						<div>{monster.challenge}</div>
					</div>
					<p className="text-sm">{tr(monster.resume)}</p>
					{!isEmpty(filters) && <MonsterFilters monster={monster} filters={filters} />}
				</div>
      </div>
    </Link>
  );
}

function Monsters() {
  const { lang } = useI18n()
  const monstersResponse = useMonsters();
  // const { showMonsterModal } = useMonsterModal()
  const { filters, filterMonsters, showMonstersListFilterScreen } = useMonstersListFilterScreenAsModal([])
  
  // useEffect(() => {
  // }, [])

  return (
    <Screen
      title={"Monstres"}
      titleIcon={<IconBookOpen className="w-6 h-6" />}
      root
      isLoading={monstersResponse.isLoading}
      rightAction={
        <button onClick={showMonstersListFilterScreen}>
          <IconFilter className={clsx("h-6 w-6 text-gray-500", {
            // change color when they are filters
            "text-blue-300": !isEmpty(filters),
          })} />
        </button>
      }
    >
			<div className="" data-cy-id="monsters-list">
				{sortMonsters(filterMonsters(monstersResponse.data), lang)?.map((monster) => (
					<Monster
						key={monster.name}
						monster={monster}
						// onSelect={() => showMonsterModal(monster.index)}
						filters={filters}
					/>
				))}
			</div>
    </Screen>
  );
}

export default Monsters;
