import { Link } from "react-router-dom";
import Starfield from "../components/Starfield";

export default function NotFound() {
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
