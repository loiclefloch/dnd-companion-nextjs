import Screen from "../../components/Screen"
import IconScale from "../../components/icons/IconScale"
import ReactMarkdown from 'react-markdown'

import TheOrderOfCombat from "../../components/rule-sections/the-order-of-combat.mdx"
import cover from "../../components/rule-sections/cover.mdx"
import movementAndPosition from "../../components/rule-sections/movement-and-position.mdx"

import { useRouter } from "next/router"
import useRule from "../../modules/api/useRule"

function RuleContent({ index, ruleResponse }) {
	const map = {
		"the-order-of-combat": TheOrderOfCombat,
		"cover": cover,
		"movement-and-position": movementAndPosition,
		// TODO: move rest of the md files
	}

	const View = map[index]
	if (View) {
		return <View />
	}

	return (
		<>
			<div>TODO: transform to markdown</div>
			<div>
				<ReactMarkdown>
					{/* TRICK: remove first h1 from the markdown, that contains the rule name */}
					{/* TODO: remove trick, change on data file */}
					{ruleResponse.data?.desc.replaceAll(`## ${ruleResponse.data.name}\n\n`, '')}
				</ReactMarkdown>
			</div>
		</>
	)
}

function Rule() {
	const router = useRouter()
	const index = router.query.ruleIndex || 'the-order-of-combat'
	const ruleResponse = useRule(index)

  return (
		<Screen
			title={`Règles - ${ruleResponse.data?.name || ''}`}
			titleIcon={<IconScale className="w-6 h-6" />}
			isLoading={ruleResponse.isLoading}
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">

				<div className="prose">
					<RuleContent index={index} ruleResponse={ruleResponse} />

				</div>
			</div>
		</Screen>
	);
}

export default Rule;
