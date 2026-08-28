import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { NarrationProvider } from "./context/NarrationContext";
import { useAmbientSound } from "./hooks/useAmbientSound";
import { splitLocaleFromPath, LocaleContext } from "./lib/locale";
import { useT, t } from "./lib/i18n";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Overlays from "./components/Overlays";
import Landing from "./pages/Landing";
import ReligionDetail from "./pages/ReligionDetail";
import Compare from "./pages/Compare";
import Concepts from "./pages/Concepts";
import Pilgrimage from "./pages/Pilgrimage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Traditions from "./pages/Traditions";

const Timeline = lazy(() => import("./pages/Timeline"));
const InwardPaths = lazy(() => import("./pages/InwardPaths"));
const GlobeView = lazy(() => import("./pages/GlobeView"));

import "./styles/tokens.css";
import "./styles/components.css";
import "./styles/landing.css";
import "./styles/timeline.css";
import "./styles/globe.css";
import "./styles/detail.css";
import "./styles/compare.css";
import "./styles/concepts.css";
import "./styles/pilgrimage.css";
import "./styles/about.css";
import "./styles/inward-paths.css";
import "./styles/traditions.css";
import "./styles/rtl.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AmbientBootstrap() {
  useAmbientSound();
  return null;
}

function RouteFallback() {
  const t = useT();
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <div className="route-fallback__spinner" aria-hidden />
      <span className="route-fallback__label">{t("loading")}</span>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AmbientBootstrap />
      <BrowserRouter>
        <LocalizedApp />
      </BrowserRouter>
    </AppProvider>
  );
}

function LocalizedApp() {
  const location = useLocation();
  const { locale, path } = splitLocaleFromPath(location.pathname);

  // Sync <html lang>/dir to the active locale. Persian is RTL; this also
  // means Puppeteer-prerendered snapshots (scripts/prerender.ts) capture
  // the correct attributes, since page.content() runs after this effect.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  // React Router matches routes literally, so a request for "/fa/timeline"
  // would otherwise fall through to the catch-all NotFound route below.
  // We strip the locale prefix and hand Routes a rewritten location so the
  // same route tree serves every locale; withLocale()/NavLink still read
  // the *real* location.pathname for building links and active-state.
  const routedLocation = { ...location, pathname: path };

  return (
    <LocaleContext.Provider value={locale}>
      <NarrationProvider>
        <a href="#main-content" className="skip-link">
          {t(locale, "skipToContent")}
        </a>
        <ScrollToTop />
        <NavBar />
        <Overlays />
        <main id="main-content">
          <Suspense fallback={<RouteFallback />}>
          <Routes location={routedLocation}>
            <Route path="/" element={<Landing />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/globe" element={<GlobeView />} />
            <Route path="/traditions" element={<Traditions />} />
            <Route path="/religion/:id" element={<ReligionDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/pilgrimage" element={<Pilgrimage />} />
            <Route path="/inward-paths" element={<InwardPaths />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </NarrationProvider>
    </LocaleContext.Provider>
  );
}
