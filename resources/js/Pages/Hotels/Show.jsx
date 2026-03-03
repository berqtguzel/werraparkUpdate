import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import "@/../css/hotel-detail.css";

const HOTELS = {
    heubach: {
        id: "heubach",
        name: "Hotel Heubacher Höhe",
        location: "Masserberg • OT Heubach",
        image: "/images/template2.png",
        intro: "Auf dem Höhenzug des Thüringer Waldes gelegen, verbindet das Hotel Heubacher Höhe weite Ausblicke mit gemütlicher Wohlfühlatmosphäre.",
        features: [
            "Moderne Zimmerkategorien von Einzel- bis Familienzimmer",
            "Kurze Wege zu Wanderwegen und Winteraktivitäten",
            "Gemütliche Gastronomie mit regionaler Küche",
            "Ideal für Paare, Familien und kleinere Gruppen",
        ],
    },
    frankenblick: {
        id: "frankenblick",
        name: "Hotel Frankenblick",
        location: "Masserberg • OT Schnett",
        image: "/images/template1.webp",
        intro: "Der Name ist Programm: Im Hotel Frankenblick genießen Sie beeindruckende Fernsicht und komfortable Zimmer in ruhiger Lage.",
        features: [
            "Zimmer mit Panorama-Blick auf den Thüringer Wald",
            "Ruhige Lage – perfekt zum Abschalten",
            "Guter Ausgangspunkt für Ausflüge und Aktivitäten",
            "Komfortable Doppelzimmer und Studios",
        ],
    },
    sommerberg: {
        id: "sommerberg",
        name: "Hotel Sommerberg",
        location: "Masserberg • OT Fehrenbach",
        image: "/images/blockhaus.jpeg",
        intro: "Zwischen Wiesen und Wäldern bietet das Hotel Sommerberg viel Platz für Familien, Vereine und aktive Urlauber:innen.",
        features: [
            "Große Zimmerkapazitäten – ideal für Gruppen",
            "Familienzimmer und Studios mit extra Raum",
            "Naturnahe Lage mit vielen Freizeitmöglichkeiten",
            "Herzliche Gastgeber und entspannte Atmosphäre",
        ],
    },
};

export default function HotelShow({ hotel }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const data = HOTELS[hotel] ?? HOTELS.heubach;

    return (
        <AppLayout currentRoute="rooms">
            <Head title={data.name} />
            <section className="hd-wrap" aria-labelledby="hotel-title">
                <div className="hd-hero">
                    <div className="hd-hero-inner">
                        <img
                            src={data.image}
                            alt=""
                            className="hd-hero-bg"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="hd-hero-layout">
                            <div className="hd-hero-copy">
                                <p className="hd-eyebrow">
                                    {locale === "de"
                                        ? "Unsere Hotels"
                                        : "Our hotels"}{" "}
                                    • Werrapark Resort
                                </p>
                                <h1 id="hotel-title" className="hd-title">
                                    {data.name}
                                </h1>
                                <p className="hd-location">{data.location}</p>
                                <p className="hd-intro">{data.intro}</p>
                            </div>

                            <div className="hd-hero-media" aria-hidden="true">
                                <div className="hd-hero-img-wrap">
                                    <span className="hd-hero-grad" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hd-layout">
                    <article className="hd-main">
                        <div className="hd-card">
                            <h2 className="hd-card-title">
                                {locale === "de"
                                    ? "Highlights im Überblick"
                                    : "Highlights at a glance"}
                            </h2>
                            <ul className="hd-list">
                                {data.features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <aside className="hd-aside" aria-label="Buchung & Kontakt">
                        <div className="hd-aside-card">
                            <h2 className="hd-aside-title">
                                {locale === "de"
                                    ? "Direkt anfragen"
                                    : "Request directly"}
                            </h2>
                            <p className="hd-text">
                                {locale === "de"
                                    ? "Sie interessieren sich für dieses Hotel? Schreiben Sie uns, wir beraten Sie gern zu Verfügbarkeit, Zimmerkategorien und Angeboten."
                                    : "Interested in this hotel? Get in touch and we'll advise you on availability, room types and offers."}
                            </p>
                            <div className="hd-actions">
                                <a
                                    href="/kontakt"
                                    className="hd-btn hd-btn--primary"
                                >
                                    {locale === "de"
                                        ? "Kontakt aufnehmen"
                                        : "Contact us"}
                                </a>
                                <a
                                    href="/offers"
                                    className="hd-btn hd-btn--ghost"
                                >
                                    {locale === "de"
                                        ? "Bestpreis buchen"
                                        : "Book best price"}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}


