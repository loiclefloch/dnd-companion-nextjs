import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useI18n from "../modules/i18n/useI18n";
import useRule from "../modules/api/useRule";
import RuleContent from "./RuleContent"

function RuleScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const ruleResponse = useRule(index)

	return (
		<ScreenAsModal 
			title={`Levelling - Gain d'XP`} 
			onCloseScreen={onCloseScreen}
		>
			<RuleContent index={index} ruleResponse={ruleResponse} />
		</ScreenAsModal>
	)
}

export default function useRuleScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showRuleScreenAsModal: (index) => {
			showScreenAsModal(RuleScreenAsModal, {
				index
			})
		}
	}
}
