import { useRouter } from 'next/router'

import useFeature from "../../modules/api/useFeature";
import useI18n from "../../modules/i18n/useI18n";
import Screen from "../../components/Screen";
import FeatureView from "../../components/FeatureView";
import IconBookOpen from "../../components/icons/IconBookOpen";

function Feature() {
	const router = useRouter()
	const { tr } = useI18n()
	const featureResponse = useFeature(router.query.featureIndex || 'druid-circle'); // TODO:

	const feature = featureResponse.data;

	return (
		<Screen
			title={!feature ? 'Feature' : `Feature - ${tr(feature?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={featureResponse.isLoading}
		>
			{feature && (
				<FeatureView feature={feature} />
			)}
		</Screen>
	)
}

export default Feature