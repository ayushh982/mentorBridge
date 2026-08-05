const Modal = ({
    isOpen,
    onClose,
    children,
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg rounded-3xl bg-white p-6">

                {children}

                <button
                    onClick={onClose}
                    className="mt-6 rounded-xl border border-gray-200 px-5 py-2"
                >
                    Close
                </button>

            </div>

        </div>
    );
};

export default Modal;