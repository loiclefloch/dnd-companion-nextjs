import { useRouter } from 'next/router'

import useFeat from "../../modules/api/useFeat";
import useI18n from "../../modules/i18n/useI18n";
import Screen from "../../components/Screen";
import FeatContent from "../../components/FeatContent";
import IconBookOpen from "../../components/icons/IconBookOpen";

function feat() {
	const router = useRouter()
	const { tr } = useI18n()
	const featResponse = useFeat(router.query.featIndex);

	const feat = featResponse.data;

	return (
		<Screen
			title={!feat ? 'feat' : `feat - ${tr(feat?.nameLocalized)}`}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={featResponse.isLoading}
		>
			{feat && (
				<div className='mt-8'>
					<FeatContent feat={feat} />
				</div>
			)}
		</Screen>
	)
}

export default feat