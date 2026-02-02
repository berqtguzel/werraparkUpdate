import React, { useMemo, useEffect, useState } from "react";
import FlowingMenu from "../ReactBits/Components/FlowingMenu";
import Ribbons from "../ReactBits/Animations/Ribbons";
import "../../../css/offers-grid.css";
import OFFERS from "@/Data/OffersData";

const OffersGrid = () => {
    const items = useMemo(
        () =>
            OFFERS.map((o) => ({
                link: o.href || "#",
                text: o.subtitle ? `${o.title} — ${o.subtitle}` : o.title,
                image: o.image,
            })),
        []
    );

    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        const check = () =>
            setIsDark(
                document.documentElement.classList.contains("dark") ||
                    (mq ? mq.matches : false)
            );
        check();
        mq && mq.addEventListener?.("change", check);
        const obs = new MutationObserver(check);
        obs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => {
            mq && mq.removeEventListener?.("change", check);
            obs.disconnect();
        };
    }, []);

    const ribbonColors = isDark
        ? ["#8EE7C8", "#67C9A8", "#9FE5C7"]
        : ["#1B5E4A", "#2F7D68", "#9AD7C2"];

    return (
        <section className="og-wrap">
            <header className="og-head">
                <div className="og-eyebrow">Sonderangebote</div>
                <h2 className="og-title">Information zu den Angeboten</h2>
                <p className="og-subtitle">
                    Pakete und saisonale Angebote, die wir für Sie ausgewählt
                    haben. Sie können die Details in den Karten überprüfen.
                </p>
            </header>

            <div className="og-grid">
                {OFFERS?.length ? (
                    OFFERS.map((o, idx) => (
                        <article className="og-card" key={o.id || idx}>
                            <a
                                className="og-card-media"
                                href={o.href || "#"}
                                aria-label={`${o.title} detaylarına git`}
                            >
                                <img
                                    src={o.image}
                                    alt={o.title}
                                    loading="lazy"
                                    className="og-img"
                                />
                                <div className="og-media-overlay" />
                                {o.tag && (
                                    <span className="og-badge">{o.tag}</span>
                                )}
                                <button
                                    className="og-fav"
                                    type="button"
                                    aria-label="Favorilere ekle"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </a>
                            <div className="og-card-body">
                                <h3 className="og-card-title">{o.title}</h3>
                                {o.subtitle && (
                                    <p className="og-card-sub">{o.subtitle}</p>
                                )}
                                <div className="og-meta">
                                    {o.duration && (
                                        <span className="og-chip">
                                            {o.duration}
                                        </span>
                                    )}
                                    {o.location && (
                                        <span className="og-chip">
                                            {o.location}
                                        </span>
                                    )}
                                </div>
                                {o.price && (
                                    <div className="og-price-row">
                                        <span className="og-price">
                                            {o.price}
                                        </span>
                                        {o.oldPrice && (
                                            <span className="og-old-price">
                                                {o.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="og-actions">
                                    <a className="og-btn" href={o.href || "#"}>
                                        Detayları Gör
                                    </a>
                                    {o.cta && (
                                        <a
                                            className="og-btn og-btn--ghost"
                                            href={o.href || "#"}
                                        >
                                            {o.cta}
                                        </a>
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
