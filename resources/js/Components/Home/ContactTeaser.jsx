import React from "react";
import { Link } from "@inertiajs/react";

/**
 * İletişim/rezervasyon çağrısı + mini iletişim bilgileri + harita önizleme.
 * Alt bölümde büyük iletişim sayfasına yönlendiren buton bulunur.
 */
export default function ContactTeaser() {
    return (
        <section
            className="contact-teaser section"
            aria-labelledby="contact-teaser-title"
        >
            <div className="container">
                <div className="contact-grid">
                    {/* Sol blok: metin + CTA */}
                    <div>
                        <h2 id="contact-teaser-title">Kontaktieren Sie uns</h2>
                        <p style={{ color: "var(--ink-600)" }}>
                            Fragen zu Zimmern, Wellness oder Aktivitäten? Wir
                            beraten Sie gern und erstellen auf Wunsch ein
                            unverbindliches Angebot.
                        </p>

                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: "14px 0 18px",
                                color: "var(--ink-700)",
                            }}
                        >
                            <li>
                                <strong>Adresse:</strong> Suhl / Thüringer Wald
                                (Beispiel)
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
                            <Link
                                href="/kontakt"
                                className="btn btn--primary"
                                aria-label="Kontaktformular öffnen"
                            >
                                Kontakt / Angebot
                            </Link>
                            <Link
                                href="/anreise"
                                className="btn btn--ghost"
                                aria-label="Anreise & Lage"
                            >
                                Anreise & Lage
                            </Link>
                        </div>
                    </div>

                    {/* Sağ blok: gömülü harita */}
                    <div className="map-frame">
                        <iframe
                            title="Werrapark – Lagekarte"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9918.366!2d10.7!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTh%C3%BCringer%20Wald!5e0!3m2!1sde!2sde!4v1700000000001"
                            width="100%"
                            height="360"
                            style={{ border: 0, display: "block" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
