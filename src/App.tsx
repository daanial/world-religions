import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { NarrationProvider } from "./context/NarrationContext";
import { useAmbientSound } from "./hooks/useAmbientSound";
import { splitLocaleFromPath, LocaleContext } from "./lib/locale";
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
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <div className="route-fallback__spinner" aria-hidden />
      <span className="route-fallback__label">Loading…</span>
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
  const { locale } = splitLocaleFromPath(location.pathname);
  
  return (
    <LocaleContext.Provider value={locale}>
      <NarrationProvider>
        <ScrollToTop />
        <NavBar />
        <Overlays />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/fa" element={<Landing />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/fa/timeline" element={<Timeline />} />
            <Route path="/globe" element={<GlobeView />} />
            <Route path="/fa/globe" element={<GlobeView />} />
            <Route path="/traditions" element={<Traditions />} />
            <Route path="/fa/traditions" element={<Traditions />} />
            <Route path="/religion/:id" element={<ReligionDetail />} />
            <Route path="/fa/religion/:id" element={<ReligionDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/fa/compare" element={<Compare />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/fa/concepts" element={<Concepts />} />
            <Route path="/pilgrimage" element={<Pilgrimage />} />
            <Route path="/fa/pilgrimage" element={<Pilgrimage />} />
            <Route path="/inward-paths" element={<InwardPaths />} />
            <Route path="/fa/inward-paths" element={<InwardPaths />} />
            <Route path="/about" element={<About />} />
            <Route path="/fa/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </NarrationProvider>
    </LocaleContext.Provider>
  );
}
