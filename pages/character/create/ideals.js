import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/router'
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';
import ListSelector from '../../../components/ListSelector';
import useTip from '../../../components/useTip';

// TODO: could we choose multiple?
function Form() {
	const { character, background, updateCharacter } = useCreateCharacter()
	const [selectedIdeals, setSelectedIdeals] = useState(character?.ideals)
	const { showTip } = useTip()

	const ideals = background?.ideals

	return (
		<div className="flex flex-col">
			<ScreenIntroduction
				title="Choisissez les idéaux votre personnage"
				description={`Donnez à votre personnage personnage ...`}
				actions={
					<div className="mt-2">
						<Link href="/rules/ideals">
							En savoir plus
						</Link>
					</div>
				}
			/>

			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Choissiez votre idéal</h3>
				<ListSelector
					value={selectedIdeals}
					options={ideals?.from?.map(ideal => {
						return ({
							key: ideal.index,
							value: ideal,
							selected: selectedIdeals?.index === ideal.index,
							label: (
								<div className="">
									<span className="font-semibold">{ideal.title}</span> <span>{ideal.desc}</span>
								</div>
							),
							rightView: (
								<div
									className="px-4 py-2 text-xs text-meta"
									onClick={() => showTip(
										<div>
											<h3>Vous aurez accès aux alignements suivants</h3>
											<ul className="ml-6 list-disc">
												{ideal.alignments.map(alignment => (
													<li key={alignment.index}>
														{alignment.name}
													</li>
												))}
											</ul>
										</div>
									)}
								>
									?
								</div>
							),
						})
					})}
					onChange={setSelectedIdeals}
				/>
			</div>

			<ButtonBottomScreen
				variant="cta"
				onClick={() => {
					updateCharacter({ ideals: selectedIdeals.fullDesc, idealsData: selectedIdeals, step: 'ideals' })
				}}
			>
				Suivant
			</ButtonBottomScreen>
		</div>
	)
}

function CreateCharacterIdeals() {
	return (
		<Screen
			title={"Idéaux"}
			withBottomSpace
		>
			<Form />
		</Screen>
	);
}

export default CreateCharacterIdeals;