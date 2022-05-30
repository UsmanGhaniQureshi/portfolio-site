const Modal = ({ children, visible, onClose }) => {
  const closeModalHandler = (e) => {
    if (e.target.id === "Modal") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="Modal"
      onClick={closeModalHandler}
      className="flex  justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="flex justify-between px-3 py-6 bg-white rounded-2xl">
        {children}
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-xl border-none self-end"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
