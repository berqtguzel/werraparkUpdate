import React from "react";
import "../../../css/hotels.css";
import { Link, usePage } from "@inertiajs/react";
import { Mail, Phone, Star } from "lucide-react";
import ElectricBorder from "../ReactBits/Animations/ElectricBorder";
import HOTELS from "@/Data/HotelsData";
import { useTranslation } from "@/i18n";

export default function Hotels() {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const { t } = useTranslation();

    return (
        <section
            className="hotels-section relative overflow-hidden"
            aria-labelledby="hotels-heading"
        >
            <div className="hotels-background"></div>
            <div className="hotels-container relative z-20">
                <h2 id="hotels-heading" className="hotels-title">
                    {t("hotels.title")}
                </h2>
                <p className="hotels-subtitle" role="doc-subtitle">
                    {t("hotels.subtitle")}
                </p>

                <div className="hotel-grid">
                    {HOTELS.map((hotel) => (
                        <ElectricBorder
                            key={hotel.id}
                            color={"var(--hotel-green)"}
                            secondaryColor={"var(--hotel-green-light)"}
                            borderRadius={16}
                            borderWidth={2}
                            glow={0.28}
                            speed={1.0}
                            hoverIntensity={1.0}
                            className="hotel-eb"
                        >
                            <div
                                className="hotel-card eb-reset"
                                role="article"
                                aria-label={hotel.name}
                            >
                                <div className="hotel-image">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="hotel-body">
                                    <h3>{hotel.name}</h3>
                                    <p className="hotel-tagline">
                                        {hotel.tagline}
                                    </p>

                                    <div className="hotel-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={
                                                    i < hotel.rating
                                                        ? "star active"
                                                        : "star"
                                                }
                                                aria-hidden
                                            />
                                        ))}
                                    </div>

                                    <div className="hotel-contact">
                                        <a
                                            href={`mailto:${hotel.email}`}
                                            className="hotel-link"
                                            aria-label={`E-Mail senden an ${hotel.name}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Mail size={16} /> {hotel.email}
                                        </a>
                                        <a
                                            href={`tel:${hotel.phone}`}
                                            className="hotel-link"
                                            aria-label={`Telefonnummer von ${hotel.name} anrufen`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Phone size={16} /> {hotel.phone}
                                        </a>
                                    </div>

                                    <Link
                                        className="hotel-detail-btn"
                                        href={`/${locale}/hotels/${hotel.id}`}
                                    >
                                        {t("hotels.cta")}
                                    </Link>
                                </div>
                            </div>
                        </ElectricBorder>
                    ))}
                </div>
            </div>
        </section>
    );
}
