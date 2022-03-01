import { makeI18n } from "../modules/i18n/useI18n";

import ScreenIntroduction from "./ScreenIntroduction"
import SpellLevelData from "./SpellLevelData"
import { getLevellingDataForClassesAndLevel } from "../modules/levelling"
import { isEmpty } from "lodash";
import useFeature from "../modules/api/useFeature"
import useFeatureScreenAsModal from "./useFeatureScreenAsModal"
import LevellingDetail from "./levellingDetail/LevellingDetail"

const i18n = makeI18n({
	'description': {
		fr: 'Retrouvez le détail du niveau %{level} pour les %{clss.name}',
		en: 'Find out details about level %{level} for %{clss.name}',
	},
	'no features': {
		fr: 'Pas de features',
		en: 'No features',
	},
	'spellsSlots.title': {
		fr: '',
		en: 'Spells slots',
	},
	'features.title': {
		fr: '',
		en: 'Features',
	},
	'detail.title': {
		fr: 'Détail',
		en: 'Detail',
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
		<div onClick={() => showFeatureScreenAsModal(feature)}>
			<div>
				{tr(feature.nameLocalized)}
			</div>
		</div>
	)
}

function FeaturesLevelData({ classes, level }) {
	const levellingData = getLevellingDataForClassesAndLevel(classes, level)

	if (isEmpty(levellingData.features)) {
		return <p className="px-4 mt-2">{tr`no features`}</p>
	}

	return (
		<div className="px-4 mt-2">
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
					<LevellingDetail clss={clss} level={level} />
				</div>
			</>
		</>
	)
}

export default LevelDetailView
