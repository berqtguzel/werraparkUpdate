import React from "react";
import { Head, usePage } from "@inertiajs/react";
import {
    CheckCircle2,
    MapPin,
    Mail,
    Phone,
    Star,
    Sparkles,
    Compass,
} from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { HOTEL_MAP } from "@/Data/HotelsData";
import HOTELS from "@/Data/HotelsData";
import { useTranslation } from "@/i18n";
import "@/../css/hotel-detail.css";

export default function HotelShow({ hotel }) {
    const { props } = usePage();
    const locale = props?.locale ?? "de";
    const { t } = useTranslation();
    const data = HOTEL_MAP[hotel] ?? HOTELS[0];

    return (
        <AppLayout currentRoute="rooms">
            <Head title={data.name} />

            <section className="hd-wrap" aria-labelledby="hotel-title">
                <div className="hd-hero">
                    <div className="hd-hero-inner">
                        <img
                            src={data.image}
                            alt=""
                            className="hd-hero-bg"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="hd-hero-layout">
                            <div className="hd-hero-copy">
                                <p className="hd-eyebrow">
                                    {t("hotelDetail.eyebrow")} • Werrapark Resort
                                </p>
                                <h1 id="hotel-title" className="hd-title">
                                    {data.name}
                                </h1>
                                <p className="hd-location">
                                    <MapPin size={15} />
                                    {data.location}
                                </p>
                                <p className="hd-intro">{data.intro}</p>

                                <div className="hd-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={
                                                i < data.rating
                                                    ? "hd-star active"
                                                    : "hd-star"
                                            }
                                            aria-hidden
                                        />
                                    ))}
                                </div>
                            </div>

                            <div
                                className="hd-hero-media"
                                aria-hidden="true"
                            >
                                <div className="hd-hero-img-wrap">
                                    <span className="hd-hero-grad" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hd-layout">
                    <article className="hd-main">
                        <div className="hd-card">
                            <h2 className="hd-card-title">
                                {t("hotelDetail.roomHighlights")}
                            </h2>
                            <ul className="hd-list">
                                {data.roomHighlights.map((item, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hd-card">
                            <h2 className="hd-card-title">
                                <Sparkles size={17} />
                                {t("hotelDetail.amenities")}
                            </h2>
                            <div className="hd-chip-grid">
                                {data.amenities.map((item, i) => (
                                    <span className="hd-chip" key={i}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="hd-card">
                            <h2 className="hd-card-title">
                                <Compass size={17} />
                                {t("hotelDetail.activities")}
                            </h2>
                            <ul className="hd-list">
                                {data.activities.map((item, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>

                    <aside className="hd-aside" aria-label={t("hotelDetail.requestTitle")}>
                        <div className="hd-aside-card">
                            <h2 className="hd-aside-title">
                                {t("hotelDetail.requestTitle")}
                            </h2>
                            <p className="hd-aside-text">
                                {t("hotelDetail.requestText")}
                            </p>

                            <div className="hd-contact-info">
                                <a
                                    href={`mailto:${data.email}`}
                                    className="hd-contact-link"
                                >
                                    <Mail size={16} /> {data.email}
                                </a>
                                <a
                                    href={`tel:${data.phone}`}
                                    className="hd-contact-link"
                                >
                                    <Phone size={16} /> {data.phone}
                                </a>
                            </div>

                            <p className="hd-ideal-for">
                                <strong>{t("hotelDetail.idealFor")}</strong>{" "}
                                {data.idealFor}
                            </p>

                            <div className="hd-actions">
                                <a
                                    href={`/${locale}/kontakt`}
                                    className="hd-btn hd-btn--primary"
                                >
                                    {t("hotelDetail.contactBtn")}
                                </a>
                                <a
                                    href="/"
                                    className="hd-btn hd-btn--ghost"
                                >
                                    {t("hotelDetail.homeBtn")}
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </AppLayout>
    );
}
