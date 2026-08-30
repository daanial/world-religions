import { Link, NavLink } from "react-router-dom";
import { useLocale, withLocale } from "../lib/locale";
import { useT, type UiStrings } from "../lib/i18n";

const exploreLinks: Array<{ to: string; key: keyof UiStrings; end?: boolean }> = [
  { to: "/", key: "navHome", end: true },
  { to: "/timeline", key: "navTimeline" },
  { to: "/globe", key: "navGlobe" },
  { to: "/traditions", key: "navTraditions" },
  { to: "/compare", key: "navCompare" },
  { to: "/concepts", key: "navConcepts" },
  { to: "/pilgrimage", key: "navPilgrimage" },
  { to: "/inward-paths", key: "navInwardPaths" },
  { to: "/about", key: "navAbout" },
];

const stack = ["React", "TypeScript", "Vite", "Three.js", "D3", "GSAP", "Framer Motion"];

export default function Footer() {
  const locale = useLocale();
  const t = useT();

  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden />
      <div className="container site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand-col">
            <Link to={withLocale(locale, "/")} className="site-footer__brand">
              World Religions
              <span className="site-footer__brand-sub">Explorer</span>
            </Link>
            <p className="site-footer__tagline">{t("footerTagline")}</p>
          </div>

          <nav className="site-footer__nav" aria-label={t("footerNavAria")}>
            <div className="site-footer__nav-title">{t("footerExploreTitle")}</div>
            <ul className="site-footer__links">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={withLocale(locale, l.to)}
                    end={l.end}
                    className={({ isActive }) =>
                      `site-footer__link ${isActive ? "site-footer__link--active" : ""}`
                    }
                  >
                    {t(l.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__credit-col">
            <div className="site-footer__nav-title">{t("footerCreditTitle")}</div>
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
            <p className="site-footer__credit-note">{t("footerCreditNote")}</p>
          </div>
        </div>

        <div className="site-footer__stack" aria-label={t("footerStackAria")}>
          <span className="site-footer__stack-label">{t("footerStackLabel")}</span>
          {stack.map((item) => (
            <span key={item} className="site-footer__stack-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__fine">
            © {new Date().getFullYear()} {t("footerBottomFine")}
          </p>
        </div>
      </div>
    </footer>
  );
}
