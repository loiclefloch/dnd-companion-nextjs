import Link from 'next/link'

import useI18n from "../modules/i18n/useI18n";

import ScreenIntroduction from "./ScreenIntroduction"
import SpellLevelData from "./SpellLevelData"
import { getLevellingDataForClassesAndLevel } from "../modules/levelling"
import { isEmpty } from "lodash";
import useFeature from "../modules/api/useFeature"
import useFeatureScreenAsModal from "./useFeatureScreenAsModal"
import LevellingDetail from "./levellingDetail/LevellingDetail"

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
		return <p className="px-4 mt-2">Pas de features</p>
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
				description={`Retrouvez le détail du niveau ${level} pour les ${tr(clss.nameLocalized)}`}
			/>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Spells slots</h3>
				<SpellLevelData classes={[clss]} level={level} />
			</>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Features</h3>
				<FeaturesLevelData classes={[clss]} level={level} />
			</>
			
			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Détail</h3>
				<div className="mx-4 mt-2">
					<LevellingDetail clss={clss} level={level} />
				</div>
			</>
		</>
	)
}

export default LevelDetailView
