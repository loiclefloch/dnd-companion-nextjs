import { useContext } from "react"
import { ModalContext } from './modal/modalContext'

function useModal() {
	let { showModal, hideModal } = useContext(ModalContext);

	function showInfoModal({ content }) {
		showModal({
			type: 'INFO',
			content
		})
	}

	function showValidationModal({ title, message, onValidate, onCancel }) {
		showModal({
			type: 'VALIDATION',
			title,
			message,
			onValidate,
			onCancel
		})
	}

	function showCustomModal(view, props) {
		showModal({
			type: 'CUSTOM',
			view,
			...props
		})
	}
	return { showInfoModal, showValidationModal, showModal, hideModal, showCustomModal  }
};

export default useModal