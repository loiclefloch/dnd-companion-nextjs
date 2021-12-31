import { useRouter } from 'next/router'

import useMonster from "../../modules/api/useMonster";
import useI18n from "../../modules/i18n/useI18n";

import Screen from "../../components/Screen";
import MonsterView from "../../components/MonsterView";
import IconMonster from "../../components/icons/IconMonster";

function Monster() {
	const router = useRouter()
	const { tr } = useI18n()
	const monsterResponse = useMonster(router.query.index);
	const monster = monsterResponse.data;

	return (
		<Screen
			title={!monster ? 'Monstre' : `${tr(monster?.nameLocalized)}`}
			titleIcon={<IconMonster className="w-6 h-6 fill-slate-700" />}
			isLoading={monsterResponse.isLoading}
			withBottomSpace
		>
			{monster && (
				<MonsterView monster={monster} />
			)}
		</Screen>
	)
}

export default Monster