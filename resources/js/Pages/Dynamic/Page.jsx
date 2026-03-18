import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import "../../../css/dynamic-page.css";

export default function DynamicPage({ currentRoute = "page" }) {
    const { props } = usePage();
    const page = props?.page ?? {};

    const { title = "Seite", subtitle = "", blocks = [], content = "" } = page;

    const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

    const heroSrc = page.heroImage || "/images/template1.webp";

    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title={`${title} – Werrapark`} />

            <div className="dp-wrapper">
                <section className="dp-hero">
                    <div
                        className="dp-hero__bg"
                        style={{ backgroundImage: `url(${heroSrc})` }}
                    />

                    <div className="dp-hero__overlay" />

                    <div className="dp-hero__inner">
                        <span className="dp-eyebrow">Werrapark Resort</span>

                        <h1 className="dp-title">{title}</h1>

                        {subtitle && <p className="dp-subtitle">{subtitle}</p>}
                    </div>
                </section>

                <section className="dp-content">
                    <div className="dp-container">
                        {!hasBlocks && content && (
                            <div
                                className="dp-card"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}

                        {!hasBlocks && !content && (
                            <div className="dp-card dp-empty">
                                <p>
                                    Diese Seite wird aktuell vorbereitet. Bald
                                    finden Sie hier spannende Inhalte rund um{" "}
                                    {title}.
                                </p>
                            </div>
                        )}

                        {hasBlocks &&
                            blocks.map((b, i) => {
                                if (b.type === "text") {
                                    return (
                                        <div key={i} className="dp-card">
                                            {b.heading && <h2>{b.heading}</h2>}
                                            {b.html ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: b.html,
                                                    }}
                                                />
                                            ) : (
                                                <p>{b.content}</p>
                                            )}
                                        </div>
                                    );
                                }

                                if (b.type === "image") {
                                    return (
                                        <div
                                            key={i}
                                            className="dp-card dp-image"
                                        >
                                            <img
                                                src={b.src}
                                                alt={b.alt || ""}
                                                loading="lazy"
                                            />
                                        </div>
                                    );
                                }

                                if (b.type === "list") {
                                    return (
                                        <div key={i} className="dp-card">
                                            {b.heading && <h2>{b.heading}</h2>}
                                            <ul>
                                                {(b.items || []).map(
                                                    (item, idx) => (
                                                        <li key={idx}>
                                                            {item}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
