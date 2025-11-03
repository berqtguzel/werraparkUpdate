import React from "react";
import { Link } from "@inertiajs/react";
import "../../css/Hero.css";

export default function Hero() {
    return (
        <section className="hero">
            <img
                src="/images/hero/home.jpg"
                alt="Werrapark Panorama"
                className="hero-bg"
            />
            <div className="hero-overlay" />
            <div className="hero-content container">
                <h1>Willkommen im Werrapark</h1>
                <p>Ihre Oase der Ruhe inmitten der Natur</p>
                <Link href="/offers" className="btn btn--primary">
                    Jetzt Buchen
                </Link>
            </div>
        </section>
    );
}
