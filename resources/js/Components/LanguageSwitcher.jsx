import React from "react";
import { router, usePage } from "@inertiajs/react";
import "../../css/ui-widgets.css";

function toLocalePath(path, locale) {
    if (/^\/(de|en|tr)(\/|$)/.test(path)) {
        return path.replace(/^\/(de|en|tr)(?=\/|$)/, `/${locale}`);
    }
    if (path === "/") return `/${locale}`;
    return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function LanguageSwitcher() {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const [pending, setPending] = React.useState(false);

    const changeLocale = (nextLocale) => {
        if (pending || nextLocale === locale) return;
        setPending(true);
        router.visit(toLocalePath(window.location.pathname, nextLocale), {
            preserveScroll: true,
            onFinish: () => setPending(false),
        });
    };

    return (
        <div className="ui-lang" aria-label="Language switcher">
            <button
                type="button"
                className={locale === "de" ? "is-active" : ""}
                onClick={() => changeLocale("de")}
                disabled={pending}
            >
                DE
            </button>
            <button
                type="button"
                className={locale === "en" ? "is-active" : ""}
                onClick={() => changeLocale("en")}
                disabled={pending}
            >
                EN
            </button>
            <button
                type="button"
                className={locale === "tr" ? "is-active" : ""}
                onClick={() => changeLocale("tr")}
                disabled={pending}
            >
                TR
            </button>
        </div>
    );
}
