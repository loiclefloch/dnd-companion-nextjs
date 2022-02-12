import { useMemo } from "react"
import Screen from "./Screen";
import { sortBy } from "lodash";
import Link from "next/link"
import useFeats from "../modules/api/useFeats";
import useI18n from "../modules/i18n/useI18n";
import filterFeatsForCharacter from "../modules/character/filterFeatsForCharacter"
import IconAcademicCap from "./icons/IconAcademicCap";
import useLocalSearch from "./useLocalSearch";
import InputSearch from "./InputSearch";
import { FeatPrerequisites } from "./FeatContent"

function FeatRow({ feat }) {
  const { tr } = useI18n();

  return (
    <Link href={`/feat/${feat.index}`}>
      <div
        // onClick={onSelect}
        className={`relative cursor-pointer border-b border-solid border-slate-100 py-1  pl-3 dark:border-gray-50 prose`}
        data-cy-feat-index={`feat-${feat.index}`}
      >
        <h4 className="">{tr(feat.nameLocalized)}</h4>
        <div className="text-sm">
          {tr(feat.resume)}
        </div>
        <div className="mt-2">
          <FeatPrerequisites feat={feat} />
        </div>
      </div>
    </Link>
  );
}


// TODO: filter: by class, by background
function Feats({ character }) {
  const featsResponse = useFeats();

  const feats = useMemo(() => {
		let feats = featsResponse.data
		if (character) {
			feats = filterFeatsForCharacter(feats, character)
		}
		return sortBy(feats, ['background', 'class', 'level', 'name'])
  }, [featsResponse.data]);

  const {
    searchHistory,
    searchResults,
    search,
    term,
    // reset
  } = useLocalSearch("feats", {
    data: feats,
    options: useLocalSearch.searchOptions.feats,
  });

  return (
    <Screen
      title={"Les feats"}
      titleIcon={<IconAcademicCap className="h-6 w-6" />}
      isLoading={featsResponse.isLoading}
      withBottomSpace
    >
      <div className="flex flex-col">
        <div className="px-4">
          <InputSearch
            searchHistory={searchHistory}
            term={term}
            onChange={search}
          />
        </div>
        <div className="mt-2 flex flex-col gap-2" data-cy-id="feats-list">
          {searchResults && term
            ? searchResults.map((searchResult) => {
                const feat = searchResult.item;
                return (
                  <FeatRow
                    key={`feat_${feat.index}`}
                    feat={feat}
                  />
                );
              })
            : feats.map((feat) => (
                <FeatRow
                  key={`feat_${feat.index}`}
                  feat={feat}
                />
              ))}
        </div>
      </div>
    </Screen>
  );
}

export default Feats;