import { useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./modalContext";

const Modal = () => {
	const { modalConfiguration, show, hideModal } = useContext(ModalContext);

	if (modalConfiguration && show) {
		return ReactDOM.createPortal(
			<div
				className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
				style={{ background: "rgba(0,0,0,0.8)" }}
			>
				<div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
					<button
						className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full bg-red-200 mb-3 bg-white w-8 h-8"
						onClick={hideModal}
					>
						&times;
					</button>

					{modalConfiguration.title && <h1>{modalConfiguration.title}</h1>}
					{modalConfiguration.message && <p>{modalConfiguration.message}</p>}

					{modalConfiguration.content && <div>{modalConfiguration.content}</div>}

					{/* ACTIONS */}
					<div>
						{modalConfiguration.type === 'VALIDATION' && (
							<div>
								<button
									onClick={() => {
										hideModal()
										modalConfiguration.onCancel && modalConfiguration.onCancel()
									}}
								>
									Annuler
								</button>
								<button
									onClick={() => {
										hideModal()
										modalConfiguration.onValidate && modalConfiguration.onValidate()
									}}
								>
									Valider
								</button>
							</div>
						)}
					</div>
				</div>
			</div>,
			document.querySelector("#modal-root")
		);
	}

	return null;
};

export default Modal;
