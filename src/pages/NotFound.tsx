import { Link, useLocation } from "react-router-dom";
import Starfield from "../components/Starfield";
import { usePageSeo } from "../lib/seo";
import { useLocale, withLocale } from "../lib/locale";
import { useT } from "../lib/i18n";

export default function NotFound() {
  const { pathname } = useLocation();
  const locale = useLocale();
  const t = useT();

  usePageSeo({
    title: t("notFoundSeoTitle"),
    description: t("notFoundSeoDescription"),
    path: pathname,
    noindex: true,
  });

  return (
    <div className="page">
      <Starfield density="calm" drift={false} />
      <div className="container notfound">
        <div className="notfound__code gradient-text">404</div>
        <h1 className="notfound__title">{t("notFoundTitle")}</h1>
        <p className="notfound__lead">{t("notFoundLead")}</p>
        <Link to={withLocale(locale, "/")} className="btn btn--primary">
          {t("notFoundCta")}
        </Link>
      </div>
    </div>
  );
}
