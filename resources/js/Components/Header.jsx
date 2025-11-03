import React from "react";
import { Link } from "@inertiajs/react";
import "../../css/Header.css";

export default function Header({ currentRoute }) {
    const nav = [
        { label: "Startseite", href: "/", key: "home" },
        { label: "Zimmer & Suiten", href: "/rooms", key: "rooms" },
        { label: "Restaurant & Kulinarik", href: "/dining", key: "dining" },
        { label: "Aktivitäten", href: "/activities", key: "activities" },
        { label: "Spa", href: "/spa", key: "spa" },
        { label: "Tagungen & Events", href: "/events", key: "events" },
        { label: "Kontakt", href: "/contact", key: "contact" },
    ];

    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link href="/" className="brand">
                    <img
                        src="/images/logo.svg"
                        alt="Werrapark Logo"
                        className="brand__logo"
                    />
                </Link>
                <nav className="nav-desktop">
                    {nav.map((n) => (
                        <Link
                            key={n.key}
                            href={n.href}
                            className={`nav-link ${
                                currentRoute === n.key ? "is-active" : ""
                            }`}
                        >
                            {n.label}
                        </Link>
                    ))}
                    <Link href="/offers" className="btn btn--primary ml-3">
                        Jetzt Buchen
                    </Link>
                </nav>
            </div>
        </header>
    );
}
