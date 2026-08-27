import { NavLink, useLocation } from "react-router-dom";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import { useNarration } from "../context/NarrationContext";
import { useLocale, withLocale } from "../lib/locale";
import NarrationButton from "./NarrationButton";

const DESKTOP_NAV_MQ = "(min-width: 900px)";

const links = [
  { to: "/", label: "Home" },
  { to: "/timeline", label: "Timeline" },
  { to: "/globe", label: "Globe" },
  { to: "/traditions", label: "Traditions" },
  { to: "/compare", label: "Compare" },
  { to: "/concepts", label: "Concepts" },
  { to: "/pilgrimage", label: "Pilgrimage" },
  { to: "/inward-paths", label: "Inward Paths" },
  { to: "/about", label: "About" },
];

export default function NavBar() {
  const { compareIds, ambientOn, toggleAmbient, achievements } = useApp();
  const { registration } = useNarration();
  const [scrolled, setScrolled] = useState(false);
  const [openedPath, setOpenedPath] = useState<string | null>(null);
  const loc = useLocation();
  const locale = useLocale();
  const menuId = useId();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  if (openedPath !== null && openedPath !== loc.pathname) {
    setOpenedPath(null);
  }

  const menuOpen = openedPath !== null;
  const closeMenu = useCallback((restoreFocus = false) => {
    setOpenedPath(null);
    if (restoreFocus) {
      queueMicrotask(() => menuBtnRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_NAV_MQ);
    const onChange = () => {
      if (mq.matches) setOpenedPath(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const openedAtPath = loc.pathname;
    const scrollY = window.scrollY;
    const { html, body } = { html: document.documentElement, body: document.body };
    const prevHtmlOverflow = html.style.overflow;
    const prevBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusables = () => {
      const items: HTMLElement[] = [];
      if (menuBtnRef.current) items.push(menuBtnRef.current);
      panelRef.current
        ?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        .forEach((el) => items.push(el));
      return items;
    };

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBody.overflow;
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.left = prevBody.left;
      body.style.right = prevBody.right;
      body.style.width = prevBody.width;
      if (window.location.pathname === openedAtPath) {
        window.scrollTo(0, scrollY);
      }
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen, closeMenu, loc.pathname]);

  const navClass = [
    "nav",
    scrolled ? "nav--scrolled" : "",
    menuOpen ? "nav--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navClass}>
      <div className="nav__inner container">
        <NavLink to={withLocale(locale, "/")} className="nav__brand" aria-label="World Religions Explorer home">
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

        <nav className="nav__links" aria-label="Primary" key={loc.pathname}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={withLocale(locale, l.to)}
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
          {registration && (
            <NarrationButton
              id={registration.id}
              label={registration.label}
              variant="compact"
            />
          )}
          <button
            type="button"
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
          <button
            ref={menuBtnRef}
            type="button"
            className={`icon-btn nav__menu-btn ${menuOpen ? "nav__menu-btn--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => (menuOpen ? closeMenu(false) : setOpenedPath(loc.pathname))}
          >
            <span className="nav__menu-icon" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        className="nav-menu"
        hidden={!menuOpen}
        id={menuId}
      >
        <button
          type="button"
          className="nav-menu__backdrop"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => closeMenu(true)}
        />
        <nav
          ref={panelRef}
          className="nav-menu__panel"
          aria-label="Primary"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={withLocale(locale, l.to)}
              end={l.to === "/"}
              className={({ isActive }) =>
                `nav-menu__link ${isActive ? "nav-menu__link--active" : ""}`
              }
            >
              {l.label}
              {l.to === "/compare" && compareIds.length > 0 && (
                <span className="nav__badge">{compareIds.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
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
