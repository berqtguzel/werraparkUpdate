import React from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";
import "../../css/header.css";

export default function Header({ currentRoute }) {
    const { props } = usePage();
    const global = props.global;
    const { page, locale } = usePage().props;

    const headerMenu = global.menu.data[0];

    const nav = [
        { label: "Home", href: "/", key: "home" },
        { label: "Über uns", href: "/uber-uns", key: "uberuns" },
        { label: "Historie", href: "/historie", key: "historie" },
        { label: "Gäste ABC", href: "/gaeste-abc", key: "gaeste-abc" },
        {
            label: "Urlaubsthemen",
            href: "/urlaubsthemen",
            key: "urlaubsthemen",
        },
        { label: "Galerie", href: "/galerie", key: "galerie" },
        { label: "Karriere", href: "/karriere", key: "karriere" },
        { label: "Bewertungen", href: "/bewertungen", key: "bewertungen" },
        {
            label: "Veranstaltung",
            href: "/veranstaltung",
            key: "veranstaltung",
        },
        {
            label: "Gutscheinshop",
            href: "/gutscheinshop",
            key: "gutscheinshop",
        },
    ];

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    console.log(props);
    return (
        <header className="wh-header" role="banner">
            <div className="wh-topbar">
                <div className="wh-container wh-topbar__inner">
                    <div className="wh-topbar__left">
                        <a
                            href="mailto:info@werrapark.de"
                            className="wh-toplink"
                        >
                            <span className="wh-ico" aria-hidden>
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
                            <span className="wh-ico" aria-hidden>
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
                            <span className="wh-ico" aria-hidden>
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
                            src="/images/logo.svg"
                            alt="Werrapark Resort"
                            className="wh-brand__logo wh-brand__logo--light"
                        />
                        <img
                            src="/images/logo.svg"
                            alt=""
                            className="wh-brand__logo wh-brand__logo--dark"
                        />
                    </Link>

                    <nav
                        className="wh-nav-desktop"
                        aria-label="Hauptnavigation"
                    >
                        {headerMenu.items.map((n) => (
                            <Link
                                key={n.key}
                                href={n.url}
                                className={`wh-link ${
                                    currentRoute === n.key ? "is-active" : ""
                                }`}
                            >
                                {n.name}
                            </Link>
                        ))}
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
                />
                <aside className="wh-drawer__panel" role="dialog" aria-modal>
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
                            {/* Tema düğmesi (mobil panel üst sağ) */}
                            <ThemeToggle />
                            <button
                                className="wh-close"
                                onClick={() => setOpen(false)}
                                aria-label="Menü kapat"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="wh-drawer__body">
                        {nav.map((n) => (
                            <Link
                                key={`m-${n.key}`}
                                href={n.href}
                                className={`wh-m-link ${
                                    currentRoute === n.key ? "is-active" : ""
                                }`}
                                onClick={() => setOpen(false)}
                            >
                                {n.label}
                            </Link>
                        ))}

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
