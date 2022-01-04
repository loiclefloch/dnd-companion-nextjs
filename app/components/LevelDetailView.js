import Link from 'next/link'

import useI18n from "../modules/i18n/useI18n";

import ScreenIntroduction from "./ScreenIntroduction"
import SpellLevelData from "./SpellLevelData"
import { getSpellLevelDataForClassesAndLevel } from "../modules/levelling"
import { isEmpty } from "lodash";
import useFeature from "../modules/api/useFeature"

function Feature({ index }) {
	const { tr } = useI18n()
	const featuresResponse = useFeature(index)

	const feature = featuresResponse.data

	if (!feature) {
		return null // loading
	}

	return (
		<Link href={`/features/${feature.index}`}>
			<div>
				{tr(feature.nameLocalized)}
			</div>
		</Link>
	)
}

function FeaturesLevelData({ classes, level }) {
	const spellLevelData = getSpellLevelDataForClassesAndLevel(classes, level)

	if (isEmpty(spellLevelData)) {
		return <p>Pas de features</p>
	}

	return (
		<div className="px-4 mt-2">
			{spellLevelData.features.map(feature => (
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
				title={``}
				description={null}
			/>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Spells slots</h3>
				<SpellLevelData classes={[clss]} level={level} />
			</>

			<>
				<h3 className="mx-4 mt-4 text-xl border-b border-slate-300">Features</h3>
				<FeaturesLevelData classes={[clss]} level={level} />
			</>
			
		</>
	)
}

export default LevelDetailView
