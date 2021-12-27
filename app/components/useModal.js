import { useContext } from "react"
import { ModalContext } from './modalContext'

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

	return { showInfoModal, showValidationModal, showModal, hideModal }
};

export default useModal