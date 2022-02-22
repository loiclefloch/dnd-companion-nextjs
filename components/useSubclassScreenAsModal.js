import useScreenAsModal from "./screenAsModal/useScreenAsModal"
import ScreenAsModal from "./screenAsModal/ScreenAsModal"
import useSubclass from "../modules/api/useSubclass"
import SubclassContent from "./SubclassContent"
import useI18n from "../modules/i18n/useI18n"

function SubclassScreenAsModal({ index, onCloseScreen }) {
	const { tr } = useI18n()
	const subclassResponse = useSubclass(index)

	const subclass = subclassResponse?.data

	return (
		<ScreenAsModal 
			title={tr(subclass?.nameLocalized)} 
			isLoading={subclassResponse.isLoading}
			onCloseScreen={onCloseScreen}
		>
			<SubclassContent subclass={subclassResponse.data} />
		</ScreenAsModal>
	)
}

export default function useSubclassScreenAsModal() {
	const { showScreenAsModal } = useScreenAsModal()

	return {
		showSubclassScreenAsModal: (index) => {
			showScreenAsModal(SubclassScreenAsModal, { index })
		}
	}
}
