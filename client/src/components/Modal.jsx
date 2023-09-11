/* eslint-disable react/prop-types */
const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    console.log("handleClose");
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000cc] bg-opacity-25 flex justify-center items-center transition-all"
      id="wrapper"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default Modal;
