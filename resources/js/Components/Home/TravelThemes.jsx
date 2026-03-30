"use client";

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/travel-themes.css";
import { useTranslation } from "@/i18n";

const Particles = React.lazy(() =>
    import("../ReactBits/Backgrounds/Particles").then((m) => ({
        default: m.default || m,
    })),
);

function useReveal(threshold = 0.15) {
    const ref = React.useRef(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    return [ref, visible];
}

export default function TravelThemes({ items }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const [headerRef, headerVisible] = useReveal(0.12);
    const [gridRef, gridVisible] = useReveal(0.08);

    const { props } = usePage();
    const locale = props?.global?.locale ?? props?.locale ?? "de";
    const sourceItems = items?.length
        ? items
        : (props?.global?.travelThemes ?? []);
    const [feature, ...rest] = sourceItems;
    const { t } = useTranslation();

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

            <div
                ref={headerRef}
                className={`tt3-header ${headerVisible ? "tt3-revealed" : "tt3-hidden"}`}
            >
                <div className="tt3-head-text">
                    <span className="tt3-eyebrow">{t("themes.eyebrow")}</span>
                    <h1 className="tt3-title">{t("themes.title")}</h1>
                    <p className="tt3-desc">{t("themes.description")}</p>

                    <div className="tt3-cta">
                        <a
                            className="tt3-btn tt3-btn--primary"
                            href={
                                feature
                                    ? `/${locale}/urlaubsthemen/${feature.slug || feature.id}`
                                    : "#"
                            }
                        >
                            {t("themes.allThemes")}
                        </a>
                        <a
                            className="tt3-btn tt3-btn--ghost"
                            href={
                                feature?.file ||
                                (feature
                                    ? `/${locale}/urlaubsthemen/${feature.slug || feature.id}`
                                    : "#")
                            }
                        >
                            {t("themes.bestPrice")}
                        </a>
                    </div>
                </div>

                <div className="tt3-head-mosaic" aria-hidden="true">
                    {/* Büyük özellik kartı */}
                    <Link
                        className="tt3-mosaic-item tt3-mosaic--xl"
                        href={
                            feature
                                ? `/${locale}/urlaubsthemen/${feature.slug || feature.id}`
                                : "#"
                        }
                        tabIndex={-1}
                    >
                        <img src={feature?.image} alt="" />
                        <div className="tt3-mosaic-overlay">
                            <strong>{feature?.name}</strong>
                            <span>{feature?.excerpt}</span>
                        </div>
                    </Link>

                    {/* İki orta, bir dar görsel */}
                    {rest.slice(0, 3).map((theme, i) => (
                        <Link
                            key={theme.id}
                            className={`tt3-mosaic-item ${
                                i === 2 ? "tt3-mosaic--tall" : ""
                            }`}
                            href={`/${locale}/urlaubsthemen/${theme.slug || theme.id}`}
                            tabIndex={-1}
                        >
                            <img src={theme.image} alt="" />
                            <div className="tt3-mosaic-overlay">
                                <strong>{theme.name}</strong>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ALT IZGARA */}
            <div
                ref={gridRef}
                className={`tt3-grid ${gridVisible ? "tt3-revealed" : "tt3-hidden"}`}
                role="list"
            >
                {sourceItems.map((theme, idx) => (
                    <article
                        key={theme.id}
                        className="tt3-card tt3-card-anim"
                        role="listitem"
                        style={{ "--card-i": idx }}
                    >
                        <div className="tt3-card-media">
                            <img
                                src={theme.image}
                                alt={theme.name}
                                loading="lazy"
                                decoding="async"
                            />
                            <span
                                className="tt3-media-grad"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="tt3-card-body">
                            <h3 className="tt3-card-title">{theme.name}</h3>
                            <p className="tt3-card-excerpt">{theme.excerpt}</p>
                            <div className="tt3-card-actions">
                                <Link
                                    className="tt3-link"
                                    href={`/${locale}/urlaubsthemen/${theme.slug || theme.id}`}
                                    aria-label={`${theme.name} – ${t("themes.readMore")}`}
                                >
                                    {t("themes.readMore")}
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
