import React from "react";
import "../../css/ui-widgets.css";
import { useTranslation } from "@/i18n";

const COOKIE_KEY = "wp_cookie_preferences_v1";

export default function CookieConsent() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    React.useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);
        if (!saved) setOpen(true);
    }, []);

    const accept = (marketing) => {
        const payload = {
            essential: true,
            analytics: marketing,
            marketing,
            updatedAt: Date.now(),
        };
        localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));
        window.dispatchEvent(
            new CustomEvent("cookie-consent-updated", { detail: payload }),
        );
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="ui-cookie-wrap" aria-label="Cookie banner">
            <div className="ui-cookie">
                <h4>{t("cookie.title")}</h4>
                <p>{t("cookie.text")}</p>
                <div className="ui-cookie-actions">
                    <button
                        type="button"
                        className="primary"
                        onClick={() => accept(true)}
                    >
                        {t("cookie.acceptAll")}
                    </button>
                    <button
                        type="button"
                        className="ghost"
                        onClick={() => accept(false)}
                    >
                        {t("cookie.essentialOnly")}
                    </button>
                </div>
            </div>
        </div>
    );
}
