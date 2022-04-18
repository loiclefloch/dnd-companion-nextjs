import { useState } from "react"
import Link from "next/link"
import { isEmpty } from "lodash";
import ButtonBottomScreen from "../../../components/ButtonBottomScreen";
import ScreenIntroduction from "../../../components/ScreenIntroduction";
import Screen from "../../../components/Screen";
import Textarea from "../../../components/Textarea";
import useI18n from "../../../modules/i18n/useI18n";
import useCreateCharacter from '../../../components/useCreateCharacter';
import ListSelector from '../../../components/ListSelector';
import useTip from '../../../components/useTip';
import Button from "../../../components/Button";

// TODO: i18n

function List({
	chosenIdeals,
	ideals,
	setChosenIdeals
}) {
	const { showTip } = useTip()

	return (
		<div className="px-4 pt-2 mt-2">
			<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Choissiez votre idéal</h3>
			<ListSelector
				value={chosenIdeals}
				onChange={setChosenIdeals}
				options={ideals?.from?.map(ideal => {
					return ({
						key: ideal.index,
						value: ideal,
						selected: chosenIdeals?.index === ideal.index,
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
			/>
		</div>
	)
}

function Custom({
	chosenIdeals,
	setChosenIdeals,
}) {
	return (
		<>
			<div className="px-4 pt-2 mt-2">
				<h3 className="mb-2 font-semibold border-b border-solid border-slate-200">Liens</h3>
				<Textarea 
					rows={12} 
					value={chosenIdeals}
					onChange={e => setChosenIdeals(e.target.value)}
				/>
			</div>
		</>
	)
}


function Form() {
	const Mode = {
		LIST: 'LIST',
		CUSTOM: 'CUSTOM',
	}

	const { character, background, updateCharacter } = useCreateCharacter()
	const [chosenIdeals, setChosenIdeals] = useState(character?.ideals)
	const [mode, setMode] = useState(null)

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

			<>
				{mode === Mode.LIST && (
					<List
						chosenIdeals={chosenIdeals}
						ideals={ideals}
						setChosenIdeals={setChosenIdeals}
					/>

				)}

				{mode === Mode.CUSTOM && (
					<Custom
						chosenIdeals={chosenIdeals}
						setChosenIdeals={setChosenIdeals}
					/>
				)}

				<div className="px-4">
					{(mode !== Mode.LIST) && (
						<Button
							variant="outlined"
							className="mt-2"
							onClick={() => {
								setChosenIdeals(null)
								setMode(Mode.LIST)
							}}
						>
							Choisir dans une liste prédéfinie
						</Button>
					)}
					{(mode !== Mode.CUSTOM) && (
						<Button
							variant="outlined"
							className="mt-2"
							onClick={() => {
								setChosenIdeals(null)
								setMode(Mode.CUSTOM)
							}}
						>
							Customiser
						</Button>
					)}
				</div>
			</>
	
			<ButtonBottomScreen
				variant="cta"
				disabled={isEmpty(chosenIdeals)}
				onClick={() => {
					updateCharacter({ ideals: chosenIdeals?.fullDesc || chosenIdeals, idealsData: chosenIdeals, step: 'ideals' })
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