export default function CosmicModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="cosmic-modal-backdrop" onClick={onClose}>
      <div className="cosmic-modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
