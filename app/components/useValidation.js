

function useValidation() {
	return {
		addValidation: (title, message, onValidate, onCancel) => {
			alert(title + ' ' + message)
			onValidate()
		}
	}
}

export default useValidation