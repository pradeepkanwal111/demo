export default function SectionHeader({ eyebrow, children }) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-heading">{children}</h2>
    </div>
  );
}
