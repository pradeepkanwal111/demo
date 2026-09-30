export default function Navbar() {
  const links = [
    ['About', '#about'],
    ['Work', '#projects'],
    ['Skills', '#skills'],
    ['Education', '#education'],
    ['Contact', '#contact'],
  ];

  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
    </header>
  );
}
