import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { RELIGIONS } from "../data/religions";
import { ACHIEVEMENTS_META_FA } from "../data/achievements.fa";
import { FA_RELIGION_META } from "../data/religion-meta.fa";
import { useLocale, withLocale } from "../lib/locale";
import { pt } from "../lib/pageI18n";

/** Floating achievement toast + compare drawer — rendered once at app root. */
export default function Overlays() {
  const { newlyUnlocked, dismissToast, compareIds, clearCompare, toggleCompare } = useApp();
  const { pathname } = useLocation();
  const locale = useLocale();
  const selected = RELIGIONS.filter((r) => compareIds.includes(r.id));
  // pathname still carries the /fa prefix here, so compare it stripped of any locale prefix
  const onComparePage = pathname === "/compare" || pathname === "/fa/compare";

  const scrollToCompare = () => {
    document.getElementById("compare-workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const achFa = newlyUnlocked ? ACHIEVEMENTS_META_FA[newlyUnlocked.id] : undefined;
  const achTitle = locale === "fa" ? achFa?.title ?? newlyUnlocked?.title : newlyUnlocked?.title;
  const achDesc = locale === "fa" ? achFa?.description ?? newlyUnlocked?.description : newlyUnlocked?.description;

  return (
    <>
      <AnimatePresence>
        {newlyUnlocked && (
          <motion.div
            className="toast glass"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={dismissToast}
          >
            <div className="toast__icon" aria-hidden>
              <Trophy />
            </div>
            <div className="toast__body">
              <div className="toast__eyebrow">{pt(locale, "achievementUnlocked")}</div>
              <div className="toast__title">{achTitle}</div>
              <div className="toast__desc">{achDesc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            className="compare-drawer glass"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="compare-drawer__chips">
              {selected.map((r) => {
                const faName = locale === "fa" ? FA_RELIGION_META[r.id as keyof typeof FA_RELIGION_META]?.name : undefined;
                return (
                  <button
                    key={r.id}
                    className="chip"
                    style={{ borderColor: r.accent, color: r.accent }}
                    onClick={() => toggleCompare(r.id)}
                    title={pt(locale, "removeFromComparison")}
                  >
                    <span className="chip__dot" style={{ background: r.accent }} />
                    {faName ?? r.name}
                    <span className="chip__x">✕</span>
                  </button>
                );
              })}
              {Array.from({ length: 4 - selected.length }).map((_, i) => (
                <Link key={i} to={withLocale(locale, "/compare?add=1")} className="chip chip--empty">
                  {pt(locale, "addToCompare")}
                </Link>
              ))}
            </div>
            <div className="compare-drawer__actions">
              {onComparePage ? (
                <button type="button" className="btn btn--primary" onClick={scrollToCompare}>
                  {pt(locale, "compareButton")} {selected.length > 0 ? `(${selected.length})` : ""}
                </button>
              ) : (
                <Link to={withLocale(locale, "/compare")} className="btn btn--primary">
                  {pt(locale, "compareButton")} {selected.length > 0 ? `(${selected.length})` : ""}
                </Link>
              )}
              <button className="btn btn--ghost" onClick={clearCompare}>
                {pt(locale, "clearButton")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Trophy() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.6">
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
      <path d="M9 14v3M15 14v3M8 20h8M10 17h4v3h-4z" strokeLinecap="round" />
    </svg>
  );
}
