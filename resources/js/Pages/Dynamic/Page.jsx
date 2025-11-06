import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function DynamicPage({ currentRoute = "page", title, subtitle, heroImage, blocks = [] }) {
    return (
        <AppLayout currentRoute={currentRoute}>
            <Head title={`${title || "Seite"} – Werrapark`} />
            <main className="uu">
                {Boolean(title) && (
                    <section className="uu-hero uu-meshbg">
                        <div className="uu-hero__pattern" aria-hidden="true" />
                        {heroImage && (
                            <div
                                className="uu-hero__bg"
                                style={{ backgroundImage: `url(${heroImage})` }}
                                aria-hidden="true"
                            />
                        )}
                        <div className="uu-shell uu-hero__inner">
                            <span className="uu-eyebrow">Werrapark</span>
                            <h1 className="uu-title">{title}</h1>
                            {subtitle && <p className="uu-sub">{subtitle}</p>}
                        </div>
                    </section>
                )}

                <section className="uu-shell" aria-label="Inhalt">
                    {Array.isArray(blocks) &&
                        blocks.map((b, i) => {
                            if (b.type === "text") {
                                return (
                                    <article key={i} className="uu-pane" style={{ marginBottom: 16 }}>
                                        {b.heading && <h2 className="uu-h2">{b.heading}</h2>}
                                        {b.html ? (
                                            <div dangerouslySetInnerHTML={{ __html: b.html }} />
                                        ) : (
                                            <p className="uu-text">{b.content}</p>
                                        )}
                                    </article>
                                );
                            }
                            if (b.type === "image") {
                                return (
                                    <figure key={i} className="uu-pane uu-pane--card" style={{ marginBottom: 16 }}>
                                        <div className="uu-card">
                                            <img src={b.src} alt={b.alt || ""} loading="lazy" />
                                        </div>
                                        {b.caption && <figcaption className="uu-text" style={{ marginTop: 10 }}>{b.caption}</figcaption>}
                                    </figure>
                                );
                            }
                            if (b.type === "list") {
                                return (
                                    <article key={i} className="uu-pane" style={{ marginBottom: 16 }}>
                                        {b.heading && <h2 className="uu-h2">{b.heading}</h2>}
                                        <ul className="uu-list">
                                            {(b.items || []).map((it, idx) => (
                                                <li key={idx}>{it}</li>
                                            ))}
                                        </ul>
                                    </article>
                                );
                            }
                            return null;
                        })}
                </section>
            </main>
        </AppLayout>
    );
}


