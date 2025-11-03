import React from "react";
import { Link } from "@inertiajs/react";

/**
 * Kısa oda/daire vitrin şeritleri.
 * props.rooms ile 3 öğe bekler; daha fazla da verebilirsin.
 */
const defaults = [
    {
        title: "Standardzimmer mit Waldblick",
        image: "/images/sample/room-std.jpg",
        href: "/zimmer/standard",
    },
    {
        title: "Suite mit Balkon",
        image: "/images/sample/room-suite.jpg",
        href: "/zimmer/suite",
    },
    {
        title: "Familienapartment",
        image: "/images/sample/room-family.jpg",
        href: "/zimmer/familie",
    },
];

export default function RoomsPreview({ rooms = defaults }) {
    return (
        <section
            className="rooms-preview section"
            aria-labelledby="rooms-title"
        >
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "space-between",
                        gap: 16,
                    }}
                >
                    <div>
                        <h2 id="rooms-title" style={{ marginBottom: 6 }}>
                            Unsere Zimmer & Suiten
                        </h2>
                        <p style={{ margin: 0, color: "var(--ink-600)" }}>
                            Gemütliche Zimmer – perfekter Ausgangspunkt für
                            Naturerlebnisse.
                        </p>
                    </div>
                    <Link
                        href="/zimmer"
                        className="btn btn--ghost"
                        aria-label="Alle Zimmer ansehen"
                    >
                        Alle Zimmer
                    </Link>
                </div>

                <div className="grid grid-3" style={{ marginTop: 18 }}>
                    {rooms.map((r, i) => (
                        <article key={i} className="room-card">
                            <img
                                src={r.image}
                                alt={r.title}
                                width={640}
                                height={420}
                                loading="lazy"
                            />
                            <div className="room-body">
                                <h3>{r.title}</h3>
                                <Link
                                    href={r.href}
                                    className="btn btn--primary"
                                    aria-label={`${r.title} – Details`}
                                >
                                    Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
