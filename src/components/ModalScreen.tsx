import React, { ReactNode } from "react";
import Modal from "react-modal";
Modal.setAppElement("#__next");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    padding: "10px",
    bottom: "auto",
    border: "1px solid #E3E5EA",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    overflow: "none",
  },
};
interface IModalScreen {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}
const ModalScreen: React.FC<IModalScreen> = ({
  children,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default ModalScreen;
