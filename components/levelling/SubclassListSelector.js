import useSubclasses from "../../modules/api/useSubclasses"
import useI18n from "../../modules/i18n/useI18n"
import useSubclassScreenAsModal from "../useSubclassScreenAsModal"
import ListSelector from "../ListSelector"

function SubclassListSelector({ clss, selectedSubclass, onSelect }) {
	const { tr } = useI18n()
	const subclassesResponse = useSubclasses(clss)
	const { showSubclassScreenAsModal } = useSubclassScreenAsModal()

	const subclasses = subclassesResponse.data

	return (
		<ListSelector
			value={selectedSubclass}
			onChange={onSelect}
			options={subclasses?.map(subclass => ({
				key: subclass.index,
				label: tr(subclass.nameLocalized),
				value: subclass,
				selected: selectedSubclass?.index === subclass.index,
				rightView: <div
					className="px-4 py-2 text-xs text-meta"
					onClick={() => showSubclassScreenAsModal(subclass.index)}
				>
					?
				</div>
			}))}
		/>
	)
}

export default SubclassListSelector