import Link from "next/link"
import Screen from "../../components/Screen"
import IconAcademicCap from "../../components/icons/IconAcademicCap"
import useRules from "../../modules/api/useRules";

function RuleSection({ title, subItems }) {
	return (
		<div>
			<Text>{title}</Text>

			<div className="my-2">
				{subItems}
			</div>
		</div>
	)
}

function SubItem({ title, href }) {
	return (
		<div key={href} className="pl-4 py-0.5">
			<Link href={href}>
				<Text>{title}</Text>
			</Link>
		</div>
	)
}

function Rules() {
	const rulesResponse = useRules()

	return (
		<Screen
			title={"Règles"}
			titleIcon={<IconAcademicCap className="w-6 h-6" />}
			isLoading={rulesResponse.isLoading}
			root
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">

				<RuleSection 
					title="Introduction"
					subItems={[
						<SubItem 
							key="/race" 
							href={`/race`} 
							title="Races" 
						/>,
						<SubItem 
							key="/class" 
							href={`/class`} 
							title="Classes" 
						/>,
						<SubItem 
							key="/background" 
							href={`/background`} 
							title="Backgrounds" 
						/>,
						<SubItem 
							key="/features" 
							href={`/features`} 
							title="Features" 
						/>,
					]}
				/>

				{/* TODO: create those rules*/}
				<RuleSection
					title="Personnality and background"
					subItems={[
						<SubItem 
							key={`/rules/character-details`} 
							href={`/rules/character-details`} 
							title="Character details"
						/>,
						<SubItem
							key={`/rules/inspiration`}
							href={`/rules/inspiration`}
							title="Inspiration"
						/>,
						<SubItem
							key={`/rules/background`}
							href={`/rules/background`}
							title="Background"
						/>
					]}
				/>


				{rulesResponse.data?.map(section => (
					<RuleSection
						key={section.index}
						title={section.name}
						subItems={section.subsections.map(subsection => (
							<SubItem
								key={subsection.index}
								href={`/rules/${subsection.index}`}
								title={subsection.name}
							/>
						))}
					/>
				))}

			</div>
		</Screen>
	);
}

export default Rules;
