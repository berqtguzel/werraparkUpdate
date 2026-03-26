import React from "react";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "@/i18n";
import "../../../css/hotel-reviews.css";

const FALLBACK_REVIEWS = {
    de: [
        {
            id: "r1",
            name: "Anna K.",
            location: "Leipzig",
            rating: 5,
            text: "Sehr ruhige Lage, unglaublich freundliches Team und ein tolles Fruehstueck. Wir kommen definitiv wieder.",
            stay: "2 Naechte · Heubacher Hoehe",
        },
        {
            id: "r2",
            name: "Mehmet D.",
            location: "Berlin",
            rating: 5,
            text: "Zimmer sauber, Essen frisch und die Natur direkt vor der Tuer. Genau die Auszeit, die wir gebraucht haben.",
            stay: "3 Naechte · Frankenblick",
        },
        {
            id: "r3",
            name: "Sophie W.",
            location: "Erfurt",
            rating: 4,
            text: "Wellnessbereich hat uns besonders gefallen. Personal war sehr hilfsbereit und herzlich.",
            stay: "Wochenende · Sommerberg",
        },
        {
            id: "r4",
            name: "Jonas R.",
            location: "Hamburg",
            rating: 5,
            text: "Top Preis-Leistung, moderne Zimmer und super Ausgangspunkt fuer Wanderungen im Thueringer Wald.",
            stay: "4 Naechte · Werrapark Resort",
        },
        {
            id: "r5",
            name: "Claudia M.",
            location: "Nuernberg",
            rating: 5,
            text: "Die Mitarbeitenden machen den Unterschied: professionell, herzlich und immer erreichbar.",
            stay: "Familienreise · Heubacher Hoehe",
        },
    ],
    en: [
        {
            id: "r1",
            name: "Anna K.",
            location: "Leipzig",
            rating: 5,
            text: "Very peaceful location, an incredibly friendly team and a wonderful breakfast. We will definitely come back.",
            stay: "2 nights · Heubacher Hoehe",
        },
        {
            id: "r2",
            name: "Mehmet D.",
            location: "Berlin",
            rating: 5,
            text: "Clean rooms, fresh food and nature right outside the door. Exactly the kind of break we needed.",
            stay: "3 nights · Frankenblick",
        },
        {
            id: "r3",
            name: "Sophie W.",
            location: "Erfurt",
            rating: 4,
            text: "We especially loved the wellness area. The staff were warm, attentive and very helpful.",
            stay: "Weekend · Sommerberg",
        },
        {
            id: "r4",
            name: "Jonas R.",
            location: "Hamburg",
            rating: 5,
            text: "Excellent value, modern rooms and a perfect starting point for hikes in the Thuringian Forest.",
            stay: "4 nights · Werrapark Resort",
        },
        {
            id: "r5",
            name: "Claudia M.",
            location: "Nuremberg",
            rating: 5,
            text: "The team makes all the difference: professional, warm and always easy to reach.",
            stay: "Family trip · Heubacher Hoehe",
        },
    ],
    tr: [
        {
            id: "r1",
            name: "Anna K.",
            location: "Leipzig",
            rating: 5,
            text: "Cok sakin bir konum, inanilmaz guleryuzlu bir ekip ve harika bir kahvalti. Kesinlikle tekrar gelecegiz.",
            stay: "2 gece · Heubacher Hoehe",
        },
        {
            id: "r2",
            name: "Mehmet D.",
            location: "Berlin",
            rating: 5,
            text: "Odalar temizdi, yemekler tazeydi ve doga tam kapi onundeydi. Tam olarak ihtiyacimiz olan kacamakti.",
            stay: "3 gece · Frankenblick",
        },
        {
            id: "r3",
            name: "Sophie W.",
            location: "Erfurt",
            rating: 4,
            text: "Ozellikle wellness alani cok hosumuza gitti. Personel cok yardimsever ve samimiydi.",
            stay: "Hafta sonu · Sommerberg",
        },
        {
            id: "r4",
            name: "Jonas R.",
            location: "Hamburg",
            rating: 5,
            text: "Fiyat performans cok iyi, odalar modern ve Thüringen Ormani yuruyusleri icin harika bir baslangic noktasi.",
            stay: "4 gece · Werrapark Resort",
        },
        {
            id: "r5",
            name: "Claudia M.",
            location: "Nurnberg",
            rating: 5,
            text: "Farki yaratan sey ekip: profesyonel, samimi ve her zaman ulasilabilirler.",
            stay: "Aile gezisi · Heubacher Hoehe",
        },
    ],
};

function normalizeReview(r) {
    let rating = Number(r.rating ?? r.stars ?? 5);
    if (rating > 5) rating = Math.round(rating / 2);
    rating = Math.max(1, Math.min(5, Math.round(rating)));

    return {
        id: r.id ?? r.slug ?? String(Math.random()),
        name: r.author_name ?? r.name ?? r.author ?? r.guest_name ?? "",
        location: r.location ?? r.city ?? "",
        rating,
        text: r.content ?? r.text ?? r.review ?? "",
        stay: r.stay ?? r.stay_date ?? r.period ?? r.hotel ?? "",
    };
}

const stars = (count) => "★".repeat(Math.max(0, Math.min(5, count)));

export default function HotelReviews() {
    const { t, locale } = useTranslation();
    const { props } = usePage();
    const apiReviews = props?.global?.reviews ?? [];
    const widgetsRatings = props?.global?.widgets?.ratings ?? {};
    const reviews = React.useMemo(() => {
        const fallbackReviews = FALLBACK_REVIEWS[locale] ?? FALLBACK_REVIEWS.de;
        const list =
            Array.isArray(apiReviews) && apiReviews.length
                ? apiReviews
                : (widgetsRatings.reviews ??
                  widgetsRatings.data ??
                  widgetsRatings);
        const arr = Array.isArray(list) ? list : [...fallbackReviews];
        return (arr.length ? arr : fallbackReviews).map(normalizeReview);
    }, [apiReviews, widgetsRatings, locale]);
    const track = [...reviews, ...reviews];

    return (
        <section className="hr-wrap" aria-label={t("reviews.sectionAria")}>
            <div className="hr-head">
                <span className="eyebrow">{t("reviews.eyebrow")}</span>
                <h1 className="hr-title">{t("reviews.title")}</h1>
                <p className="hr-sub">{t("reviews.subtitle")}</p>
            </div>

            <div
                className="hr-marquee"
                role="region"
                aria-label={t("reviews.marqueeAria")}
            >
                <div className="hr-track">
                    {track.map((r, i) => (
                        <article
                            className="hr-card"
                            key={`${r.id}-${i}`}
                            aria-label={t("reviews.cardAria", { name: r.name })}
                        >
                            <div
                                className="hr-stars"
                                aria-label={t("reviews.ratingAria", {
                                    rating: String(r.rating),
                                })}
                            >
                                {stars(r.rating)}
                            </div>
                            <p className="hr-text">"{r.text}"</p>
                            <div className="hr-meta">
                                <strong>{r.name}</strong>
                                <span>
                                    {[r.location, r.stay]
                                        .filter(Boolean)
                                        .join(" · ") || t("reviews.metaFallback")}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
