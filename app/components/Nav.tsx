export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="logo">
          <span className="logo-mark">JS</span>

          <span className="logo-copy">
            JAYANT SINGH
          </span>
        </a>

        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#experience">Experience</a>
          <a href="#twin">Jayant AI</a>
        </div>

        <a className="nav-cta" href="#twin">
          <span className="nav-status-dot" />
          AI Twin
        </a>
      </div>
    </nav>
  );
}
