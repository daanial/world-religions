import { Link, useLocation } from "react-router-dom";
import Starfield from "../components/Starfield";
import { usePageSeo } from "../lib/seo";

export default function NotFound() {
  const { pathname } = useLocation();

  usePageSeo({
    title: "Page not found",
    description: "The page you requested could not be found on World Religions Explorer.",
    path: pathname,
    noindex: true,
  });

  return (
    <div className="page">
      <Starfield density="calm" drift={false} />
      <div className="container notfound">
        <div className="notfound__code gradient-text">404</div>
        <h1 className="notfound__title">Lost in the cosmos</h1>
        <p className="notfound__lead">
          This path leads nowhere — perhaps it was never drawn on the map.
        </p>
        <Link to="/" className="btn btn--primary">
          Return home
        </Link>
      </div>
    </div>
  );
}
