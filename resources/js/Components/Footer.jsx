import React from "react";
import { usePage } from "@inertiajs/react";
import "../../css/Footer.css";

export default function Footer() {
    const { props } = usePage();
    const global = props.global;
    const footerMenu = global.menu.data[1];
    const year = new Date().getFullYear();

    return (
        <footer className="wh-foot" role="contentinfo">
            <div className="wh-foot-cta">
                <div className="wh-container wh-foot-cta__inner">
                    <h3>Urlaub im Grünen – direkt zum Bestpreis buchen</h3>
                    <a href="/offers" className="wh-btn wh-btn--invert">
                        Jetzt buchen
                    </a>
                </div>
            </div>

            <div className="wh-foot-main">
                <div className="wh-container wh-foot-grid">
                    <div className="wh-foot-col">
                        <a
                            href="/"
                            className="wh-foot-brand"
                            aria-label="Startseite"
                        >
                            <img
                                src="/images/Logo/logo.png"
                                alt="Werrapark Resort"
                                className="wh-foot-logo"
                            />
                        </a>
                        <p className="wh-foot-text">
                            Natur, Ruhe und Genuss im Thüringer Wald. Der
                            Werrapark vereint komfortable Zimmer, regionale
                            Kulinarik und vielfältige Aktivitäten – zu jeder
                            Jahreszeit.
                        </p>

                        <div
                            className="wh-foot-socials"
                            aria-label="Social Media"
                        >
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="wh-foot-social"
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
                                className="wh-foot-social"
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
                    </div>

                    <nav className="wh-foot-col" aria-label="Schnellzugriff">
                        {footerMenu && (
                            <>
                                <h4 className="wh-foot-title">
                                    {footerMenu.name}
                                </h4>
                                <ul className="wh-foot-list">
                                    {footerMenu.items.map((item) => (
                                        <li key={item.id}>
                                            <a href={item.url}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </nav>

                    <nav className="wh-foot-col" aria-label="Rechtliches">
                        <h4 className="wh-foot-title">
                            Service &amp; Rechtliches
                        </h4>
                        <ul className="wh-foot-list">
                            <li>
                                <a href="/faq">Häufige Fragen</a>
                            </li>
                            <li>
                                <a href="/gutscheine">Gutscheine</a>
                            </li>
                            <li>
                                <a href="/agb">AGB</a>
                            </li>
                            <li>
                                <a href="/privacy">Datenschutz</a>
                            </li>
                            <li>
                                <a href="/impressum">Impressum</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="wh-foot-col">
                        <h4 className="wh-foot-title">Kontakt</h4>
                        <address className="wh-foot-text not-italic">
                            R.-Breitscheid-Straße 41–45
                            <br />
                            98574 Masserberg / Heubach
                            <br />
                            Deutschland
                        </address>
                        <p className="wh-foot-text">
                            Tel{" "}
                            <a href="tel:+4936870800">+49 (0) 36870 / 800</a>
                            <br />
                            <a href="mailto:info@werrapark.de">
                                info@werrapark.de
                            </a>
                        </p>

                        <form
                            className="wh-foot-news"
                            onSubmit={(e) => e.preventDefault()}
                            aria-label="Newsletter"
                        >
                            <label htmlFor="news-email" className="sr-only">
                                E-Mail
                            </label>
                            <input
                                id="news-email"
                                type="email"
                                placeholder="Ihre E-Mail-Adresse"
                                className="wh-input"
                                required
                            />
                            <button
                                className="wh-btn wh-btn--primary"
                                type="submit"
                            >
                                Newsletter
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Alt: telif / mini-nav */}
            <div className="wh-foot-bottom">
                <div className="wh-container wh-foot-bottom__inner">
                    <p className="wh-foot-copy">
                        © {year} Werrapark Hotel. Alle Rechte vorbehalten.
                    </p>
                    <ul className="wh-foot-mini">
                        <li>
                            <a href="/privacy">Datenschutz</a>
                        </li>
                        <li>
                            <a href="/agb">AGB</a>
                        </li>
                        <li>
                            <a href="/impressum">Impressum</a>
                        </li>
                        <li>
                            <a href="/kontakt">Kontakt</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
