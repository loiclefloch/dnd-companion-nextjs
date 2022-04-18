import { makeI18n } from "../modules/i18n/useI18n";

import ScreenIntroduction from "./ScreenIntroduction"
import SpellLevelData from "./SpellLevelData"
import { getLevellingDataForClassesAndLevel } from "../modules/levelling"
import { isEmpty } from "lodash";
import useFeature from "../modules/api/useFeature"
import useFeatureScreenAsModal from "./useFeatureScreenAsModal"
import LevellingDetail from "./levellingDetail/LevellingDetail"
import { getLevellingStages } from "../modules/levelling"

const useI18n = makeI18n({
	'description': {
		fr: 'Retrouvez le détail du niveau %{level} pour les %{clss.name}',
		en: 'Find out details about level %{level} for %{clss.name}',
	},
	'no features': {
		fr: 'Pas de features',
		en: 'No features',
	},
	'detail.title': {
		fr: 'Détail',
		en: 'Detail',
	},
	'requiredXp': {
		fr: `XP requise`,
		en: `Required XP`,
	},
})

function Feature({ index }) {
	const { tr } = useI18n()
	const featuresResponse = useFeature(index)
	const { showFeatureScreenAsModal } = useFeatureScreenAsModal()

	const feature = featuresResponse.data

	if (!feature) {
		return null // loading
	}

	return (
		<div 
			onClick={() => showFeatureScreenAsModal(feature)}
			className="p-1 flex justify-between"
		>
			<div>
				{tr(feature.nameLocalized)}
			</div>
			<div className="text-meta px-2">
				?
			</div>
		</div>
	)
}

function FeaturesLevelData({ classes, level }) {
	const { tr } = useI18n()
	const levellingData = getLevellingDataForClassesAndLevel(classes, level)

	if (isEmpty(levellingData.features)) {
		return <p className="px-4 mt-2">{tr`no features`}</p>
	}

	return (
		<div className="px-4 mt-2 divide divide-y">
			{levellingData.features.map(feature => (
				<Feature key={feature} index={feature} />
			))}
		</div>
	)
}

function LevelDetailView({ clss, level, onCloseScreen }) {
	const { tr } = useI18n()

	return (
		<>
			<ScreenIntroduction 
				// title={"Levelling"}
				description={tr('description', { level, 'clss.name': tr(clss.nameLocalized)}) }
			/>

			<div className="flex px-4 mt-2">
				<div>
					{tr`requiredXp`}
				</div>
				<div className="text-meta ml-2">
					{getLevellingStages()[level]}
					<span> (</span>
					<span>{tr(`level.short`, { level: level - 1 })}</span>
					{level > 1 && (
						<span>
							+ {getLevellingStages()[level] - getLevellingStages()[level - 1]}
							{' '}
						</span>
					)}
					<span>)</span>
				</div>
			</div>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`spellsSlots.title`}</h3>
				<SpellLevelData classes={[clss]} level={level} />
			</>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`features.title`}</h3>
				<FeaturesLevelData classes={[clss]} level={level} />
			</>
			
			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">{tr`detail.title`}</h3>
				<div className="mx-4 mt-2">				
					<div className="mt-2">
						<LevellingDetail clss={clss} level={level} />
					</div>
				</div>
			</>
		</>
	)
}

export default LevelDetailView
