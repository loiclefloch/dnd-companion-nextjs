import Link from "next/link"
import Text from "../../components/elem/Text"
import Screen from "../../components/Screen"
import IconAcademicCap from "../../components/icons/IconAcademicCap"
import useRules from "../../modules/api/useRules";

function Section({ title, subItems }) {
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

				<Section 
					title="Introduction"
					subItems={[
						<SubItem href={`/race`} title="Races" />,
						<SubItem href={`/class`} title="Classes" />,
					]}
				/>

				{/* TODO: create those rules*/}
				<Section
					title="Personnality and background"
					subItems={[
						<SubItem href={`/rules/character-details`} title="Character details" />,
						<SubItem href={`/rules/inspiration`} title="Inspiration" />,
						<SubItem href={`/rules/background`} title="Background" />
					]}
				/>


				{rulesResponse.data?.map(section => (
					<Section
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
