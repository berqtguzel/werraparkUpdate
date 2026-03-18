import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../css/home.css";

export default function Hero() {
    const { props } = usePage();
    const slider = props?.global?.slider ?? null;
    const slides = slider?.slides ?? [];
    const [activeIndex, setActiveIndex] = useState(0);

    const hasSlider = Array.isArray(slides) && slides.length > 0;
    const firstSlide = slides[0];
    const title = firstSlide?.title || slider?.title || "Willkommen im Werrapark";
    const subtitle = firstSlide?.description || "Ihre Oase der Ruhe inmitten der Natur";

    useEffect(() => {
        if (!hasSlider || slides.length < 2) return;
        const id = setInterval(() => {
            setActiveIndex((i) => (i + 1) % slides.length);
        }, 5000);
        return () => clearInterval(id);
    }, [hasSlider, slides.length]);

    return (
        <section className="hero" aria-label="Willkommen im Werrapark">
            {hasSlider ? (
                <div className="hero-slider">
                    {slides.map((s, i) => (
                        <div
                            key={i}
                            className={`hero-slider-slide ${i === activeIndex ? "is-active" : ""}`}
                            style={{ backgroundImage: s.image ? `url(${s.image})` : undefined }}
                        />
                    ))}
                    <div className="hero-slider-dots">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`hero-slider-dot ${i === activeIndex ? "is-active" : ""}`}
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <video
                    className="hero-bg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/video/werraparkvideo.mp4"
                >
                    <source src="/videos/werraparkvideo.webm" type="video/webm" />
                    <source src="/videos/werraparkvideo.mp4" type="video/mp4" />
                    Ihr Browser unterstützt dieses Video nicht.
                </video>
            )}

            <div className="hero-overlay" aria-hidden />

            <div className="hero-content container">
                <h1>{title}</h1>
                <p>{subtitle}</p>
                <div className="hero-ctas">
                    <Link href="/offers" className="btn btn--primary">
                        Jetzt buchen
                    </Link>
                    <Link href="/rooms" className="btn btn--ghost">
                        Zimmer &amp; Suiten
                    </Link>
                </div>
            </div>
        </section>
    );
}
