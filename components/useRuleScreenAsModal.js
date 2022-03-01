import useScreenAsModal from "./screenAsModal/useScreenAsModal"

import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import { makeI18n } from "../modules/i18n/useI18n";
import useRule from "../modules/api/useRule";
import RuleContent from "./RuleContent"

const useI18n = makeI18n({
	'screen.title': {
		fr: `Levelling - Gain d'XP`,
		en: `Levelling - XP gain`,
	},
})

function RuleScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const ruleResponse = useRule(index)

	return (
		<ScreenAsModal 
			title={tr`screen.title`} 
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
