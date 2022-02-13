
// TODO:
function useAddFlashMessage() {

	return {
		addSuccessFlashMessage: ({text}) => alert(text),
		addErrorFlashMessage: ({text}) => alert(text),
		addInfoFlashMessage: ({text}) =>alert(text) 
	}
}

export default useAddFlashMessage