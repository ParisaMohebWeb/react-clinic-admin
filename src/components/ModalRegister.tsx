interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalRegister({ onClose, children }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>❌</button>
        {children}
      </div>
    </div>
  );
}
