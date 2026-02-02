"use client";

import React from "react";
import { FiCheck, FiMapPin, FiHome, FiChevronRight } from "react-icons/fi";
import "../../../css/rooms-showcase.css";

// DotGrid'i lazy yükleyelim (ReactBits > Backgrounds > DotGrid)
const DotGrid = React.lazy(() =>
    import("../ReactBits/Backgrounds/DotGrid").then((m) => ({
        default: m.default || m,
    }))
);

const DATA = {
    title: "Unsere besten Zimmer",
    intro: "Wir bieten Ihnen in unserem exklusiven Hotel eine unvergessliche Erfahrung – vereint mit Komfort und Design. Entspannen Sie in modern gestalteten Zimmern und großzügigen Ferienhäusern.",
    hotels: [
        {
            id: "heubach",
            name: "Hotel Heubacher Höhe",
            location: "Masserberg • OT Heubach",
            image: "/images/template2.png",
            cta: { label: "Hotel Erkunden", href: "/heubach" },
            items: [
                "13 Einzelzimmer 16 qm",
                "13 Standard Doppelzimmer 16–20 qm",
                "32 Comfort Doppelzimmer 18–20qm 2+1 (Couch teilweise)",
                "20 Zwei­raum-Studios 28–30 qm",
                "15 Familienzimmer 40 qm (2 Schlafzimmer, 2 Betten, 1 Zustellbett möglich)",
            ],
        },
        {
            id: "frankenblick",
            name: "Hotel Frankenblick",
            location: "Masserberg • OT Schnett",
            image: "/images/template2.png",
            cta: { label: "Hotel Erkunden", href: "/frankenblick" },
            items: [
                "12 Einzelzimmer 16 qm",
                "44 Doppelzimmer 18–20 qm",
                "20 Zweiraum-Studios 28–30 qm (Schlafzimmer + Wohnbereich)",
            ],
        },
        {
            id: "sommerberg",
            name: "Hotel Sommerberg",
            location: "Masserberg • OT Fehrenbach",
            image: "/images/template2.png",
            cta: { label: "Hotel Erkunden", href: "/sommerberg" },
            items: [
                "2 Einzelzimmer 15 qm",
                "60 Doppelzimmer 15–20 qm",
                "9 Familienzimmer 26 qm (2 Schlafzimmer mit je 2 Betten, 1 Zustellbett möglich)",
                "11 Studios 30 qm (Doppelbett + Couch)",
            ],
        },
    ],
    homes: {
        title: "Ferienhäuser",
        image: "/images/template2.png",
        cta: { label: "Alle Ferienhäuser", href: "/ferienhaeuser" },
        items: [
            "24 Einheiten gesamt",
            "Typ A – 2 Schlafzimmer + Küche / Wohnraum (ca. 62 qm)",
            "Typ C – 2 Schlafzimmer (1 DB + 1 EB), groß (96 qm) – zwei SZ + 1 Kinderzimmer",
            "Typ B – 3 Schlafzimmer (davon 2 mit Doppelbett + 1 Etagenbett) – 74 qm",
            "Typ A – Kamin (62 qm) – zwei Schlafzimmer mit Doppelbett",
            "Alle Häuser: großer Wohn-/Essbereich, Sat-TV, Telefon, Schlafcouch, komplett ausgestattete Küchen, Bad/WC, Terrasse, Gartenmöbel (Sommer).",
        ],
    },
};

const Title = ({ children }) => <h2 className="rs-title">{children}</h2>;
const Eyebrow = ({ children }) => <div className="rs-eyebrow">{children}</div>;

const HotelCard = ({ hotel }) => (
    <article className="rs-card" aria-labelledby={`h-${hotel.id}`}>
        {hotel.image && (
            <>
                <img
                    className="rs-card__media"
                    src={hotel.image}
                    alt=""
                    aria-hidden="true"
                />
                <span className="rs-card__shade" aria-hidden="true" />
            </>
        )}

        <div className="rs-card__head">
            <div className="rs-card__meta">
                <FiMapPin className="rs-icon" aria-hidden />
                <span>{hotel.location}</span>
            </div>
            <h3 id={`h-${hotel.id}`} className="rs-card__title">
                {hotel.name}
            </h3>
        </div>

        <ul className="rs-list">
            {hotel.items.map((t, i) => (
                <li key={i}>
                    <FiCheck className="rs-icon" aria-hidden />
                    <span>{t}</span>
                </li>
            ))}
        </ul>

        <a className="rs-cta" href={hotel.cta.href}>
            {hotel.cta.label}
            <FiChevronRight />
        </a>
    </article>
);

const HomesCard = ({ homes }) => (
    <article className="rs-card rs-card--wide" aria-labelledby="homes-title">
        {homes.image && (
            <>
                <img
                    className="rs-card__media"
                    src={homes.image}
                    alt=""
                    aria-hidden="true"
                />
                <span className="rs-card__shade" aria-hidden="true" />
            </>
        )}
        <div className="rs-card__head">
            <div className="rs-card__meta">
                <FiHome className="rs-icon" aria-hidden />
                <span>Werrapark Resort</span>
            </div>
            <h3 id="homes-title" className="rs-card__title">
                {homes.title}
            </h3>
        </div>

        <ul className="rs-list">
            {homes.items.map((t, i) => (
                <li key={i}>
                    <FiCheck className="rs-icon" aria-hidden />
                    <span>{t}</span>
                </li>
            ))}
        </ul>

        <a className="rs-cta" href={homes.cta.href}>
            {homes.cta.label}
            <FiChevronRight />
        </a>
    </article>
);

export default function RoomsShowcase({
    data = DATA,
    eyebrow = "Unterkünfte",
}) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    return (
        <section className="rs-wrap rs-with-bg" aria-labelledby="rooms-title">
            {mounted && (
                <React.Suspense fallback={null}>
                    <div
                        className="rs-dotgrid"
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            zIndex: 0,
                            pointerEvents: "none",
                            overflow: "hidden",
                        }}
                    >
                        <DotGrid
                            dotSize={14}
                            gap={36}
                            baseColor="#1f7008"
                            activeColor="#0E9B5B"
                            proximity={160}
                            speedTrigger={110}
                            shockRadius={260}
                            shockStrength={5}
                            maxSpeed={5200}
                            resistance={820}
                            returnDuration={1.3}
                        />
                    </div>
                </React.Suspense>
            )}

            {/* ==== İçerik ==== */}
            <div className="rs-top">
                <Eyebrow>{eyebrow}</Eyebrow>
                <Title id="rooms-title">{data.title}</Title>
                <p className="rs-intro">{data.intro}</p>
            </div>

            <div className="rs-grid">
                {data.hotels.map((h) => (
                    <HotelCard key={h.id} hotel={h} />
                ))}
            </div>

            <HomesCard homes={data.homes} />
        </section>
    );
}
