import React from "react";
import { Link } from "@inertiajs/react";
import "../../css/home.css";

export default function Hero() {
    return (
        <section className="hero" aria-label="Willkommen im Werrapark">
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

            <div className="hero-overlay" aria-hidden />

            <div className="hero-content container">
                <h1>Willkommen im Werrapark</h1>
                <p>Ihre Oase der Ruhe inmitten der Natur</p>
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
