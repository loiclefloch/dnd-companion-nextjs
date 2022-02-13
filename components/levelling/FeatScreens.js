import { actionLevellingAbilityScoreImprovementFeat, actionLevellingAbilityScoreImprovementScore } from "./action"
import { useState, useMemo } from "react"
import { map, cloneDeep, get, set } from "lodash"
import { ScreenStep, useScreenStep } from "../../components/ScreensStepAsModal"
import ListSelector from "../../components/ListSelector";
import { useFeatScreenAsModal } from "../../components/FeatScreenAsModal"
import useI18n from "../../modules/i18n/useI18n"
import { FeatPrerequisites } from "../FeatContent"
import ButtonBottomScreen from "../ButtonBottomScreen"
import useFeats from "../../modules/api/useFeats"
import filterFeatsForCharacter from "../../modules/character/filterFeatsForCharacter"
import Section from "../../components/Section"

function SpellOption({ spellOption, setSelectedOption, selectedOption }) {
	return (
		<ListSelector
			multiple
			nbMaxValues={spellOption.choose}
			onChange={spells => setSelectedOption({ spells })}
			options={spellOption.from.map(spell => ({
				label: spell.name,
				key: spell.index,
				value: spell,
				selected: selectedOption?.spells?.some(s => s.index === spell.index),
			}))}
		/>
	)
}

function SpellOptions({
	onNext,
	spellOptions,
	selectedOption = [],
	setSelectedOption,
}) {
	return (
		<div className="px-4 mt-4 prose">
			<h3>Choisissez des sorts à apprendre</h3>

			{spellOptions.map((spellOption, index) => {
				const value = get(selectedOption, index, { spells: [] })
				return (
					<Section 
						key={index}
						title={`Choix de sort ${index + 1}`}
						withToggle
					>
						<SpellOption
							key={index}
							spellOption={spellOption}
							selectedOption={value}
							setSelectedOption={(value) => {
								const updated = [...selectedOption]
								set(updated, index, value)
								setSelectedOption(updated)
							}}
						/>
					</Section>
				)
			})}

			<ButtonBottomScreen
				variant="cta"
				disabled={!selectedOption}
				hide={!selectedOption}
				onClick={() => {
					onNext()
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

function AbilityOption({
	onNext,
	abilityOption,
	selectedOption,
	setSelectedOption,
}) {
	return (
		<div className="px-4 mt-4 prose">
			<h3>Choisissez une capacité à augmenter</h3>

			<ListSelector
				multiple
				nbMaxValues={abilityOption.choose}
				onChange={abilities => setSelectedOption({ abilities })}
				options={abilityOption.from.map(abilityOption => ({
					label: `+ ${abilityOption.bonus} ${abilityOption.ability.name}`,
					key: abilityOption.ability.name,
					value: abilityOption,
					selected: selectedOption?.abilities?.some(v => v.ability.name === abilityOption.ability.name)
				}))}
			/>

			<ButtonBottomScreen
				variant="cta"
				disabled={!selectedOption}
				hide={!selectedOption}
				onClick={() => {
					onNext()
				}}
			>
				Continuer
			</ButtonBottomScreen>
		</div>
	)
}

function FeatScreens({ onChangeTitle, onCloseScreen, character, step, levellingDispatch }) {
	const [selectedFeat, setSelectedFeat] = useState(null)
	const [selectedOptions, setSelectedOptions] = useState({})
	const { tr } = useI18n()
	const { showFeatScreenAsModal } = useFeatScreenAsModal()
	const featsResponse = useFeats()
	const feats = useMemo(() => filterFeatsForCharacter(featsResponse.data, character).filter(f => f.index === 'fey-touched'), [feats, character])
	const { next } = useScreenStep()

	// TODO:
	// featuresOptions
	// languageOptions

	return (
		<>
			<ScreenStep 
				screen="chooseFeat" 
				title="Choisissez un feat" 
				onChangeTitle={onChangeTitle}
			>
				{/* TODO: learn more */}

				{/* TODO: disabled feats already on character */}
				{/* TODO: disable feats that cannot be used for the character */}
				{/* TODO: some feats makes us select a +1 ability, we should display the option + save the data somewhere */}
				<ListSelector
					className="px-0"
					value={selectedFeat}
					options={feats?.map(feat => {
						const selected = selectedFeat?.index === feat.index

						return {
							label: (
								<div className="pb-2">
									{tr(feat.nameLocalized)}
									<div className="text-meta text-sm">{feat.resume}</div>
									{feat.hasPrerequisites && (
										<div className="mt-2">
											<FeatPrerequisites feat={feat} />
										</div>
									)}
								</div>
							),
							value: feat,
							selected,
							rightView: <div
								className="px-4 py-2 text-xs text-meta"
								onClick={() => showFeatScreenAsModal(feat.index)}
							>
								?
							</div>
						}
					})}
					onChange={setSelectedFeat}
				/>

				<ButtonBottomScreen
					variant="cta"
					disabled={!selectedFeat}
					hide={!selectedFeat}
					onClick={() => {
						if (!selectedFeat.hasOption) {
							levellingDispatch(actionLevellingAbilityScoreImprovementFeat({ 
								step, 
								feat: selectedFeat, 
								selectedOptions 
							}))
						} else {
							next()
						}
					}}
				>
					{!selectedFeat?.hasOption && <span>Valider</span>}
					{selectedFeat?.hasOption && <span>Continuer</span>}
				</ButtonBottomScreen>
			</ScreenStep>

			{selectedFeat?.hasAbilityOption && (
				<ScreenStep 
					screen="abilityOption"
					title={`${selectedFeat?.name} - Augmentation de la capacité`}
					onChangeTitle={onChangeTitle}
				>
					<AbilityOption
						abilityOption={selectedFeat.abilityOption}
						selectedOption={selectedOptions?.abilityOption}
						setSelectedOption={(abilityOption) => setSelectedOptions({ ...selectedOptions, abilityOption })}
						onNext={() => {
							if (!selectedFeat.hasSpellOptions) {
								levellingDispatch(actionLevellingAbilityScoreImprovementFeat({ 
									step, 
									feat: selectedFeat, 
									selectedOptions 
								}))
								onCloseScreen()
							} else {
								next()
							}
						}}
					/>
				</ScreenStep>
			)}

			{selectedFeat?.hasSpellOptions && (
				<ScreenStep
					screen="spellOptions"
					title={`${selectedFeat?.name} - Choix des sorts`}
					onChangeTitle={onChangeTitle}
				>
					<SpellOptions
						spellOptions={selectedFeat.spellOptions}
						selectedOption={selectedOptions?.spellOptions}
						setSelectedOption={(spellOptions) => setSelectedOptions({ ...selectedOptions, spellOptions })}
						onNext={() => {
							if (!selectedFeat.hasSpellTodo) {
								levellingDispatch(actionLevellingAbilityScoreImprovementFeat({ 
									step, 
									feat: selectedFeat, 
									selectedOptions 
								}))
								onCloseScreen()
							} else {
								next()
							}
						}}
					/>
				</ScreenStep>
			)}
			
		</>
	)
}

export default FeatScreens