"use client";

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/travel-themes.css";

const Particles = React.lazy(() =>
    import("../ReactBits/Backgrounds/Particles").then((m) => ({
        default: m.default || m,
    })),
);

const THEMES = [
    {
        id: "wellness",
        title: "Erholungshotel",
        excerpt:
            "Natur, Ruhe und Genuss vereint – Auszeit mit kurzen Wegen zu Pool, Sauna und Kulinarik.",
        image: "/images/template3.png",
        href: "#",
    },
    {
        id: "biker",
        title: "Motorradtour",
        excerpt:
            "Kurvige Landstraßen, herrliche Aussichten – perfekte Routen im Thüringer Wald.",
        image: "/images/template3.png",
        href: "#",
    },
    {
        id: "massage",
        title: "Massage",
        excerpt: "Klassische, Hot-Stone & Anwendungen für tiefes Wohlbefinden.",
        image: "/images/template3.png",
        href: "#",
    },
    {
        id: "catering",
        title: "Catering",
        excerpt:
            "Anlassbezogene, frische Menüs – maßgeschneidert für kleine & große Feiern.",
        image: "/images/template3.png",
        href: "#",
    },
    {
        id: "wedding",
        title: "Hochzeitssaal",
        excerpt: "Elegantes Ambiente, flexible Bestuhlung & Rundum-Service.",
        image: "/images/template3.png",
        href: "#",
    },
    {
        id: "camp",
        title: "Fußballcamp",
        excerpt: "Training, Spaß und Teamgefühl für fußballbegeisterte Kids.",
        image: "/images/template3.png",
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
    ctaSecondary = { label: "Bestpreis Buchung", href: "/offers" },
    items = THEMES,
}) {
    const [feature, ...rest] = items;
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const { props } = usePage();
    const locale = props?.locale ?? "de";

    return (
        <section className="tt3-wrap tt3-with-bends" aria-label="Urlaubsthemen">
            {mounted && (
                <React.Suspense fallback={null}>
                    <div className="tt3-particles-layer" aria-hidden="true">
                        <Particles
                            className="tt3-particles"
                            particleCount={200}
                            particleSpread={8}
                            speed={0.08}
                            moveParticlesOnHover
                            particleHoverFactor={0.7}
                            alphaParticles
                            particleBaseSize={200}
                            sizeRandomness={0.9}
                            cameraDistance={18}
                            particleColors={["#19bf73", "#0ea567", "#8ee7c8"]}
                        />
                    </div>
                </React.Suspense>
            )}

            {/* ÜST ŞERİT: solda metin, sağda mozaik vitrin */}
            <div className="tt3-header">
                <div className="tt3-head-text">
                    <span className="tt3-eyebrow">{eyebrow}</span>
                    <h2 className="tt3-title">{title}</h2>
                    <p className="tt3-desc">{description}</p>

                    <div className="tt3-cta">
                        <a
                            className="tt3-btn tt3-btn--primary"
                            href={ctaPrimary.href || `/${locale}/urlaubsthemen`}
                        >
                            {ctaPrimary.label}
                        </a>
                        <a
                            className="tt3-btn tt3-btn--ghost"
                            href={ctaSecondary.href}
                        >
                            {ctaSecondary.label}
                        </a>
                    </div>
                </div>

                <div className="tt3-head-mosaic" aria-hidden="true">
                    {/* Büyük özellik kartı */}
                    <Link
                        className="tt3-mosaic-item tt3-mosaic--xl"
                        href={
                            feature
                                ? `/${locale}/urlaubsthemen/${feature.id}`
                                : `/${locale}/urlaubsthemen`
                        }
                        tabIndex={-1}
                    >
                        <img src={feature?.image} alt="" />
                        <div className="tt3-mosaic-overlay">
                            <strong>{feature?.title}</strong>
                            <span>{feature?.excerpt}</span>
                        </div>
                    </Link>

                    {/* İki orta, bir dar görsel */}
                    {rest.slice(0, 3).map((t, i) => (
                        <Link
                            key={t.id}
                            className={`tt3-mosaic-item ${
                                i === 2 ? "tt3-mosaic--tall" : ""
                            }`}
                            href={`/${locale}/urlaubsthemen/${t.id}`}
                            tabIndex={-1}
                        >
                            <img src={t.image} alt="" />
                            <div className="tt3-mosaic-overlay">
                                <strong>{t.title}</strong>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ALT IZGARA */}
            <div className="tt3-grid" role="list">
                {items.map((t) => (
                    <article key={t.id} className="tt3-card" role="listitem">
                        <div className="tt3-card-media">
                            <img
                                src={t.image}
                                alt={t.title}
                                loading="lazy"
                                decoding="async"
                            />
                            <span
                                className="tt3-media-grad"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="tt3-card-body">
                            <h3 className="tt3-card-title">{t.title}</h3>
                            <p className="tt3-card-excerpt">{t.excerpt}</p>
                            <div className="tt3-card-actions">
                                <Link
                                    className="tt3-link"
                                    href={`/${locale}/urlaubsthemen/${t.id}`}
                                    aria-label={`${t.title} – mehr lesen`}
                                >
                                    Mehr lesen
                                </Link>
                                <Link
                                    className="tt3-chip"
                                    href={`/${locale}/urlaubsthemen/${t.id}`}
                                    aria-label={`${t.title} – entdecken`}
                                >
                                    Entdecken
                                </Link>
                            </div>
                        </div>

                        <span className="tt3-card-border" aria-hidden="true" />
                    </article>
                ))}
            </div>
        </section>
    );
}
