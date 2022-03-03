// import ReactMarkdown from 'react-markdown' TODO: remove lib?

import TheOrderOfCombat from "./rule-sections/the-order-of-combat.mdx"
import cover from "./rule-sections/cover.mdx"
import movementAndPosition from "./rule-sections/movement-and-position.mdx"

function RuleContent({ index, ruleResponse }) {
	const map = {
		"the-order-of-combat": TheOrderOfCombat,
		"cover": cover,
		"movement-and-position": movementAndPosition,
		// TODO: move rest of the md files
	}

	const View = map[index]
	if (View) {
		return <div className="prose"><View /></div>
	} else {
		return <p>Rule not created yet</p>
	}

	// return (
	// 	<>
	// 		<div>TODO: transform to markdown</div>
	// 		<div>
	// 			<ReactMarkdown>
	// 				{/* TRICK: remove first h1 from the markdown, that contains the rule name */}
	// 				{/* TODO: remove trick, change on data file */}
	// 				{ruleResponse.data?.desc.replaceAll(`## ${ruleResponse.data.name}\n\n`, '')}
	// 			</ReactMarkdown>
	// 		</div>
	// 	</>
	// )
}

export default RuleContent