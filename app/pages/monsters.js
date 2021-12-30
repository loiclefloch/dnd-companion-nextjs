import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { FilterType, getMonsterFiltersMatchingData } from "../modules/monsters/monstersFilter"
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
	// ignore some filters, because the data is already displayed
	const filterTypesToIgnore = [FilterType.DIFFICULTY]

  // TODO: hide if context character

  return <div className="flex mt-2 flex-wrap gap-1">
    {getMonsterFiltersMatchingData(monster, filters).map(data => {
			if (filterTypesToIgnore.includes(data.filter.type)) {
				return null
			}
			return (
				<Tag key={`${data.label}-${data.value}`} className="text-xs text-gray-600 border border-solid border-slate-400 pr-1 pl-1 pt-1 pb-1" color="slate">
					{data.label && <span className="text-xs lowercase">{data.label}: </span>}{data.value}
				</Tag>
			)
		})}
  </div>
}

function Monster({ monster, filters, /*onSelect*/ }) {
  const { tr } = useI18n();
  const theme = useTheme();

	// TODO: isLegendary

  return (
    <Link href={`/monsters/${monster.index}`}>
      <div
        // onClick={onSelect}
        className={clsx("cursor-pointer py-4 p-4 border-b border-slate-100 border-solid flex")}
      >
				<div className="w-1/6 flex items-center">
					{monster.imageUrl && (
						<img src={monster.imageUrl} className="w-full"/>
					)}
				</div>
				<div className="ml-4 w-5/6">
					<span className="font-semibold w-full flex justify-between">
						{tr(monster.nameLocalized)}
						{monster.isLegendary && (
							<Tag label="L" small className="text-amber-600 border border-solid border-amber-600 ml-2" />
						)}
					</span>
					<div className={clsx("text-sm", theme.metaColor)}>
						<div>{tr(monster.meta)}</div>

						<div>{monster.challenge.label}</div>
						{/* TODO: or this? */}
						{/* <div>{monster.challenge.difficulty}</div> */}
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
	// TODO: how to keep filters when we go back on the page?
  const { filters, filterMonsters, showMonstersListFilterScreen } = useMonstersListFilterScreenAsModal([])
  
  // useEffect(() => {
  // }, [])

  return (
    <Screen
      title={"Monstres"}
      titleIcon={<IconBookOpen className="w-6 h-6" />}
      root
			withCharacterMenu
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
