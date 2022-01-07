import useModal from './useModal'

function useValidation() {
	const { showValidationModal } = useModal()
	
	return {
		askValidation: (title, message, onValidate, onCancel) => {
			showValidationModal({
				title,
				message,
				onValidate,
				onCancel,
			})
		}
	}
}

export default useValidation