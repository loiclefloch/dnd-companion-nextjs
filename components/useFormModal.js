import { useState, cloneElement } from "react"
import Button from "./Button"
import useModal from "./useModal"

function FormModal({
	label,
	defaultData,
	form,
	onCancel,
	onSubmit,
	hideModal
}) {
	const [formData, setFormData] = useState(defaultData)

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/*
				Background overlay, show/hide based on modal state.

				Entering: "ease-out duration-300"
				From: "opacity-0"
				To: "opacity-100"
				Leaving: "ease-in duration-200"
				From: "opacity-100"
				To: "opacity-0"
*/}
				<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

				{/* This element is to trick the browser into centering the modal contents. */}
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

				{/*
				Modal panel, show/hide based on modal state.

				Entering: "ease-out duration-300"
				From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				To: "opacity-100 translate-y-0 sm:scale-100"
				Leaving: "ease-in duration-200"
				From: "opacity-100 translate-y-0 sm:scale-100"
				To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			*/}
				<div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4 bg-app">
						<div className="sm:flex sm:items-start">
							
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								{label && 
									<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
										{label}
									</h3>
								}

								{cloneElement(form, {
									defaultData, 
									formData, 
									setFormData,
									onChange: (key, value) => {
										setFormData({ ...formData, [key]: value })
									}
								})}
							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse gap-2 flex">
						
						<Button
							size="big" 
							className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							variant="cta"
							onClick={() => {
								hideModal()
								onCancel && onCancel()
							}}
						>
							Annuler
						</Button>

						<Button 
							size="big" 
							className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								hideModal()
								onSubmit && onSubmit(formData)
							}}
						>
							Valider
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}



function useFormModal() {
	const { showCustomModal } = useModal()

	return {
		showFormModal: ({ 
			label,
			defaultData,
			form,
			onCancel,
			onSubmit,
	 }) => {
			showCustomModal(FormModal, {
				label,
				defaultData,
				form,
				onCancel,
				onSubmit,
			})
		}
	}
}
export default useFormModal