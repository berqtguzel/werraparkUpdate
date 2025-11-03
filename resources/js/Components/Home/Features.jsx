import React from "react";
import {
    FaUtensils,
    FaSpa,
    FaSwimmer,
    FaHiking,
    FaBicycle,
    FaChild,
} from "react-icons/fa";

/**
 * Werrapark ana sayfa – “Was wir Ihnen bieten” özellik listesi
 * props.items ile özelleştirilebilir; boşsa defaultItems kullanılır.
 */
const defaultItems = [
    { icon: FaUtensils, label: "Restaurant & Frühstück" },
    { icon: FaSpa, label: "Wellness & Sauna" },
    { icon: FaSwimmer, label: "Hallenbad" },
    { icon: FaHiking, label: "Wanderrouten" },
    { icon: FaBicycle, label: "Bike-Verleih" },
    { icon: FaChild, label: "Familienfreundlich" },
];

export default function Features({ items = defaultItems }) {
    return (
        <section className="features section" aria-labelledby="features-title">
            <div className="container">
                <h2
                    id="features-title"
                    className="text-center"
                    style={{ marginBottom: 8 }}
                >
                    Was wir Ihnen bieten
                </h2>
                <p
                    className="text-center"
                    style={{ marginTop: 0, color: "var(--ink-600)" }}
                >
                    Natur, Erholung und Aktivitäten – alles an einem Ort.
                </p>

                <div className="features-grid" role="list">
                    {items.map(({ icon: Icon, label }, i) => (
                        <div
                            key={i}
                            role="listitem"
                            className="feature-item"
                            aria-label={label}
                        >
                            <span className="feature-icon" aria-hidden>
                                <Icon />
                            </span>
                            <div
                                style={{
                                    fontWeight: 700,
                                    color: "var(--ink-900)",
                                }}
                            >
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
