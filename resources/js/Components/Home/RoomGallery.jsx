"use client"; // <- Next.js ise şart, yoksa DOM ölçümleri yapılamaz

import React, { useMemo } from "react";
import "../../../css/rooms-gallery.css";
import DomeGallery from "../ReactBits/Components/DomeGallery";

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
    // DomeGallery images props
    const images = useMemo(
        () => photos.map((p) => ({ src: p.src, alt: p.title || "" })),
        [photos]
    );

    return (
        <section className="rg-wrap" aria-labelledby="rg-title">
            <header className="rg-top">
                <span className="rg-eyebrow">{eyebrow}</span>
                <h2 id="rg-title" className="rg-title">
                    {heading}
                </h2>
                <p className="rg-sub">{sub}</p>
            </header>

            {/* GÖRÜNÜRLÜK İÇİN GENİŞLİK + YÜKSEKLİK VERİYORUZ */}
            <div className="rg-dome-shell">
                <DomeGallery
                    images={images}
                    fit={0.5}
                    fitBasis="auto"
                    minRadius={560}
                    padFactor={0.22}
                    overlayBlurColor="#000010"
                    maxVerticalRotationDeg={6}
                    dragSensitivity={22}
                    dragDampening={2}
                    segments={35}
                    enlargeTransitionMS={300}
                    openedImageWidth="86vw"
                    openedImageHeight="86vh"
                    imageBorderRadius="14px"
                    openedImageBorderRadius="14px"
                    grayscale={false}
                />
            </div>
        </section>
    );
}
