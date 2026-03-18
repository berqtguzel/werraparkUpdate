import React from "react";
import { usePage } from "@inertiajs/react";
import "../../css/ui-widgets.css";
import { useTranslation } from "@/i18n";

const COOKIE_KEY = "wp_cookie_preferences_v1";
const DEFAULT_PHONE = "4936874205706";

export default function WhatsAppWidget() {
    const { props } = usePage();
    const waData = props?.global?.widgets?.whatsapp ?? {};
    const enabled = waData.enabled !== false;
    const phone = (waData.phone ?? waData.number ?? DEFAULT_PHONE).replace(/\D/g, "") || DEFAULT_PHONE;
    const defaultMessage = waData.message ?? waData.default_message ?? null;

    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const readConsent = () => {
        try {
            const raw = localStorage.getItem(COOKIE_KEY);
            if (!raw) return true;
            return JSON.parse(raw).marketing !== false;
        } catch {
            return true;
        }
    };

    const [visible, setVisible] = React.useState(readConsent);

    React.useEffect(() => {
        const sync = () => setVisible(readConsent());
        window.addEventListener("cookie-consent-updated", sync);
        return () => window.removeEventListener("cookie-consent-updated", sync);
    }, []);

    if (!visible || !enabled) return null;

    const message = defaultMessage ?? t("whatsapp.defaultMessage");
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <aside className="ui-wa" aria-label="WhatsApp">
            {open && (
                <div className="ui-wa-panel">
                    <div className="ui-wa-head">{t("whatsapp.heading")}</div>
                    <div className="ui-wa-body">
                        <p>{t("whatsapp.text")}</p>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ui-wa-link"
                        >
                            {t("whatsapp.startChat")}
                        </a>
                    </div>
                </div>
            )}
            <button
                type="button"
                className="ui-wa-btn"
                onClick={() => setOpen((v) => !v)}
                aria-label="WhatsApp"
            >
                WA
            </button>
        </aside>
    );
}
