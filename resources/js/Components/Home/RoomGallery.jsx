"use client";
import React, { useMemo } from "react";
import "../../../css/rooms-gallery.css";

import InfiniteMenu from "../ReactBits/Components/InfiniteMenu";
const SAMPLE = [
    { src: "/images/rooms/room.png", title: "Standard Doppelzimmer" },
    { src: "/images/rooms/room.png", title: "Einzelzimmer – hell & ruhig" },
    { src: "/images/rooms/room.png", title: "Komfort Doppelzimmer" },
    { src: "/images/rooms/room.png", title: "Sitzecke & Schreibtisch" },
    { src: "/images/rooms/room.png", title: "Familienzimmer 2+2" },
    { src: "/images/rooms/room.png", title: "Hotelhaus – Außenansicht" },
    { src: "/images/rooms/room.png", title: "Studio – Wohnbereich" },
    { src: "/images/rooms/room.png", title: "Zimmer mit Balkon" },
    { src: "/images/rooms/room.png", title: "Suite – Holzverkleidung" },
];

export default function RoomsGallery({
    photos = SAMPLE,
    eyebrow = "Galerie",
    heading = "Zimmer & Impressionen",
    sub = "Einblicke in unsere freundlich gestalteten Zimmer, Studios und Suiten.",
}) {
    // Masonry items -> { id, img, url, height, title }
    const items = useMemo(() => {
        const heights = [240, 280, 320, 360, 300, 340];
        return photos.map((p, i) => ({
            id: `room-${i}`,
            img: p.src,
            url: p.src,
            title: p.title || "",
            height: heights[i % heights.length],
        }));
    }, [photos]);

    return (
        <section className="rg-wrap" aria-labelledby="rg-title">
            <header className="rg-top">
                <span className="rg-eyebrow">{eyebrow}</span>
                <h2 id="rg-title" className="rg-title">
                    {heading}
                </h2>
                <p className="rg-sub">{sub}</p>
            </header>

            {/* Arka plan kabuğu */}
            <div className="rg-dome-shell rg-masonry-shell">
                <div className="rg-masonry-stage">
                    <InfiniteMenu items={SAMPLE} />
                </div>
            </div>
        </section>
    );
}
