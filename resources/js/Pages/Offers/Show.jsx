import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import OFFERS from "@/Data/OffersData";
import "@/../css/offer-detail.css";

const OFFER_MAP = OFFERS.reduce((acc, o) => {
    acc[o.id] = o;
    return acc;
}, {});

export default function OfferShow({ offer: offerId }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const base = OFFER_MAP[offerId] ?? OFFERS[0];

    const title = base.subtitle
        ? `${base.title} – ${base.subtitle}`
        : base.title;

    return (
        <AppLayout currentRoute="offers">
            <Head title={title} />
            <section className="of-wrap" aria-labelledby="offer-title">
                <div className="of-hero">
                    <div className="of-hero-inner">
                        <img
                            src={base.image}
                            alt={base.alt || base.title}
                            className="of-hero-bg"
                            loading="lazy"
                            decoding="async"
                        />

                        <div className="of-hero-layout">
                            <div className="of-hero-copy">
                                <p className="of-eyebrow">
                                    {locale === "de"
                                        ? "Angebot"
                                        : "Special offer"}{" "}
                                    • Werrapark Resort
                                </p>
                                <h1
                                    id="offer-title"
                                    className="of-title"
                                >
                                    {title}
                                </h1>
                                <p className="of-intro">
                                    {locale === "de"
                                        ? "Entdecken Sie die Details dieses Angebots und kombinieren Sie Natur, Komfort und kulinarische Momente im Thüringer Wald."
                                        : "Discover all details of this offer and combine nature, comfort and culinary highlights in the Thuringian Forest."}
                                </p>
                            </div>

                            <div
                                className="of-hero-badge"
                                aria-hidden="true"
                            >
                                {base.badge && (
                                    <img
                                        src={base.badge}
                                        alt=""
                                        className="of-hero-logo"
                                        loading="lazy"
                                    />
                                )}
                                <span className="of-hero-tag">
                                    {locale === "de"
                                        ? "Begrenztes Kontingent"
                                        : "Limited availability"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="of-layout">
                    <article className="of-main">
                        <div className="of-card">
                            <h2 className="of-card-title">
                                {locale === "de"
                                    ? "Leistungen im Überblick"
                                    : "Included services"}
                            </h2>
                            <ul className="of-list">
                                <li>
                                    {locale === "de"
                                        ? "Übernachtung im ausgewählten Hotel des Werrapark Resorts"
                                        : "Accommodation in the selected Werrapark hotel"}
                                </li>
                                <li>
                                    {locale === "de"
                                        ? "Reichhaltiges Frühstücksbuffet mit regionalen Produkten"
                                        : "Rich breakfast buffet with regional products"}
                                </li>
                                <li>
                                    {locale === "de"
                                        ? "Freie Nutzung von Pool und Saunabereich (je nach Hotel)"
                                        : "Free use of pool and sauna area (depending on hotel)"}
                                </li>
                                <li>
                                    {locale === "de"
                                        ? "Vielfältige Freizeitmöglichkeiten im Thüringer Wald"
                                        : "Various leisure activities in the Thuringian Forest"}
                                </li>
                            </ul>
                        </div>
                    </article>

                    <aside className="of-aside" aria-label="Preis & Buchung">
                        <div className="of-aside-card">
                            <h2 className="of-aside-title">
                                {locale === "de"
                                    ? "Preis & Anfrage"
                                    : "Price & request"}
                            </h2>
                            <p className="of-text">
                                {locale === "de"
                                    ? "Senden Sie uns Ihre Wunschdaten – wir prüfen Verfügbarkeit und erstellen ein individuelles Angebot."
                                    : "Send us your preferred travel dates and we will check availability and create an individual offer."}
                            </p>
                            <div className="of-actions">
                                <a
                                    href="/kontakt"
                                    className="of-btn of-btn--primary"
                                >
                                    {locale === "de"
                                        ? "Angebot anfragen"
                                        : "Request offer"}
                                </a>
                                <a
                                    href="/offers"
                                    className="of-btn of-btn--ghost"
                                >
                                    {locale === "de"
                                        ? "Weitere Angebote"
                                        : "More offers"}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}


