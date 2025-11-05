import React from "react";
import "../../../css/travel-themes.css";

/** Kart verileri (örnek) */
const THEMES = [
    {
        id: "wellness",
        title: "Erholungshotel",
        excerpt:
            "Natur, Ruhe und Genuss vereint: Gönnen Sie sich eine Auszeit mit kurzen Wegen zu Pool, Sauna und Kulinarik.",
        image: "/images/themes/hotel-green.jpg",
        href: "#",
    },
    {
        id: "biker",
        title: "Motorradtour",
        excerpt:
            "Kurvige Landstraßen, herrliche Aussichten: Perfekt geplante Routen rund um den Thüringer Wald.",
        image: "/images/themes/motorbike.jpg",
        href: "#",
    },
    {
        id: "massage",
        title: "Massage",
        excerpt:
            "Zeit für Sie: Klassische Massagen, Hot-Stone & Anwendungen für tiefes Wohlbefinden.",
        image: "/images/themes/massage.jpg",
        href: "#",
    },
    {
        id: "catering",
        title: "Catering",
        excerpt:
            "Anlassbezogene Menüs – maßgeschneidert und frisch. Wir liefern Genuss für kleine und große Feiern.",
        image: "/images/themes/catering.jpg",
        href: "#",
    },
    {
        id: "wedding",
        title: "Hochzeitssaal",
        excerpt:
            "Feiern in elegantem Ambiente: Flexibler Saal, tolle Deko-Optionen & Rundum-Service für Ihren großen Tag.",
        image: "/images/themes/wedding.jpg",
        href: "#",
    },
    {
        id: "camp",
        title: "Fußballcamp",
        excerpt:
            "Training, Spaß und Teamgefühl – unser Camp macht fußballbegeisterte Kids glücklich.",
        image: "/images/themes/football-camp.jpg",
        href: "#",
    },
];

export default function TravelThemes({
    eyebrow = "Facilities & Mehr",
    title = "Urlaubsthemen",
    description = `Sie möchten den Alltagsstress hinter sich lassen und im Thüringer Wald entspannen?
Als Fan von frischer Luft und Bewegung schätzen Sie unberührte Natur und abwechslungsreiche
Bewegungsmöglichkeiten? Suchen Sie Ihr Urlaubsthema – wir kümmern uns um den Rest.`,
    ctaPrimary = { label: "Alle Urlaubsthemen", href: "#" },
    ctaSecondary = { label: "Bestpreis Buchung", href: "#" },
    items = THEMES,
    /** hero arka planı (poster görseli veya video mp4) */
    hero = {
        type: "image", // "image" | "video"
        src: "/images/themes/hero-breakfast.jpg",
        videoSrc: "/videos/hero.mp4", // type === "video" ise kullanılır
    },
}) {
    return (
        <section className="tt-wrap" aria-label="Urlaubsthemen">
            {/* HERO */}
            <div className="tt-hero">
                {hero.type === "video" ? (
                    <video
                        className="tt-hero-media"
                        src={hero.videoSrc}
                        poster={hero.src}
                        autoPlay
                        muted
                        playsInline
                        loop
                    />
                ) : (
                    <img
                        className="tt-hero-media"
                        src={hero.src}
                        alt=""
                        aria-hidden="true"
                    />
                )}

                <div className="tt-hero-overlay" aria-hidden="true" />

                <div className="tt-hero-content">
                    <span className="tt-eyebrow">{eyebrow}</span>
                    <h2 className="tt-title">{title}</h2>
                    <p className="tt-desc">{description}</p>

                    <div className="tt-cta">
                        <a
                            className="tt-btn tt-btn--primary"
                            href={ctaPrimary.href}
                        >
                            {ctaPrimary.label}
                        </a>
                        <a
                            className="tt-btn tt-btn--ghost"
                            href={ctaSecondary.href}
                        >
                            {ctaSecondary.label}
                        </a>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="tt-grid" role="list">
                {items.map((t) => (
                    <article key={t.id} className="tt-card" role="listitem">
                        <div className="tt-card-media">
                            <img src={t.image} alt={t.title} loading="lazy" />
                        </div>

                        <div className="tt-card-body">
                            <h3 className="tt-card-title">{t.title}</h3>
                            <p className="tt-card-excerpt">{t.excerpt}</p>

                            <a
                                className="tt-btn tt-btn--link"
                                href={t.href}
                                aria-label={`${t.title} – mehr lesen`}
                            >
                                Mehr Lesen
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
