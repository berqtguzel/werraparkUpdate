import React from "react";
import { Link } from "@inertiajs/react";

export default function ContactTeaser() {
    return (
        <section
            className="wp-contact section"
            aria-labelledby="wp-contact-title"
        >
            <div className="container">
                <div className="wp-contact-grid">
                    {/* Sol: metin kartı */}
                    <div className="wp-contact-card">
                        <h2 id="wp-contact-title">Kontaktieren Sie uns</h2>
                        <p>
                            Fragen zu Zimmern, Wellness oder Aktivitäten? Wir
                            beraten Sie gern und erstellen auf Wunsch ein
                            unverbindliches Angebot.
                        </p>

                        <ul>
                            <li>
                                <strong>Adresse:</strong> Werrapark • Thüringer
                                Wald (Beispiel)
                            </li>
                            <li>
                                <strong>Telefon:</strong>{" "}
                                <a href="tel:+490000000">+49 000 0000</a>
                            </li>
                            <li>
                                <strong>E-Mail:</strong>{" "}
                                <a href="mailto:info@werrapark.de">
                                    info@werrapark.de
                                </a>
                            </li>
                        </ul>

                        <div
                            style={{
                                display: "flex",
                                gap: 10,
                                flexWrap: "wrap",
                            }}
                        >
                            <Link href="/kontakt" className="btn btn--primary">
                                Kontakt / Angebot
                            </Link>
                            <Link href="/anreise" className="btn btn--ghost">
                                Anreise & Lage
                            </Link>
                        </div>
                    </div>

                    {/* Sağ: harita */}
                    <div className="wp-map" aria-label="Lagekarte">
                        <iframe
                            title="Werrapark – Lagekarte"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9918.366!2d10.7!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTh%C3%BCringer%20Wald!5e0!3m2!1sde!2sde!4v1700000000001"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
