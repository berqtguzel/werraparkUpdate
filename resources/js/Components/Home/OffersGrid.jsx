import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../css/offers-grid.css";
import { useTranslation } from "@/i18n";

function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
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

const OffersGrid = () => {
    const { props } = usePage();
    const locale = props?.global?.locale ?? props?.locale ?? "de";
    const offerThemes = props?.global?.offerThemes ?? [];
    const { t } = useTranslation();
    const items = offerThemes;

    const [headRef, headVisible] = useReveal(0.12);
    const [gridRef, gridVisible] = useReveal(0.06);

    return (
        <section className="og-wrap">
            <div className="og-background"></div>
            <header
                ref={headRef}
                className={`og-head ${headVisible ? "og-revealed" : "og-hidden"}`}
            >
                <div className="og-eyebrow">{t("offers.eyebrow")}</div>
                <h2 className="og-title">{t("offers.title")}</h2>
                <p className="og-subtitle">{t("offers.subtitle")}</p>
            </header>

            <div
                ref={gridRef}
                className={`og-grid ${gridVisible ? "og-revealed" : "og-hidden"}`}
            >
                {items.length ? (
                    items.map((o, idx) => (
                        <article
                            className="og-card og-card-anim"
                            key={o.id || idx}
                            style={{ "--card-i": idx }}
                        >
                            <Link
                                className="og-card-media"
                                href={`/${locale}/offers/${o.slug || o.id}`}
                                aria-label={o.name}
                            >
                                <img
                                    src={o.image}
                                    alt={o.name}
                                    loading="lazy"
                                    className="og-img"
                                />
                                <div className="og-media-overlay" />
                                {o.file && (
                                    <span className="og-badge">
                                        PDF
                                    </span>
                                )}
                            </Link>
                            <div className="og-card-body">
                                <h3 className="og-card-title">{o.name}</h3>
                                {o.excerpt && (
                                    <p className="og-card-sub">{o.excerpt}</p>
                                )}
                                <div className="og-actions">
                                    <Link
                                        className="og-btn"
                                        href={`/${locale}/offers/${o.slug || o.id}`}
                                    >
                                        {t("offers.viewDetails")}
                                    </Link>
                                    {o.file && (
                                        <Link
                                            className="og-btn og-btn--ghost"
                                            href={`/${locale}/offers/${o.slug || o.id}`}
                                        >
                                            {t("themes.discover")}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="og-empty">
                        <div className="og-skeleton-card" />
                        <div className="og-skeleton-card" />
                        <div className="og-skeleton-card" />
                        <div className="og-skeleton-card" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default OffersGrid;
