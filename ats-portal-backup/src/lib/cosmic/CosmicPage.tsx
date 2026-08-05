export default function CosmicPage({ children, className }) {
  return (
    <div className={`relative z-10 p-6 rounded-xl ${className}`}>
      {children}
    </div>
  );
}
