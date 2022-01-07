import Link from 'next/link'
import isEmpty from "lodash/isEmpty"
import clsx from "clsx"
import { FilterType, getMonsterFiltersMatchingData } from "../../modules/monsters/monstersFilter"
import { sortMonsters } from "../../modules/monsters/monstersSorter"
import useI18n from "../../modules/i18n/useI18n";
import useMonsters from "../../modules/api/useMonsters";
import { useMonstersListFilterScreenAsModal } from "../../components/MonstersListFilterScreenAsModal"
import Screen from "../../components/Screen";
import IconFilter from "../../components/icons/IconFilter";
import Tag from "../../components/Tag"
import IconMonster from "../../components/icons/IconMonster"

function MonsterFilters({ monster, filters }) {
	// ignore some filters, because the data is already displayed
	const filterTypesToIgnore = [FilterType.DIFFICULTY]

  // TODO: hide if context character

  return <div className="flex flex-wrap gap-1 mt-2">
    {getMonsterFiltersMatchingData(monster, filters).map(data => {
			if (filterTypesToIgnore.includes(data.filter.type)) {
				return null
			}
			return (
				<Tag key={`${data.label}-${data.value}`} className="pt-1 pb-1 pl-1 pr-1 text-xs text-gray-600 border border-solid border-slate-400" color="slate">
					{data.label && <span className="text-xs lowercase">{data.label}: </span>}{data.value}
				</Tag>
			)
		})}
  </div>
}

function Monster({ monster, filters, /*onSelect*/ }) {
  const { tr } = useI18n();

	// TODO: isLegendary

  return (
    <Link href={`/monsters/${monster.index}`}>
      <div
        // onClick={onSelect}
        className={clsx("cursor-pointer py-4 p-4 border-b border-slate-100 dark:border-gray-50 border-solid flex")}
      >
				<div className="flex items-center w-1/6">
					{monster.imageUrl && (
						<img src={monster.imageUrl} className="w-full"/>
					)}
				</div>
				<div className="w-5/6 ml-4">
					<span className="flex justify-between w-full font-semibold">
						{tr(monster.nameLocalized)}
						{monster.isLegendary && (
							<Tag 
								label="L" 
								size="small" 
								className="pt-1 ml-2 border border-solid text-amber-600 border-amber-600" 
							/>
						)}
					</span>
					<div className={clsx("text-sm", 'text-slate-600 dark:text-slate-600')}>
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
      title={"Bestiaire"}
      titleIcon={<IconMonster className="w-6 h-6 fill-slate-700" />}
      root
			withCharacterMenu
			withBottomSpace
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
