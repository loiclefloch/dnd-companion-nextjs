import { createElement, useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./modalContext";
import Button from "../Button"
import useEscapeEffect from "../useEscapeEffect"

function ModalInfo({ modalConfiguration, hideModal }) {
	useEscapeEffect(hideModal)

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
				<div 
					className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" 
					onClick={() => {
						hideModal()
					}}
				/>

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
				<div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-full">
					<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
								{modalConfiguration.title && (
									<h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
										{modalConfiguration.title}
									</h3>
								)}
								<div className="mt-2">
									{modalConfiguration.message &&
										<p className="text-sm text-gray-500">
											{modalConfiguration.message}
										</p>
									}

									{modalConfiguration.content && <div>{modalConfiguration.content}</div>}
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
						<Button
							size="big"
							className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								hideModal()
								modalConfiguration.onValidate && modalConfiguration.onValidate()
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

function ModalValidation({ modalConfiguration, hideModal }) {
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
					<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
								{/* Heroicon name: outline/exclamation */}
								<svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								{modalConfiguration.title && <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
									{modalConfiguration.title}
								</h3>}
								<div className="mt-2">
									{modalConfiguration.message &&
										<p className="text-sm text-gray-500">
											{modalConfiguration.message}
										</p>
									}

									{modalConfiguration.content && <div>{modalConfiguration.content}</div>}
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
						<Button
							size="big"
							className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							variant="cta"
							onClick={() => {
								hideModal()
								modalConfiguration.onValidate && modalConfiguration.onValidate()
							}}
						>
							Valider
						</Button>
						<Button
							size="big"
							className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => {
								hideModal()
								modalConfiguration.onCancel && modalConfiguration.onCancel()
							}}
						>
							Annuler
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

const ModalCustom = ({ modalConfiguration, hideModal }) => {
	return createElement(modalConfiguration.view, { hideModal, ...modalConfiguration })
}

const Modal = () => {
	const { modalConfiguration, show, hideModal } = useContext(ModalContext);

	if (modalConfiguration && show) {
		const modal = {
			'VALIDATION': ModalValidation,
			'INFO': ModalInfo,
			'CUSTOM': ModalCustom
		}

		const modalView = modal[modalConfiguration.type]

		if (!modalView) {
			throw new Error(`type not handled ${modalConfiguration.type}`)
		}

		// return createElement(modalView, {modalConfiguration, hideModal })
		return ReactDOM.createPortal(
			createElement(modalView, { modalConfiguration, hideModal }),
			document.querySelector("#modal-root")
		);
	}

	return null;
};

export default Modal;