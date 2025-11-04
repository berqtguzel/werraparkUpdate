import React from "react";
import {
    FaUtensils,
    FaSpa,
    FaSwimmer,
    FaHiking,
    FaBicycle,
    FaChild,
} from "react-icons/fa";
import "../../css/home.css";

const DEFAULT = [
    { icon: FaUtensils, label: "Restaurant & Frühstück" },
    { icon: FaSpa, label: "Wellness & Sauna" },
    { icon: FaSwimmer, label: "Hallenbad" },
    { icon: FaHiking, label: "Wanderrouten" },
    { icon: FaBicycle, label: "Bike-Verleih" },
    { icon: FaChild, label: "Familienfreundlich" },
];

export default function Features({ items = DEFAULT }) {
    return (
        <section
            className="wp-features section"
            aria-labelledby="wp-feat-title"
        >
            <div className="container">
                <header className="wp-head text-center">
                    <h2 id="wp-feat-title" className="wp-title">
                        Was wir Ihnen bieten
                    </h2>
                    <p className="wp-sub">
                        Natur, Erholung und Aktivitäten – alles an einem Ort.
                    </p>
                </header>

                <div className="wp-features-grid" role="list">
                    {items.map(({ icon: Icon, label }, i) => (
                        <div
                            key={i}
                            className="wp-feature"
                            role="listitem"
                            aria-label={label}
                        >
                            <span className="wp-feature-ico" aria-hidden>
                                <Icon />
                            </span>
                            <div className="wp-feature-label">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
