export default function CosmicButton({ children, onClick }) {
  return (
    <button className="cosmic-button" onClick={onClick}>
      {children}
    </button>
  );
}
