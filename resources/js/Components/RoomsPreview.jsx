import React from "react";
import { Link } from "@inertiajs/react";

const DEFAULT = [
    {
        title: "Standardzimmer mit Waldblick",
        image: "/images/sample/room-std.jpg",
        href: "/zimmer/standard",
        badge: "Bestpreis",
    },
    {
        title: "Suite mit Balkon",
        image: "/images/sample/room-suite.jpg",
        href: "/zimmer/suite",
        badge: "Top Aussicht",
    },
    {
        title: "Familienapartment",
        image: "/images/sample/room-family.jpg",
        href: "/zimmer/familie",
        badge: "Viel Platz",
    },
];

export default function RoomsPreview({ rooms = DEFAULT }) {
    return (
        <section className="wp-rooms section" aria-labelledby="wp-rooms-title">
            <div className="container">
                <div className="wp-head">
                    <div>
                        <h2 id="wp-rooms-title" className="wp-title">
                            Unsere Zimmer & Suiten
                        </h2>
                        <p className="wp-sub">
                            Gemütliche Zimmer – perfekter Ausgangspunkt für
                            Naturerlebnisse.
                        </p>
                    </div>
                    <Link href="/zimmer" className="btn btn--ghost">
                        Alle Zimmer
                    </Link>
                </div>

                <div className="wp-rooms-grid">
                    {rooms.map((r, i) => (
                        <article key={i} className="wp-room">
                            <div style={{ position: "relative" }}>
                                {r.badge && (
                                    <span className="wp-chip">{r.badge}</span>
                                )}
                                <img
                                    src={r.image}
                                    alt={r.title}
                                    loading="lazy"
                                    width="640"
                                    height="400"
                                />
                            </div>
                            <div className="wp-room-body">
                                <h3>{r.title}</h3>
                                <Link
                                    href={r.href}
                                    className="btn btn--primary"
                                    aria-label={`${r.title} – Details`}
                                >
                                    Details ansehen
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
