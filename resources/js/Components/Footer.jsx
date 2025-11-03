import React from "react";
import "../../css/Footer.css";
export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div>
                    <img
                        src="/images/logo-white.svg"
                        alt="Werrapark"
                        className="footer-logo"
                    />
                    <p>
                        © {new Date().getFullYear()} Werrapark Hotel. Alle
                        Rechte vorbehalten.
                    </p>
                </div>
                <nav>
                    <h4>Informationen</h4>
                    <ul>
                        <li>
                            <a href="/about">Über uns</a>
                        </li>
                        <li>
                            <a href="/privacy">Datenschutz</a>
                        </li>
                        <li>
                            <a href="/impressum">Impressum</a>
                        </li>
                    </ul>
                </nav>
                <div>
                    <h4>Kontakt</h4>
                    <p>
                        R.-Breitscheid-Straße 41–45
                        <br />
                        98574 Masserberg / Heubach
                    </p>
                    <p>
                        Tel +49 36870 / 800
                        <br />
                        info@werrapark.de
                    </p>
                </div>
            </div>
        </footer>
    );
}
