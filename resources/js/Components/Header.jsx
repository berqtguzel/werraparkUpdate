import React from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";
import "../../css/header.css";

export default function Header({ currentRoute }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    // Null-safe: global her sayfada gelmeyebilir (ilk render / bazı page’ler)
    const global = props?.global ?? null;

    // Menu yapısı da her zaman dolu olmayabilir
    const headerMenu = global?.menu?.data?.[0] ?? null;

    // items yoksa boş array (map patlamasın)
    const items = Array.isArray(headerMenu?.items) ? headerMenu.items : [];

    // Eğer backend’den menü gelmezse, senin hardcoded nav fallback olsun istersen:
    const fallbackNav = [
        { name: "Home", url: "/", key: "home" },
        { name: "Über uns", url: "/uber-uns", key: "uberuns" },
        { name: "Historie", url: `/${locale}/historie`, key: "historie" },
        { name: "Gäste ABC", url: `/${locale}/gaeste-abc`, key: "gaeste-abc" },
        {
            name: "Urlaubsthemen",
            url: `/${locale}/urlaubsthemen`,
            key: "urlaubsthemen",
        },
        { name: "Galerie", url: `/${locale}/galerie`, key: "galerie" },
        { name: "Karriere", url: `/${locale}/karriere`, key: "karriere" },
        {
            name: "Bewertungen",
            url: `/${locale}/bewertungen`,
            key: "bewertungen",
        },
        {
            name: "Veranstaltung",
            url: `/${locale}/veranstaltung`,
            key: "veranstaltung",
        },
        {
            name: "Gutscheinshop",
            url: `/${locale}/gutscheinshop`,
            key: "gutscheinshop",
        },
    ];

    // Desktop menü için: global menü gelmişse onu, yoksa fallback
    const desktopNav = items.length ? items : fallbackNav;

    // Mobile menü için senin eski nav yapın: aynı fallback’i kullanalım
    const mobileNav = fallbackNav;

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    return (
        <header className="wh-header" role="banner">
            <div className="wh-topbar">
                <div className="wh-container wh-topbar__inner">
                    <div className="wh-topbar__left">
                        <a
                            href="mailto:info@werrapark.de"
                            className="wh-toplink"
                        >
                            <span className="wh-ico" aria-hidden="true">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M4 6h16v12H4z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M4 7l8 6 8-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                            info@werrapark.de
                        </a>

                        <a href="tel:+4936874205706" className="wh-toplink">
                            <span className="wh-ico" aria-hidden="true">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11 11 0 003.5.56 1 1 0 011 1v3.2a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.2a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.25 1z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                            036874&nbsp;205706
                        </a>

                        <a
                            href="tel:+4915123408937"
                            className="wh-toplink hide-sm"
                        >
                            <span className="wh-ico" aria-hidden="true">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11 11 0 003.5.56 1 1 0 011 1v3.2a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.2a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.25 1z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                            0151&nbsp;23408937
                        </a>
                    </div>

                    <div className="wh-topbar__right">
                        <a href="/kontakt" className="wh-btn wh-btn--ghost">
                            Kontakt
                        </a>
                        <a href="/impressum" className="wh-btn wh-btn--ghost">
                            Impressum
                        </a>

                        <div className="wh-socials">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="wh-social"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="wh-social"
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect
                                        x="4"
                                        y="4"
                                        width="16"
                                        height="16"
                                        rx="4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3.5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <circle
                                        cx="17.5"
                                        cy="6.5"
                                        r="1"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Desktop theme toggle istiyorsan aç */}
                        <div className="wh-theme-toggle">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            <div className="wh-navwrap">
                <div className="wh-container wh-nav__inner">
                    <Link href="/" className="wh-brand" aria-label="Startseite">
                        <img
                            src="/images/Logo/werrapark-logo-white.png"
                            alt="Werrapark Resort"
                            className="wh-brand__logo wh-brand__logo--light"
                        />
                        <img
                            src="/images/Logo/werrapark-logo.png"
                            alt=""
                            className="wh-brand__logo wh-brand__logo--dark"
                        />
                    </Link>

                    <nav
                        className="wh-nav-desktop"
                        aria-label="Hauptnavigation"
                    >
                        {desktopNav.map((n, idx) => {
                            const key = n?.key ?? n?.slug ?? idx;
                            const url = n?.url ?? n?.href ?? "#";
                            const name = n?.name ?? n?.label ?? "Link";

                            return (
                                <Link
                                    key={key}
                                    href={url}
                                    className={`wh-link ${currentRoute === (n?.key ?? "") ? "is-active" : ""}`}
                                >
                                    {name}
                                </Link>
                            );
                        })}

                        <div className="wh-nav-ctas">
                            <Link
                                href="/group-booking"
                                className="wh-btn wh-btn--light"
                            >
                                Gruppenbuchung
                            </Link>
                            <Link
                                href="/offers"
                                className="wh-btn wh-btn--primary"
                            >
                                Bestpreis buchen
                            </Link>
                        </div>
                    </nav>

                    {/* Hamburger */}
                    <button
                        className="wh-hamburger"
                        aria-label="Menü öffnen"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                        type="button"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            {/* MOBILE DRAWER */}
            <div
                className={`wh-drawer ${open ? "is-open" : ""}`}
                aria-hidden={!open}
            >
                <button
                    className="wh-drawer__backdrop"
                    onClick={() => setOpen(false)}
                    aria-label="Menü kapat"
                    type="button"
                />
                <aside
                    className="wh-drawer__panel"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="wh-drawer__head">
                        <Link
                            href="/"
                            className="wh-brand wh-brand--sm"
                            onClick={() => setOpen(false)}
                        >
                            <img
                                src="/images/logo.svg"
                                alt="Werrapark Resort"
                                className="wh-brand__logo"
                            />
                        </Link>

                        <div className="wh-drawer__actions">
                            <ThemeToggle />
                            <button
                                className="wh-close"
                                onClick={() => setOpen(false)}
                                aria-label="Menü kapat"
                                type="button"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="wh-drawer__body">
                        {mobileNav.map((n, idx) => {
                            const key = n?.key ?? idx;
                            const href = n?.href ?? n?.url ?? "#";
                            const label = n?.label ?? n?.name ?? "Link";

                            return (
                                <Link
                                    key={`m-${key}`}
                                    href={href}
                                    className={`wh-m-link ${currentRoute === (n?.key ?? "") ? "is-active" : ""}`}
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            );
                        })}

                        <div className="wh-m-ctas">
                            <Link
                                href="/group-booking"
                                className="wh-btn wh-btn--light wh-btn--block"
                                onClick={() => setOpen(false)}
                            >
                                Gruppenbuchung
                            </Link>
                            <Link
                                href="/offers"
                                className="wh-btn wh-btn--primary wh-btn--block"
                                onClick={() => setOpen(false)}
                            >
                                Bestpreis buchen
                            </Link>
                        </div>

                        <div className="wh-m-contact">
                            <a
                                href="mailto:info@werrapark.de"
                                className="wh-toplink"
                            >
                                info@werrapark.de
                            </a>
                            <a href="tel:+4936874205706" className="wh-toplink">
                                036874&nbsp;205706
                            </a>
                            <a href="tel:+4915123408937" className="wh-toplink">
                                0151&nbsp;23408937
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </header>
    );
}
