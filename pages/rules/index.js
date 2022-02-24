import Link from "next/link"
import Screen from "../../components/Screen"
import IconAcademicCap from "../../components/icons/IconAcademicCap"
import useRules from "../../modules/api/useRules";

function RuleSection({ title, subItems }) {
	return (
		<div className="relative">
			<div className={`sticky top-0 px-4 py-3 flex items-center font-semibold text-sm 
			text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 
			backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10 z-20`}>
				{title}
			</div>

			<div className="my-2">
				{subItems}
			</div>
		</div>
	)
}

function SubItem({ title, href }) {
	return (
		<div key={href} className="pl-4 py-2 hover:bg-black/20">
			<Link href={href}>
				<div>{title}</div>
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
						<SubItem 
						key="/feat" 
						href={`/feat`} 
						title="Feats" 
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
