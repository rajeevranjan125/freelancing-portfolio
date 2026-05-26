export default function ScrollReveal({ children, className = "", delay = 0 }) {
  return (
    <div className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
