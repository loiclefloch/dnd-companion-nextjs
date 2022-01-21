import Screen from "../../components/Screen"
import IconAcademicCap from "../../components/icons/IconAcademicCap"

import { useRouter } from "next/router"
import useRule from "../../modules/api/useRule"

import RuleContent from "../../components/RuleContent"

function Rule() {
	const router = useRouter()
	const index = router.query.ruleIndex || 'the-order-of-combat'
	const ruleResponse = useRule(index)

  return (
		<Screen
			title={`Règles - ${ruleResponse.data?.name || ''}`}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={ruleResponse.isLoading}
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">
				<RuleContent index={index} ruleResponse={ruleResponse} />
			</div>
		</Screen>
	);
}

export default Rule;
