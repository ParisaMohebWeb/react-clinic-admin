// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div>
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose}>❌</button>
      </div>
    </div>
  );
};



export default Modal;
