import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/timeline", label: "Timeline" },
  { to: "/globe", label: "Globe" },
  { to: "/compare", label: "Compare" },
  { to: "/concepts", label: "Concepts" },
];

export default function NavBar() {
  const { compareIds, ambientOn, toggleAmbient, achievements } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <NavLink to="/" className="nav__brand" aria-label="World Religions Explorer home">
          <span className="nav__logo" aria-hidden>
            <svg viewBox="0 0 32 32" width="26" height="26">
              <circle cx="16" cy="16" r="9" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
              <circle cx="16" cy="16" r="2.2" fill="var(--gold)" />
              <circle cx="26" cy="9" r="1.4" fill="var(--turquoise)" />
              <circle cx="6" cy="23" r="1.4" fill="var(--crimson)" />
              <circle cx="25" cy="24" r="1.1" fill="var(--saffron)" />
            </svg>
          </span>
          <span className="nav__title">
            World Religions
            <span className="nav__subtitle">Explorer</span>
          </span>
        </NavLink>

        <nav className="nav__links" key={loc.pathname}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
            >
              {l.label}
              {l.to === "/compare" && compareIds.length > 0 && (
                <span className="nav__badge">{compareIds.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            className="icon-btn"
            onClick={toggleAmbient}
            title={ambientOn ? "Mute ambient soundscape" : "Play ambient soundscape"}
            aria-label="Toggle ambient sound"
            aria-pressed={ambientOn}
          >
            {ambientOn ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
          <div className="nav__ach" title={`${achievements.length} achievements unlocked`}>
            <TrophyIcon />
            <span>{achievements.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
      <path d="M16 8.5a4 4 0 0 1 0 7" strokeLinecap="round" />
      <path d="M18.5 6a7 7 0 0 1 0 12" strokeLinecap="round" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
      <path d="M22 9l-6 6M16 9l6 6" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6">
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
      <path d="M9 14v3M15 14v3M8 20h8M10 17h4v3h-4z" strokeLinecap="round" />
    </svg>
  );
}
