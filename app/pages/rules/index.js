import Link from "next/link"
import Text from "../../components/elem/Text"
import Screen from "../../components/Screen"
import IconBookOpen from "../../components/icons/IconBookOpen"
import useRules from "../../modules/api/useRules";

function Rules() {
	const rulesResponse = useRules()

  return (
		<Screen
			title={"Règles"}
			titleIcon={<IconBookOpen className="w-6 h-6" />}
			isLoading={rulesResponse.isLoading}
			root
			withBottomSpace
		>
			<div className="flex flex-col gap-2 p-4" data-cy-id="spells-list">
				
				{rulesResponse.data?.map(section => (
					<div key={section.index}>
						<Text>{section.name}</Text>

						<div className="my-2">
							{section.subsections.map(subsection => (
								<div key={subsection.index} className="pl-4 py-0.5">
									<Link href={`/rules/${subsection.index}`}>
										<Text>{subsection.name}</Text>
									</Link>
								</div>
							))}
						</div>
					</div>
				))}

			</div>
		</Screen>
	);
}

export default Rules;
