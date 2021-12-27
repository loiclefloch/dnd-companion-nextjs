
function ChooseSpellLevel({ chosenSpellLevel, setChosenSpellLevel }) {
	return (
		<div className="flex cursor-pointer items-center">
			<div className="text-xs">level</div>
			<div className="px-2" onClick={() => setChosenSpellLevel(chosenSpellLevel - 1)}>-</div>
			<div>{chosenSpellLevel}</div>
			<div className="px-2" onClick={() => setChosenSpellLevel(chosenSpellLevel + 1)}>+</div>
		</div>
	)
}

export default ChooseSpellLevel