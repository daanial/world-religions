import { Link, NavLink } from "react-router-dom";

const exploreLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/timeline", label: "Timeline" },
  { to: "/globe", label: "Globe" },
  { to: "/compare", label: "Compare" },
  { to: "/concepts", label: "Concepts" },
  { to: "/pilgrimage", label: "Pilgrimage" },
];

const stack = ["React", "TypeScript", "Vite", "Three.js", "D3", "GSAP", "Framer Motion"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden />
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand-col">
            <Link to="/" className="site-footer__brand">
              World Religions
              <span className="site-footer__brand-sub">Explorer</span>
            </Link>
            <p className="site-footer__tagline">
              A study aid and visual essay across 6,000 years of belief. Figures are approximate —
              traditions overlap, evolve, and resist tidy categories.
            </p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <div className="site-footer__nav-title">Explore</div>
            <ul className="site-footer__links">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.end}
                    className={({ isActive }) =>
                      `site-footer__link ${isActive ? "site-footer__link--active" : ""}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__credit-col">
            <div className="site-footer__nav-title">An educational project by</div>
            <p className="site-footer__credit">
              <a href="https://danialkeshani.com" target="_blank" rel="noopener noreferrer">
                Danial Keshani
              </a>
              <span className="site-footer__credit-sep" aria-hidden>
                &
              </span>
              <a href="https://cubexic.com" target="_blank" rel="noopener noreferrer">
                Cubex
              </a>
            </p>
            <p className="site-footer__credit-note">
              Built for curiosity — no accounts, no backend, open to wander.
            </p>
          </div>
        </div>

        <div className="site-footer__stack" aria-label="Technologies used">
          <span className="site-footer__stack-label">Made with</span>
          {stack.map((item) => (
            <span key={item} className="site-footer__stack-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__fine">
            © {new Date().getFullYear()} World Religions Explorer · For educational use
          </p>
        </div>
      </div>
    </footer>
  );
}
